// src/components/Navbar.js
import React from 'react';
import img1 from "./img/logo222.jpg"
// import './partners.css';
   

const Navbar = () => {
    // const navbarStyle = {
    //     backgroundColor: '#ffffff',
    //   };

    const navbarStyle = {
      backgroundColor: 'white',
      color: "white",
      borderBottom: "2px solid #005A7A",

      
    };
      
  return (
    <div>
      <nav className="navbar fixed-top" style={navbarStyle}>
        <div className="container">
          <a className="navbar-brand" href="#">
          <div>
            <img src={img1} width={400} height={50} alt="ARC Logo" class="img-fluid img11" />
            {/* <span class="text-uppercase fw-bold fs-5 mx-4 xyz" style={{color: '#ffffff'}}>U.S. Department of Labor</span> */}
          </div>
          </a>
          
        </div>
        <hr />
      </nav>
      {/* <nav className="navbar mb-4" style={navbarStyle1}>
        <div className='container'>
          <h5 >this is an example of speech sentences in english</h5>
        </div>
        <hr />
      </nav> */}
    </div>
  );
};

export default Navbar;
