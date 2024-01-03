import React from 'react';
import { useState} from "react";
import APIServices from "./ApiServices";
;

const CreatePackage = ({ travelPackage, setTravelPackage,syncTravelPackages, setShowCreatePopup }) => {
  
  const maxDuration=7;
  const maxAttractions=5;
  const maxTickets=100;
  const maxPrice=5000;
 
  const [attractions, setAttractions] = useState([]); // State to hold attractions
  const [packageExistMsg, setPackageExistMsg]= useState(false); //State to ensure that packages of the same name are not created

//******************** ISTRAVELPACKAGENAMEEXIST **********************/


  const isTravelPackageNameExist = (name) => {

    const existingPackage = travelPackage.find(packageObj => packageObj.name === name);
  
    if (existingPackage) {
      console.log(`Match found for '${name}'`);
      return true;
    } else {
      console.log(`No match found for '${name}'`);
      return false;
    }
  };


/************ handleCreateTravelPackageClick ******************/
const handleCreateTravelPackageClick = async(event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  let formData = new FormData(event.target); // Access form data using FormData
  const name = formData.get('name');
  const destination = formData.get('destination');
  const seasonal = formData.get('seasonal');
  const ticketsLeft = formData.get('ticketsLeft');
  const duration = formData.get('duration');
  const numAttractions = formData.get('numAttractions');
  const price = formData.get('price');
  const accomodation = formData.get('accomodation');
  const image = formData.get('image');

  // Create an array to store attractions
  for (let i=1;i<=numAttractions;i++){
      attractions[i-1]=formData.get(`attraction_${i}`);
  }

  // Create a new travel package object with the retrieved values
  const newTravelPackage = {
  name: name,                 // Assign the 'name' field from form data
  destination: destination,   // Assign the 'destination' field from form data
  seasonal:seasonal,
  ticketsLeft:ticketsLeft,
  duration:duration,
  numAttractions:numAttractions,
  attractions:attractions,
  price:price,
  accomodation:accomodation,
  avgRating:"0",
  arrayOfRating:[],
  reviews:[],
  image:image.name
  };


 if (isTravelPackageNameExist(name)){
    console.log("Already Exists")
    setPackageExistMsg(true);
 } else{
    setPackageExistMsg(false);
    setTravelPackage([...travelPackage,newTravelPackage]);
    console.log("TravelPackage Loaded ", newTravelPackage);
    await APIServices.addTravelPackageAPI(newTravelPackage).then(() => {
        syncTravelPackages(); 
    })
 
    console.log("TravelPackage Status ", travelPackage);
    setShowCreatePopup(false);
 }
};


/*********************  createAttractionInputs *************************/
  const createAttractionInputs = () => {
      const attractionInputs = [];
      for (let i = 0; i < attractions.length; i++) {
        attractionInputs.push(
          <div key={`attraction_${i}`}>
            <label htmlFor={`attraction_${i + 1}`}>{`Attraction ${i + 1}: `}</label>
            <input
              id={`attraction_${i + 1}`}
              name={`attraction_${i + 1}`}
              required pattern="[A-Za-z0-9 ]+"
              title="Please enter alphabets or numbers"
            />
          </div>
        );
      }
      return attractionInputs;
  };

/*********************  handleNumAttractionsChange *************************/
  const handleNumAttractionsChange = (e) => {
      let num = parseInt(e.target.value, 10);
 
      if (isNaN(num)){
          num=0;
      }
      const updatedAttractions = Array(num).fill('');
      setAttractions(updatedAttractions);
  };
   



  return (
  
   // Conditional rendering based on showCreatePopup state
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
        {packageExistMsg && (
        <span style={{ color: 'red' }}>Package Name Already Exists!</span>
        )}
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
        <label htmlFor="availableTickets"> Available Tickets: </label>
        <input
        id="availableTickets"
        name="availableTickets"
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
        />
         <button type="submit">Submit</button> 
    </form> 

    {/* <div>
           <button onClick={handleProceed}>Proceed</button>
           {proceedConfirmation && <p>You chose to proceed!</p>}
         </div> */}
  </div>
)}




export default CreatePackage;
