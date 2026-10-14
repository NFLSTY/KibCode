import { describe, it, expect, vi } from "vitest";
import { StudentService } from "../src/services/studentService.js";
import type { PrismaClient } from "@kibcode/database";

describe("StudentService", () => {
  it("registers student with default isOnboarded: false", async () => {
    let capturedCreateData: any = null;

    const mockPrisma = {
      student: {
        findUnique: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockImplementation(async ({ data }) => {
          capturedCreateData = data;
          return {
            id: "student-new",
            name: data.name,
            email: data.email,
            grade: data.grade,
            password: data.password,
            schoolName: null,
            hasCodingExp: false,
            codingExpLevel: null,
            favoriteInterest: null,
            learningGoal: null,
            isOnboarded: data.isOnboarded,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }),
      },
    } as unknown as PrismaClient;

    const service = new StudentService(mockPrisma);
    const result = await service.register({
      name: "Budi",
      email: "budi@gmail.com",
      grade: 1,
      password: "password123",
    });

    expect(capturedCreateData.isOnboarded).toBe(false);
    expect(capturedCreateData.name).toBe("Budi");
    expect(result.isOnboarded).toBe(false);
    expect(result.id).toBe("student-new");
  });
});
