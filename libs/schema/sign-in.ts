import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự'),
});
export type FormSignInData = z.infer<typeof signInSchema>;
export { signInSchema };
