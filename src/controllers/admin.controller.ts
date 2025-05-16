import {Request,Response} from "express";
import Company from "../models/company.model";
import { StatusCodes } from "http-status-codes";

export const createCompany=async (req:Request,res:Response)=>{
  try {
    const {name,location}=req.body;
    const existingCompany= await Company.findOne({name});
    if(existingCompany){
      res.status(StatusCodes.BAD_REQUEST)
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

