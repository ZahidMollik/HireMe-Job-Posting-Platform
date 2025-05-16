import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { 
    userId: string;
    email:string;
    role: string;
    companyId:string
   };
}

export interface jwtPayload{
    userId: string;
    email:string;
    role: string;
    companyId:string;
    iat:number;
    exp:number;
}

export const authenticate= async(req:AuthRequest,res:Response,next:NextFunction)=>{
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if(!token){
      res.status(StatusCodes.UNAUTHORIZED)
         .json({
            success:false,
            message:"Token is required"
          })
      return;
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET!) as jwtPayload;
    req.user=decoded;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED)
       .json({ 
        status: false, 
        message: "Invalid or expired token",
        error:error
       });
  }
}

export const authorize=(role:string)=>{
  return (req:AuthRequest,res:Response,next:NextFunction)=>{
    if (!req.user) {
       res.status(StatusCodes.UNAUTHORIZED)
          .json({ 
            status:false,
            message: "No user found"
          });
      return;
    }

    if (req.user.role !== role) {
      res.status(StatusCodes.FORBIDDEN)
         .json({
          status:false,
          message: "Access denied" 
        });
      return;
    }

    next();
  }
}