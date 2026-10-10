import fp from "fastify-plugin";
import cors from "@fastify/cors";
import type { FastifyPluginAsync } from "fastify";

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  const origin = process.env.CORS_ORIGIN || "*";

  await fastify.register(cors, {
    origin: (requestOrigin, cb) => {
      if (origin === "*" || !requestOrigin) {
        cb(null, true);
        return;
      }
      const allowedOrigins = origin.split(",").map((o) => o.trim());
      if (allowedOrigins.includes(requestOrigin) || allowedOrigins.includes("*")) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });
};

export default fp(corsPlugin, {
  name: "cors",
});
