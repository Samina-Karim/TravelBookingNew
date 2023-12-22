import "./App.css";
import BrowseForm from "./BrowseForm";
import APIServices from "./ApiServices";
import { useState, useEffect } from "react";
import React from "react";
import logo from "./logo.png";

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
  const [attractions, setAttractions] = useState([]); // State to hold attractions
  
  const emptyTravelPackage = {
   name: "", 
   destination: "", 
   seasonal:"",
   ticketsLeft:0,
   duration:0,
   numAttractions:0,
   attractions:[],
   price:0,
   accomodation:"",
   avgRating:0,
   arrayOfRating:[],
   reviews:[],
   image:""
   };

// Sync loads all the travel packages from the mockapi onto the local  object
const syncTravelPackages = () => {
  APIServices.getTravelPackageAPI().then(travelPackage => setTravelPackage(travelPackage))

  console.log("Initial Sync",travelPackage)
}
// Run once
useEffect(() => {
    syncTravelPackages();
}, [])

 
  const maxDuration=7;
  const maxAttractions=5;
  const maxTickets=100;
  const maxPrice=5000;
  const maxPackages=5;

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


  const handleCreateTravelPackageClick = async(event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    
    let formData = new FormData(event.target); // Access form data using FormData


    console.log("Event formData ",event.target);
    // Access input values using their 'name' attributes from FormData
    const name = formData.get('name');
    const destination = formData.get('destination');
    const seasonal = formData.get('seasonal');
    const ticketsLeft = formData.get('ticketsLeft');
    const duration = formData.get('duration');
    const numAttractions = formData.get('numAttractions');
    const price = formData.get('price');
    const accomodation = formData.get('accomodation');
    const image = formData.get('image');

    console.log("IMAGE ",image);

    // Create an array to store attractions

    for (let i=1;i<=numAttractions;i++){
        attractions[i-1]=formData.get(`attraction_${i}`);

    }
     // Update the state with the new array of attractions

  // Create a new travel package object with the retrieved values
    const newTravelPackage = {
    name: name, // Assign the 'name' field from form data
    destination: destination, // Assign the 'destination' field from form data
    seasonal:seasonal,
    ticketsLeft:ticketsLeft,
    duration:duration,
    numAttractions:numAttractions,
    attractions:attractions,
    price:price,
    accomodation:accomodation,
    avgRating:0,
    arrayOfRating:[],
    reviews:[],
    image:image.name
    };

    setTravelPackage(newTravelPackage);
    console.log("TravelPackage Loaded ", newTravelPackage);
    await APIServices.addTravelPackageAPI(newTravelPackage).then(() => {
        syncTravelPackages();
       
    })
    setTravelPackage(emptyTravelPackage);
    console.log("TravelPackage Empty ", travelPackage);
    setShowCreatePopup(false);
  };

    // Function to handle the image file selection
    const handleImageChange = (e) => {
        console.log("Image e",e);
        const imageFile = e.target.files[0]; // Get the selected file
    
        if (imageFile) {
          // const imageUrl = URL.createObjectURL(file);
          setTravelPackage({
            ...travelPackage,
            image: imageFile.name, // Update the image URL in the state
          });
        
    
        console.log("Image TP ", travelPackage)
        console.log("Image file ",imageFile);
        // console.log("Image file ",imageUrl);
      }
      };

      const handleAttractionChange = (e, index) => {
        const updatedAttractions = [...attractions];
        updatedAttractions[index] = e.target.value;
        setAttractions(updatedAttractions);
      };


      const createAttractionInputs = () => {
        const attractionInputs = [];
        for (let i = 0; i < attractions.length; i++) {
          attractionInputs.push(
            <div key={`attraction_${i}`}>
              <label htmlFor={`attraction_${i + 1}`}>{`Attraction ${i + 1}: `}</label>
              <input
                id={`attraction_${i + 1}`}
                name={`attraction_${i + 1}`}
                // value={attractions[i] || ''}
                required pattern="[A-Za-z0-9 ]+"
                title="Please enter alphabets or numbers"
                // onChange={(e) => handleAttractionChange(e, i)}
              />
            </div>
          );
        }
        return attractionInputs;
      };

      const handleNumAttractionsChange = (e) => {
        let num = parseInt(e.target.value, 10);
   
        if (isNaN(num)){
            num=0;
        }

        const updatedAttractions = Array(num).fill('');
        setAttractions(updatedAttractions);
      };
     



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
            <form onSubmit={handleCreateTravelPackageClick}>
                <label htmlFor="name"> Name: </label>
                <input
                id="name"
                name="name"
                type="text"
                required pattern="[A-Za-z ]+"
                title="Please enter alphabets"
                />
                <label htmlFor="destination"> Destination: </label>
                <input
                id="destination"
                name="destination"
                type="text"
                required pattern="[A-Za-z ]+"
                title="Please enter alphabets"
                />
                <br></br>
                <br></br>
                <div>
                <label htmlFor="seasonal" style={{ display: 'inline-block' }}>Season: </label>
                <select id="seasonal" name="seasonal" >
                <option value="" >Select</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                </select>
                </div>
               <br></br>
                <label htmlFor="ticketsLeft"> Tickets Left: </label>
                <input
                id="ticketsLeft"
                name="ticketsLeft"
                type="number"
                required pattern="[0-9]+"
                min="1"
                max={maxTickets}
                title="Please enter numbers"
                />
                <label htmlFor="duration"> Duration: </label>
                <input
                id="duration"
                name="duration"
                type="number"
                required pattern="[0-9]+"
                min="1"
                max={maxDuration}
                title="Please enter numbers"
                />
                <label htmlFor="numAttractions"> # of Attractions: </label>
                <input
                id="numAttractions"
                name="numAttractions"
                type="number"
                required pattern="[0-9]+"
                min="0"
                max={maxAttractions}
                title="Please enter numbers"
                onChange={handleNumAttractionsChange}
                />
               
                {/* Render attraction input fields dynamically */}
                {createAttractionInputs()} 

                <label htmlFor="price"> Price: </label>
                <input
                id="price"
                name="price"
                type="number"
                required pattern="[0-9]+"
                min="1"
                max={maxPrice}
                title="Please enter numbers"
                />
                <label htmlFor="accomodation">Accomodation: </label>
                <input
                id="accomodation"
                name="accomodation"
                required pattern="[A-Za-z0-9 ]+"
                title="Please enter alphabets or numbers"
                />
                <label htmlFor="image">Image: </label>
                <input  
                type="file"
                name="image"
                required
                onChange={handleImageChange}
                />
                 {/* <button type="submit" onClick={() => handleCreateSubmit}>Submit</button> */}
                 <button type="submit">Submit</button> 
            </form> 
          </div>
        )}
      </main>
    </>
  );
}

export default App;
