import React,{useState} from 'react'
import { FaCamera } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
function Signup2() {
    const navigate = useNavigate();
    const [image ,setImage] = useState("")
    const [location,setLocation] = useState("")

    const handleImageChange=(e)=>{
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload=()=>{
            setImage(reader.result);
            localStorage.setItem("image", reader.result)
        }
        reader.onerror=error=>{console.log(error);}
    }

    const handleLocationChange=(e)=>{
        console.log(e.target.value)
        setLocation(e.target.value)
    }
    const lName = localStorage.getItem('name')
    const lusername = localStorage.getItem('username')
    const lemail = localStorage.getItem('email')
    const lpassword = localStorage.getItem('password')
    console.log(lName, lusername, lemail, lpassword)
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch("/api/auth/signup",{
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                name : lName,
                username : lusername,
                email:lemail,
                password:lpassword,
                profilepic:image,
                location:location,
            })
            
        })
        .then((res)=>{
            res.json()
            navigate("/signup3")
        })
        .then((data)=>{console.log(data)})
    }
  return (
    <div className='parent-div'>
        <div className='centered-div'>
            <h1 style={{textAlign: 'left'}}>Welcome! Let's create your profile.</h1>
            <p style={{color:"#818184",textAlign: 'left'}}>Let others get to know you better! You can do these later.</p>
            <form onSubmit={handleSubmit}>
                <div className='image-upload mt-5'>
                     
                    <div className='circle'>
                        {image ?  <img src={image} className='img-signup-2' style={{ width: '100%', height: '100%', borderRadius: '50%' }}/> : <FaCamera color="#818184" /> }
                    </div>:

                    <div className="button" style={{textAlign:"left"}}>
                        <label htmlFor="file-input" className='btn btn-white mx-5 mt-3 border border-2 border-primary' style={{ borderColor: '#818184' }}>Choose Image</label>
                        <input id="file-input" type="file" style={{ display: 'none' }} onChange={handleImageChange} accept=".jpg, .jpeg, .png" />
                        <p>FIle size must be less than 15kb</p>
                        <div className='mx-5 mt-4' style={{color: '#818184' , fontWeight:"bold"}}>
                            <a>
                                &gt; Or choose from our avatars
                            </a>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <h2 style={{textAlign:"left"}}>Add your location</h2>
                    <input onChange ={handleLocationChange}type="text" className="form-control" id="inputLocation" name="location" style={{borderTop:"none",backgroundColor:"#f3f2f2"}} />
                </div>
                <div style={{textAlign:"left"}} className="mt-3">
                    <button type="submit" className="btn1 btn1-pink py-2 px-5" >Finish</button>
                </div>
                <div style={{textAlign:"left"}}>
                    <Link to="/" style={{color:"#818184",textDecoration:"none" ,fontWeight:"bold"}}>or PRESS return </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup2

// // onChange={handleInputChange}

// import React, { useState } from 'react';
// import { FaCamera } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// function Signup2() {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleUploadImage = () => {
//     // Implement logic to upload the selected image to an API and store it in MongoDB
//     if (selectedImage) {
//       // Code to send the image to the API
//       console.log('Uploading image:', selectedImage);
//     }
//   };

//   return (
//     <div className='parent-div'>
//       <div className='centered-div'>
//         <h1 style={{ textAlign: 'left' }}>Welcome! Let's create your profile.</h1>
//         <p style={{ color: "#818184", textAlign: 'left' }}>Let others get to know you better! You can do these later.</p>

//         <div className='image-upload mt-5'>
//           <div className='circle'>
//             {selectedImage ? (
//               <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
//             ) : (
//               <FaCamera color="#818184" />
//             )}
//           </div>
//           <div className="button" style={{ textAlign: "left" }}>
//             <label htmlFor="file-input" className='btn btn-white mx-5 mt-3 border border-2 border-primary' style={{ borderColor: '#818184' }}>Choose Image</label>
//             <input id="file-input" type="file" style={{ display: 'none' }} onChange={handleImageChange} accept=".jpg, .jpeg, .png" />
//             <div className='mx-5 mt-4' style={{ color: '#818184', fontWeight: "bold" }}>
//               <a>&gt; Or choose from our avatars</a>
//             </div>
//           </div>
//         </div>

//         <div className='mt-5'>
//           <h2 style={{ textAlign: "left" }}>Add your location</h2>
//           <input type="text" className="form-control" id="inputLocation" name="location" style={{ borderTop: "none", backgroundColor: "#f3f2f2" }} />
//         </div>

//         <div style={{ textAlign: "left" }} className="mt-3">
//           <button type="button" className="btn1 btn1-pink py-2 px-5" onClick={handleUploadImage} disabled={!selectedImage}>Finish</button>
//         </div>

//         <div style={{ textAlign: "left", marginTop: '10px' }}>
//           <Link to="/" style={{ color: "#818184", textDecoration: "none", fontWeight: "bold" }}>or PRESS return</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup2;

// import React, { useState } from "react";
// import { FaCamera } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios"
// function Signup2() {
//   const localName = localStorage.getItem("name");
//   const localUsername = localStorage.getItem("username");
//   const localPassword = localStorage.getItem("password");
//   const localEmail = localStorage.getItem("email");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [location, setLocation] = useState("");
//   const [isFormValid, setIsFormValid] = useState(false);


//   const [values,setValues]=useState({
//     name :localName,
//     username:localUsername,
//     password:localPassword,
//     email:localEmail,
//     profilepic:"",
//     location:""
//   })
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//     setIsFormValid(location !== "" && file !== null);
//     setValues({...values,profilpic:e.target.value})
//   };

//   const handleLocationChange = (e) => {
//     const value = e.target.value;
//     setLocation(value);
//     setValues({...values,location:e.target.value})
//     setIsFormValid(value !== "" && selectedImage !== null);
//   };

//   const handleUploadImage = () => {
//     // Implement logic to upload the selected image to an API and store it in MongoDB
//     if (selectedImage) {
//       // Code to send the image to the API
//       console.log("Uploading image:", selectedImage);
//     }
//   };
// //   console.log(name, username, password, email, selectedImage);
//   const handleFinishButtonClick = () => {
//     if (isFormValid) {
//       // Handle form submission
//       console.log("Form submitted!");
//     }
//   };

//   const pp = "sexy"
//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("username", values.username);
//     formData.append("password", values.password);
//     formData.append("email", values.email);
//     formData.append("profilepic",pp); // Append the image file
//     formData.append("location", values.location);
  
//     axios.post("http://localhost:8000/api/auth/signup", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data", // Set the Content-Type header
//       },
//     })
//       .then((res) => {
//         if (res.data) {
//           console.log(res.data);
//         } else {
//           console.log(res.data.error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
  
//   return (
//     <div className="parent-div">
//       <div className="centered-div">
//         <h1 style={{ textAlign: "left" }}>
//           Welcome! Let's create your profile.
//         </h1>
//         <p style={{ color: "#818184", textAlign: "left" }}>
//           Let others get to know you better! You can do these later.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <div className="image-upload mt-5">
//             <div className="circle">
//               {selectedImage ? (
//                 <img
//                   src={URL.createObjectURL(selectedImage)}
//                   alt="Selected"
//                   style={{ width: "100%", height: "100%", borderRadius: "50%" }}
//                 />
//               ) : (
//                 <FaCamera color="#818184" />
//               )}
//             </div>
//             <div className="button" style={{ textAlign: "left" }}>
//               <label
//                 htmlFor="file-input"
//                 className="btn btn-white mx-5 mt-3 border border-2 border-primary"
//                 style={{ borderColor: "#818184" }}
//               >
//                 Choose Image
//               </label>
//               <input
//                 id="file-input"
//                 type="file"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//                 accept=".jpg, .jpeg, .png"
//               />
//               <div
//                 className="mx-5 mt-4"
//                 style={{ color: "#818184", fontWeight: "bold" }}
//               >
//                 <a>&gt; Or choose from our avatars</a>
//               </div>
//             </div>
//           </div>

//           <div className="mt-5">
//             <h2 style={{ textAlign: "left" }}>Add your location</h2>
//             <input
//               type="text"
//               className="form-control"
//               id="inputLocation"
//               name="location"
//               style={{ borderTop: "none", backgroundColor: "#f3f2f2" }}
//               onChange={handleLocationChange}
//             />
//           </div>

//           <div style={{ textAlign: "left" }} className="mt-3">
//             <button
//               type="submit"
//               className="btn1 btn1-pink py-2 px-5"
//               onClick={handleFinishButtonClick}
//               disabled={!isFormValid}
//             >
//               Finish
//             </button>
//           </div>

//           <div style={{ textAlign: "left", marginTop: "10px" }}>
//             <Link
//               to="/"
//               style={{
//                 color: "#818184",
//                 textDecoration: "none",
//                 fontWeight: "bold",
//               }}
//             >
//               or PRESS return
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup2;
