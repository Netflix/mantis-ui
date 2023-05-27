import { z } from 'zod';

const UserInfoSchema = z.object({
  email: z.string(),
  familyName: z.string(),
  fullName: z.string(),
  givenName: z.string(),
  googleGroups: z.array(z.string()).optional(),
  preferred_username: z.string(),
  sub: z.string(),
  userId: z.string(),
});
export type UserInfo = z.infer<typeof UserInfoSchema>;

const MeechumUserInfoSchema = z.object({
  access_token: z.string(),
  access_token_expires: z.string(),
  refresh_token: z.string(),
  userinfo: UserInfoSchema,
});
export type MeechumUserInfo = z.infer<typeof MeechumUserInfoSchema>;
