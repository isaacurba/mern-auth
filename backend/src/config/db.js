import mongoose from "mongoose";

const connectedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_URI).then(() => {
            console.log("MongoDB connected");
        }); 
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // process code 1 means failure while 0 means success
    }
}

export default connectedDB;