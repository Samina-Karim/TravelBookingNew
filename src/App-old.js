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

  const [showBrowsePopup, setShowBrowsePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showHomePopup, setShowHomePopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [travelPackage, setTravelPackage] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [showProceedMessagePopup, setShowProceedMessagePopup] = useState(false);
  const maxPackages=5;


  const [proceedConfirmation, setProceedConfirmation] = useState(false);

  const handleProceed = () => {
    const confirmed = window.confirm('Do you want to proceed? (Y/N)');
    if (confirmed) {
      // If user clicks 'OK' (Yes)
      setProceedConfirmation(true);
      // Implement your logic for proceeding here
    } else {
      // If user clicks 'Cancel' (No)
      setProceedConfirmation(false);
      // Implement logic if user chooses not to proceed
    }
  };

/*********************************************************************************/

useEffect(() => {
    syncTravelPackages();
}, []) // Run once

/***** Sync loads all the travel packages from the mockapi into travelPackage ******/
const syncTravelPackages = () => {
  APIServices.getTravelPackageAPI().then(travelPackage => setTravelPackage(travelPackage))

  console.log("Initial Sync",travelPackage)
}
/**************************** */
const togglePopup = () => {
    setShowMessagePopup(!showMessagePopup);
  };

  const displayMessage = (message) => {
    setUserMessage(message);
    setShowMessagePopup(true);
  };
  

/*********************** Control Popup Menu Displays *****************************/

const openPopup = (popupName) => {
    setShowBrowsePopup(false);
    setShowCreatePopup(false);
    setShowDeletePopup(false);
    setShowHomePopup(false);
    setShowAboutPopup(false);
    setShowContactPopup(false);
    setShowMessagePopup(false);
    switch (popupName) {
        case "browse":
          setShowBrowsePopup(true);
          break;
        case "create":
          if (travelPackage.length < maxPackages){
              setShowCreatePopup(true);  
          } else{
              displayMessage("Maximum Packages already created !")
          }
          break;

        case "delete":
          if (travelPackage.length > 0){
              setShowDeletePopup(true);  
          } else{
              displayMessage("No Packages in the database to delete !")
          }
          break;
        case "home":
          setShowHomePopup(true);
          
          break;
        case "about":
          setShowAboutPopup(true);
          
          break;
        case "contact":
          setShowContactPopup(true);
          break;
        case "message":
          setShowMessagePopup(true);
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
                <a onClick={() => openPopup("delete")}>Delete Package</a>
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
        {showProceedMessagePopup && (
           <div>
           <button onClick={handleProceed}>Proceed</button>
           {proceedConfirmation && <p>You chose to proceed!</p>}
         </div>
        )}

        
        {/* {showDeletePopup &&
        <DeletePackage
            travelPackage={travelPackage}
            setTravelPackage={setTravelPackage}
            syncTravelPackages={syncTravelPackages}
            setShowDeletePopup={setShowDeletePopup}

        />
        } */}

        {showMessagePopup && (
        <div className="popup-class">
            <div className="popup-content">
            <span className="close-btn" onClick={togglePopup}>&times;</span>
            <p>{userMessage}</p>
            </div>
        </div>
        )}

       


      </main>
    </>
  );
}

export default App;
