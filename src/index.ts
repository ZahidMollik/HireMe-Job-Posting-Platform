import express from "express";
import cors from "cors";
import {connect} from "./config/db";
import apiRoute from "./routes/index"

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/api',apiRoute);

const PORT=process.env.PORT || 3000;
const DB_URL=process.env.MONGODB_URL!;
connect(DB_URL);
app.listen(PORT,()=>{
  console.log(`Server Running on PORT:${PORT}`);
})