import type { FastifyReply, FastifyRequest } from "fastify";
import { GameService } from "../services/gameService.js";
import {
  createGameSchema,
  generateGameSchema,
  askHintSchema,
  reviewGameSchema,
} from "@kibcode/utils";
import type { GameCategory } from "@kibcode/types";

export class GameController {
  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    const { category, studentId } = request.query as { category?: GameCategory; studentId?: string };
    const service = new GameService(request.server.prisma);
    const games = await service.getAll(category, studentId);
    return reply.send({ games });
  }

  static async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const service = new GameService(request.server.prisma);
    const game = await service.getById(id);

    if (!game) {
      return reply.status(404).send({ error: "Not Found", message: "Game not found" });
    }

    return reply.send({ game });
  }

  static async create(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = createGameSchema.parse(request.body);
    const service = new GameService(request.server.prisma);
    const game = await service.create(validatedData);
    return reply.status(201).send({ game });
  }

  static async generate(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = generateGameSchema.parse(request.body);
    const service = new GameService(request.server.prisma);
    const game = await service.generateAIGame(validatedData);
    return reply.status(201).send({ game });
  }

  static async getHint(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = askHintSchema.parse(request.body);
    const service = new GameService(request.server.prisma);
    const result = await service.getHint(validatedData);
    return reply.send(result);
  }

  static async getReview(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = reviewGameSchema.parse(request.body);
    const service = new GameService(request.server.prisma);
    const result = await service.getReview(validatedData);
    return reply.send(result);
  }
}
