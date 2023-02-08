import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/homepage";
import HomepageGuest from "./Components/HomepageGuest/homepageg";
import Register from "./Components/Register/register";
import Login from "./Components/Login/login";
import Misc from "./Components/Misc/maintenance";
import VerifyMail from './Components/Register/verifymail'
import Terms from "./Components/Misc/terms"
import Who from "./Components/Register/who"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homepageg" element={<HomepageGuest/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} /> 
        <Route path='/maintenance' element={<Misc/>} />
        <Route path='/verifymail' element={<VerifyMail/>} />
        <Route path='/terms' element={<Terms/>} />
        <Route path='/who' element={<Who/>} />
        <Route exact path="/" element={<Homepage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);