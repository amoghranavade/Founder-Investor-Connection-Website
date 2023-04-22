import React, { useState, useEffect } from "react";

import mainLogo from "../Assets/Images/mainlogo.png";
import imageOne from "../Assets/Images/guestpagePicOne.jpg";
import imageTwo from "../Assets/Images/guestpagePicTwo.jpg";
import imageThree from "../Assets/Images/guestpagePicThree.jpg";
import Menu from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

import "./homepageg.css";

const featuresData = [
  {
    title: "Better reach",
    text: "Connecting the new generation of founders and investors by providing them with the interface that they need to launch and scale a start-up.",
  },
  {
    title: "Discover start-ups",
    text: "Can find start-ups that match your ideal target prospects ",
  },
  {
    title: "Angel investors",
    text: "Angel investors are highly beneficial for startups who need access to funding in the early stages of growth.",
  },
  {
    title: "Opportunites",
    text: "We actively support our portfolio companies and give them access to leading software and community that help them get an edge during their journey",
  },
];
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
    <header className="homepageGuest">
      <div className="webView">
        <div className="gpt3__navbar">
          <div className="gpt3__navbar-links_logo">
            {/* <img src={logo} /> */}
            <p>Growth Cap</p>
          </div>
          <div className="gpt3__navbar-links_container">
            <p>
              <a href="#home">Home</a>
            </p>
            <p>
              <a href="#wgpt3">About GrowthCAP</a>
            </p>
          </div>
        </div>
        <div className="gpt3__navbar-sign">
          <button type="button">Sign up/ Login</button>
        </div>
        <div className="gpt3__navbar-menu">
          {toggleMenu ? (
            <RiCloseLine
              color="#fff"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#fff"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="gpt3__navbar-menu_container scale-up-center">
              <div className="gpt3__navbar-menu_container-links">
                <p>
                  <a href="#home">Home</a>
                </p>
                <p>
                  <a href="#wgpt3">What is GPT3?</a>
                </p>
                <p>
                  <a href="#possibility">Open AI</a>
                </p>
                <p>
                  <a href="#features">Case Studies</a>
                </p>
                <p>
                  <a href="#blog">Library</a>
                </p>
              </div>
              <div className="gpt3__navbar-menu_container-links-sign">
                <p>Sign in</p>
                <button type="button">Sign up</button>
              </div>
            </div>
          )}
        </div>
        <div className="gpt3__header section__padding" id="home">
          <div className="gpt3__header-content">
            <h1 className="gradient__text">Build, Lead & {"\n"} Invest</h1>
            <p>
              Where great businesses and great people meet. We bring together
              Start-ups looking for investment and investors with the capital,
              contacts and knowledge to help them succeed.
            </p>
            <div className="gpt3__header-content__input">
              <input type="email" placeholder="Your email address" />
              <button type="button">Get Started</button>
            </div>
          </div>
          {/* <div className="gpt3__header-image">
            <img src={ai}/>
          </div> */}
        </div>
        <div className="gpt3__possibility section__padding" id="possibility">
          {/* <div className="gpt3__possibility-image">
            <img src={possibilityImage} alt="possibility" />
          </div> */}
          <div className="gpt3__possibility-content">
            <h4>Request Early Access to get started</h4>
            <h1 className="gradient__text">
              The possibilities are <br /> beyond your imagination
            </h1>
            <p>
              Yet bed any for travelling assistance indulgence unpleasing. Not
              thoughts all exercise blessing. Indulgence way everything joy
              alteration boisterous the attachment. Party we years to order
              allow asked of.
            </p>
            <h4>Requeset Early Access to Get Started</h4>
          </div>
        </div>

        {/* footer */}
        <div className="gpt3__footer section__padding">
          <div className="gpt3__footer-heading">
            <h1 className="gradient__text">Invest in the future</h1>
          </div>
          <div className="gpt3__footer-links">
            <div className="gpt3__footer-links_logo">
              {/* <img src={gpt3Logo} alt="gpt3_logo" /> */}
              <p>
                B9 Major Project <br /> All Rights reserved
              </p>
            </div>
            <div className="gpt3__footer-links_div">
              <h4>Links</h4>
              <p>Social Media</p>
              <p>Counters</p>
              <p>Contact</p>
            </div>
            <div className="gpt3__footer-links_div">
              <h4>Company</h4>
              <p>Terms & Conditions </p>
              <p>Privacy Policy</p>
              <p>Contact</p>
            </div>
            <div className="gpt3__footer-links_div">
              <h4>Get in touch</h4>
              <p>Terna Engineering College</p>
              <p>2222745841</p>
              <p>growthCap@in.net</p>
            </div>
          </div>
          <div className="gpt3__footer-copyright">
            <p>@2023 GrowthCAP. All rights reserved</p>
          </div>
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
            <p className="viewDocText"><a href>View documentation</a></p>
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
    </header>
  );
};

export default HomepageGuest;
