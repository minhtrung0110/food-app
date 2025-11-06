import { z } from 'zod';

const signUpSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().min(1, 'Please enter your email').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type FormSignUpData = z.infer<typeof signUpSchema>;
export { signUpSchema };
