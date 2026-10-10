import type { ZodSchema } from "zod";

export function validateSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
