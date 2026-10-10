import type { FastifyPluginAsync } from "fastify";
import { GameController } from "../controllers/gameController.js";

export const gameRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", GameController.getAll);
  fastify.get("/:id", GameController.getById);
  fastify.post("/", GameController.create);
};
