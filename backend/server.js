import express from 'express';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connectToMongoDB from './db/connectToMongoDb.js';
import authRoutes from "./routes/auth.routes.js"
import bcrypt from "bcryptjs";
import cors from "cors"
import path from "path";
const app = express()
dotenv.config()

const port = process.env.PORT || 5000

const __dirname =path.resolve()

app.use(express.json())
app.use(express.static(path.join(__dirname,"frontend/build")))
app.use(cors());

app.use(cookieParser())


app.use("/api/auth",authRoutes)

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname , "frontend","build", "index.html"))
})
app.listen(port,()=>{
    connectToMongoDB()
    console.log(`Server Running on port  ${port}`)
})
