import React from 'react';

const CreatePackage = ({ travelPackage, errorMessage, handleTyping, handleImageChange, openPopup }) => {



 





  return(
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
        onChange={handleImageChange}
      />
      <br />
        <button onClick={() => openPopup("create2")}>Next</button>
  </div>
  )}
  )
}

export default CreatePackage;
