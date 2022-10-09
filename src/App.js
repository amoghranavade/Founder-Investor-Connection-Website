import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Homepage from "../src/Homepage/homepage";
import Register from "../src/Register/register";
import Login from "../src/Login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route exact path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Register/>} /> 
      </Routes>
    </BrowserRouter>
  );
}
export default App;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);