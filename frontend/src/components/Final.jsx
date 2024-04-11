// import React from "react";
// import dummy from "../images/left.png";
// import { Link } from "react-router-dom";
// function Final() {
//   return (
//     <div className="parent-div2">
//       <div className="centered-div2">
//         <h1 className="text-alignment " style={{ fontWeight: "bolder" }}>
//           What brings you to dribble?
//         </h1>
//         <p style={{ color: "#818184", fontSize: "1.25em" }}>
//           Select the options that best descrbe you .Don't worry you can explore
//           the options later
//         </p>
//         <div className="selector">
//           <div className="selector-card">
//             <img src={dummy} className="img-sing-3" alt="" />
//             <label
//                 class="form-check-label"
//                 for="flexCheckDefault"
//                 style={{ fontWeight: "bolder", fontSize: "1.2rem" }}
//               >
//                 I am designer looking to share my works
//               </label>
//               <div>
//                 <input
//                   class="form-check-input"
//                   type="checkbox"
//                   value=""
//                   id="flexCheckDefault"
//                 />
//               </div>
//           </div>
//           <div className="selector-card">
//           <img src={dummy} className="img-sing-3" alt="" />
//           <label
//                 class="form-check-label"
//                 for="flexCheckDefault"
//                 style={{ fontWeight: "bolder", fontSize: "1.2rem" }}
//               >
//                 I m looking to hire a designer
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               </label>
//               <div>
//                 <input
//                   class="form-check-input"
//                   type="checkbox"
//                   value=""
//                   id="flexCheckDefault"
//                 />
//               </div>
//           </div>
//           <div className="selector-card">
//           <img src={dummy} className="img-sing-3" alt="" />
//           <label
//                 class="form-check-label"
//                 for="flexCheckDefault"
//                 style={{ fontWeight: "bolder", fontSize: "1.2rem" }}
//               >
//                 I m lookimg for a design inpiration
//               </label>
//               <div>
//                 <input
//                   class="form-check-input"
//                   type="checkbox"
//                   value=""
//                   id="flexCheckDefault"
//                 />
//               </div>
//           </div>
//         </div>  
//         <h4 className="pt-5" style={{ fontWeight: "bolder" }}>
//           Anything else? You can select multiple
//         </h4>
//         <div className="mt-3">
//           <button type="submit" className="btn1 btn1-pink py-2 px-5" disabled >
//             Finish
//           </button>
//         </div>
//         <div >
//             <Link to="/signup2" style={{color:"#818184",textDecoration:"none" ,fontWeight:"bold"}}>or PRESS return </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Final;



import React, { useState } from "react";
import dummy from "../images/left.png";
import { Link,useNavigate } from "react-router-dom";

function Final() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const navigate = useNavigate()
  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Check if at least one checkbox is checked
    const isChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    // Update the button disabled state
    setIsButtonEnabled(isChecked);
  };

  return (
    <div className="parent-div2">
      <div className="centered-div2">
        <h1 className="text-alignment" style={{ fontWeight: "bolder" }}>
          What brings you to dribble?
        </h1>
        <p style={{ color: "#818184", fontSize: "1.25em" }}>
          Select the options that best describe you. Don't worry, you can explore
          the options later.
        </p>
        <div className="selector">
          <div className="selector-card">
            <img src={dummy} className="img-sing-3" alt="" />
            <label className="form-check-label" htmlFor="flexCheckDefault1" style={{ fontWeight: "bolder", fontSize: "1.2rem" }}>
              I am a designer looking to share my works
            </label>
            <div>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" onChange={handleCheckboxChange} />
            </div>
          </div>
          {/* Add more selector cards */}
          <div className="selector-card">
            <img src={dummy} className="img-sing-3" alt="" />
            <label className="form-check-label" htmlFor="flexCheckDefault2" style={{ fontWeight: "bolder", fontSize: "1.2rem" }}>
              I m looking to hire a designer
            </label>
            <div>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" onChange={handleCheckboxChange} />
            </div>
          </div>
          <div className="selector-card">
            <img src={dummy} className="img-sing-3" alt="" />
            <label className="form-check-label" htmlFor="flexCheckDefault3" style={{ fontWeight: "bolder", fontSize: "1.2rem" }}>
              I m looking for design inspiration
            </label>
            <div>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3" onChange={handleCheckboxChange} />
            </div>
          </div>
        </div>
        <h4 className="pt-5" style={{ fontWeight: "bolder" }}>
          Anything else? You can select multiple.
        </h4>
        <div className="mt-3">
          <button type="submit" className="btn1 btn1-pink py-2 px-5" onClick={()=>{navigate("/main")}}disabled={!isButtonEnabled}>
            Finish
          </button>
        </div>
        <div>
          <Link to="/signup2" style={{ color: "#818184", textDecoration: "none", fontWeight: "bold" }}>
            or PRESS return
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Final;
