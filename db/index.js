import mongoose from "mongoose";
import { MONGODB_CONNECTION_STRING } from "../config/index.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log(`Database is connected to host: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.log(`Error ${error}`);
        return error;
    }
};
