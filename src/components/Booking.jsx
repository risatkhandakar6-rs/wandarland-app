'use client'
import { authClient } from '@/lib/auth-client';
import { Card, DateField, Label } from '@heroui/react'

import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export default function Booking({ destination }) {
  const [departureDate, setDepartureDate] = useState(null);
  console.log(departureDate)

     const { 
          data: session, 
    } = authClient.useSession() 
  const user = session?.user;
  
  const {
    _id,
    country,
    imageUrl,
    destinationName,
    price ,
    rating ,
    days ,
    nights,
    duraion
  } = destination;
  console.log(destination);

  

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destination: _id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDate: new Date(departureDate)
    };
     
    // const { data: tokenData } = await authClient.token();
    // console.log(tokenData)
    const { data: tokenData } = await authClient.token();
    
   


    const req = await fetch('http://localhost:8000/booking', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization:`Bearer ${tokenData?.token}`
     
   
      },
      body: JSON.stringify(bookingData)
    })
    const data = await req.json();
    // console.log(session ,'this is user')
    toast.success('bookings succesfully')
  }
 


  return (
    <Card className='border rounded-none a'>
      <p className='text-xs text-[#6C696D]'>Starting from</p>
      <h1 className='text-[#15A1BF] font-bold text-3xl'>${price}</h1>
      <p className='text-xs text-[#6C696D]'>Per Person</p>

         <DateField onChange={setDepartureDate} className="w-[256px] mt-7 " name="date">
   
      <DateField.Group className='rounded-none bg-[#EEEEEE]'>
        <DateField.Input >{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
      </DateField>
      <div className='divider '></div>
      <button onClick={handleBooking} className='bg-[#15A1BF] btn text-white'>Book Now <FaArrowRight></FaArrowRight> </button>
    </Card>
  )
}
