import './verifymail.css';

import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import { Button,Label, Icon, Input } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from '../Assets/Database/firebase-config';
import verifymail from'../Assets/Images/verifyemailicon.jpeg';
import { convertLength } from '@mui/material/styles/cssUtils';


const sendVerificationMail = () => {
    
   
      sendEmailVerification(auth.currentUser)
           .then(() => {
               console.log("Sent");          
           })
           .catch((error) => {
               console.log('Email verification error', error);
           });
    
  
    // console.log("butterfly");
  }

  
  
  

function VerifyMail() {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      document.title = 'GrowthCAP - Register';
    }, []);
  
    // const sendVerificationMail = () => {
    //   const user = auth.currentUser;
    //   user.sendEmailVerification().then(() => {
    //     console.log("Verification email sent");
    //   }).catch(error => {
    //     console.error(error);
    //   });
    // };
  
    return (
      <div className="VerifyMail">
        <header className="Register-header">
          <div className="RegisterCard">
            <br />
            <br />
            <p style={{ fontSize: '28px' }}>
              Verify your mail!
            </p>
            <img style={{ height: '120px', width: '120px' }} src={verifymail} alt="GrowthCAP-logo" />
  
            <br />
            <Button
              style={{
                width: "80%",
                backgroundColor: "#238636",
                color: "#FFF",
                fontSize: 18,
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
              animated
              onClick={sendVerificationMail}
            >
              <Button.Content visible>Send verification link!</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            <br />
            <br />
          </div>
        </header>
      </div>
    );
  }
  
  export default VerifyMail;
  