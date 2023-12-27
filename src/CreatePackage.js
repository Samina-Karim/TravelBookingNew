import React from 'react';
import { useState} from "react";
import APIServices from "./ApiServices";

const CreatePackage = ({ travelPackage, setTravelPackage,syncTravelPackages, setShowCreatePopup }) => {
  
  const maxDuration=7;
  const maxAttractions=5;
  const maxTickets=100;
  const maxPrice=5000;
  const maxPackages=5;
  const [attractions, setAttractions] = useState([]); // State to hold attractions
  
  const emptyTravelPackage = {
   name: "", 
   destination: "", 
   seasonal:"",
   ticketsLeft:"0",
   duration:"0",
   numAttractions:"0",
   attractions:[],
   price:"0",
   accomodation:"",
   avgRating:"0",
   arrayOfRating:[],
   reviews:[],
   image:""
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

  setTravelPackage(newTravelPackage);
  console.log("TravelPackage Loaded ", newTravelPackage);
  await APIServices.addTravelPackageAPI(newTravelPackage).then(() => {
      syncTravelPackages(); 
  })
  setTravelPackage(emptyTravelPackage);
  setTravelPackage({
      ...travelPackage,
      image: "", // Update the image URL in the state
  });
  console.log("TravelPackage Empty ", travelPackage);
  setShowCreatePopup(false);
};

/************  Function to handle the image file selection ****************/
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
         <button type="submit">Submit</button> 
    </form> 
  </div>
)}




export default CreatePackage;
