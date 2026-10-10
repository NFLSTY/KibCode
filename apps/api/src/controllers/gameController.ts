import type { FastifyReply, FastifyRequest } from "fastify";
import { GameService } from "../services/gameService.js";
import { createGameSchema } from "@edukids/utils";
import type { GameCategory } from "@edukids/types";

export class GameController {
  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    const { category } = request.query as { category?: GameCategory };
    const service = new GameService(request.server.prisma);
    const games = await service.getAll(category);
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
}
