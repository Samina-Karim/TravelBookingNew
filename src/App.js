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

  const alpha="alpha";
  const num="num";

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


  const handleTyping = (e,type) => {
    e.preventDefault();
    
    var regex;

    const { name, value } = e.target;
    if (type=="alpha"){
      regex = /^[A-Za-z]+$/
    }
    else if (type=="num"){
      regex = /^[0-9]+$/; // Regex pattern to allow only numbers

    }

     // Regex pattern to allow only alphabets
  
    if (value === '' || regex.test(value)) {
       console.log("Event ",e.target.value);
        
        const newTravelPackage = {
          ...travelPackage,
        [e.target.name]: e.target.value,
        };
        setTravelPackage(newTravelPackage);
        console.log("TP ", travelPackage)
    };
  }

  
   // Function to handle the image file selection
   const handleImageChange = (e) => {
    console.log("Image e",e);
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      setTravelPackage({
        ...travelPackage,
        image: file, // Update the image URL in the state
      });
    

    console.log("Image TP ", travelPackage)
    console.log("Image file ",file);
    // console.log("Image file ",imageUrl);
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
              // inputType="alpha"
              onChange={(e) =>handleTyping(e,alpha)}


            />
            <br />
            Destination:{" "}
            <input
              name="destination"
              value={travelPackage.destination}
              // inputType="alphabets"
              onChange={(e) =>handleTyping(e,alpha)}
            />
            <br />
            Seasonal:{" "}
            <input
              name="seasonal"
              value={travelPackage.seasonal}
              onChange={(e) =>handleTyping(e,alpha)}
            />
            <br />
            TicketsLeft:{" "}
            <input
              name="ticketsleft"
              value={travelPackage.ticketsleft}
              inputType="numbers"
              onChange={(e) =>handleTyping(e,num)}
            />
            <br />
            Duration:{" "}
            <input
              name="duration"
              value={travelPackage.duration}
              inputType="numbers"
              onChange={(e) =>handleTyping(e,num)}
            />
            <br />
            Attraction1:{" "}
            <input
              name="attraction1"
              value={travelPackage.attraction1}
              inputType="alphabets"
              onChange={(e) =>handleTyping(e,alpha)}
            />
            <br />
            Attraction2:{" "}
            <input
              name="attraction2"
              value={travelPackage.attraction2}
              inputType="alphabets"
              onChange={(e) =>handleTyping(e,alpha)}
            />
            <br />
            Attraction3:{" "}
            <input
              name="attraction3"
              value={travelPackage.attraction3}
              inputType="alphabets"
              onChange={(e) =>handleTyping(e,alpha)}
            />
            <br />
            Price:{" "}
            <input
              name="price"
              value={travelPackage.price}
              inputType="numbers"
              onChange={(e) =>handleTyping(e,num)}
            />
            <br />
            Accomodation:{" "}
            <input
              name="accomodation"
              value={travelPackage.accomodation}
              inputType="alphabets"
              onChange={(e) =>handleTyping(e,alpha)}
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
