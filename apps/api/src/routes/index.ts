import type { FastifyPluginAsync } from "fastify";
import { healthRoutes } from "./health.js";
import { authRoutes } from "./auth.js";
import { studentRoutes } from "./students.js";

export const registerRoutes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(healthRoutes);
  await fastify.register(authRoutes, { prefix: "/auth" });
  await fastify.register(studentRoutes, { prefix: "/students" });
};
