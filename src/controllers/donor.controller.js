import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const addDonor = asyncHandler(async (req,res) => {
   

    const { firstName, middleName, lastName, email, phoneNumber } = req.body;
     res.status(200).json(
        new ApiResponse(200,req.body,"Response is coming")
    )
})

const removeDonor = asyncHandler(async (req,res) => {

})

const editDonor = asyncHandler(async (req,res) => {
    
})

export {addDonor}