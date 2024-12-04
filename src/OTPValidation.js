import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
// import './OTPValidation.css'; // Create this file for custom styling if needed
import Navbar from './Navbar';
import Footer from './Footer';

const OTPValidation = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    sendOtpEmail();
    // navigate('/payment-receipt'); // Navigate to the payment receipt page
  };

  const sendOtpEmail = () => {
    const templateParams = {
      otp,
    };

    emailjs.send(
        'service_e234qa4', // Replace with your service ID
      'template_f0nymc7', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div>
    <Navbar />
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6 mt-5">
        <h2 className="mt-5">Finalize Your Grant Payment</h2>
        <p>You will receive your grant receipt upon successful submission.</p>
        <p>Enter the correct OTP code sent to you</p>
        <form onSubmit={handleOtpSubmit}>
          <div className="form-group">
            <input
            //   type="text"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3"><a href='' target='blank' style={{color: "white", textDecoration: "none"}}>NEXT</a></button>
        </form>
        <p className="mt-3">You will receive the code shortly</p>
        <p class="fs-5">Your grant receipt will be required to obtain your funds.</p>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default OTPValidation;
