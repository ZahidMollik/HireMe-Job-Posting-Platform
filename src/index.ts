import express from "express";
import cors from "cors";
import {connect} from "./config/db";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const PORT=process.env.PORT || 3000;
const DB_URL=process.env.MONGODB_URL!;
connect(DB_URL);
app.listen(PORT,()=>{
  console.log(`Server Running on PORT:${PORT}`);
})