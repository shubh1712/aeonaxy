import React from 'react'
import Left from "./Left"
import {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Signup from './Signup';
import Login from './Login';

function Home() {
    const [isSignup , setSignup ] = useState(true)
    const handleClick=()=>{
        setSignup(!isSignup)
    }
   return (
    <div className="home" >
        <div className="left" >
            <Left className="left-on-home" />
        </div>
        <div className="" style={{padding:"2rem",width:"100%",}}>
            {isSignup? 
            <div className="text-end">Already a User? <a className='pointer' onClick={handleClick}>Login</a></div>
             :
             <div className="text-end"> New here? <a className='pointer' onClick={handleClick}>Signup</a></div>
            }    

            <div style={{ display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                    <div>
                        <h2 className='right-dribbble font-style visible  '>dribbble </h2>
                    </div>        
                {
                    isSignup?<Signup/>:<Login/>
                }
            </div>
        </div>
    </div>
  )
}

export default Home