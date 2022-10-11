import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Button,Label, Icon, Input } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from '../Assets/Database/firebase-config';

function Register() {
  const navigate = useNavigate();
//   const navigateToHomepage = () => {
//     navigate(-1);
//   };
  useEffect(() => {
    document.title = 'GrowthCAP - Register';
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
 
  return (
    
    
    <div className="Register">
    
      <header className="Register-header">
      <div className="Card">
        <br/>
        <br/>
        <p>
          GrowthCAP - Register
        </p>
        {/* <text style={{fontSize: 16, alignItems: 'top'}}>Username</text>
        <Input style={{width: "300px", height: '40px', fontSize: 16}}  placeholder='username' />
       
        <br/>
        <Input style={{width: "300px", height: '40px', fontSize: 16}}  placeholder='password' type='password' />
        <br/> */}
     
        <Input style={{width:'80%', fontSize:'18px'}} icon='envelope' iconPosition='left' placeholder='Email' onChange = {(e) => setEmail(e.target.value)}/>
        <br/>
        <Input style={{width:'80%', fontSize:'18px'}} icon='users' iconPosition='left' placeholder='Username' />
        <br/>
        <Input style={{width: "80%", fontSize: '18px'}} icon='key' iconPosition='left' placeholder='password' type='password' />
        <br/>
        <Input style={{width: "80%", fontSize: '18px'}} icon='key' iconPosition='left' placeholder='re-enter password' type='password' onChange = {(e) => setPassword(e.target.value)}/>
        <br/>
        <br/>
        <Button style={{width: "80%", height: '40px',backgroundColor: '#238636', color : '#FFF'}}  animated async onClick={register}>
          <Button.Content style={{fontSize: 18}}  visible>Register</Button.Content>
           <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
        <br/>
        <text style={{fontSize: 17}}>Already a member?<Link to="/login"> Login now!</Link></text>
        <br/>
        <br/>
        

       
        </div>
      </header>
    </div>
  );
}

export default Register;