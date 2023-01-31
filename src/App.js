import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/homepage";
import Register from "./Components/Register/register";
import Login from "./Components/Login/login";
import Misc from "./Components/Misc/maintenance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} /> 
        <Route path='/maintenance' element={<Misc/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);