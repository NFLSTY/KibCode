import crypto from "node:crypto";
import type { PrismaClient } from "@kibcode/database";
import type { StudentDTO } from "@kibcode/types";

const SESSION_VALIDITY_DAYS = 7;

export class SessionService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Hashes a raw token with SHA-256 for secure server-side storage.
   */
  private hashToken(rawToken: string): string {
    return crypto.createHash("sha256").update(rawToken).digest("hex");
  }

  /**
   * Generates a device context fingerprint from request headers.
   */
  static extractDeviceInfo(userAgent: string | undefined): string {
    const rawInfo = userAgent || "unknown-device";
    return crypto.createHash("sha256").update(rawInfo).digest("hex");
  }

  /**
   * Principle 1 & 2: Generate random token, hash on server, store with 7-day validity.
   */
  async createSession(
    studentId: string,
    deviceInfo: string,
    validityDays: number = SESSION_VALIDITY_DAYS
  ): Promise<string> {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000);

    await this.prisma.studentSession.create({
      data: {
        studentId,
        tokenHash,
        deviceInfo,
        expiresAt,
      },
    });

    return rawToken;
  }

  /**
   * Principle 3 & 4: Rotate token upon each use and verify device context binding.
   */
  async rotateSession(
    rawToken: string,
    deviceInfo: string
  ): Promise<{ student: StudentDTO; newRefreshToken: string }> {
    const tokenHash = this.hashToken(rawToken);

    const session = await this.prisma.studentSession.findUnique({
      where: { tokenHash },
      include: { student: true },
    });

    if (!session) {
      const error = new Error("Invalid or expired session token");
      (error as unknown as { statusCode: number }).statusCode = 401;
      throw error;
    }

    // Check expiration
    if (session.expiresAt.getTime() <= Date.now()) {
      await this.prisma.studentSession.delete({ where: { id: session.id } }).catch(() => {});
      const error = new Error("Session has expired");
      (error as unknown as { statusCode: number }).statusCode = 401;
      throw error;
    }

    // Principle 4: Verify device context binding
    if (session.deviceInfo !== deviceInfo) {
      // Possible token theft across different devices - revoke session
      await this.prisma.studentSession.delete({ where: { id: session.id } }).catch(() => {});
      const error = new Error("Device context mismatch. Please log in again.");
      (error as unknown as { statusCode: number }).statusCode = 401;
      throw error;
    }

    // Principle 3: Invalidate old token immediately and issue a fresh one
    await this.prisma.studentSession.delete({ where: { id: session.id } });

    const newRefreshToken = await this.createSession(session.studentId, deviceInfo);

    return {
      student: {
        id: session.student.id,
        name: session.student.name,
        email: session.student.email,
        grade: session.student.grade,
        createdAt: session.student.createdAt.toISOString(),
      },
      newRefreshToken,
    };
  }

  async findSessionByRawToken(rawToken: string) {
    const tokenHash = this.hashToken(rawToken);
    return this.prisma.studentSession.findUnique({
      where: { tokenHash },
    });
  }

  async invalidateSession(rawToken: string): Promise<void> {
    const tokenHash = this.hashToken(rawToken);
    await this.prisma.studentSession.deleteMany({
      where: { tokenHash },
    });
  }

  async invalidateAllStudentSessions(studentId: string): Promise<void> {
    await this.prisma.studentSession.deleteMany({
      where: { studentId },
    });
  }
}
