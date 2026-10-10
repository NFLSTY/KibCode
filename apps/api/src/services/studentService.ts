import type { PrismaClient } from "@edukids/database";
import type { RegisterStudentDTO, LoginStudentDTO, StudentDTO } from "@edukids/types";
import bcrypt from "bcryptjs";

export class StudentService {
  constructor(private prisma: PrismaClient) {}

  async register(data: RegisterStudentDTO): Promise<StudentDTO> {
    const existing = await this.prisma.student.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      const error = new Error("Email already registered");
      (error as unknown as { statusCode: number }).statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const student = await this.prisma.student.create({
      data: {
        name: data.name,
        email: data.email,
        grade: data.grade,
        password: hashedPassword,
      },
    });

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      grade: student.grade,
      createdAt: student.createdAt.toISOString(),
    };
  }

  async login(data: LoginStudentDTO): Promise<StudentDTO> {
    const student = await this.prisma.student.findUnique({
      where: { email: data.email },
    });

    if (!student) {
      const error = new Error("Invalid email or password");
      (error as unknown as { statusCode: number }).statusCode = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(data.password, student.password);
    if (!isValid) {
      const error = new Error("Invalid email or password");
      (error as unknown as { statusCode: number }).statusCode = 401;
      throw error;
    }

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      grade: student.grade,
      createdAt: student.createdAt.toISOString(),
    };
  }

  async getById(id: string): Promise<StudentDTO | null> {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) return null;

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      grade: student.grade,
      createdAt: student.createdAt.toISOString(),
    };
  }
}
