import express from "express";
import cors from "cors";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`Server Running on PORT:${PORT}`);
})