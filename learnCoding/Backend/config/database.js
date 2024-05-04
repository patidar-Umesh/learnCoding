import mongoose from "mongoose";
import { config } from "dotenv";

config();


const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connect DB Successfully"))
    .catch((error) => console.log("Connection Error from DB", error.message));
};

export default connectDB;
