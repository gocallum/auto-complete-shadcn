// src/schemas/cvSchema.ts
import { z } from 'zod';

export const cvSchema = z.object({
  name: z.string().min(1, 'CV name is required'),
  role: z.string().min(1, 'Role is required'),
  company: z.object({
    id: z.string(),
    name: z.string(),
  }).optional(),
});

export type CVSchemaType = z.infer<typeof cvSchema>;
