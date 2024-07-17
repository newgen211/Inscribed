import { z } from 'zod';

export const UpdatePasswordSchema = z.object({

    current_password: z.string().trim()
        .min(1, { message: 'Current Password is required' })
        .max(64, { message: 'Password cannot exceed 64 characters' }),

    new_password: z.string().trim()
        .min(8, { message: 'Password must be at least charracters long' })
        .max(64, { message: 'Password cannot exceed 64 characters in length' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),

    confirm_password: z.string().trim()
        .min(8, { message: 'Confirm password must be at least 8 characters long' })
        .max(64, { message: 'Confirm password cannot exceed 64 characters in length' }),

}).strict().refine( data => data.new_password === data.confirm_password, { message: 'Passwords do not match' } );

export type UpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>;