import React, { useState, useEffect } from 'react';
import './who.css';
import { collection, getDocs } from 'firebase/firestore';
import { db , auth} from '../Assets/Database/firebase-config';
import mainLogo from'../Assets/Images/mainlogo.png';
import { async } from '@firebase/util';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function Who() {

  const[users, setUsers] = useState([]);
  const user = auth.currentUser;


  const usersCollectionRef = collection(db, 'app', 'users', user.uid);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        
    

    };
    getUsers();
  }, []);


  return (
    
    
    <div>
    {users.map((user) => {
      let fullName = user.name;
      let firstName = fullName.split(" ").shift();
      return (
        <div>
        <header className="Register-header">
        <img  style={{ height:'160px', width:'120px'}} src={mainLogo}  alt="GrowthCAP-logo"/>
        <p className="Question">Hello <span>{firstName}</span>, you are -</p>
   
    <div className="Buttons">
      <button className="FounderButton">A Founder</button>
      <button className="InvestorButton">An Investor</button>
    </div>
     
    </header>
        </div>
      );
    })}
    </div>
      );
    
    // <header className="Register-header">
    // <p class="Question">Hello,{user.name} Who are you?</p>
   
    // <div className="Buttons">
    //   <button className="FounderButton">Founder</button>
    //   <button className="InvestorButton">Investor</button>
    // </div>
     
    // </header>
  // );
}

export default Who;
