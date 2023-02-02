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




  
  
  

function VerifyMail() {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
      if(user) {
      setUser(currentUser);
    }
  
    // else {
    //   navigate('/login')
    // }
    });
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120);
    const navigate = useNavigate();

    useEffect(() => {
      if (disabled) {
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }, [disabled, timeLeft]);
  
    useEffect(() => {
      if (timeLeft === 0) {
        setDisabled(false);
        setTimeLeft(120);
      }
    }, [timeLeft]);

    const sendVerificationMail = () => {
    
   
      sendEmailVerification(auth.currentUser)
           .then(() => {
               console.log("Sent");  
               setDisabled(true);        
           })
           .catch((error) => {
               console.log('Email verification error', error);
           });
      // console.log("test");
      // setDisabled(true);  
 
  }
  
    useEffect(() => {
      document.title = 'GrowthCAP - Register';
    }, []);


    // const [emailVerified, setEmailVerified] = useState(false);
    // useEffect(() => {
    //   const checkVerificationStatus = async () => {
    //     try {
    //       const response = await fetch('https://growthcap-bed92.firebaseapp.com/users/${user.uid}/emailVerified.json');
    //       const data = await response.json();
    //       if (data.emailVerified) {
    //         setEmailVerified(true);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    
    //   const intervalId = setInterval(checkVerificationStatus, 3000);
    //   return () => clearInterval(intervalId);
    // }, []);
    
    // if (emailVerified) {
    //   navigate('/');
    // }
    
    // return <div>Waiting for email verification...</div>;


















    // useEffect(() => {
    //   if (user?.emailVerified) {
    //     navigate('/');
    //   }
    // }, [user]);

    useEffect(() => {
      const emailVerificationListener = onAuthStateChanged(auth, (user) => {
        if (user?.emailVerified) {
          navigate('/');
        }
      });
    
      return () => {
        emailVerificationListener();
      };
    }, [navigate]);

    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     window.location.reload();
    //   }, 5000);
    
    //   return () => clearInterval(intervalId);
    // }, []);
   
  
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
        <h4 style={{ fontSize:'17px'}}>Email: {user?.email} </h4>

        <Button
          style={{
            width: "80%",
            backgroundColor: "#238636",
            color: "#FFF",
            fontSize: 18,
            fontFamily: "Poppins",
            fontWeight: 500,
          }}
          disabled={disabled}
          onClick={sendVerificationMail}
        >
          <Button.Content visible>Send verification link!</Button.Content>
        </Button>
        {disabled && <div className="timeLeft" style={{ fontSize: 18 }}>Resend in: {timeLeft} seconds</div>}
   
   
            <br />
            <br />
          </div>
        </header>
      </div>
    );
  }
  
  export default VerifyMail;
  