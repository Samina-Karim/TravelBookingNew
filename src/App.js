import "./App.css";

import BrowseForm from "./BrowseForm";
import CreatePackage from "./CreatePackage";
import APIServices from "./ApiServices";
import { useState, useEffect } from "react";
import React from "react";
import logo from "./logo.png";


/************************************************************************/

function App() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [season, setSeason] = useState("");
  const [trav, setTrav] = useState(1);
  
  const [test, setTest] = useState(false);

  const [showBrowsePopup, setShowBrowsePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showHomePopup, setShowHomePopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

  const [travelPackage, setTravelPackage] = useState([]);


/*********************************************************************************/

useEffect(() => {
    syncTravelPackages();
}, []) // Run once

/***** Sync loads all the travel packages from the mockapi into travlePackage ******/
const syncTravelPackages = () => {
  APIServices.getTravelPackageAPI().then(travelPackage => setTravelPackage(travelPackage))

  console.log("Initial Sync",travelPackage)
}

/*********************** Control Popup Menu Displays *****************************/

const openPopup = (popupName) => {
    switch (popupName) {
      case "browse":
        setShowBrowsePopup(true);
        setShowCreatePopup(false);
        setShowHomePopup(false);
        setShowAboutPopup(false);
        setShowContactPopup(false);
        break;
      case "create":
        setShowCreatePopup(true);
        setShowHomePopup(false);
        setShowAboutPopup(false);
        setShowContactPopup(false);
        setShowBrowsePopup(false);
        break;
      case "home":
        setShowHomePopup(true);
        setShowCreatePopup(false);
        setShowAboutPopup(false);
        setShowContactPopup(false);
        setShowBrowsePopup(false);
        break;
      case "about":
        setShowAboutPopup(true);
        setShowCreatePopup(false);
        setShowHomePopup(false);
        setShowContactPopup(false);
        setShowBrowsePopup(false);
        break;
      case "contact":
        setShowContactPopup(true);
        setShowCreatePopup(false);
        setShowHomePopup(false);
        setShowAboutPopup(false);
        setShowBrowsePopup(false);
        break;
      default:
        break;
    }
};
/****************************************************************************/

function handleFromChange(e) {
    e.preventDefault();
    // console.log(e.target.value);
    setFrom(e.target.value);
}

function handleToChange(e) {
    e.preventDefault();
    // console.log(e.target.value);
    setTo(e.target.value);
}

function handleSeasonChange(e) {
    e.preventDefault();
    // console.log(e.target.value);
    setSeason(e.target.value);
}

function handleTravelers(travelers) {
    console.log(travelers);
    setTrav(travelers);
}

function handleSubmit() {
    console.log(from, to, season, trav);
}


/************************** Return ****************************************/

  return (
    <>
      <header className="head">
        <div className="button-container">
          <img src={logo} height="130px" width="120px" alt="Logo" />
          <div className="button-group">
            <button onClick={() => openPopup("home")}>HOME</button>
            <button onClick={() => openPopup("about")}>ABOUT</button>
            <div className="dropdownMenu">
              <button className="dropdownButton">TRAVEL PACKAGES</button>
              <div className="dropdownContent">
                <a onClick={() => openPopup("browse")}>Browse Package </a>
                <a onClick={() => openPopup("create")}>Create Package</a>
              </div>
            </div>
            <button onClick={() => openPopup("contact")}>CONTACT</button>
          </div>
        </div>
      </header>
      
      <main className="body">
        <BrowseForm
          from={handleFromChange}
          to={handleToChange}
          season={handleSeasonChange}
          trav={handleTravelers}
          submit={handleSubmit}
        />

        {showCreatePopup &&
        <CreatePackage
            travelPackage={travelPackage}
            setTravelPackage={setTravelPackage}
            syncTravelPackages={syncTravelPackages}
            setShowCreatePopup={setShowCreatePopup}

        />
        }
      </main>
    </>
  );
}

export default App;
