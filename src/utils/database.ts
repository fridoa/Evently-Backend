import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    return Promise.resolve("Database connected successfully");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connect;
