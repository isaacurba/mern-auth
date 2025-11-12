import mongoose from "mongoose";

const connectedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_URI).then(() => {
            console.log("MongoDB connected");
        }); 
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export default connectedDB;