import z from 'zod'

const envSchema = z.object({
  VITE_DATABASE_URL: z
    .string()
    .default('http://localhost:3333'),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

export const ENV = envSchema.parse(import.meta.env)