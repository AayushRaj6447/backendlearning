import mongoose, { mongo } from "mongoose";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "./user.model";

const donorSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : true
    },

    lastName : {
        type: String,
    },

    dateOfBirth : {
        type: Date,
        required : true
    },

    Gender : {
        type: String,
        enum : 
        {
            values : ["Male", "Female","Other"],
            message : "The gender must be one of these"
        },
        required : true
    },

    profilePhoto : {
        type: String, //link of cloudinary
    },

    bloodType:{
        type: String,
        required : true
    },

    weight:{
        type: Number,
        required : true
    },

    lastDonationDate : {
        type: String,
        required : true
    },

    medicalConditions :{
        type: String,
    },

    phoneNumber : {
        type: Number,
        required : true
    },

    email : {
        type: String,
        required : true,
        unique : true,
        lowercase: true,
        trim  : true
    },

    fullAddress:{
        type: String,
        required : true
    },

    prefferedHospital:{
        type: String,
        required : true
    },

    createBy  :{
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    }

},{timestamps: true})

export const Donor = mongoose.model("Donor", donorSchema);