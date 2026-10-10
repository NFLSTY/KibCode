import { z } from "zod";

export const registerStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  grade: z.number().int().min(1, "Grade must be between 1 and 6").max(6, "Grade must be between 1 and 6"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginStudentSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const createGameSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  category: z.enum(["math", "spelling", "reading"]),
  difficulty: z.number().int().min(1).max(5),
  description: z.string().min(5, "Description is too short"),
});

export const saveProgressSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  gameId: z.string().min(1, "Game ID is required"),
  score: z.number().int().min(0, "Score cannot be negative"),
  duration: z.number().int().min(0, "Duration cannot be negative"),
  completed: z.boolean(),
});
