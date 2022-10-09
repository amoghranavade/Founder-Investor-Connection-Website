import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Label, Button, Icon, Rating, Input } from 'semantic-ui-react';
import React, { useEffect } from 'react';

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
        <p style={{fontSize: '30px'}}>
          GrowthCAP - Login
        </p>
        {/* <text style={{fontSize: 16, alignItems: 'top'}}>Username</text> */}
        {/* <Label basic color='green' pointing='below'>
        Please enter a value
      </Label> */}

        <Input style={{width:'80%', fontSize:'18px'}} icon='users' iconPosition='left' placeholder='Username' />
        <br/>
        <Input style={{width: "80%", fontSize: '18px'}} icon='key' iconPosition='left' placeholder='password' type='password' />
        <br/>
      
      
        <br/>
      

        <Button style={{width: "80%", backgroundColor: '#238636', color : '#FFF'}}  animated onClick={navigateToHomepage}>
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