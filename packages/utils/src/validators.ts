import { z } from "zod";

export const registerStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  grade: z.number().int().min(1, "Grade must be between 1 and 6").max(6, "Grade must be between 1 and 6"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateOnboardingSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(60).optional(),
  grade: z.number().int().min(1, "Kelas harus antara 1 dan 6").max(6, "Kelas harus antara 1 dan 6"),
  schoolName: z.string().min(2, "Nama sekolah minimal 2 karakter").max(100, "Nama sekolah maksimal 100 karakter"),
  hasCodingExp: z.boolean(),
  codingExpLevel: z.string().nullable().optional(),
  favoriteInterest: z.string().nullable().optional(),
  learningGoal: z.string().nullable().optional(),
});

export const loginStudentSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const logoutSchema = z.object({
  refreshToken: z.string().optional(),
  allDevices: z.boolean().optional(),
});

export const createGameSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  category: z.enum([
    "logic",
    "loops",
    "conditionals",
    "debugging",
    "algorithms",
    "general",
    "math",
    "spelling",
    "reading",
  ]),
  difficulty: z.number().int().min(1).max(5),
  description: z.string().min(5, "Description is too short"),
  questions: z.array(z.any()).optional(),
});

export const generateGameSchema = z.object({
  topic: z.string().min(2, "Topik minimal 2 karakter"),
  category: z
    .enum(["logic", "loops", "conditionals", "debugging", "algorithms", "general"])
    .optional(),
  grade: z.number().int().min(1).max(6).optional(),
  difficulty: z.number().int().min(1).max(3).optional(),
});

export const askHintSchema = z.object({
  question: z.string().min(3),
  storyPrompt: z.string().optional(),
  codeSnippet: z.string().optional(),
  grade: z.number().int().min(1).max(6).optional(),
});

export const reviewGameSchema = z.object({
  gameTitle: z.string().min(2),
  score: z.number().int().min(0),
  correctAnswers: z.number().int().min(0),
  totalQuestions: z.number().int().min(1),
  durationSeconds: z.number().int().min(0),
  grade: z.number().int().min(1).max(6).optional(),
});

export const saveProgressSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  gameId: z.string().min(1, "Game ID is required"),
  score: z.number().int().min(0, "Score cannot be negative"),
  duration: z.number().int().min(0, "Duration cannot be negative"),
  completed: z.boolean(),
});
