import './usersetting.css';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Rating, Step, Confirm, Card, Image, Popup} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React, {useEffect, useState } from 'react';
import founder from'../Assets/Images/founder.png';
import {  updateDoc, addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import santaHat from'../Assets/Images/santa_hat_U01_EDITED.png';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { db , auth} from '../Assets/Database/firebase-config';
import { red } from '@mui/material/colors';




function UserSettings() {


  const [isHidden, setIsHidden] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const user = auth.currentUser;
  
  const style = {
    borderRadius: 0,
    opacity: 0.8,
    padding: '2em',
    fontSize: '16px'
  }

  const deleteAccount = () => {
    console.log("Account deleted with id:", user.uid);
  }
  
 

  // onAuthStateChanged(auth, (currentUser) => {
  //   if(users) {
  //   setUser(currentUser);
  // }

  // else {
  //   navigate('/login')
  // }
  // });


  useEffect(() => {
    document.title = 'GrowthCAP - Settings';
  });

  const usersCollectionRef = collection(db, 'app', 'users', user.uid);


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      // setUsers((users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
      setUsers(data.docs.map((doc) => (doc.data())));
        
  

    };
    getUsers();
  }, []);

  
  return (
    <div>
      {!users || users.length === 0 ? (
         <div style={{position: 'relative'}}>
         
         {/* Contents of your current page */}
         <Box sx={{ display: 'flex', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 1 }}>
           <CircularProgress style={{ margin: 'auto' }} />
         </Box>
       </div>
      ) : (
        users.map((user) => {
        
          return (
            <div className="UserSetting">
              <header className="user-setting">
                <p className='settingText'>Settings</p>

                <div className="user-pic-container">
                  <div className="user-pic-circle">
                    <img  src={founder}  alt="GrowthCAP-founder"/>
                  </div>

                  <div className="parent">
                     <p className="mainName">{user.name}</p>
                     <div className='userType'>
                       <p>{user.type}</p>
                       {/* <button className='signOutButton'>Sign-out</button> */}
                     </div>
                 </div>
                </div>
                
                


                  {/* <div className='logoutDiv'>
                     <button className='logoutButton'>Sign-out</button>
                  </div> */}
                 


                {/* <div className="basicPad">
                   <div className='basicPadHeader'>
                     <p className='basicPadHeaderText'>GENERAL</p>
                   </div>

                  
                  <p className="nameTag">Display Name</p>
                  <p className="nameContent">{user.name}</p>
                  <p className="passwordTag">Password</p>
                  <p className="passwordContent">⚪ ⚪ ⚪ ⚪ ⚪ ⚪</p>
                  <p className="phoneTag">Phone</p>
                  
                  <p className={user.phone === "Not registered" ? "phoneContentNotRegistered" : "phoneContent"}>{user.phone}</p>
                  
                </div> */}

                <div className="basicPad">
                  <div className='basicPadHeader'>
                    <p className='basicPadHeaderText'>GENERAL</p>
                  </div>

                  <p className="nameTag">Display Name</p>
                  <p className="nameContent">{user.name}</p>
                  <div className="passwordResetButtonContainer">
                    <p className="passwordTag">Password</p>
                    <div className="passwordContentContainer">
                      <p className="passwordContent">⚪ ⚪ ⚪ ⚪ ⚪ ⚪</p>
                      <button className="resetButton">Reset</button>
                    </div>
                  </div>

                

                  <div className="mobileUpdateButtonContainer">
                    <p className="phoneTag">Phone</p>
                    <div className="mobileContentContainer">
                      <p className={user.phone === "Not registered" ? "phoneContentNotRegistered" : "phoneContent"}>{user.phone}</p>
                      <button className="updateButton">Update</button>
                    </div>
                  </div>
                </div>



                <div className='accountPad'>
                    <div className='accountPadHeader'>
                       <p className='accountPadHeaderText'>ACCOUNT</p>
                   </div>
                     <p className="emailTag">Email</p>
                     <p className="emailContent">{user.email}</p>
                     <p className="typeTag">Account Type</p>
                     <p className="typeContent">{user.type}/free</p>
                     <p className="uidTag">Account ID  <Popup
                                                        trigger={<button className='infoPopup'>i</button>}
                                                        content='Unique to the user, this UID should not be shared with anyone. Only share it with GrowthCAP support team if asked.'
                                                        style={style}
                                                        inverted
                                                       />    
                                                        &nbsp;<span onClick={() => setIsHidden(!isHidden)}>
                                                       {isHidden ? 'show' : 'hide'}
                                                     </span> 
                                                     </p>
  
  {!isHidden && <p className="uidContent">{user.uid}</p>}
                     <p className="deleteAccount" onClick={deleteAccount}>Delete my account</p>
                    
                     
                     <p className="userSinceTag">User Since: {user.accountCreatedDate}</p>
                    
                </div>

                <div className='otherVerification'>
                
                  <p className="statusTag">KYC Status <Popup
                                                        trigger={<button className='infoPopup'>i</button>}
                                                        content='Identity document verification is a mandatory process in accessing most of the GrowthCAP features.'
                                                        style={style}
                                                        inverted
                                                       /></p>
                  <p className="statusContent">PENDING</p>
                  <div className='verificationRedirect'>
                    <p className='verificationDivText'>Get my verification done <Icon name='arrow right' size='small' /></p>
                  </div>
                </div>

                
              </header>
            </div>
          );
       
        })
      )}
    </div>
  );
  
}

export default UserSettings;