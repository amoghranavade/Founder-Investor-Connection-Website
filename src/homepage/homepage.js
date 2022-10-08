import './homepage.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Icon, Rating } from 'semantic-ui-react';
import React, { useEffect } from 'react';



function Homepage() {
  useEffect(() => {
    document.title = 'GrowthCAP - Home';
  });
  return (
    
    <div className="App">
      <header className="App-header">
        
        <p>
          GrowthCAP Inc. <code>- Website under development</code>
        </p>
        <Button animated>
          <Button.Content visible>Logout</Button.Content>
           <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button>
        
      </header>
    </div>
  );
}

export default Homepage;