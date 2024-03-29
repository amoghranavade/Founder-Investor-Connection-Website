import './usersetting.css';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Icon, Rating, Step, Confirm, Card, Image, Popup} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import CircularProgress from '@mui/material/CircularProgress';

import MenuOpenIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

import Box from '@mui/material/Box';
import React, {useEffect, useState } from 'react';
import founder from'../Assets/Images/founder.png';
import {onSnapshot,  updateDoc, addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import santaHat from'../Assets/Images/santa_hat_U01_EDITED.png';
// import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import mainLogo from'../Assets/Images/mainlogo.png';
import {
  sendPasswordResetEmail,
  linkWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { storage, db , auth} from '../Assets/Database/firebase-config';
import { unlink, getAuth, RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth';
import { red } from '@mui/material/colors';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Avatar from '@mui/material/Avatar';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});







function UserSettings() {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
    setOpenWarning(false);

  };

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
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [showNumberInput, setShowNumberInput] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSendOtpButton, setShowSendOtpButton] = useState(true);
  const [showVerifyOtpButton, setShowVerifyOtpButton] = useState(false);
  const [code, setOtpCode] = useState("");
  const appVerifier = window.recaptchaVerifier;
  const phoneRegex = /^[7-9][0-9]{9}$/;
  const [number, setPhoneNumber] = useState("");
  const [errorInvalidPhone, setErrorOne] = useState(false);
  const [errorInvalidOTP, setErrorTwo] = useState(false);
  // const [otpSent, setSuccessTwo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPhoneNav, setShowPhoneNav] = useState(false);

  const [showButtonDelink, setShowDelink] = useState(false);
  const [showButtonUpdate, setShowUpdate] = useState(false);
  // const [numberValue, setNumber] = useState('');
  
  const [showResetAlert, setShowAlert ] = useState(false);
  const [showErrorAlert, setErrorAlert ] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [users, setUsers] = useState([]);
  const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(false);
  

  const paragraph = document.getElementById('phone');

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const navbarPhoneLayout = document.querySelector('.navbarPhoneLayout');
  const navigate = useNavigate();

  // const user = auth.currentUser;
  let user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        // User is not in localStorage, fetch user from auth
        user = auth.currentUser;
        localStorage.setItem('user', JSON.stringify(user));
      }







  useEffect(() => {
    document.title = 'GrowthCAP - Settings';

    const user = auth.currentUser;
    // user = auth.currentUser;
    // localStorage.setItem('user', JSON.stringify(user));



    if (user) {
     
      user
        .getIdTokenResult()
        .then(idTokenResult => {
          if (idTokenResult.claims.phone_number) {
            // console.log('Reaching IF')
            // User has a phone number linked to their account
            setShowUpdate(false);
            setShowDelink(true);
           
          } 

          else {
            // console.log('Reaching ELSE')
            setShowUpdate(true);
            setShowDelink(false);
          }
         
        })
        
        .catch(error => {
          console.error('Failed to get ID token result, contact GrowthCAP support if you are a tester. Error:', error);
        });
    }
  }, []);


  useEffect(() => {
   
    const imageRef = ref(storage, user.uid + '/profilepicture');

    getDownloadURL(imageRef)
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        console.error('Failed to retrieve profile picture:', error);
      });
  }, []);


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
    const user = auth.currentUser;

    if(!phoneRegex.test(number)){
      setErrorOne(true);
      setErrorTwo(false);
      // setSuccessTwo(false);
      

    }

    else {
      const phoneNumber = '+91' + number;
      setErrorOne(false);
      setErrorTwo(false);
      console.log(phoneNumber);
      // setSuccessTwo(true);
      linkWithPhoneNumber(user, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        setShowNumberInput(false);
        setShowOtpInput(true);
        setShowSendOtpButton(false);
        setShowVerifyOtpButton(true);
        setErrorOne(false);
        setErrorTwo(false);
     
      console.log('OTP SENT');
      window.confirmationResult = confirmationResult;
    }).catch((e) => {
     
      console.log(e);

      
    });

    }
  }




  const delinkButton = async(id) => {
    const userDoc = doc(db, 'app', 'users', user.uid, id)
    const newFields = {phone: 'Not registered'}
    await updateDoc(userDoc, newFields)
    const providerId = PhoneAuthProvider.PROVIDER_ID;
    unlink(auth.currentUser, providerId).then(() => {
      console.log('delinked');
      setShowDelink(false);
      setShowUpdate(true);
    }).catch((error) => {
      console.log(error);
   
    });
    
  }

  
  const verifyOtp = async(id) => {
    const phoneNumber = '+91' + number;
    window.confirmationResult.confirm(code).then(async result => {
      // const phoneNumber = '+91' + number;
      const userDoc = doc(db, 'app', 'users', user.uid, id)
      const newFields = {phone: phoneNumber}
      await updateDoc(userDoc, newFields)
      navigate('/usersetting');
      console.log("Correct OTP");
      setShowModal(false);
      setShowDelink(true);
      setShowUpdate(false);
      setShowNumberInput(true);
      setShowOtpInput(false);
      setShowSendOtpButton(true);
      setShowVerifyOtpButton(false);
      // setNumber(phoneNumber);
      paragraph.textContent = phoneNumber;

    }).catch((error) => {
      console.log(error);
      console.log("Invalid OTP");
      setErrorTwo(true);
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
    setErrorTwo(false);
    setShowModal(true);
    configureCaptcha()
  }





  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  const sendResetLink = async(id) => {
    
    const userDoc = doc(db, 'app', 'users', user.uid, id);
    // const [lastreset] = users.map((user) => user.lastreset);
      const [previousTimestamp] = users.map((user) => user.lastreset);
      const [previousDateStr, previousTimeStr] = previousTimestamp.split(' ');
      const [day, month, year] = previousDateStr.split('/');
      const [hours, minutes, seconds] = previousTimeStr.split(':');
      const previousDate = new Date(year, month - 1, day, hours, minutes, seconds);
      const now = new Date();
      const diffInMs = now - previousDate;
      const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 2) {
      console.log("too many requests hit");
      setShowAlert(false);
      setErrorAlert(true);
      setOpenWarning(true);
      setOpenSuccess(false);
    } 

    else {
      
      // const userDoc = doc(db, 'app', 'users', user.uid, id)
      const newFields = {lastreset: formattedDate}
      await updateDoc(userDoc, newFields)
      await sendPasswordResetEmail(auth, user.email)
    
      console.log("Reset Mail Sent");
      setShowAlert(true);
      setOpenSuccess(true);
      
      // onSnapshot(collection(db, 'app', 'users', user.uid), (querySnapshot) => {
      //   const updatedUsers = [];
      //   console.log(querySnapshot);
      //   querySnapshot.forEach((doc) => {
      //     updatedUsers.push({ uid: doc.id, ...doc.data() });
      //   });
      //   setUsers(updatedUsers);
      // });
    }

    setIsResetButtonDisabled(true);
    
  }



  
  
  const handleImageChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // console.log(image);

  const handleSubmit = () => {

    const imageRef = ref(storage, user.uid + '/profilepicture');
    uploadBytes(imageRef, image)
    .then(() => {
      getDownloadURL(imageRef)
      .then((url) => {
        setUrl(url);
      })
      .catch(error => {
        console.log(error.message);
      });
      setImage(null);
    })
    .catch(error => {
      console.log(error.message);
    });

  };
  
  const openPhoneNav = () => {
    setShowPhoneNav(true);
    // navbarPhoneLayout?.classList.add('visible');
  }

  const goToKyc = () => {
   
    navigate('/kyc');
  }
  
  const hidePhoneNav = () => {
    setShowPhoneNav(false);
  }

  const goToProfile = () => {
    navigate('/profile');
  }

  const goToHomepage = () => {
    window.history.back()
  }

  const goToSupport = () => {
    navigate('/contact');
  }

  const goToAbout = () => {
    navigate('/about');
  }

  const logout = async() => {
    await signOut(auth);
    localStorage.clear();
    navigate('/login')
  }


  
  return (
   
    <div>
      
      {!users || users.length === 0 ? (
         <div style={{position: 'relative'}}>
         {/* <img style={{marginLeft:'48%',marginTop :"15%", height:'150px', width:'100px'}} src={mainLogo}  alt="GrowthCAP-logo"/> */}
         {/* Contents of your current page */}
         <Box sx={{ display: 'flex', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 1 }}>
           <CircularProgress style={{ margin: 'auto' }} />
         </Box>
       </div>
      ) : (
        users.map((user) => {
        
          return (

            <div className="userSetting">
              {showResetAlert && (
                // <div onClick={() => hideResetAlert}>
              //  <Alert  style={{fontSize: '14px'}} className='passResetAlert' variant="filled" severity="success">
              //   A password reset mail was sent on <span style={{fontWeight: 700}}>{user.email}</span>
              // </Alert>
              // </div>

              <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                A password reset mail was sent on <span style={{fontWeight: 700}}>{user.email}</span>
                </Alert>
              </Snackbar>
              )}
              {showErrorAlert &&(
                //   <Alert  className='passResetAlert' variant="filled" severity="warning" style={{fontSize: '14px'}}>
                //   Too many requests received from this account! Try again in a few hours.
                // </Alert>

                <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Too many requests received from this account! Try again in a few hours.
                </Alert>
              </Snackbar>
              )}
              <header className="user-setting">
                <div className='settingTextMobileView'>
                   <p className='settingText'>Settings</p>
                   <MenuOpenIcon onClick={openPhoneNav} sx={{display: { xs: 'flex', md: 'none' },fontSize:'30px', marginRight:'2%', marginBottom:'1%'}}/>
                </div>

                <div className="user-pic-container">



                  <div>
                    <label id='avatarInput'>
                    <Avatar
                      className='avatarMobileView'
                      alt={user.type}
                      src={url}
                      sx={{ 
                        display: { xs: 'none', md: 'flex' },
                        width: 110, 
                        height: 110, 
                        cursor: 'pointer',
                        transition: 'opacity 0.3s ease-in-out',
                        '&:hover': {
                          opacity: 0.4,
                        },
                      }}
                    />
                    <Avatar
                      className='avatarMobileView'
                      alt={user.type}
                      src={url}
                      sx={{ 
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        width: 90, 
                        height: 90, 
                        cursor: 'pointer',
                        transition: 'opacity 0.3s ease-in-out',
                        '&:hover': {
                          opacity: 0.4,
                        },
                      }}
                    />

                  
                    <input
                      id="avatarInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    </label>
                  </div>


                
                    {/* <input type='file' onChange={handleImageChange}/> 
                    
                     <button >Upload Pic</button>  */}
                 





                  <div className="parent">
                     <p className="mainName">{user.name}</p>
                     <div className='userType'>
                       <p>{user.type}</p>
                       {/* <button className='signOutButton'>Sign-out</button> */}
                     </div>
                 </div>
                </div>


                <button onClick={handleSubmit} className="ui primary button save-and-upload" fdprocessedid="74s44">Save</button>
      

                <div className="basicPad">
                  <div className='basicPadHeader'>
                    <p className='basicPadHeaderText'>General</p>
                  </div>

                  <p className="nameTag">Display Name</p>
                  <p className="nameContent">{user.name}</p>
                  <div className="passwordResetButtonContainer">
                    <p className="passwordTag">Password</p>
                    <div className="passwordContentContainer">
                      <p className="passwordContent">⚪ ⚪ ⚪ ⚪ ⚪ ⚪</p>
                      <button  className={`resetButton ${isResetButtonDisabled ? 'disabledButton' : ''}`}  onClick={() => sendResetLink(user.id)}   disabled={isResetButtonDisabled}>Reset</button>
                    </div>
                  </div>

                

                  <div className="mobileUpdateButtonContainer">
                    <p className="phoneTag">Phone</p>
                    <div className="mobileContentContainer">
                      <p id = 'phone' className={user.phone === "Not registered" ? "phoneContentNotRegistered" : "phoneContent"}>{user.phone}</p>
                      
                      {showButtonUpdate && (
                      <button className="updateButton" onClick={updateButton}>Update</button>
                      
                      )}
                      {showButtonDelink && (
                      <button className="delinkButton"  onClick={() => delinkButton(user.id)}>Delink</button>
                      )}
                    </div>
                  </div>
                </div>



                <div className='accountPad'>
                    <div className='accountPadHeader'>
                       <p className='accountPadHeaderText'>Account</p>
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
  
                {!isHidden && (
                  <>
                    <p className="uidContent">{user.uid}</p>
                    
                    <p className="deleteAccount" onClick={deleteAccount}>
                      Delete my account
                    </p>
                  </>
                )}
                    
                     
                     <p className="userSinceTag">User Since: {user.accountCreatedDate}</p>
                    
                </div>

                <div className='otherVerification'>
                <div className='kycButtonDiv'>
                  <p className="statusTag" onClick={goToKyc}>Complete KYC <Popup
                                                        trigger={<button className='infoPopup'>i</button>}
                                                        content='Identity document verification is a mandatory process in accessing most of the GrowthCAP features.'
                                                        style={style}
                                                        inverted
                                                       /></p>

                      
                      {/* <button className="verifykycButton" onClick={goToKyc}>Verify</button> */}
                      
                     
                      
                  {/* <p className="statusContent">PENDING</p> */}
                  </div>
                  <p className="documentVerifiedTag">Document Verified</p>
                  <p className="documentVerifiedContent">None</p>
                  <div className='verificationRedirect'>
                    <p className='verificationDivText'>Know why verification is important<Icon name='arrow right' size='small' /></p>
                  </div>
                </div>


      {showModal && (
        <div className='phoneAuthDiv'>
         
          <div className='phoneAuthContent'>
          
            <p className='phoneAuthHeader'>Verify your mobile number!</p>
            {
            errorInvalidPhone ? <div >  
            <p style={{fontSize: '18px', color:'#FF4242',textAlign: 'center', marginBottom: '-5%'}} >Please enter a valid number!</p>
            </div>:null
            }
             {
            errorInvalidOTP ? <div >  
            <p style={{fontSize: '18px', color:'#FF4242',textAlign: 'center', marginBottom: '-5%'}} >Entered OTP is incorrect!</p>
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
            { showVerifyOtpButton && <button className='verifyOTP' onClick={() => verifyOtp(user.id)} >Verify OTP</button> }
             <button className='closePhoneAuthDiv' onClick={closeDiv}>Close</button>

          </div>

         
          
        </div>
      )}
      {showPhoneNav && (
          <div className='navbarPhoneLayout'>
            <div className='navbarPhoneLayoutBrief'>
              <p className='navbarPhoneHeading'>Where to?</p>
              <ClearIcon onClick={hidePhoneNav} sx={{display: { xs: 'flex', md: 'none' },color:'#A8A8A8', fontSize:'30px', marginTop:'10%', marginLeft:'50%'}}/>
            </div>
            <div className='navbarPhoneButtons'>
             
              <div style={{ display: 'flex'}}>
               <HomeIcon sx={{display: { xs: 'flex', md: 'none' },color:'#024E6A', fontSize:'35px', marginTop:'0%', marginLeft:'3%'}}/>
           
               <button onClick={goToHomepage} style={{backgroundColor:'whitesmoke', border:'none', color:'black', marginTop:'1%', marginLeft:'2%', fontFamily:'poppins', fontWeight:'500'}}>Homepage</button>
              </div> 
              <div style={{ display: 'flex'}}>
               <ContactSupportIcon sx={{display: { xs: 'flex', md: 'none' },color:'#78BDC4', fontSize:'35px', marginTop:'2%', marginLeft:'3%'}}/>
           
               <button onClick={goToSupport} style={{backgroundColor:'whitesmoke', border:'none', color:'black', marginTop:'1%', marginLeft:'2%', fontFamily:'poppins', fontWeight:'500'}}>Contact us</button>
              </div> 
              <div style={{ display: 'flex'}}>
               <InfoIcon sx={{display: { xs: 'flex', md: 'none' },color:'#4A45FF', fontSize:'35px', marginTop:'2%', marginLeft:'3%'}}/>
            
               <button onClick={goToAbout} style={{backgroundColor:'whitesmoke', border:'none', color:'black', marginTop:'1%', marginLeft:'2%', fontFamily:'poppins', fontWeight:'500'}}>About us</button>
              </div> 

              <div style={{ display: 'flex'}}>
               <PersonIcon sx={{display: { xs: 'flex', md: 'none' },color:'#2A6877', fontSize:'35px', marginTop:'2%', marginLeft:'3%'}}/>
               {/* <p style={{color:'black', marginTop:'2%', marginLeft:'4%', fontFamily:'poppins', fontWeight:'500'}}>Profile</p> */}
               <button onClick={goToProfile} style={{backgroundColor:'whitesmoke', border:'none', color:'black', marginTop:'1%', marginLeft:'2%', fontFamily:'poppins', fontWeight:'500'}}>Profile</button>
              </div> 
            
              <div style={{ display: 'flex'}}>
               <LogoutIcon sx={{display: { xs: 'flex', md: 'none' },color:'#F35959', fontSize:'35px', marginTop:'6%', marginLeft:'3%'}}/>
              
               <button onClick={logout} style={{backgroundColor:'whitesmoke', border:'none', color:'black', marginTop:'6%', marginLeft:'2%', fontFamily:'poppins', fontWeight:'500'}}>Logout</button>
              </div> 

            </div>
          </div>
      )}

      <div className='mobileViewDeleteAndSince'>
      <button className='deleteAccountMobileViewButton' onClick={deleteAccount}>Delete my account</button>
        <p className="userSinceTagMobileView">User Since: {user.accountCreatedDate}</p>
        
      </div>
      {/* <div className='colorGradient'>
        <p>h</p>

      </div> */}
      <div className='mobileViewFooter'>
        <p className='footerHeading'>#GROW<span className='headingSpan'>WITH</span>US</p>
        <p className='footerHeadingDot'>⚪</p>
        <p className='footerDescription'>Welcome to GrowthCAP, a mutual connection app for innovative startup founders & well established investors.</p>
        <p className='footerDescriptionDesign'>/\/\/\/\/\/\</p>
      </div>

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