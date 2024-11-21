import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center min-h-screen gap-20 w-[100%] m-auto  '>
     <h1 style={{borderRadius:'30px 0 30px 0'}} className=" text-black text-xl  bg-orange-200 px-8 py-5 text-center mx-auto rounded-md">
          You need to Login as
     </h1>
    <div className='flex flex-col justify-center items-center gap-2'>  
     
    <Link href="/login" className="bg-orange-300 text-gray-700  px-20 py-2 rounded-2xl mb-2 mt-2 text-xl font">
    Tourist
   </Link>
   <Link href="" className="bg-orange-300 text-gray-700 px-16 py-2 rounded-2xl text-xl font">
    Tour Guide
   </Link>
   </div>
    </div>
  )
}

export default page