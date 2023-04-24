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
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


const Login = () => {

  // const CustomTextField = styled(TextField)({
  //   '& .MuiOutlinedInput-root': {
  //     '& fieldset': {
  //       borderColor: 'white', // customize border color here
  //     },
  //     '&:hover fieldset': {
  //       borderColor: 'white', // customize border color on hover here
  //     },
  //     '&.Mui-focused fieldset': {
  //       borderColor: '2px solid rgb(13, 109, 200)', // customize border color when focused here
  //     },
  //     backgroundColor: '#CDD8F5',
  //     fontSize: '15px',
  //     width: '16vw',
    
  //   },
  // });




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
      localStorage.setItem('user', JSON.stringify(user));
        navigate('/homepagef');
     } else if (userType === 'investor') {
      localStorage.setItem('user', JSON.stringify(user));
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
      // console.log(error)
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
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5, cursor:'pointer'}} onClick= {reset} >Invalid credentials! Forgot?</p>
        </div>
        }
        {
        resetMailSent &&<div style={{ border: '1px solid green', borderRadius: '5px', width:'80%', backgroundColor:'#D8FEDD', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#17912D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Reset link sent on this mail!</p>
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
            style={{ width: '80%', fontSize: '15px', backgroundColor: '#CDD8F5' }}
            icon='users'
            iconPosition='left'
            placeholder='Email'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            onChange={(e) => setEmail(e.target.value)}
        />
        {/* <CustomTextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
        <br />
        <Input
            className={`input ${passwordFocus ? 'focused' : ''}`}
            style={{ width: '80%', fontSize: '15px' }}
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
        <text style={{fontSize: 17, position: 'relative', top:'50%'}}>New here?<Link to="/register" style={{color:'#3783DF'}}> Register now!</Link></text>
        {/* lineHeight: 30 */}
       
        </div>
        <p className='loginFooter'><a href='./' style={{color: 'lightslategrey'}}>GrowthCAP 2023</a> | <a href='./terms' style={{color: 'rgb(218, 232, 245)'}}>Terms & conditions</a></p>
      </header>
    </div>
  );
}

export default Login;