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



// function VerifyMail() {
//     const [user, setUser] = useState({});
//     onAuthStateChanged(auth, (currentUser) => {
//       if(user) {
//       setUser(currentUser);
//     }
  
//     else {
//       navigate('/register')
//     }
//     });
//     const [checked, setChecked] = useState(false);
//     const [disabled, setDisabled] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(120);
//     const navigate = useNavigate();

//     useEffect(() => {
//       if (disabled) {
//         const intervalId = setInterval(() => {
//           setTimeLeft(timeLeft - 1);
//         }, 1000);
//         return () => clearInterval(intervalId);
//       }
//     }, [disabled, timeLeft]);
  
//     useEffect(() => {
//       if (timeLeft === 0) {
//         setDisabled(false);
//         setTimeLeft(120);
//       }
//     }, [timeLeft]);

//     const sendVerificationMail = () => {
    
   
//       sendEmailVerification(auth.currentUser)
//            .then(() => {
//                console.log("Sent");  
//                setDisabled(true);        
//            })
//            .catch((error) => {
//                console.log('Email verification error', error);
//            });
  
 
//   }
  
//     useEffect(() => {
//       document.title = 'GrowthCAP - Register';
//     }, []);


//     useEffect(() => {
//       const emailVerificationListener = onAuthStateChanged(auth, (user) => {
//         if (user?.emailVerified) {
//           navigate('/who');
//         }
//       });
    
//       return () => {
//         emailVerificationListener();
//       };
//     }, [navigate]);




function VerifyMail() {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    if(user) {
    setUser(currentUser);
  }
  else {
    navigate('/register')
  }
  });
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(JSON.parse(localStorage.getItem('disabled')) || false);
  const [timeLeft, setTimeLeft] = useState(JSON.parse(localStorage.getItem('timeLeft')) || 120);
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
        localStorage.setItem('disabled', true);
      })
      .catch((error) => {
        console.log('Email verification error', error);
      });
  }

  useEffect(() => {
    document.title = 'GrowthCAP - Register';
  }, []);

  useEffect(() => {
    const emailVerificationListener = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        navigate('/who');
      }
    });
  
    return () => {
      emailVerificationListener();
    };
  }, [navigate]);



  

  useEffect(() => {
    localStorage.setItem('timeLeft', timeLeft);
  }, [timeLeft]);
  
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
  