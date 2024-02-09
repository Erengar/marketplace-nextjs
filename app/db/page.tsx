import mongoose from "mongoose";
import { userSchema } from "../../mongoDB/schema";


export default async function TestPage() {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        return <div>MongoDB connection working</div>;
    } catch (error) {
        return <div>MongoDB connection failed</div>;
    }

}
