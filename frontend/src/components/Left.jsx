import React from 'react';
import left from "../images/left.png";

function Left() {
  return (
    <div className="left-container">
        <h4 className="font-style dribbble-left">
            dribbble
        </h4>
        <h3 className='h3' id="h3-1" >
            Discover the world's top
        </h3>
        <h3 className='h3'>
            Designers and Creatives
        </h3>
        <img src={left} alt=""  style={{width:"100%"}}/>
    </div>
  );
}

export default Left;