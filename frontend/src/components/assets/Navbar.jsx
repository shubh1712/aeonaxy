import React from 'react'
import "../../App.css"
import dummy  from "../../images/upload.jpg"
function Navbar() {
  const profilepic= localStorage.getItem("image")
  return (
    <div>
        <nav class="p-3 navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand font-style" href="#">dribbble</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Inspiration</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Find Work </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Learn Design </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Go Pro </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Hire Designers </a>
        </li>
      </ul>

      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      <div style={{paddingLeft:"0.5rem",maxWidth:"4rem",maxHeight:"3rem",borderRadius:"50%"}}>
        <img style={{maxWidth:"3rem",height:"2.5rem",borderRadius:"50%"}} className="img-class-nav" src={profilepic} alt="" />
      </div>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar