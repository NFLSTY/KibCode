import type { PrismaClient } from "@kibcode/database";
import type { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    student?: {
      id: string;
      email: string;
      grade: number;
    };
  }
}
