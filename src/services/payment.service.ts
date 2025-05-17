import { ssl } from "../config/sslcommerz";
import crypto from 'crypto';
import fs from "fs";



interface InfoType{
  userId:string,
  email:string,
  jobId:string,
  filePath:string
}

export const initiatePayment = async (info:InfoType) => {
  const userId = info.userId;
  const userEmail = info.email;
  const jobId = info.jobId;
  const filePath=info.filePath;

  const trxId = crypto.randomBytes(16).toString('hex');

  const data = {
    total_amount: 100,
    currency: 'BDT',
    tran_id: trxId,
    success_url: `${process.env.SERVER_URL}/api/jobseeker/payments/ssl-success`,
    fail_url: `${process.env.SERVER_URL}/api/jobseeker/payments/ssl-fail`,
    cus_email: userEmail,
    cus_phone: "0100000000",
    shipping_method: 'online',
    product_name: `Job Application Fee`,
    product_category: "Application",
    product_profile: "general",
    ship_name: 'job seeker',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
    value_a: userId,
    value_b: jobId,
    value_c: filePath || "",
  };
  try {
    const apiResponse = await ssl.init(data);
    return apiResponse.GatewayPageURL;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw new Error("Failed to initiate SSLCommerz payment");
  }
};