import  OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from "next/server";


const openai = new OpenAI ({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime ='edge';

export async function POST (req: Request) {
   try {

    const prompt = "Welcome to our conversation! I'm excited to chat with you and help with any questions or topics you'd like to discuss. Whether you're looking for information, advice, or just someone to talk to, I'm here to listen and assist. So go ahead and get started - what's on your mind? ||  I'm a large language model, which means I have access to a vast amount of knowledge and information on a wide range of topics. From science and history to entertainment and culture, I'm here to help you learn and explore new things. So don't be afraid to ask me anything - I'll do my best to provide a helpful and accurate response.|| As we continue our conversation, I want to remind you that I'm constantly learning and improving. Your feedback and input are invaluable in helping me become a better conversational AI. So don't hesitate to let me know if there's anything I can do to improve our conversation or if you have any suggestions for topics you'd like to discuss."

    
     const {messages} = await req.json();
  
 
     const response = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        max_tokens: 400,
        stream: true,
        prompt,
      });
 
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
   } catch (error) {
    if (error instanceof OpenAI.APIError) {
        const {name, status, headers, message} = error
        return NextResponse.json({
            name, status, headers, message
        }, {status}) 
        
    } else {
        console.error("An unexpected error occured", error)
        throw error
    }
   }
}