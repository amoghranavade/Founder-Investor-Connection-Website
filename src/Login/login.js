
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Routes, Route } from 'react-router-dom';
// import Homepage from "../Homepage/homepage";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Icon, Rating, Input } from 'semantic-ui-react';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



function Login() {
  const navigate = useNavigate();
  const navigateToHomepage = () => {
    navigate("/");
  };
 
    
  
  useEffect(() => {
    document.title = 'GrowthCAP - Login';
  });
 
 
  return (
    
    <div className="Login">
    
      <header className="Login-header">
      <div className="Card">
        <p>
          GrowthCAP - Login
        </p>
        {/* <text style={{fontSize: 16, alignItems: 'top'}}>Username</text> */}
        {/* <Input style={{width: "300px", height: '40px', fontSize: 16}}  placeholder='username' />
        <br/>
        <Input style={{width: "300px", height: '40px', fontSize: 16}}  placeholder='password' type='password' />
        <br/> */}
      
      <TextField id="outlined-basic" label="Username" variant="outlined" />
       <br/>
       <br/>
        <TextField
          style={{
            backgroundColor: "white",
            width: '60%',
            borderRadius: '5%'
        }}
        InputProps={{
            style: {
                color: "black",
                fontSize: '15px '
            }
        }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
       <br/>
       <br/>

        <Button style={{width: "420px", height: '40px', backgroundColor: '#238636', color : '#FFF'}}  animated onClick={navigateToHomepage}>
          <Button.Content style={{fontSize: 18}}  visible>Login</Button.Content>
           <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
        <br/>
        <text style={{fontSize: 17}}>New here?<Link to="/register">Register now!</Link></text>

       
        </div>
      </header>
    </div>
  );
}

export default Login;