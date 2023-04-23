import './homepagef.css';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Rating, Step, Confirm, Card, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import FounderNavbar from './foundernavbar';
import about1 from'../Assets/Images/about1.jpg';
import founder1 from'../Assets/Images/founder1.png';
import founder2 from '../Assets/Images/founder2.jpg';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from '../Assets/Database/firebase-config';

function Homepage() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openKYCWarning, setOpenWarning] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenWarning(false);
  };

  const navigate = useNavigate();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    if(user) {
      setUser(currentUser);
    } else {
      navigate('/login')
    }
  });

  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate('/login')
  };

  const userSettings = async () => {
    navigate('/usersetting')
  };
 
  useEffect(() => {
    document.title = 'GrowthCAP - Founder';
  });

  return (
    <header className='founder-homepage-header'>
    <div className="founderHomepage">
      <Snackbar open={openKYCWarning} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Please complete your KYC in settings before listing your startup!
        </Alert>
      </Snackbar>

      <FounderNavbar />

      <div className="image-text-container">
        <div className="image-container">
        <img style={{ height:'350px', width:'450px', marginTop:"70px", marginLeft:"12%", borderRadius:"20px"}} src={founder1}  alt="about1"/>
        </div>
        <div className="text-container">
          
          <h2 > Choosing money: </h2>
          <p style={{paddingRight:"10%"}}>
         A founder who gives up more equity to attract investors builds a more valuable company than one who parts 
         with less—and ends up with a more valuable slice, too. Founders who understand that they are motivated more by wealth than by control will themselves bring in new CEOs.
          </p>
        </div>
      </div>

      <div className="text-image-container">
        <div className="text-container">
          <div style={{marginTop:"-20%"}}>
          <h2 > Choosing power: </h2>
          <p style={{paddingLeft:"10%"}}>
           Founders motivated by control will make decisions that enable them to lead the business at the expense 
           of increasing its value. Choosing between money and power allows entrepreneurs to come to grips with
            what success means to them.
          </p>
          </div>
        </div>
        <div className="image-container">
        <img style={{ height:'400px', width:'450px', marginBottom:"40px", borderRadius:"20px"}} src={founder2}  alt="about1"/>
        </div>
      </div>
    </div>
    </header>
  );
}

export default Homepage;