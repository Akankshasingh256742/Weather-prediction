import React, { useState } from 'react'
import { UilSearch,UilLocationPoint } from '@iconscout/react-unicons'

function Inputs({setquery,units,setunits}) {
  const [city,setcity] =  useState('')

  const handleunitchange = (e) => {
    const selectedunit = e.currentTarget.name
    if(units !== selectedunit) setunits(selectedunit)
  }

   const handlesearchclick = () =>{
          if(city !== '') setquery({q:city})
   }

  return (
    <div className='flex flex-row justify-center my-6'>
       <div className='flex flex-row w-3/4 justify-center space-x-4'>
        <input 
        value={city}
        onChange={(e) => setcity(e.currentTarget.value)}
         type="text" placeholder='search for city...' className='text-l font-light p-1 pl-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase' />
        <UilSearch onClick={handlesearchclick} size={25} className='text-white   cursor-pointer transition ease-out hover:scale-125' />
        
        </div>
        <div className='flex flex-row w-1/4 justify-center items-start'>
            <button onClick={handleunitchange} name='metric' className='text-l text-white font-light hover:scale-125 transition ease-out'>°C</button>
            <p className='text-l text-white mx-1'>|</p>
            <button onClick={handleunitchange} name='imperial' className='text-l text-white font-light hover:scale-125 transition ease-out'>°F</button>
        </div>
        
    </div>
  )
}

export default Inputs