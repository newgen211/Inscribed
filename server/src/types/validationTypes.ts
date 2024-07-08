import { date, z } from 'zod';

export const RegisterUserFields = z
  .object({
    first_name: z
      .string() // Type sting
      .trim() // Remove leading and trailing white space
      .min(1, { message: 'First name required' })
      .max(50, { message: 'First name cannot exceed 50 characters in length' })
      .regex(/^[a-zA-Z\s'-]+$/, {
        message:
          'First name can only contain letters, spaces, hypens, and apostrophes',
      })
      .transform((name) => name.replace(/\s+/g, ' ')) // Remove excess white space in the middle
      .transform((name) => name.charAt(0).toUpperCase() + name.slice(1)) // Capitilize the user's first letter of their name
      .refine((name) => name.trim().length > 0, {
        message: 'First name cannot be just whitespace',
      }),

    last_name: z
      .string() // Type sting
      .trim() // Remove leading and trailing white space
      .min(1, { message: 'Last name required' })
      .max(50, { message: 'Last name cannot exceed 50 characters in length' })
      .regex(/^[a-zA-Z\s'-]+$/, {
        message:
          'Last name can only contain letters, spaces, hypens, and apostrophes',
      })
      .transform((name) => name.replace(/\s+/g, ' ')) // Remove excess white space in the middle
      .transform((name) => name.charAt(0).toUpperCase() + name.slice(1)) // Capitilize the user's first letter of their name
      .refine((name) => name.trim().length > 0, {
        message: 'Last name cannot be just whitespace',
      }),

    username: z
      .string()
      .trim()
      .min(1, { message: 'Username required' })
      .max(50, { message: 'Username cannot exceed 50 characters in length' })
      .regex(/^[a-zA-Z][a-zA-Z0-9-_]{0,49}$/, {
        message:
          'Username must start with a letter and can only contain letters, numbers, hypens, and underscores',
      })
      .refine((name) => name.trim().length > 0, {
        message: 'Username cannot be just whitespace',
      }),

    email: z
      .string()
      .trim()
      .min(1, { message: 'Email required' })
      .max(255, { message: 'Email cannot exceed 50 characters in length' })
      .email({ message: 'Invalid email format' }),

    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must be at least charracters long' })
      .max(64, { message: 'Password cannot exceed 64 characters in length' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{8,}$/,
        {
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        }
      ),

    confirm_password: z
      .string()
      .trim()
      .min(8, { message: 'Confirm password must be at least charracters long' })
      .max(64, {
        message: 'Confirm password cannot exceed 64 characters in length',
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
  });

export type RegisterUserFields = z.infer<typeof RegisterUserFields>;
