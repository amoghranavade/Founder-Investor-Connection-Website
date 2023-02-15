import './usersetting.css';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Icon, Rating, Step, Confirm, Card, Image, Popup} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React, {useEffect, useState } from 'react';
import founder from'../Assets/Images/founder.png';
import {  updateDoc, addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import santaHat from'../Assets/Images/santa_hat_U01_EDITED.png';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  onAuthStateChanged,
  PhoneAuthCredential,
  linkWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { db , auth} from '../Assets/Database/firebase-config';
import { getAuth, RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth';
import { red } from '@mui/material/colors';




function UserSettings() {

  const configureCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          console.log("Success");
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          sendOtp();
        }
      }, auth);
    }
  }

  const [showNumberInput, setShowNumberInput] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSendOtpButton, setShowSendOtpButton] = useState(true);
  const [showVerifyOtpButton, setShowVerifyOtpButton] = useState(false);
  const [code, setOtpCode] = useState("");
  const appVerifier = window.recaptchaVerifier;
  const phoneRegex = /^[7-9][0-9]{9}$/;
  const [number, setPhoneNumber] = useState("");
  const [errorInvalidPhone, setErrorOne] = useState(false);
  // const [otpSent, setSuccessTwo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    document.title = 'GrowthCAP - Settings';
  });

  const usersCollectionRef = collection(db, 'app', 'users', user.uid);


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setUsers(data.docs.map((doc) => (doc.data())));
        
  

    };
    getUsers();
  }, []);
  
  const style = {
    borderRadius: 0,
    opacity: 0.8,
    padding: '2em',
    fontSize: '16px'
  }

  const deleteAccount = () => {
    console.log("Account deleted with id:", user.uid);
  }
  
  const sendOtp =  () => {

    if(!phoneRegex.test(number)){
      setErrorOne(true);
      // setSuccessTwo(false);
      

    }

    else {
      const phoneNumber = '+91' + number;
      setErrorOne(false);
      console.log(phoneNumber);
      // setSuccessTwo(true);
      linkWithPhoneNumber(user, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        setShowNumberInput(false);
        setShowOtpInput(true);
        setShowSendOtpButton(false);
        setShowVerifyOtpButton(true);
        setErrorOne(false);
      console.log('OTP SENT');
      window.confirmationResult = confirmationResult;
    }).catch((e) => {
      console.log(e);

      
    });

    }
  }

  const verifyOtp = () => {
    window.confirmationResult.confirm(code).then(async result => {
      // const phoneNumber = '+91' + number;
      // const userDoc = doc(db, 'app', 'users', user.uid, id)
      // const newFields = {number: phoneNumber}
      // await updateDoc(userDoc, newFields)
      // navigate('/usersetting');
      console.log("Correct OTP");

    }).catch((error) => {
      console.log(error);
      console.log("Invalid OTP");
    });
  }

  const closeDiv = () => {
    setShowNumberInput(true);
    setShowOtpInput(false);
    setShowSendOtpButton(true);
    setShowVerifyOtpButton(false);
    setShowModal(false); 
    setErrorOne(false);
  }

  const updateButton = () => {
    setShowModal(true);
    configureCaptcha()
  }

  

  

  
  return (
   
    <div>
      
      {!users || users.length === 0 ? (
         <div style={{position: 'relative'}}>
         
         {/* Contents of your current page */}
         <Box sx={{ display: 'flex', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 1 }}>
           <CircularProgress style={{ margin: 'auto' }} />
         </Box>
       </div>
      ) : (
        users.map((user) => {
        
          return (
            <div className="UserSetting">
              <header className="user-setting">
                <p className='settingText'>Settings</p>

                <div className="user-pic-container">
                  <div className="user-pic-circle">
                    <img  src={founder}  alt="GrowthCAP-founder"/>
                  </div>

                  <div className="parent">
                     <p className="mainName">{user.name}</p>
                     <div className='userType'>
                       <p>{user.type}</p>
                       {/* <button className='signOutButton'>Sign-out</button> */}
                     </div>
                 </div>
                </div>
      

                <div className="basicPad">
                  <div className='basicPadHeader'>
                    <p className='basicPadHeaderText'>GENERAL</p>
                  </div>

                  <p className="nameTag">Display Name</p>
                  <p className="nameContent">{user.name}</p>
                  <div className="passwordResetButtonContainer">
                    <p className="passwordTag">Password</p>
                    <div className="passwordContentContainer">
                      <p className="passwordContent">⚪ ⚪ ⚪ ⚪ ⚪ ⚪</p>
                      <button className="resetButton">Reset</button>
                    </div>
                  </div>

                

                  <div className="mobileUpdateButtonContainer">
                    <p className="phoneTag">Phone</p>
                    <div className="mobileContentContainer">
                      <p className={user.phone === "Not registered" ? "phoneContentNotRegistered" : "phoneContent"}>{user.phone}</p>
                      <button className="updateButton" onClick={updateButton}>Update</button>
                    </div>
                  </div>
                </div>



                <div className='accountPad'>
                    <div className='accountPadHeader'>
                       <p className='accountPadHeaderText'>ACCOUNT</p>
                   </div>
                     <p className="emailTag">Email</p>
                     <p className="emailContent">{user.email}</p>
                     <p className="typeTag">Account Type</p>
                     <p className="typeContent">{user.type}/free</p>
                     <p className="uidTag">Account ID  <Popup
                                                        trigger={<button className='infoPopup'>i</button>}
                                                        content='Unique to the user, this UID should not be shared with anyone. Only share it with GrowthCAP support team if asked.'
                                                        style={style}
                                                        inverted
                                                       />    
                                                        &nbsp;<span onClick={() => setIsHidden(!isHidden)}>
                                                       {isHidden ? 'show' : 'hide'}
                                                     </span> 
                                                     </p>
  
  {!isHidden && <p className="uidContent">{user.uid}</p>}
                     <p className="deleteAccount" onClick={deleteAccount}>Delete my account</p>
                    
                     
                     <p className="userSinceTag">User Since: {user.accountCreatedDate}</p>
                    
                </div>

                <div className='otherVerification'>
                
                  <p className="statusTag">KYC Status <Popup
                                                        trigger={<button className='infoPopup'>i</button>}
                                                        content='Identity document verification is a mandatory process in accessing most of the GrowthCAP features.'
                                                        style={style}
                                                        inverted
                                                       /></p>
                  <p className="statusContent">PENDING</p>
                  <div className='verificationRedirect'>
                    <p className='verificationDivText'>Get my verification done <Icon name='arrow right' size='small' /></p>
                  </div>
                </div>


                {showModal && (
        <div className='phoneAuthDiv'>
         
          <div className='phoneAuthContent'>
          
            <p className='phoneAuthHeader'>Verify your mobile number!</p>
            {
            errorInvalidPhone ? <div >  
            <p style={{fontSize: '18px', color:'#FF4242',textAlign: 'center', marginBottom: 5}} >Please enter a valid number!</p>
            </div>:null
            }
            {/* {
            otpSent &&<div >  
              <p style={{fontSize: '15px', color:'#17912D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >OTP sent!</p>
              </div>
            } */}
           <div className='phoneText'>
           { showOtpInput && <Input type="text" label='OTP' placeholder='Enter OTP' onChange={(e) => setOtpCode(e.target.value)}  maxLength={6} /> }
           { showNumberInput && <Input type="text" label='+91' placeholder='9090909090' onChange={(e) => setPhoneNumber(e.target.value)} maxLength={10} /> }
            </div>
            
            { showSendOtpButton && <button className='sendOTP' onClick={sendOtp}>Send OTP</button> }
            { showVerifyOtpButton && <button className='verifyOTP' onClick={verifyOtp} >Verify OTP</button> }
             <button className='closePhoneAuthDiv' onClick={closeDiv}>Close</button>

          </div>
          
        </div>
      )}

              <div id='sign-in-button'> </div>
              </header>
            </div>
          );
       
        })
      )}
    </div>
  );
  
}

export default UserSettings;