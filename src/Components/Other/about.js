import React from "react";
import FounderNavbar from '../HomepageFounder/foundernavbar';
import "./about.css";
import about1 from'../Assets/Images/about1.jpg';
import about2 from'../Assets/Images/about2.jpg';
import about3 from'../Assets/Images/about3.jpg';
import about4 from'../Assets/Images/about4.jpg';



function About() {
  return (
    <div className="about">
        <FounderNavbar/>
        <p className="contactText" style={{color:'#E94E1A'}}> About Us</p>
      <p style={{paddingLeft: "3%"}}>Hello, wishes from GrowthCAP</p>
      <br />
      <p style={{ paddingLeft: "3%"}}>

        GrowthCap is a connection website that creates seamless connection between 
        two entities i.e Founder and Investor. Here, the founder will post its 
        company's portfolio which is then evaluated by the interested investor 
        for investing into the respective company.

      </p>
      
      <p style={{ paddingLeft: "3%"}}>
      The application will provide a centralized platform for individuals to 
      connect with startups, perform due diligence, and invest in promising ventures. 
      Additionally, the application will facilitate communication and collaboration between 
      investors and startups, streamlining the process of angel investing and supporting 
      the growth of early-stage businesses.

      </p>
      <br />

      <br />
      <div className="image">
        <div>
        <img style={{ height:'250px', width:'250px', borderRadius: 20}} src={about1}  alt="about1"/>
        </div>

        <div>
        <img style={{ height:'250px', width:'250px', marginLeft: 70,  borderRadius: 20}} src={about2}  alt="about1"/>
        </div>

        <div>
        <img style={{ height:'250px', width:'250px', marginLeft: 70, borderRadius: 20}} src={about3}  alt="about1"/>
        </div>

        <div>
        <img style={{ height:'250px', width:'250px',marginLeft: 70, borderRadius: 20}} src={about4}  alt="about1"/>
        </div>

        
       
      </div>
    </div>
  );
}

export default About;
