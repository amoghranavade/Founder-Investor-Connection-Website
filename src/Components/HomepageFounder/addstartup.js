import "./addstartup.css";
import FounderNavbar from "../HomepageFounder/foundernavbar";
import Avatar from '@mui/material/Avatar';

import { storage, db, auth} from '../Assets/Database/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { addDoc, getDocs, collection, query, where, onSnapshot } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import { Button,Label, Icon, Input } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import founder from'../Assets/Images/founder.png';
import mainLogo from'../Assets/Images/mainlogo.png';
import flyer from'../Assets/Images/GrowthCap-Register.jpg';
import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import investor from'../Assets/Images/investor.png';

// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';


import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


const Startuppf = () => {


  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const [startupName, setstartupName] = useState("");
  const [startupFounderName, setstartupFounderName] = useState("");
  const [startupFounderContact, setstartupFounderContact] = useState("");
 
  const [membersCount, setMembersCount] = useState("");
  const [fieldOfStartup, setfieldOfStartup] = useState("");
  const [location, setLocation] = useState("");
  const [startupYear, setStartupYear] = useState("");
  const [roi, setRoi] = useState("");
  const [pastEquity, setPastEquity] = useState("");
  const [totalEquity, setTotalEquity] = useState("");
  const [equityRemaining, setEquityRemaining] = useState("");
  const [equityOffered, setEquityOffered] = useState("");
  const [equityAmount, setEquityAmount] = useState("");
  const [founderContact, setFounderContact] = useState("");
  const [about, setAbout] = useState("");

  const [users, setUsers] = useState([]);

  let usersCollectionRef = null;

  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    // User is not in localStorage, fetch user from auth
    user = auth.currentUser;
    localStorage.setItem('user', JSON.stringify(user));
  }

  const userCollectionRef = collection(db, 'app', 'users', user.uid);


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      // console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setUsers(data.docs.map((doc) => (doc.data())));
        
  

    };
    getUsers();
  }, []);

      
      usersCollectionRef = collection(db, 'startups')


      const date = new Date();
const day = date.getDate();
const year = date.getFullYear();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const monthIndex = date.getMonth();
const month = monthNames[monthIndex];

const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}
  
 const addStartup = async () => {
  await addDoc(usersCollectionRef, {foundercontact: startupFounderContact, startuplisteddate: formattedDate, founderuid: user.uid, startupname: startupName, startupfounder: startupFounderName, foundercontact: founderContact, members: membersCount, 
    field: fieldOfStartup, location: location, startupyear: startupYear, roi: roi, pastequity: pastEquity, totalEquity: totalEquity, equityremain: equityRemaining,
  equitygiven:equityOffered, equitygivenamount: equityAmount, about: about});
 }
  


 const handleImageChange = (e) => {
  if(e.target.files[0]) {
    setImage(e.target.files[0]);
  }
};

 const handleSubmit = () => {

  const imageRef = ref(storage, user.uid + '/startupimage');
  uploadBytes(imageRef, image)
  .then(() => {
    getDownloadURL(imageRef)
    .then((url) => {
      setUrl(url);
    })
    .catch(error => {
      console.log(error.message);
    });
    setImage(null);
  })
  .catch(error => {
    console.log(error.message);
  });

};




  return (
    <header className="portfolioHeader">
       {!users || users.length === 0 ? (
         <div style={{position: 'relative'}}>
         {/* <img style={{marginLeft:'48%',marginTop :"15%", height:'150px', width:'100px'}} src={mainLogo}  alt="GrowthCAP-logo"/> */}
         {/* Contents of your current page */}
         <Box sx={{ display: 'flex', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 1 }}>
           <CircularProgress style={{ margin: 'auto' }} />
         </Box>
       </div>
      ) : (
   users.map((user) => {
    return (
    <div>
      
      <FounderNavbar />
      <h1 style={{fontSize:'35px', paddingTop:'8%', paddingLeft:'42%', color:'white'}}>List your startup!</h1>
      
      <div style={{display:'flex'}}>
      <label id='avatarInput'>
                    <Avatar
                      className='avatarMobileView'
                      alt={user.type}
                      src={url}
                      sx={{ 
                        display: { xs: 'none', md: 'flex' },
                        width: 110, 
                        height: 110, 
                        marginLeft:'350%',
                        marginBottom:'15%',
                        cursor: 'pointer',
                        transition: 'opacity 0.3s ease-in-out',
                        '&:hover': {
                          opacity: 0.4,
                        },
                      }}
                    />
                    
                  
                    <input
                      id="avatarInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    </label>

      <button onClick={handleSubmit} className="add-startup-image" >Save</button>
      </div>
      <div className="container">
        <form className="form-stye">

          
        <div className="form-group">
            <label htmlFor="name">Start-Up Name</label>
            <input
              type="text"
              
              id="name"
     
              onChange={(e) => setstartupName(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="name">Start-up Founder Name</label>
            <input
              type="text"
              id="name"
              // value={user.name}
              
        
              onChange={(e) => setstartupFounderName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Start-up Founder Contact</label>
            <input
              type="text"
              id="name"
              // value={user.phone}
           
        
              onChange={(e) => setstartupFounderContact(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="contact">Number of Members</label>
            <input
              type="number"
              id="contact"
           
              onChange={(e) => setMembersCount(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="members-count">Field of Startup</label>
            <input
              type="text"
              id="members-count"
            
              onChange={(e) => setfieldOfStartup(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="field-startup">Location of the Office</label>
            <input
              type="text"
              id="field-startup"
          
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="location">Startup Founded in Year</label>
            <input
              type="text"
              id="location"
          
              onChange={(e) => setStartupYear(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            {" "}
            <label htmlFor="startupYear">ROI</label>
            <input
              type="text"
              id="startupYear"
              
              onChange={(e) => setRoi(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="roi">Past Equity of Shareholders</label>
            <input
              type="text"
              id="roi"
           
              onChange={(e) => setPastEquity(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="pastEquity">  Total Equity with Members including Founders</label>
            <input
              type="text"
              id="pastEquity"
          
              onChange={(e) => setTotalEquity(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="totalEquity">
            Equity remaining
            </label>
            <input
              type="text"
              id="totalEquity"
           
              onChange={(e) => setEquityRemaining(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="equityRemaining"> Equity offered to new investor </label>
            <input
              type="text"
              id="equityRemaining"
           
              onChange={(e) => setEquityOffered(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="equityOffered">
            Equity at amount
            </label>
            <input
              type="text"
              id="equityOffered"
            
              onChange={(e) => setEquityAmount(e.target.value)}
              required
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="equityOffered">
            Contact of founder
            </label>
            <input
              type="number"
              id="equityOffered"
              value={founderContact}
              onChange={(e) => setFounderContact(e.target.value)}
              required
            />
          </div> */}


          <div className="form-group">
            <label htmlFor="about">About startup</label>
            <textarea
              className="textarea-style"
              type="textarea"
              id="about"
          
              onChange={(e) => setAbout(e.target.value)}
              required
            />
          </div>
          
        </form>

      </div>
      <div className="button-group">
        <button type="submit" className="cancel-button">
          Cancel  
        </button>
        <button type="submit" className="add-startup-button" onClick={addStartup}>
          Add Startup
        </button>
      </div>

      {/* <label id='avatarInput'>
                    <Avatar
                      className='avatarMobileView'
                      alt={user.type}
                      src={url}
                      sx={{ 
                        display: { xs: 'none', md: 'flex' },
                        width: 110, 
                        height: 110, 
                        cursor: 'pointer',
                        transition: 'opacity 0.3s ease-in-out',
                        '&:hover': {
                          opacity: 0.4,
                        },
                      }}
                    />
                    <Avatar
                      className='avatarMobileView'
                      alt={user.type}
                      src={url}
                      sx={{ 
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        width: 90, 
                        height: 90, 
                        cursor: 'pointer',
                        transition: 'opacity 0.3s ease-in-out',
                        '&:hover': {
                          opacity: 0.4,
                        },
                      }}
                    />

                  
                    <input
                      id="avatarInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    </label>

      <button onClick={handleSubmit} className="ui primary button save-and-upload" fdprocessedid="74s44">Save</button> */}
    </div>
    );
  })
)}
    </header>
  );
};

export default Startuppf;