import {Request,Response} from "express";
import Job from "../models/job.model";
import { StatusCodes } from "http-status-codes";
import {AuthRequest,jwtPayload} from "../middlewares/auth.middleware"
import Application from "../models/application.model";

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

export const getAllApplicationByEmployee=async (req:AuthRequest,res:Response)=>{
  try {
    const employeeId=req.user?.userId;
    console.log(employeeId);
    
    const jobs = await Job.find({ createdBy: employeeId }).select("_id");
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } }).populate("jobId");
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully get all Application by employee",
          data:applications
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while geting all applications",
          data:{},
          error:error
        });   
  }
}

export const updateApplicationStatusById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { userId } = req.user as jwtPayload;
    const application = await Application.findById(id);
    if (!application) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Application not found",
      });
      return;
    }
    const job = await Job.findById(application.jobId);
    if (String(job?.createdBy) !== userId) {
      res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "You are not authorized to update this application",
      });
      return;
    }
    application.status = status;
    await application.save();

    res.status(StatusCodes.OK)
       .json({
          success: true,
          message: "Application status updated successfully",
          data: application,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({
          success: false,
          message: "Something went wrong while updating the application status",
          error: (error as Error).message,
    });
  }
};