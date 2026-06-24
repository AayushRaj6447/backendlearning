// require("dotenv").config({'path': '.env'});
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import express, { application } from "express"
import connectDB from "./db/db.js";
import{app} from "./app.js"

dotenv.config({path: '.env'});


console.log("app.js loaded");

connectDB()
.then(() => {
    
    
    app.listen(process.env.PORT || 3000 , () => {
        console.log(`Server is running on port  : ${process.env.PORT}`); 
    })
    
    app.on("error", (error) => {
        console.log("Error on App");
        throw new error
    })

    app.get('/',(req,res) =>{
        res.send({
            "name" : "severrunning"
        })
    })

})
.catch((err) => {
    console.log("Error in Connecting to Database: ", err)
    process.exit(1);
});

