import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

console.log("registerUser =", registerUser);
console.log("loginUser =", loginUser);

const router = Router();

router.route("/register")
    .post(upload.fields([
    {name : "avatar",
        maxCount : 1
    }
]),
    registerUser)


router.route("/login").post(loginUser)



export {router}