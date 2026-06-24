import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import { ApiError } from './ApiError.js';
import { error } from 'console';


 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });

const uploadImageOnCloudinary = async (localFilePath) => {

    try {
        if(!localFilePath){
            throw ApiError(500,"Something Went Wrong")
           
        }
        const response  = await cloudinary.uploader.upload(localFilePath, 
            {
                resource_type : 'auto'
            }
        )
        //after successful upoloading
        console.log("File is uploaded");
        console.log(response);
        return response.url

        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        throw new ApiError(500,"Image not uploaded",error);
        
    }

}



export {uploadImageOnCloudinary}