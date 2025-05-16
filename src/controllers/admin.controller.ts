import {Request,Response} from "express";
import Company from "../models/company.model";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";
import Job from "../models/job.model";

export const createCompany=async (req:Request,res:Response)=>{
  try {
    const {name,location}=req.body;
    const existingCompany= await Company.findOne({name});
    if(existingCompany){
      res.status(StatusCodes.CONFLICT)
         .json({ success:false,message: "This company already exists" });
      return;
    }
    const company=await Company.create({name,location});
    res.status(StatusCodes.CREATED)
       .json({
          success:true,
          message:"company add successfully",
          data:company
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while adding company",
          data:{},
          error:error
        });   
  }
}

export const getAllCompanies=async (req:Request,res:Response)=>{
  try {
    const companies=await Company.find();
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully get all companies",
          data:companies
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while geting all companies",
          data:{},
          error:error
        });   
  }
}

export const getCompanyById=async (req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const company=await Company.find({_id:id});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully get a company by id",
          data:company
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while geting company by id",
          data:{},
          error:error
        });   
  }
}

export const updateCompanyById=async (req:Request,res:Response)=>{
  
  try {
    const {id}=req.params;
    const {name,location}=req.body;
    const company=await Company.findByIdAndUpdate(id,{name,location},{new:true});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully update company details",
          data:company
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while updating company details by id",
          data:{},
          error:error
        });   
  }
}

export const deleteCompanyById=async (req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const company=await Company.deleteOne({_id:id});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully delete the company",
          data:company
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while deleting the company",
          data:{},
          error:error
        });   
  }
}

export const getAllUsers=async (req:Request,res:Response)=>{
  try {
    const users=await User.find();
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully get all users info",
          data:users
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while geting all users info",
          data:{},
          error:error
        });   
  }
}

export const updateUserInfo=async (req:Request,res:Response)=>{
  
  try {
    const {id}=req.params;
    const {name,email,password,role,companyId}=req.body;
    const user=await User.findByIdAndUpdate(id,{name,email,password,role,companyId},{new:true});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully update user details",
          data:user
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while updating user details by id",
          data:{},
          error:error
        });   
  }
}

export const deleteUser=async (req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const user=await User.deleteOne({_id:id});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully delete the user",
          data:user
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while deleting the user",
          data:{},
          error:error
        });   
  }
}

export const getAllJob=async (req:Request,res:Response)=>{
  try {
    const filter: Record<string, any> = {};
    const query=req.query;
    if(query.company){
      const companyId=await Company.find({name:query.company},{_id:1});
      filter.companyId=companyId;
    }  
    const jobs=await Job.find(filter);
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
          message:"something went wrong while geting all jobs by admin",
          data:{},
          error:error
        });   
  }
}


export const updateJobById=async (req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const {title,description,location,salary,lastDateOfApply}=req.body;
    const job=await Job.findOneAndUpdate({_id:id},{title,description,location,salary,lastDateOfApply},{new:true});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully update the job details by admin",
          data:job
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while admin updating the job details by id",
          data:{},
          error:error
        });   
  }
}

export const deleteJob=async (req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const job=await Job.deleteOne({_id:id});
    res.status(StatusCodes.OK)
       .json({
          success:true,
          message:"successfully delete the job by admin",
          data:job
        });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success:false,
          message:"something went wrong while admin deleting the job",
          data:{},
          error:error
        });   
  }
}
