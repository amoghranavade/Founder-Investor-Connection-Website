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

  onAuthStateChanged(auth, (user) => {
    if(user) {
      navigate('/');
  }

  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [errorUniqueEmail, setErrorOne] = useState(false);
  const [errorPasswordMatch, setErrorTwo] = useState(false);
  const [errorEmptyFields, setErrorThree] = useState(false);
  const [errorSmallPassword, setErrorFour] = useState(false);
 
  

  const register = async () => {
  //   if(password === repassword || password !== null){
  //   auth.createUserWithEmailAndPassword(email,password).then((userCredential) => {
  //     navigate("/");
  //   })
  //   .catch((error)=>{
  //     setErrorOne(true);
  //   })
  // }

  // else {
  //   setErrorTwo(true);
  // }
      
    
    if(password.trim().length === 0 || repassword.trim().length === 0 || fullname.trim().length === 0 || email.trim().length === 0)
    {
     setErrorThree(true);
     setErrorOne(false);
     setErrorTwo(false);
     setErrorFour(false);
    }
    else
    {
      if(password === repassword){
        if(password.trim().length > 5){
        try {
         const user = await createUserWithEmailAndPassword(
         auth,
         email,
         password
         );
        navigate("/");
            } catch (error) {
        setErrorThree(false);
        setErrorOne(true);
        setErrorTwo(false);
        setErrorFour(false);
      // setErrorTwo(errorPasswordMatch.message);
          }
        }
        else{
            setErrorFour(true);
            setErrorThree(false);
            setErrorOne(false);
            setErrorTwo(false);
        }
      }

      else {
        setErrorThree(false);
        setErrorOne(false);
        setErrorTwo(true);
        setErrorFour(false);
      }
    }
   

   
  };
 
  return (
    
    
    <div className="Register">
    
      <header className="Register-header">
      <div className="RegisterCard">
        <br/>
        <br/>
        <p style={{fontSize: '28px'}}>
          Register to GrowthCAP
        </p>
        {/* <text style={{fontSize: 16, alignItems: 'top'}}>Username</text>
        <Input style={{width: "300px", height: '40px', fontSize: 16}}  placeholder='username' />
       
        <br/>
        <Input style={{width: "300px", height: '40px', fontSize: 16}}  placeholder='password' type='password' />
        <br/> */}
        {
        errorUniqueEmail ? <div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Email already registered!</p>
        </div>:null
        }
        {errorPasswordMatch &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Passwords Dont Match!</p>
        </div>
        }
        {errorEmptyFields &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Please fill all the details!</p>
        </div>
        }
        {errorSmallPassword &&<div style={{ border: '1px solid red', borderRadius: '5px', width:'80%', backgroundColor:'#FCDCE0', marginBottom: 20}} >  
        <p style={{fontSize: '15px', color:'#8F181D',textAlign: 'center', marginBottom: 5, marginTop: 5}} >Password to be more than 6 chars!</p>
        </div>
        }
        
        <Input style={{width:'80%', fontSize:'17px'}} icon='envelope' iconPosition='left' placeholder='Email' onChange = {(e) => setEmail(e.target.value)}/>
        <br/>
        <Input style={{width:'80%', fontSize:'17px'}} icon='user' iconPosition='left' placeholder='Full Name' onChange = {(e) => setFullName(e.target.value)}/>
        <br/>
        <Input style={{width: "80%", fontSize: '17px'}} icon='key' iconPosition='left' placeholder='password' type='password' onChange = {(e) => setPassword(e.target.value)}/>
        <br/>
        <Input style={{width: "80%", fontSize: '17px'}} icon='key' iconPosition='left' placeholder='re-enter password' type='password' onChange = {(e) => setRPassword(e.target.value)}/>
        <br/>
        <br/>
        <Button style={{width: "80%",backgroundColor: '#238636', color : '#FFF'}}  animated async onClick={register}>
          <Button.Content style={{fontSize: 18, fontFamily:'Poppins', fontWeight:500}}  visible>Register</Button.Content>
           <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
        <br/>
        <text style={{fontSize: 17}}>Already a member?<Link to="/login"> Login now!</Link></text>
        <br/>
        <br/>
        

       
        </div>
        {/* <div className="CardTwo">
        </div> */}
      </header>
    </div>
  );
}

export default Register;