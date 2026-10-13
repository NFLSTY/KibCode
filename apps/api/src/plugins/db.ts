import fp from "fastify-plugin";
import { prisma } from "@kibcode/database";
import type { FastifyPluginAsync } from "fastify";

const dbPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
};

export default fp(dbPlugin, {
  name: "db",
});
