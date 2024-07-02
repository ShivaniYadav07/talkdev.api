import {z} from "zod";


export const usernameValidation = z
.string()
.min(4, "username must be atleast 4 characters")
.max(12, "username should not exceed 12 characters")
.regex(/[^a-zA-Z0-9_ ]/g, "UserName should not contain special characters")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(6, {message: 'Password must be atleast 6 characters'})
})

