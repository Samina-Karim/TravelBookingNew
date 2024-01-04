import React from 'react';
import { useState} from "react";
import APIServices from "./ApiServices";


const ReviewPackage = ({ travelPackage, setTravelPackage,syncTravelPackages, setShowReviewPopup, listTravelPackage }) => {
 

  const [selectedPackageName,setSelectedPackageName] = useState(""); 


  /*********************  handleReviewClick *************************/
   const handleReviewClick= async(event) => {
     event.preventDefault(); // Prevents the default form submission behavior
         
         console.log("Selected Package Name",selectedPackageName);
         if (selectedPackageName !== ""){
             const reviewPackage = travelPackage.find(packageObj => packageObj.name === selectedPackageName);
             console.log("Review Package",reviewPackage);
             // Calling delete API or function to delete the package
            //   await APIServices.deleteTravelPackageAPI(deletePackage.id).then(() => {
            //      // Update travelPackage state after deletion
            //      syncTravelPackages(); 
            //  }
            //  )
         }
     // Reset the selection after deletion
         setSelectedPackageName("");
         setShowReviewPopup(false);
 
   };
 
   return (
     <div className="PopUpMenu">
        <h3>Review Package</h3>
       <label htmlFor="packageToReview" style={{ display: 'inline-block' }}>
         
       </label>
       <br></br>
        <select id="packageToReview" name="packageToReview" onChange={(e) => {
         console.log("E Target.Value",e.target.value);
        
         setSelectedPackageName(e.target.value)}}>
         {listTravelPackage(travelPackage)}
       </select>
       <br></br>
       <br></br>
       <br></br>
       <button onClick={handleReviewClick}>Review</button>
     </div>
   );
   
    
      
    };
    
    export default ReviewPackage;