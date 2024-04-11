import jwt from "jsonwebtoken"
import dotenv from "dotenv" 

dotenv.config()

const generateTokenAndCookie =(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d',
    })

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000 ,
        httpOnly:true, //prevent XSS attack cross site attack 
        sameSite:"strict", //CSRF cross site request forgery attacks
        secure:process.env.Node_ENV !== "development",

    })
    return token
    
}

export default generateTokenAndCookie