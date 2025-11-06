import { z } from 'zod';

const passwordRecoverySchema = z.object({
  email: z.string().min(1, 'Please enter your email').email('Invalid email address'),
});

const OTPRecoverySchema = z.object({
  otp: z.string().length(4, 'OTP must be 4 digits'),
});
const resetPasswordSchema = z
  .object({
    old_password: z.string().trim().min(8, 'Password must be at least 8 characters'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password !== data.old_password, {
    path: ['password'],
    message: 'New password must be different from the old password',
  });

export type FormPasswordRecoverySchema = z.infer<typeof passwordRecoverySchema>;
export type FormOTPRecoverySchema = z.infer<typeof OTPRecoverySchema>;
export type FormResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export { passwordRecoverySchema, OTPRecoverySchema, resetPasswordSchema };
