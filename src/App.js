import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Homepage from "../src/Homepage/homepage";
import Login from "../src/Login/login";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";


function App() {

  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route exact path="/" element={<Homepage/>}>
        
          
          {/* <Route path="../Login/login" element={<Login />} /> */}
           {/* <Route path="contact" element={<Contact />} /> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);