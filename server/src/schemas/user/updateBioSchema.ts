import { z } from 'zod';

export const UpdateBioSchema = z.object({

    bio: z.string().trim()
        .max(255, { message: 'Bio cannot exceed 255 characters in length' })

});

export type UpdateBioSchema = z.infer<typeof UpdateBioSchema>;