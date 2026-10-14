import type { PrismaClient } from "@kibcode/database";
import type { RegisterStudentDTO, LoginStudentDTO, StudentDTO, UpdateOnboardingDTO } from "@kibcode/types";
import bcrypt from "bcryptjs";

export class StudentService {
  constructor(private prisma: PrismaClient) {}

  private toDTO(student: {
    id: string;
    name: string;
    email: string;
    grade: number;
    schoolName: string | null;
    hasCodingExp: boolean;
    codingExpLevel: string | null;
    favoriteInterest: string | null;
    learningGoal: string | null;
    isOnboarded: boolean;
    createdAt: Date;
  }): StudentDTO {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      grade: student.grade,
      schoolName: student.schoolName,
      hasCodingExp: student.hasCodingExp,
      codingExpLevel: student.codingExpLevel,
      favoriteInterest: student.favoriteInterest,
      learningGoal: student.learningGoal,
      isOnboarded: student.isOnboarded,
      createdAt: student.createdAt.toISOString(),
    };
  }

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
        isOnboarded: false,
      },
    });

    return this.toDTO(student);
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

    return this.toDTO(student);
  }

  async getById(id: string): Promise<StudentDTO | null> {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) return null;

    return this.toDTO(student);
  }

  async updateOnboarding(id: string, data: UpdateOnboardingDTO): Promise<StudentDTO> {
    const existing = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!existing) {
      const error = new Error("Student not found");
      (error as unknown as { statusCode: number }).statusCode = 404;
      throw error;
    }

    const updated = await this.prisma.student.update({
      where: { id },
      data: {
        ...(data.name ? { name: data.name } : {}),
        grade: data.grade,
        schoolName: data.schoolName,
        hasCodingExp: data.hasCodingExp,
        codingExpLevel: data.codingExpLevel ?? null,
        favoriteInterest: data.favoriteInterest ?? null,
        learningGoal: data.learningGoal ?? null,
        isOnboarded: true,
      },
    });

    return this.toDTO(updated);
  }
}
