import React from 'react';
import { useState} from "react";
import APIServices from "./ApiServices";
;

const DeletePackage = ({ travelPackage, setTravelPackage,syncTravelPackages, setShowDeletePopup, listTravelPackage }) => {
 

const [selectedPackage,setSelectedPackage] = useState(""); 


     /*********************  handleDeleteClick *************************/
      const handleDeleteClick= async(event) => {
        event.preventDefault(); // Prevents the default form submission behavior
            
            console.log("Selected Package",selectedPackage);
            if (selectedPackage !== ""){
                const deletePackage = travelPackage.find(packageObj => packageObj.name === selectedPackage);
                console.log("Delete Package ID",deletePackage.id);
                // Calling delete API or function to delete the package
                await APIServices.deleteTravelPackageAPI(deletePackage.id).then(() => {
                    // Update travelPackage state after deletion
                    syncTravelPackages(); 
                })
            }
        // Reset the selection after deletion
            setSelectedPackage("");
            setShowDeletePopup(false);
    
      };
    
      return (
        <div className="PopUpMenu">
           <h3>Delete Package</h3>
          <label htmlFor="packageToDelete" style={{ display: 'inline-block' }}>
            
          </label>
          <br></br>
           <select id="packageToDelete" name="packageToDelete" onChange={(e) => {
            console.log("E Target.Value",e.target.value);
           
            setSelectedPackage(e.target.value)}}>
            {listTravelPackage(travelPackage)}
          </select>
          <br></br>
          <br></br>
          <br></br>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      );
    };
    
    export default DeletePackage;