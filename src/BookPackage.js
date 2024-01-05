import React from 'react';
import { useState} from "react";
import APIServices from "./ApiServices";


const BookPackage = ({ travelPackage, setTravelPackage,syncTravelPackages, setShowBookPopup, listTravelPackage }) => {
 

  const [selectedPackageName,setSelectedPackageName] = useState(""); 


  /*********************  handleReviewClick *************************/
   const handleBookClick= async(event) => {
     event.preventDefault(); // Prevents the default form submission behavior
         
         console.log("Selected Package Name",selectedPackageName);
         if (selectedPackageName !== ""){
             const bookPackage = travelPackage.find(packageObj => packageObj.name === selectedPackageName);
             console.log("Book Package",bookPackage);
             // Calling delete API or function to delete the package
            //   await APIServices.deleteTravelPackageAPI(deletePackage.id).then(() => {
            //      // Update travelPackage state after deletion
            //      syncTravelPackages(); 
            //  }
            //  )
         }
     // Reset the selection after deletion
         setSelectedPackageName("");
         setShowBookPopup(false);
 
   };
 
   return (
     <div className="PopUpMenu">
        <h3>Book Package</h3>
       <label htmlFor="packageToBook" style={{ display: 'inline-block' }}>
         
       </label>
       <br></br>
        <select id="packageToBook" name="packageToBook" onChange={(e) => {
         console.log("E Target.Value",e.target.value);
        
         setSelectedPackageName(e.target.value)}}>
         {listTravelPackage(travelPackage)}
       </select>
       <br></br>
       <br></br>
       <br></br>
       <button onClick={handleBookClick}>Book</button>
     </div>
   );
   
    
      
    };
    
    export default BookPackage;