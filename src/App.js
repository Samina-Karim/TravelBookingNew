import './App.css';
import BrowseForm from './BrowseForm';
import { useState } from 'react';
import React from 'react';
import logo from './logo.png';

// import axios from 'axios';

function App() {
const [from,setFrom] = useState('');
const [to,setTo] = useState('');
const [season,setSeason] = useState('');
const [trav,setTrav] = useState(1);

const [showHomePopup, setShowHomePopup] = useState(false);
const [showAboutPopup, setShowAboutPopup] = useState(false);
const [showTravelPopup, setShowTravelPopup] = useState(false);
const [showContactPopup, setShowContactPopup] = useState(false);

const [travelPackage, setTravelPackage] = useState({
  image: '',
  destination: '',
  seasonal: '',
  ticketsleft: 0,
  duration: 0,
  attraction: [],
  price: 0,
  accommodation: '',
  rate: { avgRating: 0, arrayOfRating: [] },
  reviews: [],
})

const openPopup = (popupName) => {
  switch (popupName) {
    case 'home':
      setShowHomePopup(true);
      break;
    case 'about':
      setShowAboutPopup(true);
      break;
    case 'travel':
      setShowTravelPopup(true);
      break;
    case 'contact':
      setShowContactPopup(true);
      break;
    default:
      break;
  }
}


function handleFromChange(e)
{
  e.preventDefault();
  // console.log(e.target.value);
  setFrom(e.target.value);
};

function handleToChange(e)
{
  e.preventDefault();
  // console.log(e.target.value);
  setTo(e.target.value);

};

function handleSeasonChange(e)
{
  e.preventDefault();
  // console.log(e.target.value);
  setSeason(e.target.value);
};

function handleTravelers(travelers)
{
  console.log(travelers);
  setTrav(travelers);
}

function handleSubmit()
{
  console.log(from,to,season,trav);
}


  return (
    <>
    <header className='head'>
      <div className='button-container'>
      <img src={logo} height="130px" width="120px" alt="Logo" />
      <div className='button-group'>
            <button>HOME</button>
            <button>ABOUT</button>
            <button onClick={() => openPopup('createTravelPackage')}>TRAVEL PACKAGES</button>
            <button>CONTACT</button>
          </div>
      </div>
    </header>

    <main className='body'>
      <BrowseForm from = {handleFromChange} to={handleToChange} 
      season={handleSeasonChange} trav={handleTravelers} submit={handleSubmit}/>
      
    </main>
      
    </>
  );
}

export default App;
