import './maintenance.css';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Rating, Step, Confirm, Card, Image} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import React, {useEffect, useState } from 'react';
import santaHat from'../Assets/Images/santa_hat_U01_EDITED.png';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from '../Assets/Database/firebase-config';
import { red } from '@mui/material/colors';

function Homepage() {

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
    navigate('/login')
  };

  const refresh = async() => {
    window.location.reload();
  }
  const navigate = useNavigate();
  // const navigateToLogin = () => {
  //   navigate("/login");
  // };
  useEffect(() => {
    document.title = 'GrowthCAP - Whoops! Under Maintenance';
  });
  
  return (
    
    
    <div className="Homepage">
      <header className="Homepage-header">
      
        <p>
        {/* <img  style={{ height:'100px', width:'100px'}} src={santaHat}  alt="GrowthCAP-logo"/> */}
          GrowthCAP Inc. - <span style= {{color:'Orange'}}>Website Under Maintenance</span>
        </p>
        <h4> Logged in as: {user?.email} </h4>
        

        {/* <Step.Group size='small'>
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
  </Step.Group> */}



        <Button.Group>
        <Button animated='vertical'  async onClick={refresh}>
       
        <Button.Content visible>Refresh</Button.Content>
        <Button.Content hidden>
            <Icon name='refresh' />
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