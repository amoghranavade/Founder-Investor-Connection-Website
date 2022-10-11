import './homepage.css';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Rating, Step, Confirm, Card, Image} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from '../Assets/Database/firebase-config';

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
  const navigate = useNavigate();
  // const navigateToLogin = () => {
  //   navigate("/login");
  // };
  useEffect(() => {
    document.title = 'GrowthCAP - Home';
  });
  
  return (
    
    
    <div className="Homepage">
      <header className="Homepage-header">
        
        <p>
          GrowthCAP Inc. <code>- Website Progress Bar</code>  
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
        <Button animated='vertical'>
       
        <Button.Content visible>Save Code</Button.Content>
        <Button.Content hidden>
            <Icon name='code branch' />
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