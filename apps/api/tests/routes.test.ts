import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildServer } from "../src/server.js";
import type { FastifyInstance } from "fastify";

describe("API Route Tests", () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await buildServer();
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it("GET / returns server info", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.name).toBe("EduKids API");
    expect(body.status).toBe("running");
  });

  it("POST /api/auth/register returns 400 when body is invalid", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: {
        email: "not-an-email",
      },
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body.message).toBe("Validation failed");
  });

  it("POST /api/auth/login returns 400 when body is missing password", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        email: "test@example.com",
      },
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body.message).toBe("Validation failed");
  });

  it("GET /api/students/me returns 401 without authentication", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/students/me",
    });

    expect(response.statusCode).toBe(401);
  });
});
