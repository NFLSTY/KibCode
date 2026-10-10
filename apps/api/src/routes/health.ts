import type { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/health", async (_request, reply) => {
    try {
      await fastify.prisma.$queryRaw`SELECT 1`;
      return reply.send({
        status: "ok",
        uptime: process.uptime(),
        database: "connected",
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      fastify.log.error(err, "Database health check failed");
      return reply.status(503).send({
        status: "degraded",
        uptime: process.uptime(),
        database: "disconnected",
        timestamp: new Date().toISOString(),
      });
    }
  });
};
