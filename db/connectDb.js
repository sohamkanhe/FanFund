import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return; // Use existing connection
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;