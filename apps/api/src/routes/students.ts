import type { FastifyPluginAsync } from "fastify";
import { StudentController } from "../controllers/studentController.js";

export const studentRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/me", { preHandler: [fastify.authenticate] }, StudentController.getMe);
  fastify.put("/onboarding", { preHandler: [fastify.authenticate] }, StudentController.updateOnboarding);
  fastify.post("/curriculum/generate", { preHandler: [fastify.authenticate] }, StudentController.generateCurriculum);
  fastify.get("/curriculum/modules", { preHandler: [fastify.authenticate] }, StudentController.getModules);
  fastify.post("/curriculum/advance-module", { preHandler: [fastify.authenticate] }, StudentController.advanceModule);
  fastify.post("/tutor/chat", { preHandler: [fastify.authenticate] }, StudentController.askTutor);
  fastify.delete("/tutor/session", { preHandler: [fastify.authenticate] }, StudentController.clearTutorSession);
};
