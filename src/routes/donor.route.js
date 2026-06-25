import { Router } from "express";
import { addDonor } from "../controllers/donor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const donorrouter = Router(); 

donorrouter.route("/add").post(upload.fields([{
    name : "profilePhoto",
    maxCount : 1
}]),addDonor)

export {donorrouter}