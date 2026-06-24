import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const userSchema = new mongoose.Schema({

    firstName : {
        type  : String,
        requierd : true,
        index : true
    },

    middleName : {
        type  : String,
    },

    lastName : {
        type  : String,          
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true   
    },
    password : {
        type : String,
        trim : true,
        required : [true, "Password is required"]
    },

    avatar : {
        type : String,
        required : true
        
    },

    refreshToken : {
        type: String
    },

    donoresAdded : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Donor"

}
},
{timestamps : true});

userSchema.pre("save", async function() {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
}); //encprypting the password before saving it to the database..and only encrypting password when the password get modified not anytime when any other thing is modified in the db

userSchema.method.isPasswordCorrect = async function(password){
    await bcrypt.compare(password.this.password)
    return
}

userSchema.method.generateAccessToken = async function(){
    await jwt.sign(
        {
            _id : this._id,
            email : this.email,
            firstName : this.firstName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRE_DATE
        }
    )
}
userSchema.method.refreshAccessToken = async function(){
    await jwt.sign({
            _id : this._id,
            email : this.email,
            firstName : this.firstName

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRE_DATE
        })
}

export const User = mongoose.model('User', userSchema);