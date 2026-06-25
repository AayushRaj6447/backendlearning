import express from 'express'
import cors from  'cors'
import cookieParser from 'cookie-parser'

const app  = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(express.json({
    limit : "16kb",
}));

app.use(express.urlencoded({
    extended:true,
    limit : "16kb"
}));

//routes
import {userrouter} from "./routes/user.routes.js"
import {donorrouter} from "./routes/donor.route.js"

//routes decleration

app.use("/users",userrouter)
app.use("/donors",donorrouter)
console.log("app.js loaded");

app.use(express.static("public"));

export {app}