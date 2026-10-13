import type { FastifyReply, FastifyRequest } from "fastify";
import { ProgressService } from "../services/progressService.js";
import { saveProgressSchema } from "@kibcode/utils";

export class ProgressController {
  static async save(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = saveProgressSchema.parse(request.body);
    const service = new ProgressService(request.server.prisma);
    const progress = await service.save(validatedData);
    return reply.status(201).send({ progress });
  }

  static async getByStudent(request: FastifyRequest, reply: FastifyReply) {
    const { studentId } = request.params as { studentId: string };
    const service = new ProgressService(request.server.prisma);
    const progress = await service.getByStudent(studentId);
    return reply.send({ progress });
  }

  static async getSummary(request: FastifyRequest, reply: FastifyReply) {
    const { studentId } = request.params as { studentId: string };
    const service = new ProgressService(request.server.prisma);
    const summary = await service.getSummary(studentId);
    return reply.send({ summary });
  }
}
