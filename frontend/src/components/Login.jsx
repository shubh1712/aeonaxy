// import React from 'react'

// function Login() {
//   return (
//     <div>
//     <div className=" signup passion-one-regular">
//       <div>
//         <h1 style={{fontWeight:"bolder"}}>Login to Dribbble</h1>
//       </div>
//       <form className="row g-3 media-q-form-1" p-0 style={{lineHeight:"3rem"}}>
        
        
//         <div className="col-12">
//           <label htmlFor="inputEmail" className="form-label">Email</label>
//           <input type="email" className="form-control" id="inputEmail" placeholder="johndoe@gmail.com" name="email"   style={{backgroundColor:"#f3f2f2"}}/>
//         </div>
//         <div className="col-12">
//           <label htmlFor="inputPassword4" className="form-label">Password</label>
//           <input type="password" className="form-control" id="inputPassword4" placeholder="*********" name="password"   style={{backgroundColor:"#f3f2f2"}}/>
//         </div>
        
//         <div className="col-12">
//           <button type="button" className="btn1 btn1-pink" disabled={true} >Login</button>
//         </div>
//       </form>
//     </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  // Function to handle changes in the email input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle changes in the password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  // Check if the email and password fields are empty
  const isDisabled = email.trim() === '' || password.trim() === '';

  const handleLogin = (e) =>{
    e.preventDefault()
    fetch("/api/auth/login",{
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
               
                email:email,
                password:password,
                
            })
            
        })
        .then((res)=>{
            res.json()
            navigate("/main")
        })
        .then((data)=>{console.log(data)})
  }
  return (
    <div>
      <div className="signup passion-one-regular">
        <div>
          <h1 style={{ fontWeight: "bolder" }}>Login to Dribbble</h1>
        </div>
        <form className="row g-3 media-q-form-1" onSubmit={handleSubmit} style={{ lineHeight: "3rem" }}>

          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="johndoe@gmail.com"
              name="email"
              value={email}
              onChange={handleEmailChange}
              style={{ backgroundColor: "#f3f2f2" }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="*********"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ backgroundColor: "#f3f2f2" }}
            />
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn1 btn1-pink"
              disabled={isDisabled}
              onClick={handleLogin} // Disable the button if email or password is empty
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
