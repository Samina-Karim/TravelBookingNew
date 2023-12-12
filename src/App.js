import "./App.css";
import BrowseForm from "./BrowseForm";
import { useState } from "react";
import React from "react";
import logo from "./logo.png";

// import axios from 'axios';

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [season, setSeason] = useState("");
  const [trav, setTrav] = useState(1);

  const [showBrowsePopup, setShowBrowsePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showHomePopup, setShowHomePopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

  const [travelPackage, setTravelPackage] = useState({
    name: "",
    destination: "",
    seasonal: "",
    ticketsleft: 0,
    duration: 0,
    attraction: [],
    price: 0,
    accommodation: "",
    image:null,
    rate: { avgRating: 0, arrayOfRating: [] },
    reviews: [],
  });

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

  // Keeps track of what the user is typing
  const handleTyping = (e) => {
    e.preventDefault();
    console.log("Event ",e.target.value);
    // Create a copy of the 'person' to keep track of what the user is typing
    const newTravelPackage = {
      ...travelPackage,
      [e.target.name]: e.target.value,
    };
    setTravelPackage(newTravelPackage);
    console.log("TP ", travelPackage)
  };

   // Function to handle the image file selection
   const handleImageChange = (e) => {
    console.log("Image e",e);
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTravelPackage({
        ...travelPackage,
        image: imageUrl, // Update the image URL in the state
      });
    

    console.log("Image TP ", travelPackage)
    console.log("Image file ",file);
    console.log("Image file ",imageUrl);
  }
  };

  const handleCreateTravelPackage = (e) => {
    e.preventDefault();
    console.log("Create Travel Package",e);
    const newTravelPackage = {
      ...travelPackage,
    };
  };

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

        {showCreatePopup && ( // Conditional rendering based on showCreatePopup state
          <div className="createPopUpMenu">
            <h3>Create Package</h3>
            Name:{" "}
            <input
              name="name"
              value={travelPackage.name}
              onChange={handleTyping}
            />
            <br />
            Destination:{" "}
            <input
              name="destination"
              value={travelPackage.destination}
              onChange={handleTyping}
            />
            <br />
            Seasonal:{" "}
            <input
              name="seasonal"
              value={travelPackage.seasonal}
              onChange={handleTyping}
            />
            <br />
            TicketsLeft:{" "}
            <input
              name="ticketsleft"
              value={travelPackage.ticketsleft}
              onChange={handleTyping}
            />
            <br />
            Duration:{" "}
            <input
              name="duration"
              value={travelPackage.duration}
              onChange={handleTyping}
            />
            <br />
            Attraction1:{" "}
            <input
              name="attraction1"
              value={travelPackage.attraction1}
              onChange={handleTyping}
            />
            <br />
            Attraction2:{" "}
            <input
              name="attraction2"
              value={travelPackage.attraction2}
              onChange={handleTyping}
            />
            <br />
            Attraction3:{" "}
            <input
              name="attraction3"
              value={travelPackage.attraction3}
              onChange={handleTyping}
            />
            <br />
            Price:{" "}
            <input
              name="price"
              value={travelPackage.price}
              onChange={handleTyping}
            />
            <br />
            Accomodation:{" "}
            <input
              name="accomodation"
              value={travelPackage.accomodation}
              onChange={handleTyping}
            />
            <br />
            Image:{" "}
            <input
             
              type="file"
              // value={travelPackage.image}
              onChange={handleImageChange}
              
            />
            <br />
            <button onClick={handleCreateTravelPackage}>Submit </button>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
