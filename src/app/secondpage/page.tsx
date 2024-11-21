import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-2'>  
     <h1 className=" text-black text-xl ">
          You need to Login as
     </h1>
    <Link href="/login" className="bg-orange-400  px-20 py-2 rounded-2xl mb-2 mt-2 text-xl font">
    Tourist
   </Link>
   <Link href="" className="bg-orange-400   px-16 py-2 rounded-2xl text-xl font">
    Tour Guide
   </Link>
   </div>
  )
}

export default page