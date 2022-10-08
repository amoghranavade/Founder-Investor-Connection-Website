
import './login.css';
import { useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Routes, Route } from 'react-router-dom';
// import Homepage from "../Homepage/homepage";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Icon, Rating } from 'semantic-ui-react';
import React, { useEffect } from 'react';


function Login() {
  const navigate = useNavigate();
  const navigateToHomepage = () => {
    navigate(-1);
  };
 
    
  
  useEffect(() => {
    document.title = 'GrowthCAP - Login';
  });
 
 
  return (
    
    <div className="App">
    
      <header className="App-header">
        
        <p>
          GrowthCAP Inc. <code>- Login Portal</code>
        </p>
        
        <Button animated onClick={navigateToHomepage}>
          <Button.Content visible>Developer Login</Button.Content>
           <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>

       
        
      </header>
    </div>
  );
}

export default Login;