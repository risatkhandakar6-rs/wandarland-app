'use client'
import { authClient } from '@/lib/auth-client'
import { Avatar } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
      const { 
        data: session, 
  } = authClient.useSession() 
  const user = session?.user;
  console.log(user);
  const handleSignOut = async () => {
    await authClient.signOut();
  }
  
  return (

  
  <nav className='grid grid-cols-3 items-center p-4 bg-gray-100'>
      <ul className='flex gap-3'>
          <li><Link href={'/'}>Home</Link></li>
   <li><Link href={'/allDestinations'}>Destinations</Link></li>
              <li><Link href={'/my-bookings'}>My Bookings</Link></li>
           <li><Link href={'/add-destination'}>Add Destination</Link></li>
  </ul>

  <div className='flex justify-center'>
    <Image width={200} height={200} alt='image' src='/assets/Wanderlast.png' />
  </div>

      <ul className='flex gap-3 justify-end items-center'>
        <li><Link href={'/profile'}>Profile</Link></li>
        
        {user?
          <>
            <li><Avatar>
              <Avatar.Image referrerPolicy='no-refferer' className='h-auto object-cover' alt={user?.name} src={user?.image} ></Avatar.Image>
              
            </Avatar></li>
           <li><button className='btn btn-error' onClick={handleSignOut}>SignOut</button></li>
          </>:
          <>
           <li><Link href={'/login'}>LogIn</Link></li>
       <li><Link href={'/signUp'}>signUp</Link></li></>
      }
  </ul>
</nav>
  )
}
