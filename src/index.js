// require("dotenv").config({'path': '.env'});
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import express, { application } from "express"
import connectDB from "./db/db.js";


dotenv.config({path: '.env'});

connectDB();

// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("express", (error) =>{
//             console.log("ERROR : ",error)
//             throw error
//         })

//         app.listen(process.env.PORT || 3000, () => {
//             console.log(`Server is running on port ${process.env.PORT || 3000}`)
//         })
//     }
//     catch(error){
//         console.log("ERROR : ",error)
//         throw error
//     }
// })()