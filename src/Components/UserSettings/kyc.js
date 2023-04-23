import React, { useState, useEffect } from "react";

import mainLogo from "../Assets/Images/mainlogo.png";
import { useNavigate } from "react-router-dom";
import aadharCard from "../Assets/Images/aadhaar.png";
import {  updateDoc, addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db , auth} from '../Assets/Database/firebase-config';


import "./kyc.css";


const KYC = () => {

  const user = auth.currentUser;
  const usersCollectionRef = collection(db, 'app', 'users', user.uid);
  
  const navigate = useNavigate();

  const [aadharNumber, setAadharNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [aadharError, setAadharError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showVerifyButton, setshowVerifyButton] = useState(false);
  const [showSendButton, setshowSendButton] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();


    validateAadharNumber(aadharNumber);
    
   
    
  };

  const goBack = () => {
    navigate('/usersetting');
  }

  const sendOtp = () => {
    // Add your OTP sending logic here
    setShowOtpInput(true);
    setshowVerifyButton(true);
    setshowSendButton(false);


  };

  const verifyOtp =  async () => {
    // Add your OTP sending logic here
    const userDoc = doc(usersCollectionRef)
    const newFields = {email: aadharNumber}
    await updateDoc(userDoc, newFields)


  };

  const validateAadharNumber = (value) => {
    const regex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    if (!value) {
      setAadharError("Aadhar card number is required");
    } else if (!regex.test(value)) {
      setAadharError("Invalid Aadhar card number");
    } else {
      setAadharError("");
    }
  };


  useEffect(() => {
    document.title = "GrowthCAP - UserKYC";
  });

  return (
    <div className="kycDiv">
    <form onSubmit={handleSubmit} className="my-form">
      <h1>GrowthCAP KYC - Aadhar Verfication</h1>
      <img
        src={aadharCard}
        alt="Aadhar Card Logo"
        width="250px"
        height="180px"
      />

<div>
    {!showOtpInput && (
      <label>
        Aadhar card number :
        <input
          type="text"
          value={aadharNumber}
          className="my-input"
          onChange={(event) => {
            setAadharNumber(event.target.value);
            validateAadharNumber(event.target.value);
          }}
        />
        {aadharError && <p className="error">{aadharError}</p>}
      </label>
    )}

    {showOtpInput && (
      <label>
        Enter OTP :
        <input
          type="text"
          className="my-input"
          value={otp}
          onChange={(event) => {
            setOtp(event.target.value);
          }}
        />
        {otpError && <p className="error">{otpError}</p>}
      </label>
    )}

    <br />

    <div className="button-group">
      <button type="submit" className="primary-button" onClick={goBack}>
        Cancel
      </button>
      {showSendButton && (
     <button
     type="button"
     className={`secondary-button${aadharError !== "" || aadharNumber === "" ? " disabled" : ""}`}
     onClick={sendOtp}
     disabled={aadharError !== "" || aadharNumber === ""}
   >
     Send OTP
   </button>
      )}
      {showVerifyButton && (
      <button
        type="button"
        className="secondary-button"
        onClick={verifyOtp}
      >
        Verify OTP
      </button>
      )}
    </div>
  </div>
    </form>
    </div>
  );
};

export default KYC;
