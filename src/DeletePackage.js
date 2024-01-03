import React from 'react';
import { useState} from "react";
import APIServices from "./ApiServices";
;

const DeletePackage = ({ travelPackage, setTravelPackage,syncTravelPackages, setShowDeletePopup }) => {
 

const [selectedPackage,setSelectedPackage] = useState([]); 

/******************** LISTOFPACKAGENAMES  ******************************/
const listOfPackageNames = () => {
    
    const packageNames =[];
  
    for (let i=0; i< travelPackage.length; i++){
       packageNames[i] = travelPackage[i].name;
  
    }
    console.log("PackageNames ",packageNames);
  };

    /*********************  listDeleteTravelPackage *************************/
    const listDeleteTravelPackage = (travelPackage) => {
        const packageOptions = [];
      
        for (let i = 0; i < travelPackage.length; i++) {
          packageOptions.push(
            <option key={travelPackage[i].name} value={travelPackage[i].name}>
              {travelPackage[i].name}
            </option>
          );
          
        }

        console.log("Package Names", packageOptions);
      
        return packageOptions;
      };

    
      const handleDeleteClick = () => {
        // Implement deletion logic based on selectedPackage
        // Use selectedPackage value to delete the chosen travel package
        // Call relevant API or function to delete the package
        // Ensure to update travelPackage state after deletion
        // You may use setSelectedPackage('') to reset the selection after deletion
      };
    
      return (
        <div className="deletePopUpMenu">
           <h3>Delete Package</h3>
          <label htmlFor="packageToDelete" style={{ display: 'inline-block' }}>
            
          </label>
          <br></br>
          <select id="packageToDelete" onChange={(e) => setSelectedPackage(e.target.value)}>
            {/* Invoke the function to render the list of package options */}
            {listDeleteTravelPackage(travelPackage)}
          </select>
          <br></br>
          <br></br>
          <br></br>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      );
    };
    
    export default DeletePackage;