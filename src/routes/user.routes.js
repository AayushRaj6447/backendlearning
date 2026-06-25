import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"


const userrouter = Router();

userrouter.route("/register")
    .post(upload.fields([
    {name : "avatar",
        maxCount : 1
    }
]),
    registerUser)


userrouter.route("/login").post(loginUser)



export {userrouter}