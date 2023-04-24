import React, { useState, useEffect } from "react";

import mainLogo from "../Assets/Images/mainlogo.png";
import imageOne from "../Assets/Images/guestpagePicOne.jpg";
import imageTwo from "../Assets/Images/guestpagePicTwo.jpg";
import imageThree from "../Assets/Images/guestpagePicThree.jpg";
import Menu from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import mainlogo from "../Assets/Images/mainlogo.png";
import people from "../Assets/Images/people.png";
import guesticon from "../Assets/Images/guesticon.png";
import icon from "../Assets/Images/mainlogo.png";
import Feature from "./Feature";
import "./homepageg.css";

const HomepageGuest = () => {
  const navigate = useNavigate();
  const [showMenuOfNav, setShowMenu] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  // const [hideFirstFlyer, setHideFlyer] = useState(true);

  useEffect(() => {
    document.title = "GrowthCAP - Home";
  });

  const goToLogin = () => {
    navigate("./login");
  };

  const goToRegister = () => {
    navigate('./register');
  }

  const openNavMenu = () => {
    setShowMenu(true);
  };

  const closeNavMenu = () => {
    setShowMenu(false);
  };

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
    //this is the code
    <div className="webView">
    <div className="App">
      <div className="gradient__bg">
        <div className="gpt3__navbar">
          <div className="gpt3__navbar-links_container">
            <img src={icon} width={50} style={{marginRight:'20%'}} />
            <p style={{marginTop:'10%', fontSize:'28px', paddingLeft:'-2%', fontWeight:'700'}}>GrowthCAP</p>
          </div>
          <div className="gpt3__navbar-links_container">
          
          </div>
        </div>
        <div className="gpt3__navbar-sign" style={{marginRight:'5%', marginTop:'-5%'}}>
          <p onClick={goToLogin}>Sign in</p>
          <button type="button" onClick={goToRegister}>Sign up</button>
        </div>
       
        <div className="gpt3__header section__padding" id="home">
          <div className="gpt3__header-content">
            <h1 className="text-color">GrowthCAP</h1>
            <p>
              Where great businesses and great people meet. We bring together
              Start-ups looking for investment and investors with the captial,
              contacts and knowledge to help them succeed.
            </p>
            <div className="gpt3__header-content__people">
              <img src={people} />
              <p>2000 people have visited in last 24 hours</p>
            </div>
            <div className="gpt3__header-content__input">
              <button type="button" onClick={goToRegister}>Sign Up</button>
            </div>
          </div>
          <div className="gpt3__header-image">
            <img src={guesticon}/>
          </div>
        </div>
        
      </div>
      <div style={{marginLeft:"40%"}}>
      <p className='loginFooter'><a href='./' style={{color: '#FF4820'}}>GrowthCAP 2023</a> | <a href='./terms' style={{color: 'rgb(218, 232, 245)'}}>Terms & conditions</a></p>
      </div>
    
    </div>
      <div className="mobileView">
        {/* <div className={`firstBody ${hideFirstBody ? '' : 'hidden'}`}>
        <h1 data-value="GrowthCAP">GrowthCAP</h1>
   
    </div> */}

        {/* <div className={`secondBody ${showSecondBody ? '' : 'appear'}`}> */}

        <div className="secondBody">
          <div className="navbarMobileView">
            {" "}
            {/*First Layout*/}
            <img
              style={{
                height: "50px",
                width: "40px",
                marginTop: "2%",
                marginLeft: "2%",
              }}
              src={mainLogo}
              alt="GrowthCAP-logo"
            />
            <p className="growthCapNavText">GrowthCAP</p>
            <Menu
              sx={{ fontSize: "30px", marginTop: "5%", marginLeft: "23%" }}
              onClick={openNavMenu}
            />
          </div>

          <div className="secondLayout" onClick={closeNavMenu}>
            <p className="headingText">
              Welcome to <span style={{ color: "#2D4C6D" }}>GrowthCAP</span>, a
              connection app for startup founders & investors.
            </p>
            <button onClick={goToLogin} className="toLoginButton">
              {" "}
              Let's Go
            </button>
            <p className="viewDocText">
              <a href>View documentation</a>
            </p>
          </div>

          <div
            className="imageDivGuest"
            style={{ position: "relative", marginTop: "-50px" }}
          >
            <img
              style={{
                marginLeft: "1%",
                position: "absolute",
                top: "-20px",
                left: "0",
                height: "150px",
                width: "112px",
                borderRadius: "6px",
                marginTop: "-20px",
              }}
              src={imageOne}
              alt="investor-image"
            />
            <img
              style={{
                position: "absolute",
                top: "-80px",
                left: "46%",
                transform: "translateX(-40%)",
                height: "225px",
                width: "150px",
                borderRadius: "6px",
              }}
              src={imageTwo}
              alt="growthCAP-image"
            />
            <img
              style={{
                marginLeft: "70%",
                position: "absolute",
                top: "-20px",
                left: "0",
                height: "150px",
                width: "112px",
                borderRadius: "6px",
                marginTop: "-20px",
              }}
              src={imageThree}
              alt="founder-image"
            />
          </div>
        </div>

        {/* <div className={`thirdBody ${showThirdBody ? '' : 'appear'}`}> */}

        <div className="thirdBody">
          <p className="headerOne">Easy Connections</p>
          <p className="headerTwo">Fast</p>
        </div>
      </div>
      {showMenuOfNav && (
        <div className="menuOfNav">
          <p className="aboutUsText">About us</p>
          <p className="contactUsText">Contact us</p>
          <p className="documentationText">Documentation</p>
          <button onClick={goToLogin} className="signupLoginButton">
            Signup/ Login
          </button>
        </div>
      )}
    </div>
  );
};

export default HomepageGuest;
