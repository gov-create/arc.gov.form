// src/components/Footer.js
import React from 'react';

const Footer = () => {
    const navbarStyle = {
        backgroundColor: '#6E042C',
        color: '#DEEEFF'
      };
  return (
    <footer className="pt-4 pb-0 mt-4" style={navbarStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h4 className='text-uppercase text-light fw-semibold' style={{color: 'white'}}>Australian Research Council (ARC)</h4>
            <br />
            <h6>
            ABN 35 201 451 156
              <br />
              <br />
              Connect With ARC  |   Privacy & Security Statement
            </h6>
            <p>
              © 2024 Australian Research Council. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
