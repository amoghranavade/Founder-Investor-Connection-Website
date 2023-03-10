import './addstartup.css';
import { useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import React, { useEffect, useState } from 'react';
import FounderNavbar from './foundernavbar';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { auth } from '../Assets/Database/firebase-config';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Input } from '@mui/material';

function Homepage() {

 
  const [startupfounder, setStartupFounder] = useState("");
  const [startupname, setStartupName] = useState("");
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    if(user) {
    setUser(currentUser);
  }

  // else {
  //   navigate('/login')
  // }
  });
  const startuptypenames = [
    { label: 'Logistics' },
    { label: 'Real-Estate' },
    { label: 'Entertainment' },
    { label: 'Healthcare' },
    { label: 'Technology' },
    { label: 'AR-VR' },
    { label: 'Ed-Tech' },
    { label: 'Fin-Tech' },
    { label: 'E-commerce' },
    { label: 'Retail' },
    { label: 'Others' },
   
  ];

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const actions = [
    // { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Post' },
  ];

  const handleActionClick = (actionName) => {
    switch (actionName) {
      case 'Save':
        console.log(startupfounder)
        console.log(startupname)
        break;
      case 'Print':
        window.print()
        break;
      case 'Post':
        // Perform post action
        break;
      default:
        break;
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'GrowthCAP - Founder';
  });

  // let users = JSON.parse(localStorage.getItem('user'));
  // if (!user) {
 
  //   user = auth.currentUser;
  //   localStorage.setItem('user', JSON.stringify(user));
  // }
  
  return (
   
    <header className="add-startup-header">
     {/* {!users || users.length === 0 ? (
         <div style={{position: 'relative'}}>
        
         <Box sx={{ display: 'flex', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 1 }}>
           <CircularProgress style={{ margin: 'auto' }} />
         </Box>
       </div>
      ) :( */}
       <div>
          <FounderNavbar/>
     
    


<div class="form-group">
  <label for='startupName'className="input-label">Startup Name</label>
  <input maxLength={30} className='primary-input' placeholder='Startup Name' onChange={(e) => setStartupName(e.target.value)} ></input>

  <label for='startupName'className="input-label"  >Startup Founder</label>
  <input maxLength={30} className='primary-input' placeholder='Name of Founder' onChange={(e) => setStartupFounder(e.target.value)} ></input>
</div>

      

         <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.name)}
          />
        ))}
      </SpeedDial>
      </div>
 {/* )}   */}
      </header>

  
  );
}

export default Homepage;