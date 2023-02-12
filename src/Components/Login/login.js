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
import {  updateDoc, addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db , auth} from '../Assets/Database/firebase-config';
import { ImCross } from "react-icons/im";
import { async } from '@firebase/util';


const Login = () => {
  let [users, setUsers] = useState([]);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);  
 

  useEffect(() => {
    document.title = 'GrowthCAP - Login';
  });


  const checkType = async (user) => {
   
    if (!user) return;

      const usersCollectionRef = collection(db, 'app', 'users', user.uid);
      
      const data = await getDocs(usersCollectionRef);
      
      setUsers((users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
      const [userType] = users.map((user) => user.type);
    
     if (userType === 'founder') {
        navigate('/homepagef');
     } else if (userType === 'investor') {
       navigate('/homepagei');
      }
  };



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetMailSent, setReset] = useState(false);
  const [mailNotVerified, setMailVerifyError] = useState(false);
  const [errorInvalidCred, setError] = useState(false);
  const [errorEmptyFields, setErrorEmpty] = useState(false);

  const [labelForgot, setLabel] = useState(false);
  // const {logIn, googleSignIn}  = useUserAuth();
  const navigate = useNavigate();
 
  const reset = async () => {
    sendPasswordResetEmail(auth, email)
    setReset(true);
    setErrorEmpty(false);
    
    // setLabel(false);
    setError(false);
    setErrorEmpty(false);
  }

 

  const login = async () => {

    if(email.trim().length === 0) {
          setErrorEmpty(true);
          setError(false);
          setReset(false);
    }

    else {
     await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
     
        onAuthStateChanged(auth, (user) => {
          if (user?.emailVerified) {
            checkType(user);
          }

          else {
            navigate('/verifymail');
          }
        });
      
        
     
    })
    .catch((error) => {
          setError(true);
          setReset(false);
          setErrorEmpty(false);
        
      });
    };
  }
  

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
        {errorEmptyFields &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Please fill all the details!</p>
        </div>
        }
        {
        mailNotVerified &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Mail is not verified!</p>
        </div>
        }

        <Input
            className={`input ${emailFocus ? 'focused' : ''}`}
            style={{ width: '80%', fontSize: '16px' }}
            icon='users'
            iconPosition='left'
            placeholder='Email'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Input
            className={`input ${passwordFocus ? 'focused' : ''}`}
            style={{ width: '80%', fontSize: '16px' }}
            icon='key'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            onChange={(e) => setPassword(e.target.value)}
        />
        

        <Button style={{width: "80%", backgroundColor: '#238636', color : '#FFF',marginTop: '5%'}}  animated='vertical' async onClick={login}>
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