import { z } from 'zod'

export const newUserSchema = z.object({
  userID: z.string(),
  email: z.string().email({ message: 'Please provide a valid email, ex: example@yourcompany.com' }),
  displayName: z.string().min(1, { message: 'Please provide a display name' })
})
