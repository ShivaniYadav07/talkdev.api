import {z} from "zod";

export const messageSchema = z.object({
    content: z.string()
    .min(10, {message: 'Content must be at least of 10 characters'})
    .max(200, {message: 'Content must not exceed 200 characters'})
})