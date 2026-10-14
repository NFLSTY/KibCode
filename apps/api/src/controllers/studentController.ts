import type { FastifyReply, FastifyRequest } from "fastify";
import { StudentService } from "../services/studentService.js";
import { SessionService } from "../services/sessionService.js";
import {
  registerStudentSchema,
  loginStudentSchema,
  refreshTokenSchema,
  logoutSchema,
  updateOnboardingSchema,
} from "@kibcode/utils";

export class StudentController {
  static async register(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = registerStudentSchema.parse(request.body);
    const service = new StudentService(request.server.prisma);
    const student = await service.register(validatedData);

    const token = request.server.jwt.sign({
      id: student.id,
      email: student.email,
      grade: student.grade,
    });

    return reply.status(201).send({
      student,
      token,
    });
  }

  static async login(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = loginStudentSchema.parse(request.body);
    const service = new StudentService(request.server.prisma);
    const student = await service.login(validatedData);

    const token = request.server.jwt.sign({
      id: student.id,
      email: student.email,
      grade: student.grade,
    });

    let refreshToken: string | undefined;

    // Handle "Biarkan saya tetap masuk" (rememberMe)
    if (validatedData.rememberMe) {
      const sessionService = new SessionService(request.server.prisma);
      const deviceInfo = SessionService.extractDeviceInfo(
        request.headers["user-agent"]
      );
      refreshToken = await sessionService.createSession(student.id, deviceInfo, 7);
    }

    return reply.status(200).send({
      student,
      token,
      refreshToken,
    });
  }

  static async refresh(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = refreshTokenSchema.parse(request.body);
    const sessionService = new SessionService(request.server.prisma);
    const deviceInfo = SessionService.extractDeviceInfo(
      request.headers["user-agent"]
    );

    const { student, newRefreshToken } = await sessionService.rotateSession(
      validatedData.refreshToken,
      deviceInfo
    );

    const newAccessToken = request.server.jwt.sign({
      id: student.id,
      email: student.email,
      grade: student.grade,
    });

    return reply.status(200).send({
      student,
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });
  }

  static async logout(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = logoutSchema.parse(request.body || {});
    const sessionService = new SessionService(request.server.prisma);

    // Try verifying JWT token if present
    try {
      await request.jwtVerify();
    } catch {
      // Optional: Bearer token might be expired or not passed
    }

    const userPayload = request.user as { id: string } | undefined;

    if (userPayload?.id) {
      await sessionService.invalidateAllStudentSessions(userPayload.id);
    } else if (validatedData.refreshToken) {
      const session = await sessionService.findSessionByRawToken(validatedData.refreshToken);
      if (session) {
        await sessionService.invalidateAllStudentSessions(session.studentId);
      } else {
        await sessionService.invalidateSession(validatedData.refreshToken);
      }
    }

    return reply.status(200).send({ success: true, message: "Logged out successfully" });
  }

  static async getMe(request: FastifyRequest, reply: FastifyReply) {
    const userPayload = request.user as { id: string } | undefined;
    if (!userPayload?.id) {
      return reply.status(401).send({ error: "Unauthorized", message: "User not authenticated" });
    }

    const service = new StudentService(request.server.prisma);
    const student = await service.getById(userPayload.id);

    if (!student) {
      return reply.status(404).send({ error: "Not Found", message: "Student not found" });
    }

    return reply.send({ student });
  }

  static async updateOnboarding(request: FastifyRequest, reply: FastifyReply) {
    const userPayload = request.user as { id: string } | undefined;
    if (!userPayload?.id) {
      return reply.status(401).send({ error: "Unauthorized", message: "User not authenticated" });
    }

    const validatedData = updateOnboardingSchema.parse(request.body);
    const service = new StudentService(request.server.prisma);
    const student = await service.updateOnboarding(userPayload.id, validatedData);

    return reply.send({
      message: "Profil awal berhasil disimpan!",
      student,
    });
  }
}
