import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center min-h-screen gap-20 w-[100%] m-auto  '>
     <h1 className=" text-black text-xl  bg-[#F98C53] px-8 py-5 text-center mx-auto rounded-md">
          You need to Login as
     </h1>
    <div className='flex flex-col justify-center items-center gap-2'>  
     
    <Link href="/login" className="bg-[#F98C53] text-white  px-20 py-2 rounded-md mb-2 mt-2 font">
    Tourist
   </Link>
   <Link href="" className="bg-[#F98C53] text-white px-16 py-2 rounded-md font">
    Tour Guide
   </Link>
   </div>
    </div>
  )
}

export default page