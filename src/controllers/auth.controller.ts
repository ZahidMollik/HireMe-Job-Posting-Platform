import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const register=async (req:Request,res:Response): Promise<void>=>{
  const {name,email,password,role,companyId,adminSecret}=req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(StatusCodes.CONFLICT)
         .json({ success:false,message: "User already exists" });
      return;
    }
    if (role === "admin") {
      if (adminSecret!== process.env.ADMIN_SECRET) {
        res.status(StatusCodes.FORBIDDEN)
           .json({
             success:false,
             message: "Invalid admin secret"
            });
        return;
      }
    }
    const salt= await bcryptjs.genSalt(10);
    const hashPassword=await bcryptjs.hash(password,salt);
    const CompanyId=role === 'employee' ? companyId : null;
    const user= await User.create({name,email,password:hashPassword,role,companyId:CompanyId});
    res.status(StatusCodes.CREATED)
              .json({
                success:true,
                message:"User register successfully",
                data:user
              });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({
                success:false,
                message:"something went wrong while registering user",
                data:{},
                error:error
              });
  }
}

export const login=async(req:Request,res:Response)=>{
  try {
    const {email,password}=req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST)
         .json({ success:false,message: "Invalid email or password" });
      return;
    }
    const valid=await bcryptjs.compare(password,user.password!);
    if(!valid){
      res.status(StatusCodes.BAD_REQUEST)
         .json({ success:false,message: "Invalid email or password" });
      return;
    }
    const payload={
      userId:user._id,
      email:user.email,
      role:user.role,
      companyId:user.companyId
    }
    const JWT_SECRET=process.env.JWT_SECRET!;
    const token= jwt.sign(payload,JWT_SECRET,{expiresIn:'7d'});
    res.status(StatusCodes.OK)
              .json({
                success:true,
                message:"User login successfully",
                data:token
              });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({
                success:false,
                message:"something went wrong while logining user",
                data:{},
                error:error
              });
  }
}