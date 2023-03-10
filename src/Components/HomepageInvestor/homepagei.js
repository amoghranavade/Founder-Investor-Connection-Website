import { useNavigate } from 'react-router-dom';
import { Button, Icon, Rating, Step, Confirm, Card, Image} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


import StartupCard from './startupcard';
import InvestorNavbar from './investornavbar';
import './homepagei.css';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { db,  auth } from '../Assets/Database/firebase-config';
import {  updateDoc, addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';

function Homepage() {
  const [startups, setStartups] = useState([]);
 
  

  useEffect(()=> {
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });
  }, []);

  
  // StartupCard.propTypes = {
  //   loading: PropTypes.bool,
  // };
  

  useEffect(() => {
    const fetchStartups = async () => {
      // const startupCollection = collection(db, "startups");
      const startupCollection = collection(db, 'startups');
      const startupSnapshot = await getDocs(startupCollection);
      
      const startupData = startupSnapshot.docs.map((doc) => ({
        
        id: doc.id,
        ...doc.data(),
        
      }));
      // console.log(startupData);
      setStartups(startupData);
    };

    fetchStartups();
  }, []);

  const [user, setUser] = useState({});
  let users = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    // User is not in localStorage, fetch user from auth
    user = auth.currentUser;
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  const navigate = useNavigate();
 
  useEffect(() => {
    document.title = 'GrowthCAP - Investor';
  });

 
 
  
  return (
   <header className='investorHomepage'>
    {!users || users.length === 0 ? (
         <div style={{position: 'relative'}}>
        
         <Box sx={{ display: 'flex', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 1 }}>
           <CircularProgress style={{ margin: 'auto' }} />
         </Box>
       </div>
      ) :(
  <div>
     
    <InvestorNavbar />
   
  
  
      <div className="startupList">
      {/* <StartupCard true /> */}
        {startups.map((startup) => (
          
          <StartupCard key={startup.id} id={startup.id} data={startup} />
         
          
        ))}
         
       
     </div>
     </div>
   
         )}  

         
    </header> 
  );
}

export default Homepage;

   {/* 
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
        <br/> */}