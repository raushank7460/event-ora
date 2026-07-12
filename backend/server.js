const express=require("express");
const dotenv=require("dotenv").config();
const cors=require("cors");
const connectDB = require("./config/db");

const app=express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send(`API IS WORKING....`);
})

const port=process.env.PORT||5005;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})