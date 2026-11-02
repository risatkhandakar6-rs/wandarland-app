
import Booking from '@/components/Booking';
import { Delete } from '@/components/Delete';
import { EditModal } from '@/components/EditModal';
import { auth } from '@/lib/auth';


import { headers } from 'next/headers';
import Image from 'next/image';
import { Suspense } from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { FaLocationDot } from 'react-icons/fa6';
 async function ThisSuspence({params}) {
   const { id } = await params;
  //  const { token } = await auth.api.getToken({
  //      headers:await headers()
   // })
   const { token } = await auth.api.getToken({
     headers: await headers()
   })
   const res = await fetch(`http://localhost:8000/destination/${id}`, {
     headers: {
      authorization : `Bearer ${token}`
    }
  })
  const destination = await res.json();
  console.log(destination);
  const {
    _id,
    country,
    imageUrl,
    destinationName,
    price ,
    rating ,
    days ,
    nights,
    duration,
    description
  } = destination;

  
  
  return (
    <div className='container mx-auto mb-10  '>
      <div className='flex justify-end gap-3 mb-5'>
         <EditModal destination={destination}></EditModal>
      <Delete destination={destination}></Delete>
     </div>
  <div className="">
  <Image
    src={imageUrl}
    alt={destinationName}
          height={300} width={1200}
          quality={90}
          className='w-full h-150'
        />
        
      </div>

      
      <div className='flex justify-between items-center mt-10'>
        <div className='p-4'>
          <p className="flex gap-2 items-center  text-xs text-[#6C696D]"> <FaLocationDot></FaLocationDot> {country}</p>
         <div className="flex justify-between">
          <h5 className="font-medium mt-3 mb-3 text-6xl">{destinationName}</h5>
          
      
         </div>
      <p className='text-[#6C696D] flex text-xs items-center gap-1'><CiCalendarDate></CiCalendarDate> {duration} </p>
      <h1 className='font-medium text-2xl mt-2'>Overview</h1>
      <p className='text-xs  text-[#6C696D]'>{description}</p>
        </div>
        <div className='p-4'>
            <Booking destination={destination}></Booking>
       </div>
         </div>
     </div>
    
  )
}
export default function DestinatinDetails({params}) {
  return (
    <div>
      <h1>AllDestinations</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ThisSuspence params={params} />
      </Suspense>
    </div>
  );
}
