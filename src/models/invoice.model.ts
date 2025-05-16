import {Schema,model} from "mongoose";

const invoiceSchema=new Schema({
  applicationId:{
    type:Schema.Types.ObjectId,
    ref:"Application",
    require:true
  },
  applicantId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    require:true
  },
  amount:{
    type:Number,
    require:true
  },
  paymentTime:{
    type:Date,
    require:true,
    default:new Date()
  }
})

const Invoice=model('Invoice',invoiceSchema);

export default Invoice;