import React from "react";
import "./startupportfolio.css";
import InvestorNavbar from "../HomepageInvestor/investornavbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Startuppf = () => {
  const loc = useLocation();

  const data = loc.state.data;
  const navigate = useNavigate();
  const [headingText, setHeadingText] = useState(data.startupname);
  const [startupFounderName, setstartupFounderName] = useState(data.startupfounder);
  const [startupFounderContact, setstartupFounderContact] = useState(data.foundercontact);
  const [founderContact, setfounderContact] = useState("john.doe@example.com");
  const [membersCount, setMembersCount] = useState(data.members);
  const [fieldOfStartup, setfieldOfStartup] = useState(
    data.field
  );
  const [location, setLocation] = useState(data.location);
  const [startupYear, setStartupYear] = useState(data.startupyear);
  const [roi, setRoi] = useState(data.roi);
  const [pastEquity, setPastEquity] = useState(data.pastequity);
  const [totalEquity, setTotalEquity] = useState(data.totalEquity);
  const [equityRemaining, setEquityRemaining] = useState(data.equityremain);
  const [equityOffered, setEquityOffered] = useState(data.equitygiven);
  const [equityAmount, setEquityAmount] = useState(data.equitygivenamount);
  const [about, setAbout] = useState(
    data.about
  );

  const [founderConnections, setFounderConnections] = useState([]);
  



  const goBack = () => {
    navigate("/homepagei");
  }
  useEffect(() => {
    let connections = JSON.parse(localStorage.getItem('connections'));
    console.log(connections)
    if(connections) {
      setFounderConnections(connections);
    }
  }, [])

  const isConnected = () => {
    let flag = false;
    founderConnections.map((founderConnection) => {
      if(founderConnection === data.founderuid) {
        flag = true;
      }
    })
    if(flag) {
      return (
        <div>
         
          <h1 style={{color:'green', marginLeft:'47%', marginTop:'2%'}}>Connected</h1>
        </div>
      );
    } else {
      return (
        <div className="button-group">
          <button type="submit" className="primary-button"  onClick={goBack}>
            Cancel
          </button>
          <button type="submit" className="secondary-button" onClick={connectFounder}>
            Connect
          </button>
        </div>
      );
    }
  }

  const connectFounder = async () => {
    let connections = JSON.parse(localStorage.getItem('connections'));

    if(!connections){
      localStorage.setItem('connections',JSON.stringify([data.founderuid]));
      setFounderConnections([data.founderuid])
      return;
    }
    localStorage.setItem('connections', [...JSON.parse(localStorage.getItem('connections')), data.founderuid])
    setFounderConnections(JSON.parse( localStorage.getItem('connections')))
  }

  return (
    <header className="portfolioHeader">
        
    <div>
      <InvestorNavbar />
      <h1 style={{fontSize:'35px', paddingTop:'8%', paddingLeft:'45%', color:'white'}}>{headingText}</h1>
      <div className="container">
        <form className="form-stye">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={startupFounderName}
              onChange={(e) => setstartupFounderName(e.target.value)}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Start-up Founder Contact</label>
            <input
              type="text"
              id="name"
          
              readOnly
              value={startupFounderContact}
              onChange={(e) => setstartupFounderContact(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="members-count">Members Count:</label>
            <input
              type="number"
              id="members-count"
              value={membersCount}
              onChange={(e) => setMembersCount(e.target.value)}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="field-startup">Field of Startup</label>
            <input
              type="text"
              id="field-startup"
              value={fieldOfStartup}
              onChange={(e) => setfieldOfStartup(e.target.value)}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location of Offices</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              readOnly
              required
            />
          </div>

          <div className="form-group">
            {" "}
            <label htmlFor="startupYear">Startup Founded in Year</label>
            <input
              type="number"
              id="startupYear"
              value={startupYear}
              onChange={(e) => setStartupYear(e.target.value)}
              readOnly
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="roi">ROI</label>
            <input
              type="text"
              id="roi"
              value={roi}
              onChange={(e) => setRoi(e.target.value)}
              readOnly
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pastEquity">Past Equity of Shareholders</label>
            <input
              type="text"
              id="pastEquity"
              value={pastEquity}
              onChange={(e) => setPastEquity(e.target.value)}
              readOnly
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalEquity">
              Total Equity with Members including Founders
            </label>
            <input
              type="text"
              id="totalEquity"
              value={totalEquity}
              onChange={(e) => setTotalEquity(e.target.value)}
              readOnly
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="equityRemaining">Equity remaining</label>
            <input
              type="text"
              id="equityRemaining"
              value={equityRemaining}
              onChange={(e) => setEquityRemaining(e.target.value)}
              readOnly
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="equityOffered">
              Equity offered to new investor
            </label>
            <input
              type="text"
              id="equityOffered"
              value={equityOffered}
              onChange={(e) => setEquityOffered(e.target.value)}
              readOnly
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="equityAmount">Equity at amount</label>
            <input
              type="text"
              id="equityAmount"
              value={equityAmount}
              onChange={(e) => setEquityAmount(e.target.value)}
              readOnly
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="about">About startup</label>
            <textarea
              className="textarea-style"
              type="textarea"
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              readOnly
              required
            />
          </div>
        </form>
      </div>
      {isConnected()}
    </div>

    </header>
  );
};

export default Startuppf;
