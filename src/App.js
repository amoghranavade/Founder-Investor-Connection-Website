import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import HomepageInvestor from "./Components/HomepageInvestor/homepagei";
import HomepageFounder from "./Components/HomepageFounder/homepagef";
import HomepageGuest from "./Components/HomepageGuest/homepageg";
import Register from "./Components/Register/register";
import Login from "./Components/Login/login";
import Misc from "./Components/Misc/maintenance";
import VerifyMail from './Components/Register/verifymail'
import Terms from "./Components/Misc/terms"
import Who from "./Components/Register/who"
import UserSettings from "./Components/UserSettings/usersetting"
import AddStartup from'./Components/HomepageFounder/addstartup'
import KYC from "./Components/UserSettings/kyc.js"
import About from "./Components/Other/about"
import Contact from "./Components/Other/contact"
// import Documentation from "./Components/HomepageFounder/docFounder"
import StartupPortfolio from "./Components/HomepageInvestor/startupportfolio"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomepageGuest/>}/>
        <Route exact path="/homepagei" element={<HomepageInvestor/>}/>
        <Route exact path="/homepagef" element={<HomepageFounder/>}/>
        <Route exact path="/addstartup" element={<AddStartup/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} /> 
        <Route path='/verifymail' element={<VerifyMail/>} />
        <Route path='/terms' element={<Terms/>} />
        <Route path='/who' element={<Who/>} />
        <Route path='/maintenance' element={<Misc/>} />
        <Route path='/usersetting' element={<UserSettings/>} />
        <Route path='/kyc' element={<KYC/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        {/* <Route path='/documentation' element={<Documentation/>} /> */}
        <Route path='/portfolio' element={<StartupPortfolio/>} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);