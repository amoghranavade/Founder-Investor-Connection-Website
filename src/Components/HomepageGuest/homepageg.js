import React, { useState, useEffect } from 'react';


import mainLogo from '../Assets/Images/mainlogo.png';
import imageOne from '../Assets/Images/guestpagePicOne.jpg';
import imageTwo from '../Assets/Images/guestpagePicTwo.jpg';
import imageThree from '../Assets/Images/guestpagePicThree.jpg';
import Menu from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

import { Footer, Features, WhatGPT3, Header } from './containers';
import { CTA, Navbar } from './components';

import './homepageg.css';

const HomepageGuest = () => {

  const navigate = useNavigate();
  const [showMenuOfNav, setShowMenu] = useState(false);
  // const [hideFirstFlyer, setHideFlyer] = useState(true);
  
  useEffect(() => {
    document.title = 'GrowthCAP - Home';
  });

  const goToLogin = () => {
    navigate('./login');
  }

  const openNavMenu= () => {
    setShowMenu(true);
  }

 const closeNavMenu = () => {
  setShowMenu(false);
 }



//  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 
//  function runTextEffect() {
//    const h1 = document.querySelector("h1");
//    h1.dataset.value = h1.innerText;
   
//    let iteration = 0;
//    let interval = setInterval(() => {
//      h1.innerText = h1.innerText
//        .split("")
//        .map((letter, index) => {
//          if(index < iteration) {
//            return h1.dataset.value[index];
//          }
//          return letters[Math.floor(Math.random() * 26)]
//        })
//        .join("");
     
//      if(iteration >= h1.dataset.value.length){ 
//        clearInterval(interval);
//      }
     
//      iteration += 1 / 3;
//    }, 50);
//  }
 
//  window.onload = () => {
//    runTextEffect();
//  };

//  const [showSecondBody, setShowSecondBody] = useState(true);
//  const [showThirdBody, setShowThirdBody] = useState(true);
//  const [hideFirstBody, setHideFirstBody] = useState(true);

//  useEffect(() => {
 
//    const timeoutId = setTimeout(() => {
//      setHideFirstBody(false);
     

//    }, 2000);

//    const timeoutSecond = setTimeout(() => {
//     setShowThirdBody(false);
//     setShowSecondBody(false);
 
//   }, 2000);



//    return () => {
//     clearTimeout(timeoutSecond);
//     clearTimeout(timeoutId);
//    };
//  }, []);
 

  return (
   <div>
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <WhatGPT3 />
    <Features />
    <CTA />
    <Footer />
   </div>

    
  );
};

export default HomepageGuest;
