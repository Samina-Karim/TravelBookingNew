import "./App.css";

import BrowseForm from "./BrowseForm";
import CreatePackage from "./CreatePackage";
import DeletePackage from "./DeletePackage";
import ReviewPackage from "./ReviewPackage";
import APIServices from "./ApiServices";
import { useState, useEffect } from "react";
import React from "react";
import logo from "./logo.png";


// ************************* SAMINA **********************************************/

function App() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [season, setSeason] = useState("");
  const [trav, setTrav] = useState(1);

  const [showBrowsePopup, setShowBrowsePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showHomePopup, setShowHomePopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showDisplayPackage, setShowDisplayPackage] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [travelPackage, setTravelPackage] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [userConfirmation, setUserConfirmation] = useState(false);
 
  const maxPackages=5;




// *************************** SAMINA ******************************************************/

useEffect(() => {
    syncTravelPackages();
}, []) // Run once

//***** Sync loads all the travel packages from the mockapi into travelPackage ******/
const syncTravelPackages = () => {
  // console.log("Initial Sync Before",travelPackage)
  APIServices.getTravelPackageAPI().then((travelPackages)=> {
    setTravelPackage(travelPackages);
    console.log("Initial Sync After",travelPackages)
  }) 

 
}



//******************** SAMINA ***************************************** */
const togglePopup = () => {
    setShowMessagePopup(!showMessagePopup);
  };

  const displayMessage = (message) => {
    setUserMessage(message);
    setShowMessagePopup(true);
  };
  


//*********************** Control Popup Menu Displays(SAMINA)*****************************/

const openPopup = (popupName) => {
    setShowBrowsePopup(false);
    setShowCreatePopup(false);
    setShowDeletePopup(false);
    setShowReviewPopup(false);
    setShowHomePopup(false);
    setShowAboutPopup(false);
    setShowContactPopup(false);
    setShowMessagePopup(false);
    setShowDisplayPackage(false);
    switch (popupName) {
        case "browse":
          setShowBrowsePopup(true);
          break;
        case "create":
          console.log("Travel Package", travelPackage)
          if (travelPackage.length < maxPackages){
              setShowCreatePopup(true);  
          } else{
              displayMessage("Maximum Packages already created !")
          }
          break;

        case "delete":
          console.log("# of Travel Packages", travelPackage.length)
          if (travelPackage.length > 0){
              setShowDeletePopup(true);  
          } else{
            setShowDeletePopup(false);
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
        case "review":
            setShowReviewPopup(true);
            break;
        case "display":
              setShowDisplayPackage(true);
              break;
        default:
          break;
    }
};

  /*********************  listAllTravelPackages *************************/
  const listTravelPackage = (travelPackage) => {
    const packageOptions = [];
    packageOptions.push(<option>Select Package...</option>);
      
    for (let i = 0; i < travelPackage.length; i++) {
        packageOptions.push(
        <option key={travelPackage[i].name} value={travelPackage[i].name}>
                {travelPackage[i].name}
        </option>);
    }
    console.log("Package Names", packageOptions);
    return packageOptions;
  };
/********************* displayPackage  *****************************/
const handleDisplayPackage = (selectedPackage) =>{
  openPopup("display");
  console.log("Display Selected Package", selectedPackage);
  // return(
    <>
  <div>
      <div class="container">
      <div class="box">
        <h1>Name</h1>
        <p>{selectedPackage.name}</p>
        <img src={selectedPackage.image} alt="Image"/>
        <div class="content">
          <div class="section">
            <h2>Destination:</h2>
            <p>{selectedPackage.destination}</p>
          </div>
          <div class="section">
            <h2>Season:</h2>
            <p>{selectedPackage.seasonal}</p>
          </div>
          <div class="section">
            <h2>Tickets Available:</h2>
            <p>{selectedPackage.ticketsLeft}</p>
          </div>
          <div class="section">
            <h2>Duration:</h2>
            <p>Trip Duration</p>
          </div>
          <div class="section">
            <h2>Number of Attractions:</h2>
            <p>{selectedPackage.numAttractions}</p>
          </div>
          <div class="section">
            <h2>Attractions:</h2>
            <p>{selectedPackage.attractions}</p>
          </div>
          <div class="section">
            <h2>Price:</h2>
            <p>{selectedPackage.price}</p>
          </div>
          <div class="section">
            <h2>Accommodation:</h2>
            <p>{selectedPackage.accomodation}</p>
          </div>
          <div class="section">
            <h2>Average Rating:</h2>
            <p>{selectedPackage.avRating}</p>
          </div>
          <div class="section">
            <h2>Reviews:</h2>
            <p>{selectedPackage.reviews}</p>
          </div>
        </div>
      </div>
    </div>
  <button onClick={() => setUserConfirmation(true)}>CONFIRM</button>
  <button onClick={() => setUserConfirmation(false)}>CANCEL</button>
  </div>  
  )
</>
// )
}

//****************** HANA *******************************************/

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


//************************** Return ****************************************/

  return (
    <>
{/*************** SAMINA ***********************/}
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
                <a onClick={() => openPopup("review")}>Review Package</a>
              </div>
            </div>
            <button onClick={() => openPopup("contact")}>CONTACT</button>
          </div>
        </div>
      </header>
{/* ************* HANA ******************* */}
      <main className="body">
        <BrowseForm
          from={handleFromChange}
          to={handleToChange}
          season={handleSeasonChange}
          trav={handleTravelers}
          submit={handleSubmit}
        />
{/************** SAMINA ********************/}
        {showCreatePopup &&
        <CreatePackage
            travelPackage={travelPackage}
            setTravelPackage={setTravelPackage}
            syncTravelPackages={syncTravelPackages}
            setShowCreatePopup={setShowCreatePopup} 
            handleDisplayPackage={handleDisplayPackage}
        />
        }
        
       {showDeletePopup &&
        <DeletePackage
            travelPackage={travelPackage}
            setTravelPackage={setTravelPackage}
            syncTravelPackages={syncTravelPackages}
            setShowDeletePopup={setShowDeletePopup}
            listTravelPackage={listTravelPackage}
            handleDisplayPackage={handleDisplayPackage}
        />
        } 
{/************** HAIDER ********************/}
      {showReviewPopup &&
        <ReviewPackage
            travelPackage={travelPackage}
            setTravelPackage={setTravelPackage}
            syncTravelPackages={syncTravelPackages}
            setShowReviewPopup={setShowReviewPopup}
            listTravelPackage={listTravelPackage}
        />
        } 

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