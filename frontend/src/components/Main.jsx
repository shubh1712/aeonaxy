import React, { useEffect } from 'react'
import Navbar from './assets/Navbar'
import Footer from './assets/Footer'
import emailImage from "../images/email1.png"
import { useState } from 'react'
function Main() {

  
  const  [email,setEmail] = useState("")

  const handleResend = (e)=>{
    e.preventDefault();
    fetch("/api/auth/resendVerificationLink",{
      method: 'POST',
      crossDomain: true,
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        email:email
      })
    })
    .then((res)=>{
      res.json({success:true})
      console.log("success")
    })
    .then(err=>{
      console.log(err)
    })
  }
  
  return (
    <div className="">
        <Navbar profilepic/>
        <div className="parent-div1">
          <div className="centered-div1">
            <img src={emailImage} style={{width:"60%",height:"60%"}}alt="" />
            <p>Please Verify your email address. We have sent a confirmation email to your registered email ID</p>
            <p style={{fontWeight:"bolder",fontSize:"1.2rem"}}>{email}</p>
            <p>Click in the link in email to continue using Dribble</p>
            <p>Didnt receive the mail check your spam folder,it may have been caught by  filter.If </p>
            <p>you still dont see it , <button className="btn btn-pink" style={{color:"#ff92a5"}} onClick={handleResend}>resend the confirmation email</button></p>
            <p>Please enter your email again here :</p>
            <div>
              <label htmlFor="inputEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail" placeholder="johndoe@gmail.com" name="email" value={email} onChange={e=>setEmail(e.target.value)} style={{backgroundColor:"#f3f2f2"}}/>
            </div>
            {/* <input type="text" paconChange={e=>setEmail(e.target.value)} style={{borderRadius:"2rem"}}></input> */}
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Main