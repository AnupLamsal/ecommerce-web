import mongoose from "mongoose";
import config from "config";

const connectDB = async () => {
    try {
        await mongoose.connect(config.get("MONGO_URI"));

        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(`Error: ${err.message}`.red.underline.bold);
        process.exit(1);
    }
};

export default connectDB;
