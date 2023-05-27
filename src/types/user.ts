import { z } from 'zod';

const UserSchema = z.object({
  email: z.string(),
  googleGroups: z.array(z.string()).optional(),
  isAdmin: z.boolean(),
  name: z.string(),
  token: z.string().optional(),
});
export type User = z.infer<typeof UserSchema>;
