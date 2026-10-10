import type { FastifyPluginAsync } from "fastify";
import { StudentController } from "../controllers/studentController.js";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/register", StudentController.register);
  fastify.post("/login", StudentController.login);
};
