import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Button,Label, Icon, Input } from 'semantic-ui-react';
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
     
        <Input style={{width:'80%', fontSize:'18px'}} icon='envelope' iconPosition='left' placeholder='Email' />
        <br/>
        <Input style={{width:'80%', fontSize:'18px'}} icon='users' iconPosition='left' placeholder='Username' />
        <br/>
        <Input style={{width: "80%", fontSize: '18px'}} icon='key' iconPosition='left' placeholder='password' type='password' />
        <br/>
        <Input style={{width: "80%", fontSize: '18px'}} icon='key' iconPosition='left' placeholder='re-enter password' type='password' />
        <br/>
        <br/>
        <Button style={{width: "80%", height: '40px',backgroundColor: '#238636', color : '#FFF'}}  animated>
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