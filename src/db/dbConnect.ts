import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect (): Promise<void> {
    if (connection.isConnected) {

        console.log("Already connected to database");
        return
        
    }

    try {
       const db = await mongoose.connect(process.env.DEVTALK_DB_URL || '', {});
     connection.isConnected =  db.connections[0].readyState

     console.log("DB connected Successfully");
    } catch (error) {
        console.log("DataBase connection failed", error)
        process.exit(1)
    }
}

export default dbConnect;