import mongoose from "mongoose";
import { User } from "./user.model";

const bloodRequest = new mongoose.Schema({
    patientName : {
        type : String,
        required : true,
    },

    bloodType : {
        type : String,
        required : true,
    },

    unitsNeeded : {
        type : Number,
        required : true,
    },

    urgency : {
        type : String,
        enum : {
            values : ["Critical","High","Medium","Low"],
            message : "Urgency Criteria needs to be one of these"
        },
        required : true,
    },

    hospital : {
        type : String,
    },

    phoneNumber : {
        type : Number,
        required : true,
    },

    aadharNumber : {
        type : Number,
        required : true,
        unique : true
    },

    additionalNotes : {
        type : String,
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    }
},{timestamps : true})

export const bloodRequest = mongoose.model("bloodRequest",bloodRequest)