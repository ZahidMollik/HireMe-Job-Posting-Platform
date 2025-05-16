import {Schema,model} from "mongoose";

const companySchema=new Schema({
  name:{
    type:String,
    require:true,
    unique:true
  },
  location:{
    type:String,
    require:true,
  },
  
})

const Company=model('Company',companySchema);

export default Company;