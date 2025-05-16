import {Request,Response} from "express";
import Job from "../models/job.model";
import { StatusCodes } from "http-status-codes";
import {AuthRequest,jwtPayload} from "../middlewares/auth.middleware"

export const createJob=async (req:AuthRequest,res:Response)=>{
  try {
    const {title,description,location,salary,lastDateOfApply}=req.body;
    const {userId,companyId}=req.user as jwtPayload;
    
    const job=await Job.create({title,description,location,salary,lastDateOfApply,createdBy:userId,companyId:companyId});
    res.status(StatusCodes.CREATED)
       .json({
          success:true,
          message:"job posted successfully",
          data:job
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while posting the job",
          data:{},
          error:error
        });   
  }
}

export const getAllJob=async (req:AuthRequest,res:Response)=>{
  try {
    const {userId}=req.user as jwtPayload;
    const jobs=await Job.find({createdBy:userId});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully get all jobs",
          data:jobs
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while geting all jobs",
          data:{},
          error:error
        });   
  }
}

export const getJobById=async (req:AuthRequest,res:Response)=>{
  try {
    const {id}=req.params;
    const {userId}=req.user as jwtPayload;
    const job=await Job.findOne({_id:id,createdBy:userId});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully get the job",
          data:job
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while geting the job",
          data:{},
          error:error
        });   
  }
}

export const updateJobById=async (req:AuthRequest,res:Response)=>{
  try {
    const {id}=req.params;
    const {userId}=req.user as jwtPayload;
    const {title,description,location,salary,lastDateOfApply}=req.body;
    const job=await Job.findOneAndUpdate({_id:id,createdBy:userId},{title,description,location,salary,lastDateOfApply},{new:true});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully update the job details",
          data:job
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while updating the job details by id",
          data:{},
          error:error
        });   
  }
}

export const deleteJob=async (req:AuthRequest,res:Response)=>{
  try {
    const {id}=req.params;
    const {userId}=req.user as jwtPayload;
    const job=await Job.deleteOne({_id:id,createdBy:userId});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully delete the job",
          data:job
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while deleting the job",
          data:{},
          error:error
        });   
  }
}