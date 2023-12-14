import "./App.css";
import BrowseForm from "./BrowseForm";
import { useState } from "react";
import React from "react";
import logo from "./logo.png";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [season, setSeason] = useState("");
  const [trav, setTrav] = useState(1);

  const [showBrowsePopup, setShowBrowsePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showCreatePopup2, setShowCreatePopup2] = useState(false);
  const [showHomePopup, setShowHomePopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

  const [travelPackage, setTravelPackage] = useState({
    name: "",
    destination: "",
    seasonal: "",
    ticketsleft: 0,
    duration: 0,
    attractionNum:0,
    attraction: [],
    price: 0,
    accomodation: "",
    image:null,
    rate: { avgRating: 0, arrayOfRating: [] },
    reviews: [],
  });

  const alpha="alpha";
  const num="num";
  const alphaNum="alphaNum"
 
  const maxDuration=7;
  const maxAttractions=5;
  const [errorMessage, setErrorMessage] =  useState({
    name:"",
    destination:"",
    seasonal: "",
    ticketsleft: "",
    duration: "",
    attractionNum: "",
    price: "",
    accomodation: "",
    image:""
})

  const resetErrorMessage =() => {
    const noErrorMessage = {
      name:"",
      destination:"",
      seasonal: "",
      ticketsleft: "",
      duration: "",
      attractionNum: "",
      price: "",
      accomodation: "",
      image:"",
  };

  setErrorMessage(noErrorMessage);

  };

  const openPopup = (popupName) => {
    switch (popupName) {
      case "browse":
        setShowBrowsePopup(true);
        setShowCreatePopup(false);
        setShowCreatePopup2(false);
        setShowHomePopup(false);
        setShowAboutPopup(false);
        setShowContactPopup(false);
        break;
      case "create1":
        setShowCreatePopup(true);
        setShowCreatePopup2(false);
        setShowHomePopup(false);
        setShowAboutPopup(false);
        setShowContactPopup(false);
        setShowBrowsePopup(false);
        resetErrorMessage();
        break;
        case "create2":
        setShowCreatePopup(false);
        setShowCreatePopup2(true);
        setShowHomePopup(false);
        setShowAboutPopup(false);
        setShowContactPopup(false);
        setShowBrowsePopup(false);
        break;
      case "home":
        setShowHomePopup(true);
        setShowCreatePopup(false);
        setShowCreatePopup2(false);
        setShowAboutPopup(false);
        setShowContactPopup(false);
        setShowBrowsePopup(false);
        break;
      case "about":
        setShowAboutPopup(true);
        setShowCreatePopup(false);
        setShowCreatePopup2(false);
        setShowHomePopup(false);
        setShowContactPopup(false);
        setShowBrowsePopup(false);
        break;
      case "contact":
        setShowContactPopup(true);
        setShowCreatePopup(false);
        setShowCreatePopup2(false);
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
    var errorCode="";

    const { name, value } = e.target;
    if (type=="alpha"){   // Regex pattern to allow only alphabets
      regex = /^[A-Za-z]+$/
    }
    else if (type=="num"){
      regex = /^[0-9]+$/; // Regex pattern to allow only numbers
    }  else if (type=="alphaNum"){
      regex = /^[a-zA-Z0-9]*$/; // Regex pattern to allow only numbers
    }  
    
    console.log("Name: ",name, " Value: ",value);
    if ((name=="duration") && (value > maxDuration))
        errorCode="Max duration is "+maxDuration;
      
    else if ((name=="attractionNum") && (value > maxAttractions))
        errorCode="Max # of attractions is "+ maxAttractions;
    
    else if  (regex.test(value)) {
      console.log("Event ",e.target.value);
            
      const newTravelPackage = {
        ...travelPackage,
        [e.target.name]: e.target.value,
        };
      setTravelPackage(newTravelPackage);
      console.log("TP ", travelPackage)
    }
    else{
    if (type=="alpha")
      errorCode="Please enter alphabets";
          
    if (type=="num")
     errorCode="Please enter numbers";
   }
    
   console.log("ErrorCode ", errorCode);
   console.log("Name ", name);
    
  
   console.log("ERROR ",errorMessage);

   switch(name) {
      case 'name':
          setErrorMessage({ ...errorMessage,name:errorCode});
         
        break;
        case 'destination':
          setErrorMessage({...errorMessage,destination:errorCode});
          
        break;
        case 'seasonal':
          setErrorMessage({...errorMessage,seasonal:errorCode});
      
        break;
        case 'ticketsLeft':
          setErrorMessage({...errorMessage,ticketsleft:errorCode});
       
        break;
        case 'duration':
          setErrorMessage({...errorMessage,duration:errorCode});
          
        break;
        case 'attractionNum':
          setErrorMessage({...errorMessage,attractionNum:errorCode});
        break;
        case 'price':
          setErrorMessage({...errorMessage,price:errorCode});
          
        break;
        case 'accomodation':
          setErrorMessage({...errorMessage,accomdation:errorCode});
        break;
        case 'image':
          setErrorMessage({...errorMessage,image:errorCode});
        break;
         
   }

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
                <a onClick={() => openPopup("create1")}>Create Package</a>
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

            Name:{<span className="error">{errorMessage.name}</span>}
            <input
              name="name"
              value={travelPackage.name}
              onChange={(e) =>handleTyping(e,alpha)}
            />
            
      
            <br />
            Destination:{<span className="error">{errorMessage.destination}</span>}
            <input
              name="destination"
              value={travelPackage.destination}
              onChange={(e) =>handleTyping(e,alpha)}
            />
            <br />
            Seasonal:{<span className="error">{errorMessage.seasonal}</span>}
            <input
              name="seasonal"
              value={travelPackage.seasonal}
              onChange={(e) =>handleTyping(e,alpha)}
            />
            <br />
            TicketsLeft:{<span className="error">{errorMessage.ticketsleft}</span>}
            <input
              name="ticketsleft"
              value={travelPackage.ticketsleft}
              onChange={(e) =>handleTyping(e,num)}
            />
            <br />
            Duration:
            {<span className="error">{errorMessage.duration}</span>}
            <input
              name="duration"
              value={travelPackage.duration}
              onChange={(e) =>handleTyping(e,num)}
            />
            <br />
            # of Attractions:{<span className="error">{errorMessage.attractionNum}</span>}
            <input
              name="attractionNum"
              value={travelPackage.attractionNum}
          
              onChange={(e) => handleTyping(e,num)}
              
              
            />
          
            {/* <br />
            Number of Attraction1:{" "}
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
            <br /> */}
            Price:{<span className="error">{errorMessage.price}</span>}
            <input
              name="price"
              value={travelPackage.price}
              onChange={(e) =>handleTyping(e,num)}
            />
            <br />
            Accomodation:{<span className="error">{errorMessage.accomodation}</span>}
            <input
              name="accomodation"
              value={travelPackage.accomodation}
              onChange={(e) =>handleTyping(e,alphaNum)}
            />
            <br />
            Image:{<span className="error">{errorMessage.image}</span>}
            <input
             
              type="file"
              // value={travelPackage.image}
              onChange={handleImageChange}
              
            />
            <br />
            {/* <button onClick={(e) => handleAddAttractions(e,)}>Next </button> */}
            <br />
            <button onClick={() => openPopup("create2")}>Next</button>
            {/* <button onClick={handleCreateTravelPackage}>Submit </button> */}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
