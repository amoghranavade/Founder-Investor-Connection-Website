import './homepagef.css';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Rating, Step, Confirm, Card, Image} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import FounderNavbar from './foundernavbar';
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
  }

  else {
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
   
    
    <div className="founderHomepage">
           
                  <Snackbar open={openKYCWarning} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Please complete your KYC in settings before listing your startup!
                    </Alert>
                  </Snackbar>
              
            


                  <div>
                      <FounderNavbar/>
                  </div>

      <header className="founder-homepage-header">
        
        <p className='nameHeader'>
          GrowthCAP Inc. - The Founder Module 
        </p>
        <h4> User Logged In: {user?.email} </h4>
        

        <Step.Group size='small'>
    <Step active>
      <Icon name='code' />
      <Step.Content>
        <Step.Title>Coding Phase</Step.Title>
        <Step.Description>Website under inital coding phase.</Step.Description>
      </Step.Content>
    </Step>

    <Step disabled>
      <Icon name='bug' />
      <Step.Content>
        <Step.Title>Bug fixes and debugging</Step.Title>
        <Step.Description>Improving overall quality by fixing bugs. </Step.Description>
      </Step.Content>
    </Step>

    <Step disabled>
      <Icon name='code branch' />
      <Step.Content>
        <Step.Title>Project Finalization</Step.Title>
        <Step.Description>Testing phase and project finalization.</Step.Description>
      </Step.Content>
    </Step>

    <Step disabled>
      <Icon name='bullhorn' />
      <Step.Content>
        <Step.Title>Go Live</Step.Title>
        <Step.Description>Deploy project to live customers.</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>



        <Button.Group>
        <Button animated='vertical' async onClick={userSettings}>
       
        <Button.Content visible>Settings</Button.Content>
        <Button.Content hidden>
            <Icon name='settings' />
          </Button.Content>
        </Button>
        <Button.Or />
        <Button style = {{width: '80px'}} color='red' animated='vertical'  async onClick={logout}>
          <Button.Content hidden>Logout</Button.Content>
           <Button.Content visible>
            <Icon name='sign-out' />
          </Button.Content>
        </Button>
        </Button.Group>
        <br/>
        
             
      </header>

    </div>  
  );
}

export default Homepage;