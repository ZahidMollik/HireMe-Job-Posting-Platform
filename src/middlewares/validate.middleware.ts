import {Request,Response,NextFunction,RequestHandler} from "express";
import { StatusCodes } from "http-status-codes";
import {ZodSchema} from "zod";

export const validate=(schema:ZodSchema):RequestHandler =>{
  return (req:Request,res:Response,next:NextFunction):void=>{
  const result=schema.safeParse(req.body);
  if(!result.success){
    const errorMessage = result.error.errors.map((err) => ({
        message: err.message,
        field: err.path.join("."),
    }));
    res.status(StatusCodes.BAD_REQUEST)
       .json({
          success:false,
          message:"validation failed",
          error:errorMessage
        })
    return;
  }
  req.body = result.data;
  next();
}
}
