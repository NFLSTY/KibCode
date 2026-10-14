import type { FastifyPluginAsync } from "fastify";
import { StudentController } from "../controllers/studentController.js";

export const studentRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/me", { preHandler: [fastify.authenticate] }, StudentController.getMe);
  fastify.put("/onboarding", { preHandler: [fastify.authenticate] }, StudentController.updateOnboarding);
};
