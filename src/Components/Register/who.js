import React, { useState, useEffect } from 'react';
import './who.css';
import './who.scss';
import { Link, useNavigate } from 'react-router-dom';
import {  updateDoc, addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
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
  const navigate = useNavigate();
  const[users, setUsers] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    document.title = 'GrowthCAP - PostRegister';
  });
  

  const usersCollectionRef = collection(db, 'app', 'users', user.uid);


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        
  

    };
    getUsers();
  }, []);

  
  const userIsFounder = async (id) => {
    // console.log("User assigned as a founder")
    const userDoc = doc(db, 'app', 'users', user.uid, id)
    const newFields = {type: 'founder'}
    await updateDoc(userDoc, newFields)
    navigate('/homepagef');
      
  }   

  const userIsInvestor = async (id) => {
    const userDoc = doc(db, 'app', 'users', user.uid, id)
    const newFields = {type: 'investor'}
    await updateDoc(userDoc, newFields)
    navigate('/homepagei');
  }   


  return (
    
    
    <div>
    {users.map((user) => {
      let fullName = user.name;
      let firstName = fullName.split(" ").shift();
      return (
        <div>
        <header className="Register-header">
        <img  style={{ height:'160px', width:'120px'}} src={mainLogo}  alt="GrowthCAP-logo"/>
        <p className="WelcomeText">Hello <span>{firstName}</span>, welcome to GrowthCAP. </p>
        <p className='Question'>What brings you here?</p>
   
    <div className="Buttons">
      <button className="FounderButton" onClick={() => userIsFounder(user.id)}>I have an idea</button>
      <button className="InvestorButton" onClick={() => userIsInvestor(user.id)}>I like investing</button>
    </div>
{/* 
<a href="#" class="button">Ooh, shiny!</a> */}
     
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
