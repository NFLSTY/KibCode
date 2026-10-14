import "dotenv/config";
import Fastify, { type FastifyInstance } from "fastify";
import dbPlugin from "./plugins/db.js";
import corsPlugin from "./plugins/cors.js";
import jwtPlugin from "./plugins/jwt.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { registerRoutes } from "./routes/index.js";

export async function buildServer(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
    },
  });

  // Global Error Handler
  fastify.setErrorHandler(errorHandler);

  // Plugins
  await fastify.register(corsPlugin);
  await fastify.register(jwtPlugin);
  await fastify.register(dbPlugin);

  // Routes prefixed with /api
  await fastify.register(registerRoutes, { prefix: "/api" });

  // Health and root endpoint
  fastify.get("/", async () => {
    return { name: "KibCode API", version: "1.0.0", status: "running" };
  });

  return fastify;
}
