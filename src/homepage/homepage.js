import './homepage.css';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Icon, Rating, Step } from 'semantic-ui-react';
import React, { useEffect } from 'react';




function Homepage() {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    document.title = 'GrowthCAP - Home';
  });
  return (
    
    <div className="App">
      <header className="App-header">
        
        <p>
          GrowthCAP Inc. <code>- Website Progress Bar</code>
        </p>

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
        <Button>Save Code</Button>
        <Button.Or />
        <Button color='red' animated onClick={navigateToLogin}>
          <Button.Content visible>Logout</Button.Content>
           <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button>
        </Button.Group>
        
    
        
    
    
    
      </header>
    </div>
  );
}

export default Homepage;