import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import type { FastifyPluginAsync } from "fastify";

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  const secret = process.env.JWT_SECRET || "default_development_secret_min_32_characters_long_12345";

  await fastify.register(jwt, {
    secret,
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      reply.status(401).send({ error: "Unauthorized", message: "Invalid or expired token" });
    }
  });
};

export default fp(jwtPlugin, {
  name: "jwt",
});
