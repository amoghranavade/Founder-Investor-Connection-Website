import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Icon,Input } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
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
    if(user) {
      navigate('/');
  }

  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const {logIn, googleSignIn}  = useUserAuth();
  const navigate = useNavigate();
 

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    } catch (error) {
      setError(error.message);
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
        <p style={{fontSize: '30px'}}>
          GrowthCAP - Login
        </p>
        {error &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '20px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Invalid credentials</p>
        </div>
        
        }
        <Input style={{width:'80%', fontSize:'18px'}} icon='users' iconPosition='left' placeholder='Email' onChange = {(e) => setEmail(e.target.value)}/>
        <br/>
        <Input style={{width: "80%", fontSize: '18px'}} icon='key' iconPosition='left' placeholder='password' type='password' onChange = {(e) => setPassword(e.target.value)} />
        <br/>
        <br/>

        <Button style={{width: "80%", backgroundColor: '#238636', color : '#FFF'}}  animated='vertical' async onClick={login}>
          <Button.Content style={{fontSize: 18}}  visible>Login</Button.Content>
           <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
        <br/>
        <text style={{fontSize: 17}}>New here?<Link to="/register"> Register now!</Link></text>
        {/* lineHeight: 30 */}
       
        </div>
      </header>
    </div>
  );
}

export default Login;