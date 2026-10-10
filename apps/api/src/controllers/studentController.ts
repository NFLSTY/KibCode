import type { FastifyReply, FastifyRequest } from "fastify";
import { StudentService } from "../services/studentService.js";
import { registerStudentSchema, loginStudentSchema } from "@edukids/utils";

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

    return reply.status(200).send({
      student,
      token,
    });
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
}
