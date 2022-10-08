
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Routes, Route } from 'react-router-dom';
// import Homepage from "../Homepage/homepage";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Form, Checkbox, Icon, Rating, Input } from 'semantic-ui-react';
import React, { useEffect } from 'react';



function Register() {
//   const navigate = useNavigate();
//   const navigateToHomepage = () => {
//     navigate(-1);
//   };
 
    
  
  useEffect(() => {
    document.title = 'GrowthCAP - Register';
  });
 
 
  return (
    
    <div className="Login">
    
      <header className="Login-header">
      <div className="Card">
        <p>
          GrowthCAP - Register
        </p>
        <text style={{fontSize: 16, alignItems: 'top'}}>Username</text>
        <Input style={{width: "300px", height: '40px', fontSize: 16}}  placeholder='username' />
        <br/>
        <Input style={{width: "300px", height: '40px', fontSize: 16}}  placeholder='password' type='password' />
        <br/>
        <Button style={{width: "300px", height: '40px',backgroundColor: '#238636', color : '#FFF'}}  animated>
          <Button.Content style={{fontSize: 18}}  visible>Register</Button.Content>
           <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
        <br/>
        <text style={{fontSize: 17}}>Already a member?<Link to="/login">Login now!</Link></text>

       
        </div>
      </header>
    </div>
  );
}

export default Register;