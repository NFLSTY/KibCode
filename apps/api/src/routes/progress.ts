import type { FastifyPluginAsync } from "fastify";
import { ProgressController } from "../controllers/progressController.js";

export const progressRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/", ProgressController.save);
  fastify.get("/student/:studentId", ProgressController.getByStudent);
  fastify.get("/student/:studentId/summary", ProgressController.getSummary);
};
