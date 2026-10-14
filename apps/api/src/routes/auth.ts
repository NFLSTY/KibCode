import type { FastifyPluginAsync } from "fastify";
import { StudentController } from "../controllers/studentController.js";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/register", StudentController.register);
  fastify.post("/login", StudentController.login);
  fastify.post("/refresh", StudentController.refresh);
  fastify.post("/logout", StudentController.logout);
};
