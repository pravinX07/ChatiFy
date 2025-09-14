import { error } from "console";
import mongoose from "mongoose"

 const connectDB = async() => {
    try {
        console.log("database url: ", process.env.MONGO_URL);
        const {MONGO_URL} = process.env;
        if(!MONGO_URL) throw new Error("MongoURL not getting")

        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully...");
        
        
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1)
        
    }
}

export default connectDB