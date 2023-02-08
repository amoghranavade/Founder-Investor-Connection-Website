import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../Assets/Images/mainlogo.png';
import ai from '../Assets/Images/ai.png';
import './header.css';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="gpt3__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#wgpt3">About GrowthCap</a></p>
          {/* <p><a href="#possibility">Open AI</a></p>
          <p><a href="#features">Case Studies</a></p>
          <p><a href="#blog">Library</a></p> */}
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <button type="button">Sign up / Login </button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#wgpt3">What is GPT3?</a></p>
            <p><a href="#possibility">Open AI</a></p>
            <p><a href="#features">Case Studies</a></p>
            <p><a href="#blog">Library</a></p>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <p>Sign in</p>
            <button type="button">Sign up</button>
          </div>
        </div>
        )}
      </div>
{/* 
      <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Build , Lead & {'\n'} Invest </h1>
      <p>Where great businesses and great people meet. We bring together Start-ups looking for investment and investors with the capital, contacts and knowledge to help them succeed.</p>

      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div> */}
    </div>

    
  );
};

export default Navbar;
