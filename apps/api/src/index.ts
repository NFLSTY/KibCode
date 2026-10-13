import { buildServer } from "./server.js";

async function main() {
  const server = await buildServer();
  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST || "0.0.0.0";

  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  for (const signal of signals) {
    process.on(signal, async () => {
      server.log.info(`Received ${signal}, closing server gracefully...`);
      await server.close();
      process.exit(0);
    });
  }

  try {
    const address = await server.listen({ port, host });
    server.log.info(`KibCode API server listening at ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
