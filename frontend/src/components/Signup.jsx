// import React from 'react'

// function Signup() {
//   return (
//     <div style={{
//         justifyContent: "center",
//         padding:"4rem 2rem",
//         width:"60%"
//     }} className="passion-one-regular">
//         <div>
//             <h1 style={{fontWeight:"bolder"}}>Sign Up to Dribbble</h1>
//         </div>
//         <form class="row g-3" p-0 style={{lineHeight:"3rem"}}>
//             <div class="col-md-6">
//                 <label for="inputEmail4" class="form-label">Name</label>
//                 <input type="text" class="form-control" id="inputName" style={{backgroundColor:"#f3f2f2"}}/>
//             </div>
//             <div class="col-md-6">
//                 <label for="inputPassword4" class="form-label">Username</label>
//                 <input type="text" class="form-control" id="inputUsername" style={{backgroundColor:"#f3f2f2"}} />
//             </div>
//             <div class="col-12">
//                 <label for="inputAddress" class="form-label">Email</label>
//                 <input type="email" class="form-control" id="inputEmail" placeholder="johndoe@gmail.com" style={{backgroundColor:"#f3f2f2"}}/>
//             </div>
//             <div class="col-12">
//                 <label for="inputAddress2" class="form-label">Password</label>
//                 <input type="password" class="form-control" id="inputPassword4" placeholder="*********" style={{backgroundColor:"#f3f2f2"}}/>
//             </div>
//             <div class="col-12">
//                 <div class="form-check">
//                 <input class="form-check-input" type="checkbox" id="gridCheck"/>
//                 <label class="form-check-label" for="gridCheck" style={{lineHeight:"1rem"}} className="fontstyle">
//                     Creating an account means your're okay with out Terms of
//                     Service,Privacy Policy,and our default Notification Setting
//                 </label>
//                 </div>
//             </div>
//             <div class="col-12">
//                 <button type="button" class="btn1 btn1-pink"  disabled>Create Account</button>
//             </div>
//         </form>
//     </div>
//   )
// }

// export default Signup



import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import "../App.css"
function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);

    // Check if all fields are filled
    if (name === 'name' && value && username && email && password) {
      setIsAllFieldsFilled(true);
    } else if (name === 'username' && value && name && email && password) {
      setIsAllFieldsFilled(true);
    } else if (name === 'email' && value && name && username && password) {
      setIsAllFieldsFilled(true);
    } else if (name === 'password' && value && name && username && email) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  };

  const handleCreateAccount = () => {
    // Store data in local storage
    localStorage.setItem('name', name);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    navigate('/signup2')
  };

  

  return (
    <div className=" signup passion-one-regular">
      <div>
        <h1 style={{fontWeight:"bolder"}}>Sign Up to Dribbble</h1>
      </div>
      <form className="row g-3 media-q-form-1" p-0 style={{lineHeight:"3rem"}}>
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">Name</label>
          <input type="text" className="form-control" id="inputName" name="name" value={name} onChange={handleInputChange} style={{backgroundColor:"#f3f2f2"}}/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputUsername" className="form-label">Username</label>
          <input type="text" className="form-control" id="inputUsername" name="username" value={username} onChange={handleInputChange} style={{backgroundColor:"#f3f2f2"}} />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="johndoe@gmail.com" name="email" value={email} onChange={handleInputChange} style={{backgroundColor:"#f3f2f2"}}/>
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword4" placeholder="*********" name="password" value={password} onChange={handleInputChange} style={{backgroundColor:"#f3f2f2"}}/>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck"/>
            <label className="form-check-label fontstyle" htmlFor="gridCheck" style={{lineHeight:"1rem"}} >
              Creating an account means you're okay with our Terms of Service, Privacy Policy, and our default Notification Settings
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="button" className="btn1 btn1-pink" disabled={!isAllFieldsFilled} onClick={handleCreateAccount}>Create Account</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
