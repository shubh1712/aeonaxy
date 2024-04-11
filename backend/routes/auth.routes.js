import express from 'express';
import {signup,login ,logout, emailhandler,verified,resendLink ,getProfilePic} from "../controllers/auth.controllers.js"

const router =  express.Router();

router.post("/signup" ,signup)
router.post("/login" ,login )
router.post("/logout" ,logout)
router.get("/verify/:userId/:uniqueString",emailhandler)
router.get("/verified",verified)
router.post("/resendVerificationLink",resendLink)
router.get('/getprofilepic/:userId',getProfilePic)
export  default router