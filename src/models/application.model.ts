import {Schema,model} from "mongoose";

const applicationSchema=new Schema({
  jobId:{
    type:Schema.Types.ObjectId,
    ref:"Job",
    require:true,
  },
  applicantId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    require:true,
  },
  cvPath:{
    type:String,
    require:true
  },
  status:{
    type:String,
    enum:["pending","accept","reject"],
    default:"pending",
    require:true
  },
  paymentStatus:{
    type:String,
    enum:["success","fail"],
    require:true,
  },
  
})

const Application=model('Aplication',applicationSchema);

export default Application;