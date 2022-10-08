import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/homepage";
import Login from "./Login/login";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route index element={<Homepage />} />
          <Route index element={<Login />} />
          {/* <Route path="../Login/login" element={<Login />} /> */}
           {/* <Route path="contact" element={<Contact />} /> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);