import './register.css';
import { db, auth} from '../Assets/Database/firebase-config';

import { addDoc, getDocs, collection, query, where, onSnapshot } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import { Button,Label, Icon, Input } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import founder from'../Assets/Images/founder.png';
import mainLogo from'../Assets/Images/mainlogo.png';
import investor from'../Assets/Images/investor.png';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


function Register() {

  
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
  const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/; 
  const isEmailValid = (email) => {
    return emailRegex.test(email);
  }

  const register = async () => {
  
    if(password.trim().length === 0 || repassword.trim().length === 0 || fullName.trim().length === 0 || email.trim().length === 0)
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
      if(!nameRegex.test(fullName)) {
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
       
         await addDoc(usersCollectionRef, {uid: user.uid, name: fullName, email: email, phone: 'Not registered', accountCreatedDate: formattedDate});
      
            
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
      <div className="RegisterCard">
        <br/>
        <br/>
        <p style={{fontSize: '28px', display: 'flex', alignItems: 'center'}}>
          
          <img style={{ height:'80px', width:'80px'}} src={founder}  alt="GrowthCAP-founder"/>
           &nbsp; + 
          <img style={{ height:'80px', width:'80px'}} src={investor}  alt="GrowthCAP-investor"/>
          =
          &nbsp;
          <img style={{ height:'100px', width:'75px'}} src={mainLogo}  alt="GrowthCAP-logo"/>
          
          {/* <div style={{fontSize: '15px', transform: 'rotate(270deg)', margin: '0 10px'}}> = GrowthCAP</div> */}
        </p>
        
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
        <br/>
        <Input style={{width:'80%', fontSize:'16px'}} icon='user' iconPosition='left' placeholder='Full Name' onChange = {(e) => setFullName(e.target.value)}/>
        <br/>
        <Input style={{width: "80%", fontSize: '16px'}} icon='key' iconPosition='left' placeholder='Password' type='password' onChange = {(e) => setPassword(e.target.value)}/>
        <br/>
        <Input style={{width: "80%", fontSize: '16px'}} icon='key' iconPosition='left' placeholder='Re-enter password' type='password' onChange = {(e) => setRPassword(e.target.value)}/>
        <br/>
        


        <label style={{display: "flex", alignItems: "center", fontSize: "16px"}}>
      <input
        type="checkbox"
        style={{width: "17px", height: "17px", marginRight: "10px"}}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      I accept the&nbsp; <a href="./terms" target="_blank" rel="noopener noreferrer">
         Terms & Conditions
      </a>
    </label>


        <br/>
        <Button
        style={{
          width: "80%",
          backgroundColor: "#4A45FF",
          color: "#FFF",
          fontSize: 18,
          fontFamily: "Poppins",
          fontWeight: 500,
          cursor: checked ? "pointer" : "not-allowed",
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
        {/* <div className="CardTwo">
        </div> */}
      </header>
    </div>
  );
}

export default Register;