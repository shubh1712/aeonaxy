import User  from "../models/user.model.js"
import bcrypt from "bcryptjs"
// import generateTokenAndCookie from "../utils/generateTokenAndCookie.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import UserVerification from "../models/userVerification.model.js"
import { v4 as uuidv4 } from "uuid";
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL, // generated ethereal email
        pass: process.env.AUTH_PASS // generated ethereal password
    }
})

transporter.verify((err,success)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Ready For Messages")
        console.log(success)
    }
})
export const signup=async (req, res) => {
    try {
        const {name,username,email,password,profilepic,location}= req.body
        if (password.length < 6 ) {
            return res.status(400).json({error:"Password must be minimum 6 characters"})
        }
        
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({error:"Username already exists"})
        }
        
        // Hash Passwords here 
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =  await bcrypt.hash(password,salt)
        
        // const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        
        const newUser = new User ({
            name,
            username ,
            email,
            password:hashedPassword, 
            profilepic,
            location,
            verified : false,
        })
        const savedUser =  await newUser.save()


        
        
        if(savedUser){
            sendVerificationEmail(savedUser,res)
            const token = jwt.sign({username },process.env.JWT_SECRET,{
                expiresIn:'15d',
            })
            res.cookie("token",token)
            
            res.status(201).json({
                message:"SUCCESS",
                _id:savedUser._id,
                name:savedUser.name,
                username:savedUser.username,
                email:savedUser.email,
                profilepic:savedUser.profilepic,
                location:savedUser.location,
                token:token,
                verified:savedUser.verified,
            })
        }
        else{
            res.status(400).json({error:"Invalid User data"})
        }
   } catch (error) {
    console.log("Error in Signup Controller:",error.message);
    res.status(500).json({error:error.message})
   }
}


// const sendVerificationEmail=({_id,email},res)=>{
//     const url = "http://localhost:8000/"
//     const uniqueString = uuidv4() + _id

//     const mailOptions ={
//         from:process.env.AUTH_EMAIL,
//         to:email,
//         subject:"Verify your email",
//         html:`<p>Verify your email address to complete the signup and login into your acccount.</p><p>
//         This link expires in 6 hours </p><p>Press <a href=${url + "user/verify/" + _id +"/"+ uniqueString}></a> to proceed</p>`
//     }

//     const saltRounds = 10
//     bcrypt
//     .hash(uniqueString,saltRounds)
//     .then((hashedUniqueString) =>{
//         const newVerification = new UserVerification({
//             userId:_id,
//             uniqueString:hashedUniqueString,
//             createdAt:Date.now(),
//             expiresAt:Date.now() + 21600000
//         })
//         newVerification 
//         .save()
//         .then(()=>{
//             transporter
//             .sendMail(mailOptions)
//             .then(()=>{
//                 res.json({
//                     status:"PENDING",
//                     message:"Verification email sent"
//                 })
//             })
//             .catch((err)=>{
//                 console.log(err)
//                 res.json({
//                     status:"FAILED",
//                     message:"Verification email failed"
//                 })
//             })
//         })
//         .catch((err)=>{
//             res.json({
//                 status:"FAILED",
//                 message:"Couldn't save verification email data!"
//             })
//         })
//     })
//     .catch(()=>{
//         res.json({
//             status:"FAILED",
//             message:"An error occured while hashing email data"
//         })
//     })
// }
const sendVerificationEmail = async ({ _id, email }, res) => {
    try {
        const url = "https://aeonaxy-rrlc.onrender.com/";
        const uniqueString = uuidv4() + _id;

        const saltRounds = 10;
        const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);

        const newVerification = new UserVerification({
            userId: _id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000
        });

        await newVerification.save();

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify your email",
            html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link expires in 6 hours</p><p>Press <a href=${url + "api/auth/verify/" + _id + "/" + uniqueString}>here</a> to proceed</p>`
        };

        await transporter.sendMail(mailOptions);

        // res.json({
        //     status: "PENDING",
        //     message: "Verification email sent"
        // });
    } catch (error) {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "An error occurred while sending the verification email"
        });
    }
};

export const emailhandler =async(req,res)=>{
    const {userId,uniqueString} = req.params

    UserVerification
    .find({userId})
    .then((result )=>{
        if (result.length >0){
            const {expiresAt}  = result[0]
            const hashedUniqueString = result[0].uniqueString
            if (expiresAt < Date.now()){
                UserVerification
                .deleteOne({userId})
                .then(result=>{
                    User
                    .deleteOne({userId})
                    .then(()=>{
                        let message = "Link has expired ,please sign up again"
                        res.redirect(`/api/auth/verified/error=true&message=${message}`)
                    })
                    .catch((err)=>{
                        console.log(err)
                        let message = "Clearing user with expired unique string failed"
                        res.redirect(`/api/auth/verified/error=true&message=${message}`)
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    let message = "An error occured while clearing expired user verification reccord  "
                    res.redirect(`/api/auth/verified/error=true&message=${message}`)
                })
            }
            else{
                bcrypt.compare(uniqueString,hashedUniqueString)
                .then(result=>{
                    if (result){
                        User.updateOne({_id:userId},{verified:true})
                        .then(()=>{
                            UserVerification.deleteOne({userId})
                            .then(()=>{
                                res.sendFile(path.join(__dirname,"../views/verified.html"))
                            })
                            .catch(err=>{
                                console.log(err)
                                let message = "An error occured while finalizing verification"
                                res.redirect(`/api/auth/verified/error=true&message=${message}`)
                            })
                        })
                        .catch(err =>{
                            console.log(err)
                            let message = "An error Occured while updating record  "
                            res.redirect(`/api/auth/verified/error=true&message=${message}`)
                        })
                    }
                    else{
                        let message = "Invalid verification details passed .check your inbox"
                        res.redirect(`/api/auth/verified/error=true&message=${message}`)
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    let message = "An error occured while clearing expired user verification reccord  "
                    res.redirect(`/api/auth/verified/error=true&message=${message}`)
                })
            }
        }
        else{
            let message = "Acount record does not exist or has been verified already.Please signn up or login "
            res.redirect(`/api/auth/verified/error=true&message=${message}`)
        }
    })
    .catch((err)=>{
        console.log(err)
        let message = "An error occured while checking for existing user verification record "
        res.redirect(`/api/auth/verified/error=true&message=${message}`)
    })
} 

export const verified=async(req,res)=>{
 res.sendFile(path.join(__dirname,"../views/verified.html"))   
}

export const resendLink = async(req,res)=>{
    try{
        const {email}= req.body
    
        User.findOne({ email })
        .then(user => {
            if (user) {
                console.log(user._id); // This will log the _id of the found user
                const userId = user._id
                sendVerificationEmail({userId,email},res)
            } else {
                console.log('User not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });       
    }
    catch(err){
        console.log(err)
    }
}

export const getProfilePic = (req,res)=>{
    const {userId} = req.params
    console.log(userId) 
}
export const  login =async (req, res) => {
    try {
        const {email , password} = req.body
        const user  = await User.findOne({email })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect ){
            return res.status(400).json({error:"Invalid Username or Password" })
        }

        generateTokenAndCookie(user._id,res)
        res.status(200).json({
            _id:user._id,
            email:user.email,
            profilepic:user.profilepic
        })

    } catch (error) {
        console.log("Error in Signup Controller:",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}
export const  logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out Successfully"})
    } catch (error) {
        console.log("Error in Logout Controller:",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}