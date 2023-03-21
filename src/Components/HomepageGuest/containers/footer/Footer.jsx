import React from 'react';
// import { Link } from 'react-router-dom';
import './footer.css';
import gpt3Logo from '../../assets/dropbox.png'

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Invest in the Future</h1>
    </div>

    <div className="gpt3__footer-btn">
      <button type="submit">Join Us</button>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={gpt3Logo} alt="gpt3_logo" />
        <p>
          B9 Major Project <br /> All Rights Reserved
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
      <p>@2023 GrowthCap. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
