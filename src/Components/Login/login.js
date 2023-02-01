import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Icon,Input } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import mainLogo from'../Assets/Images/mainlogo.png';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {Alert} from 'react-bootstrap'  
import { auth } from '../Assets/Database/firebase-config';
import { ImCross } from "react-icons/im";


const Login = () => {
  useEffect(() => {
    document.title = 'GrowthCAP - Login';
  });

  
  onAuthStateChanged(auth, (user) => {
    if(user.emailVerified) {
     
      // navigate('/');
  }
  else {
    setMailVerifyError(true);
  }

  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mailNotVerified, setMailVerifyError] = useState(false);
  const [errorInvalidCred, setError] = useState(false);
  const [resetMailSent, setReset] = useState(false);
  const [labelForgot, setLabel] = useState(false);
  // const {logIn, googleSignIn}  = useUserAuth();
  const navigate = useNavigate();
 
  const reset = async () => {
    sendPasswordResetEmail(auth, email)
    setReset(true);
    // setLabel(false);
    setError(false);
  }
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      
    } catch (error) {
      setError(true);
      setReset(false);
    }
  };
  
  // const handleGoogleSignIn = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await googleSignIn();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };



  // const navigateToHomepage = () => {
  //   // navigate("/");
  //   console.log(email);
  //   console.log(password);
  // };
  return (
    <div className="Login">
    
      <header className="Login-header">
      
          
      <div className="Card">
      <img  style={{ height:'160px', width:'120px'}} src={mainLogo}  alt="GrowthCAP-logo"/>
      <p style={{fontSize: '28px'}}>
          GrowthCAP - Login
        </p>
       
       
        {
        errorInvalidCred &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5, cursor:'pointer'}} onClick= {reset} >Invalid! Forgot Password?</p>
        </div>
        }
        {
        resetMailSent &&<div style={{ border: '1px solid green', borderRadius: '5px', width:'80%', backgroundColor:'#D8FEDD', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#17912D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Password reset mail sent!</p>
        </div>
        }
        {
        mailNotVerified &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Mail is not verified!</p>
        </div>
        }

        <Input style={{width:'80%', fontSize:'16px'}} icon='users' iconPosition='left' placeholder='Email' onChange = {(e) => setEmail(e.target.value)}/>
        <br/>
        <Input style={{width: "80%", fontSize: '16px'}} icon='key' iconPosition='left' placeholder='password' type='password' onChange = {(e) => setPassword(e.target.value)} />
        <br/>
        {/* {
        labelForgot &&  
        <text style={{fontSize: '15px', color:'#F56568',textAlign: 'center', marginBottom: 5, marginTop: 5, cursor: 'pointer'}} onClick={reset}>Forgot Password?</text>
        } */}
       

        <Button style={{width: "80%", backgroundColor: '#238636', color : '#FFF'}}  animated='vertical' async onClick={login}>
          <Button.Content style={{fontSize: 18, fontFamily:'Poppins', fontWeight:500}}  visible>Login</Button.Content>
           <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
        <br/>
        <text style={{fontSize: 17, position: 'relative', top:'50%'}}>New here?<Link to="/register"> Register now!</Link></text>
        {/* lineHeight: 30 */}
       
        </div>
      </header>
    </div>
  );
}

export default Login;