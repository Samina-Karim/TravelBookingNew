import React, { useState } from 'react';

function TravelersCounter({onSave})
{
    const [adults, setAdults] = useState(1);  // useState for adults
    const [children, setChildren] = useState(0);  // useState for children

    // console.log(adults,children);
    


    function save()
    {
        const totalTravelers = adults + children;
        onSave(totalTravelers);
    };

    function handleIncrement(type)
    {
        if(type ==='adults')
        {
            setAdults(adults + 1);
        }
        else if(type === 'children')
        {
            setChildren(children+1);
        }
        console.log(adults,children);
        // onTravelersChange({ adults, children });
    };

    function handleDecrement(type)
    {
        if(type === 'adults' && adults > 1)
        {
            setAdults(adults - 1);
        }
        else if(type === 'children' && children > 0)
        {
            setChildren(children-1);
        }
        // onTravelersChange({ adults, children });
        console.log(adults,children);
    };


return (

    <div className='travelersOptions' style={{margin:'2px'}}>
        <div style={{ marginLeft: '20px',fontSize:'20px' }} >

            <label style={{ fontSize:'22px' }}>Adults :  </label>
            <button style={{ marginLeft: '10px', marginRight: '20px' ,fontSize:'20px'}}
            onClick={() => handleDecrement('adults')}> -  </button>

            {adults}

            <button style={{ marginLeft: '20px',fontSize:'20px' }} 
            onClick={()=>handleIncrement('adults')}> + </button>

        </div>
        <br/>
        <div style={{ marginLeft: '2px',fontSize:'20px' }} >
            <label style={{ fontSize:'22px' }}>Children :  </label>
            <button style={{ marginLeft: '10px', marginRight: '20px' ,fontSize:'20px'}}
            onClick={() => handleDecrement('children')}> -  </button>

            {children}

            <button style={{ marginLeft: '20px',fontSize:'20px' }} 
            onClick={() => handleIncrement('children')}> + </button>
        </div>
        <br/>
        <button style={ { marginLeft: '80px', display:'flex',fontSize:'20px' }}
        onClick={save}>Save</button>
        
    </div>
        
    
);


};

export default TravelersCounter;