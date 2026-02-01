import mongoose from "mongoose";

const connectDB = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const raw = process.env.MONGODB_URI;
  if (!raw || typeof raw !== "string") {
    throw new Error(
      "MONGODB_URI is not set in environment variables (check .env or env file)"
    );
  }
  const uri = raw.trim();

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully");
    return mongoose;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};

export default connectDB;
