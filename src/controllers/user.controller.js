import express from 'express';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadImageOnCloudinary } from '../utils/cloudinary.js';
import { upload } from '../middlewares/multer.middleware.js';

const registerUser = asyncHandler(async (req,res) => {
    const {firstName,middleName,lastName,email,password} = req.body;
    
    if(
        [firstName,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All required field must be filled")
    }

    const existinguser = await User.findOne(
        {$or : [{email}]}
    )

    

    if(existinguser){
        throw new ApiError(400,"User Already Exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar File is required")
    }

   const avatar = await uploadImageOnCloudinary(avatarLocalPath)

   if(!avatar){
        throw new ApiError(500,"Error uploading image on cloudinary")
    }

    const user = await User.create({
        firstName,
        middleName,
        lastName,
        avatar,
        password,
        email
    })


    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while reigstering the user")
    }

    res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered")
    )




    //what i need ?? .
    // email, first, middle, last name,password,avatar,.
    // validation (not empty).
    //user already exist by email...
    //avatar hai ki nhi (required hai)
    // multer ne upload kiya ki nhi
    //cloudinary pe image upload hua?
    //cloudinary ne url bheja
    //user ko database mein add krna
    // response mein se password and refresh token hatana
    // agar user create hogya to response bhejna




});


const loginUser = asyncHandler(async (req,res) => {
    res.status(200).json({
        "message" : "login succescfull"
    })
})
export {registerUser,loginUser}