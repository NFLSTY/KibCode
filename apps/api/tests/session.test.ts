import { describe, it, expect, vi } from "vitest";
import { SessionService } from "../src/services/sessionService.js";
import type { PrismaClient } from "@kibcode/database";

describe("SessionService Security Principles", () => {
  const mockStudent = {
    id: "student-123",
    name: "Budi",
    email: "budi@example.com",
    grade: 3,
    passwordHash: "hashed",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("Principle 1 & 2: Creates session with server-side hashed token and 7-day validity limit", async () => {
    let savedData: any = null;

    const mockPrisma = {
      studentSession: {
        create: vi.fn().mockImplementation(async ({ data }) => {
          savedData = data;
          return { id: "session-1", ...data };
        }),
      },
    } as unknown as PrismaClient;

    const sessionService = new SessionService(mockPrisma);
    const deviceInfo = SessionService.extractDeviceInfo("Mozilla/5.0 (Windows NT 10.0)");

    const rawToken = await sessionService.createSession("student-123", deviceInfo);

    expect(rawToken).toHaveLength(64); // 32 random bytes in hex
    expect(savedData.studentId).toBe("student-123");
    // Ensure raw token is NEVER stored directly in the database
    expect(savedData.tokenHash).not.toBe(rawToken);
    expect(savedData.tokenHash).toHaveLength(64); // SHA-256 hash length
    expect(savedData.deviceInfo).toBe(deviceInfo);

    // Limit token validity to 7 days
    const now = Date.now();
    const expiryTime = savedData.expiresAt.getTime();
    const diffDays = (expiryTime - now) / (1000 * 60 * 60 * 24);
    expect(diffDays).toBeGreaterThan(6.9);
    expect(diffDays).toBeLessThanOrEqual(7.01);
  });

  it("Principle 3: Rotates token upon use (deletes old token and creates new one)", async () => {
    const rawOldToken = "a".repeat(64);
    const deviceInfo = SessionService.extractDeviceInfo("Mozilla/5.0 (Windows NT 10.0)");

    const existingSession = {
      id: "session-old",
      studentId: "student-123",
      tokenHash: "hashed-version",
      deviceInfo,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // still valid
      student: mockStudent,
    };

    const deleteMock = vi.fn().mockResolvedValue({});
    const createMock = vi.fn().mockResolvedValue({ id: "session-new" });

    const mockPrisma = {
      studentSession: {
        findUnique: vi.fn().mockResolvedValue(existingSession),
        delete: deleteMock,
        create: createMock,
      },
    } as unknown as PrismaClient;

    const sessionService = new SessionService(mockPrisma);
    const result = await sessionService.rotateSession(rawOldToken, deviceInfo);

    // Verifies old session is deleted
    expect(deleteMock).toHaveBeenCalledWith({ where: { id: "session-old" } });
    // Verifies new session is created
    expect(createMock).toHaveBeenCalled();
    expect(result.newRefreshToken).toBeDefined();
    expect(result.student.id).toBe("student-123");
  });

  it("Principle 4: Binds token to device context and rejects device mismatch", async () => {
    const rawToken = "b".repeat(64);
    const originalDevice = SessionService.extractDeviceInfo("Mozilla/5.0 (Windows NT 10.0)");
    const attackerDevice = SessionService.extractDeviceInfo("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)");

    const existingSession = {
      id: "session-stolen",
      studentId: "student-123",
      tokenHash: "hashed-version",
      deviceInfo: originalDevice,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      student: mockStudent,
    };

    const deleteMock = vi.fn().mockResolvedValue({});

    const mockPrisma = {
      studentSession: {
        findUnique: vi.fn().mockResolvedValue(existingSession),
        delete: deleteMock,
      },
    } as unknown as PrismaClient;

    const sessionService = new SessionService(mockPrisma);

    await expect(
      sessionService.rotateSession(rawToken, attackerDevice)
    ).rejects.toThrow("Device context mismatch");

    // Revokes session upon mismatch
    expect(deleteMock).toHaveBeenCalledWith({ where: { id: "session-stolen" } });
  });

  it("Principle 5: Invalidate all persistent tokens on logout", async () => {
    const deleteManyMock = vi.fn().mockResolvedValue({ count: 3 });

    const mockPrisma = {
      studentSession: {
        deleteMany: deleteManyMock,
      },
    } as unknown as PrismaClient;

    const sessionService = new SessionService(mockPrisma);
    await sessionService.invalidateAllStudentSessions("student-123");

    expect(deleteManyMock).toHaveBeenCalledWith({
      where: { studentId: "student-123" },
    });
  });
});
