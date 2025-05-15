import mongoose from "mongoose";

export const connect=async(url:string)=>{
  try {
    await mongoose.connect(url);
    console.log('Database connected successfully');
  } catch (error) {
    console.log("Database connection error",error);
  }
}

