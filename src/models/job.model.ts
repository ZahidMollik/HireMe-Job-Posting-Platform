import {Schema,model} from "mongoose";

const jobSchema=new Schema({
  title:{
    type:String,
    require:true,
  },
  description:{
    type:String,
    require:true,
  },
  location:{
    type:String,
    require:true
  },
  salary:{
    type:Number,
    require:true
  },
  lastDateOfApply:{
    type:Date,
    require:true,
  },
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    require:true
  },
  companyId:{
    type:Schema.Types.ObjectId,
    ref:"Company",
    require:true
  },
  createdAt:{
    type:Date,
    require:true,
    default:new Date()
  }
})

const Job=model('Job',jobSchema);

export default Job;