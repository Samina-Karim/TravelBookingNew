import React,{ useState } from 'react';
import { FaPlaneDeparture } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import TravelersCounter from './travelers';

function BrowseForm({from,to,season,trav,submit})
{
  const [isOpen, setIsOpen] = useState(false);
  const [travelers,setTravelers] = useState(1);


  function handleToggle()
    {
        setIsOpen(true);
    };


  function handleSave(travelers)
  {
    console.log(travelers);
    setTravelers(travelers);
    setIsOpen(false);
    trav(travelers);
  };



  return (
    <div>
      <h2>number of adults and children</h2>
      <div className='browseForm'>
        <div className='from'>
          <FaPlaneDeparture className='icon'/>
          <input className='fromInput' placeholder='From?' onChange={from} ></input>
        </div>

        <div className='to'>
          <FaPlaneArrival className='icon'/>
          <input className='toInput' placeholder='To?' onChange={to}></input>
        </div>
        
        <div className='date'>
          <FaRegCalendarAlt className='icon'/>
          <select className='selectInput' onChange={season}>
            <option value="">Select an option</option>
            <option value="winter">Winter</option>
            <option value="summer">Summer</option>
            <option value="spring">Spring</option>
            <option value="fall">Fall</option>
          </select>
        </div>

        <div className='travelers' onClick={handleToggle} >
          <GoPersonFill className='icon'/>
          {travelers} Travelers
        </div>

        <div className='options'>
          {isOpen && <TravelersCounter  onSave={handleSave} />}
        </div>

        <button className='browse' onClick={submit}>Search</button>
      </div>

    </div>
  );
};

export default BrowseForm;