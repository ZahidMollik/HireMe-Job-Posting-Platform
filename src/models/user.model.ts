import {Schema,model} from "mongoose";

const userSchema=new Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  role:{
    type:String,
    enum:["admin","employee","jobseeker"],
    default:"jobseeker"
  },
  companyId:{
    type:Schema.Types.ObjectId,
    ref:"Company",
    default:null
  }
})

const User=model('User',userSchema);

export default User;

