import { resend } from "@/db/resend";

// import { VerificationEmails } from "../../emails/VerificationEmails";

import { ApiResponse } from "@/types/ApiResponse";
const generateEmailText = (username: string, otp: string) => `
Hello, ${username}!

Thank you for registering. Please use the following verification code to complete your registration:

${otp}

If you did not request this code, please ignore this email.

Best regards,
TalkDev
`;
export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse>{
try {
    const emailText = generateEmailText(username, verifyCode);
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'TalkDev Verification Code',
        text:emailText,
      });
    return {sucess: true, message: 'verification email send succesfully'}
} catch (emailError) {
    console.log("Error sending verification email", emailError)
    return {sucess: false, message: 'Failed to send verification email'}
}
}