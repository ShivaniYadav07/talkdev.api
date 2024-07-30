import {z, object } from 'zod';

export const verifySchema = object({
    code: z.string().length(6, { message: 'Verification code must be 6 digits' })
});