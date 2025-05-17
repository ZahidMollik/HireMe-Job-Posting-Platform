import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { initiatePayment } from "../services/payment.service";
import { StatusCodes } from "http-status-codes";
import Application from "../models/application.model";
import Invoice from "../models/invoice.model";
import Job from "../models/job.model";

export const applyJob=async(req:AuthRequest,res:Response)=>{
  try {
    const userId = req.user!.userId;
    const email = req.user!.email;
    const jobId = req.params.jobId;
    const existingAppliction= await Application.findOne({jobId,applicantId:userId});
    if(existingAppliction){
       res.status(StatusCodes.CONFLICT)
          .json({
            success:false,
            message: "you already applied for this job" 
          });
      return;
    }
    if (!req.file) {
       res.status(StatusCodes.BAD_REQUEST)
          .json({
            success:false,
            message: "CV file is required" 
          });
      return;
    }
    const filePath = req.file.path;
    const url=await initiatePayment({userId,email,jobId,filePath});
    
    res.status(StatusCodes.OK)
       .json({
          success:true,
          url:url
        })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Payment initiation failed",
      error: (error as Error).message
    });
  }
}

export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const {total_amount, value_a, value_b, value_c } = req.body;
    const application = await Application.create({
      jobId: value_b,
      applicantId: value_a,
      cvPath: value_c,
      status: "pending",
      paymentStatus: "success",
    });

    const invoice = await Invoice.create({
      applicationId: application._id,
      applicantId: value_a,
      amount: total_amount,
      paymentTime: new Date(),
    });
    
     res.status(StatusCodes.OK).json({
      success: true,
      message: "Application successful",
      data: { application, invoice }
    }); 
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Payment success handler failed",
      error: (error as Error).message,
    });
  }
};


export const paymentFail=async(req:Request,res:Response)=>{
    res.status(StatusCodes.PAYMENT_REQUIRED)
       .json({
        success:false,
        message:"Apply Fail",
        data:[]
       })
}

export const getAllJob=async (req:Request,res:Response)=>{
  try {
    const jobs=await Job.find();
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

export const getAllApplication=async (req:AuthRequest,res:Response)=>{
  try {
    const userId=req.user?.userId;
    const applications=await Application.find({applicantId:userId});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully get all Application by user",
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
