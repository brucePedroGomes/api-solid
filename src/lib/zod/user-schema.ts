import { z } from 'zod'

export const userSchema = z.object({
   name: z.string(),
   email: z.string(),
   password: z.string().min(6),
})

export type userSchemaType = z.infer<typeof userSchema>
 