import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExamForm from './ExamForm';
import OTPValidation from './OTPValidation';

const basename = '/Depaul-Uni-Exam-Form-Pay';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename={basename}>
    <Routes>
      <Route path="/" element={<ExamForm />} />
      <Route path="/otp" element={<OTPValidation />} />
    </Routes>
  </Router>
);


