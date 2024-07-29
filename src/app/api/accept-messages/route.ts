import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/db/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { request } from "http";

export async function POST(request: Request) {
    await dbConnect () 

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'Not Authenticated',
          }, { status: 401 });
    }

    const userId = user._id
    const {accesptMessages} = await request.json()

    try {
       const updatedUser =  await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: accesptMessages},
            {new: true}
        )
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: 'failed to update user status to accept messages',
              }, { status: 401 });
        }
        return Response.json({
            success: true,
            message: 'Message acceptance status updated successfully',
          }, { status: 200 });
    } catch (error) {
        console.error("failed to update user status to accept messages")
        return Response.json({
            success: false,
            message: 'failed to update user status to accept messages',
          }, { status: 500 });
    }
}

export async function GET(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'Not Authenticated',
          }, { status: 401 });
    }
  try {
      const userId = user._id;
      const foundUser = await UserModel.findById(userId)
       if(!foundUser) {
          return Response.json({
              success: false,
              message: 'Failed to found the User',
            }, { status: 404 });
       }
  
       if(foundUser) {
          return Response.json({
              success: true,
              isAcceptinMessages: foundUser.isAcceptingMessage,
            }, { status: 200 });
       }
  } catch (error) {
    console.error("Error is getting message accepting")
    return Response.json({
        success: false,
        message: 'Error is getting message accepting',
      }, { status: 500 });
}
}