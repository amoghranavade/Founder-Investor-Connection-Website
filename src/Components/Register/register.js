import './register.css';
import { db, auth} from '../Assets/Database/firebase-config';

import { addDoc, getDocs, collection, query, where, onSnapshot } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import { Button,Label, Icon, Input } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import founder from'../Assets/Images/founder.png';
import mainLogo from'../Assets/Images/mainlogo.png';
import flyer from'../Assets/Images/GrowthCap-Register.jpg';
import investor from'../Assets/Images/investor.png';

// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


function Register() {

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleAccept = () => {
    setOpen(false);
    setChecked(true);
  };

  const handleDecline = () => {
    setOpen(false);
    setChecked(false);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);



  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  // const usersCollectionRef = collection(db, 'users');

  //  onAuthStateChanged(auth, (user) => {
  //   if(user) { 
  //     const usersCollectionRef = collection(db, 'users/'+ user.uid);  
  // }
  // });
 
  

  useEffect(() => {
    document.title = 'GrowthCAP - Register';
  });

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [errorUniqueEmail, setErrorOne] = useState(false);
  const [errorPasswordMatch, setErrorTwo] = useState(false);
  const [errorEmptyFields, setErrorThree] = useState(false);
  const [errorSmallPassword, setErrorFour] = useState(false);
  const [errorInvalidMail, setErrorFive] = useState(false);
  const [errorInvalidName, setErrorSix] = useState(false);
 
  let usersCollectionRef = null;

  onAuthStateChanged(auth, (user) => {
    if(user) { 
      
      usersCollectionRef = collection(db, 'app', 'users', user.uid)
    }
  });

  // onAuthStateChanged(auth, (user) => {
  //   if(user) { 
      
  //     usersCollectionRef = collection(db, 'users').doc(user.uid);
  //   }
  // });
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/; 
  const firstnameRegex = /^[a-zA-Z]+$/;
  const surnameRegex = /^[a-zA-Z]+$/;
 
  const isEmailValid = (email) => {
    return emailRegex.test(email);
  }

  const register = async () => {
  
    if(password.trim().length === 0 || repassword.trim().length === 0 || firstname.trim().length === 0 || surname.trim().length === 0 || email.trim().length === 0)
    {
     setErrorThree(true);
     setErrorOne(false);
     setErrorTwo(false);
     setErrorFour(false);
     setErrorFive(false);
     setErrorSix(false);
    }
    else
    {
      if(!firstnameRegex.test(firstname) || !surnameRegex.test(surname)) {
        setErrorSix(true);
        setErrorThree(false);
        setErrorOne(false);
        setErrorTwo(false);
        setErrorFour(false);
        setErrorFive(false);
      }
    
      
      else if(password === repassword){
        if(password.trim().length > 5){
        try {
         const result = await createUserWithEmailAndPassword(
         auth,
         email,
         password
         )
         const user = result.user;
         const fullName = firstname + ' ' + surname;
       
         await addDoc(usersCollectionRef, {uid: user.uid, name: fullName, firstname: firstname, surname: surname, email: email, phone: 'Not registered', accountCreatedDate: formattedDate, lastreset: '01/01/2000 12:00:00'});
      
            
        navigate("/verifymail");
        
        
            } catch (error) {
        setErrorThree(false);
        setErrorOne(false);
        setErrorTwo(false);
        setErrorFour(false);
        setErrorSix(false);
        setErrorFive(false);
       
        if (error.code === 'auth/email-already-in-use') {
          setErrorOne(true);
        } 
        else {
          setErrorFive(true);
        }
 
          }
        }
        else if(password.trim().length<5){
            setErrorFour(true);
            setErrorThree(false);
            setErrorOne(false);
            setErrorTwo(false);
            setErrorFive(false);
            setErrorSix(false);
        }

        
      }

      else if(password !== repassword) {
        setErrorThree(false);
        setErrorOne(false);
        setErrorTwo(true);
        setErrorFour(false);
        setErrorFive(false);
        setErrorSix(false);
      }
    }

  };


  

  return (
    
    
    <div className="Register">
    
      <header className="Register-header">
        <div className='parentDiv'>
        <div className='infoCard' style={{backgroundImage: `url(${flyer})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <p className='infoCardHeader'>GrowthCAP - Gr</p>
        
          
          {/* <div className='insideDivInfo'>
            <p>Showcase your ideas, or invest in startups with potential scope!</p>
          </div> */}
        </div>
      <div className="registerCard" >
        <br/>
        <br/>
        <p className='registerCardHeader'>ow With Us!</p> 
        {/* <p style={{fontSize: '28px', display: 'flex', alignItems: 'center'}}>
          
          <img style={{ height:'80px', width:'80px'}} src={founder}  alt="GrowthCAP-founder"/>
           &nbsp;<Icon name='handshake outline'/>
          <img style={{ height:'80px', width:'80px'}} src={investor}  alt="GrowthCAP-investor"/>
          =
          &nbsp;
          <img style={{ height:'100px', width:'75px'}} src={mainLogo}  alt="GrowthCAP-logo"/>
          
        
        </p> */}
        
        {
        errorUniqueEmail ? <div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Email already registered!</p>
        </div>:null
        }
        {errorPasswordMatch &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Passwords Dont Match!</p>
        </div>
        }
        {errorEmptyFields &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Please fill all the details!</p>
        </div>
        }
        {errorSmallPassword &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Password to be more than 6 chars!</p>
        </div>
        }
        {errorInvalidMail &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Please enter a valid mail!</p>
        </div>
        }
        {errorInvalidName &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Please enter a valid fullname!</p>
        </div>
        }
        
        
        <Input style={{width:'80%', fontSize:'16px'}} icon='envelope' iconPosition='left' placeholder='Email' onChange = {(e) => setEmail(e.target.value)}/>
        {/* <TextField
        style={{width:'80%', fontSize:'19px', color:'white'}}
          required
          id="filled-required"
          label="Email"
          defaultValue="john@mail.com"
          // variant="filled"
          onChange = {(e) => setEmail(e.target.value)}
        /> */}
        <br/>
        <div style={{ display: 'flex', marginBottom:'4%'}}>
          <Input maxLength={15} style={{ width: '40%', flexBasis: '40%',  transform: 'translateX(25%)', marginRight: '10px', fontSize: '16px' }} icon='user' iconPosition='left' placeholder='Firstname' onChange={(e) => setFirstname(e.target.value)} />
          <Input maxLength={15} style={{ width: '40%', flexBasis: '40%',  transform: 'translateX(25%)', paddingRight:'10px', fontSize: '16px' }}  placeholder='Surname' onChange={(e) => setSurname(e.target.value)} />
        </div>

        <Input maxLength={20} style={{width: "80%", fontSize: '16px'}} icon='key' iconPosition='left' placeholder='Password' type='password' onChange = {(e) => setPassword(e.target.value)}/>
        <br/>
        <Input maxLength={20} style={{width: "80%", fontSize: '16px'}} icon='key' iconPosition='left' placeholder='Re-enter password' type='password' onChange = {(e) => setRPassword(e.target.value)}/>
        <br/>
        


        <label style={{display: "flex", alignItems: "center", fontSize: "16px"}}>
      <input
        type="checkbox"
        style={{width: "17px", height: "17px", marginRight: "10px"}}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      I accept the&nbsp; 
        <a onClick={handleClickOpen('paper')} >
         Terms & Conditions
        </a>
      {/* <a href="./terms" target="_blank" rel="noopener noreferrer">
         Terms & Conditions
      </a> */}
    </label>

    <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">GrowthCAP - Terms & Conditions</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography textAlign="justify" sx={{fontWeight: 600}}>
            {[...new Array(1)]
              .map(
                () => ` By accessing and using this website, you agree to be bound by the terms and conditions outlined herewithin. The information on this website is intended for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Investment opportunities posted on this website are private placements and are available only to accredited investors who meet the Securities and Exchange Commission's definition of accredited investor. The information contained on this website does not purport to be complete and is subject to change without notice. No representation or warranty, express or implied, is made as to the accuracy or completeness of the information contained on this website, and nothing contained on this website is, or shall be relied upon as, a promise or representation, whether as to the past or future. This website is committed to protecting your privacy. Personal information collected through this website is used only for the purpose for which it was collected and will not be shared with third parties except as required by law. This website may use cookies to improve your experience and to collect anonymous data for analytical purposes. By using this website, you consent to the use of cookies in accordance with this Privacy Policy. If you do not wish to have cookies placed on your computer, you can disable them in your browser's settings. However, this may impact your experience on this website. This website may also contain links to other websites. We are not responsible for the privacy practices of those websites and encourage you to read their privacy policies before submitting any personal information.  The contents of this website are protected by copyright and trademark laws and may not be copied, reproduced, or used in any manner without the express written consent of the website owner. The website owner assumes no responsibility for any errors or omissions on this website and shall have no liability for any loss or damage of any kind arising from the use of this website.
                   This website may contain forward-looking statements that are subject to risks and uncertainties that could cause actual results to differ materially from those projected. These statements are based on current expectations, estimates, projections, and beliefs and involve a number of risks and uncertainties that could cause actual results to differ materially from those expressed or implied. The website owner makes no commitment to update the information contained on this website. Your use of this website indicates your agreement to be bound by the terms and conditions outlined above.`,
              )
              .join('\n')
            }
              </Typography>
              
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='declineButton' onClick={handleDecline}>DECLINE</button>
          <button className='acceptButton' onClick={handleAccept}>ACCEPT</button>
        </DialogActions>
      </Dialog>


        <br/>
        <Button
        style={{
          width: "80%",
          backgroundColor: "#4A45FF",
          color: "#FFF",
          fontSize: 18,
          fontFamily: "Poppins",
          fontWeight: 500,
          cursor: checked ? "pointer" : "no-drop",
        }}
        animated
        disabled={!checked}
        onClick={register}
      >
        <Button.Content visible>Let's go</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
        <br/>
        <text style={{fontSize: 17}}>Already a member?<Link to="/login"> Login now!</Link></text>
        <br/>
        <br/>
        

       
        </div>
        </div>
        <p className='registerFooter'><a href='./' style={{color: 'lightslategrey'}}>GrowthCAP 2023</a> | All rights reserved | About</p>
        {/* <div className="CardTwo">
        </div> */}
      </header>
    </div>
  );
}

export default Register;