import React from "react";
import FounderNavbar from '../HomepageFounder/foundernavbar';
import './contact.css';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
    return (
      <div className="about">
          <FounderNavbar/>
<p className="contactText" style={{color:'#E94E1A'}}> Contact Us</p>
      <div className="container">
       <div className="box"><p style={{ fontSize:'22px',marginTop: "50px", fontFamily:"Poppins", fontWeight: "600"}}> <MailIcon/>     E-mail: </p>

      <p style={{fontFamily:"Poppins", fontWeight: "300",  fontSize:'18px', color:'#CCD2D9'}}> growthgap@gmail.com<br/>support@growthcap.com</p>
      </div>

      <div className="box"><p style={{marginTop: "50px",fontFamily:"Poppins", fontFamily:"Poppins", fontWeight: "600",  fontSize:'22px'}}><LocalPhoneIcon/> Phone: </p>
      <p style={{fontFamily:"Poppins", fontWeight: "300",  fontSize:'18px', color:'#CCD2D9'}}> 8974527368, 8273726262 </p>
      </div>

      <div className="box"><p style={{marginTop: "50px",fontFamily:"Poppins", fontFamily:"Poppins", fontWeight: "600",  fontSize:'22px'}}><LocationOnIcon/> Address: </p>
      <p style={{fontFamily:"Poppins", fontWeight: "300",  fontSize:'18px', color:'#CCD2D9', paddingLeft:'10%', paddingRight:'10%'}}>908, Lal bahadur road, Sector-23, Complex 20, 506958, Mumbai, Maharashtra</p>
      
      </div>
      
          </div>
          <div style={{paddingLeft:'42%'}}>
          <p className='loginFooter'><a href='./' style={{color: 'lightslategrey', textAlign:'center'}}>GrowthCAP 2023</a> | <a href='./terms' style={{color: 'rgb(218, 232, 245)'}}>Terms & conditions</a></p>
          </div>
          </div>
          
    )
}
export default Contact;