import './terms.css';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Rating, Step, Confirm, Card, Image} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import React, { useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from '../Assets/Database/firebase-config';

function Terms() {

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    if(user) {
    setUser(currentUser);
  }

  // else {
  //   navigate('/login')
  // }
  });
  
  const goBack = () => {
    window.history.back()
  }
  const logout = async () => {
    await signOut(auth);
    navigate('/login')
  };
  const navigate = useNavigate();
  // const navigateToLogin = () => {
  //   navigate("/login");
  // };
  useEffect(() => {
    document.title = 'GrowthCAP - Terms';
  });
  
  return (
    <header className='terms-header'>
    <><div style={{ color: '#6FBBE0',paddingTop: "3%",textAlign: "center",fontSize:'25px', fontFamily: "Poppins", fontWeight: "bold", marginBottom: "20px" }}>
          GrowthCAP - Terms & Conditions
      </div>
      {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
              <p style={{fontWeight: "bold",color: '#6FBBE0',textAlign:'justify', width: "50%", fontSize:'16px', margin:'auto' }}>
                  Last updated: 6th February, 2023
                  <br/>
                  <br/>
                  TERMS
                  <br/>
              </p>
              <p style={{textAlign:'justify', width: "50%", fontSize:'16px', margin:'auto', color:'white' }}>
                  By accessing and using this website, you agree to be bound by the terms and conditions outlined herewithin. The information on this website is intended for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Investment opportunities posted on this website are private placements and are available only to accredited investors who meet the Securities and Exchange Commission's definition of accredited investor. The information contained on this website does not purport to be complete and is subject to change without notice. No representation or warranty, express or implied, is made as to the accuracy or completeness of the information contained on this website, and nothing contained on this website is, or shall be relied upon as, a promise or representation, whether as to the past or future.
                  <br/>
                  <br/>
                  <p style={{fontWeight: "bold",color: '#6FBBE0'}}>
                    PRIVACY POLICY
                  </p>
                  Our privacy policy outlines how we collect, use, and protect your personal information when you use our website or services. We take your privacy seriously and are committed to protecting your personal data from unauthorized access or disclosure. We only collect the information necessary to provide you with our services, and we will never sell or share your data with third parties without your consent.

                  

                  Our privacy policy outlines the types of personal information we collect, how we use it, and the steps we take to safeguard your data.
                  Personal information collected through this website is used only for the purpose for which it was collected and will not be shared with third parties except as required by law. This website may use cookies to improve your experience and to collect anonymous data for analytical purposes. By using this website, you consent to the use of cookies in accordance with this Privacy Policy. If you do not wish to have cookies placed on your computer, you can disable them in your browser's settings. However, this may impact your experience on this website. This website may also contain links to other websites. We are not responsible for the privacy practices of those websites and encourage you to read their privacy policies before submitting any personal information.
                  <br/>
                  <br/>
              </p>
              
              
              <p style={{textAlign:'justify', width: "50%", fontSize:'16px',margin:'auto', color:'white' }}>
                  The contents of this website are protected by copyright and trademark laws and may not be copied, reproduced, or used in any manner without the express written consent of the website owner. The website owner assumes no responsibility for any errors or omissions on this website and shall have no liability for any loss or damage of any kind arising from the use of this website.
                  This website may contain forward-looking statements that are subject to risks and uncertainties that could cause actual results to differ materially from those projected. These statements are based on current expectations, estimates, projections, and beliefs and involve a number of risks and uncertainties that could cause actual results to differ materially from those expressed or implied. The website owner makes no commitment to update the information contained on this website. Your use of this website indicates your agreement to be bound by the terms and conditions outlined above.
              </p>
<             div className='buttonDiv'>
                  <button
                    type="button"
                    className='back-button'
                    onClick={goBack}
                  
                  >
                    Go back
                  </button>

              </div>
              <div style={{paddingLeft:'42%'}}>
          <p className='loginFooter'><a href='./' style={{color: 'lightslategrey', textAlign:'center'}}>GrowthCAP 2023</a> | <a href='./register' style={{color: 'rgb(218, 232, 245)'}}>Register</a> | <a href='./login' style={{color: 'rgb(218, 232, 245)'}}>Login</a></p>
          </div>
      
          </>
    </header>

  );
}

export default Terms;