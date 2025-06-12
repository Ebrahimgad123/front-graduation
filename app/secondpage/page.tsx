import Link from 'next/link'
import React from 'react'
import { SiTravisci } from "react-icons/si";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import { HiMiniSquaresPlus } from "react-icons/hi2";

const page = () => {
  return (
    <div className='flex flex-col justify-center min-h-screen gap-20 w-[100%] m-auto bg-[#120a34]'>
      <h1 className="text-white text-xl bg-[#416aef] px-8 py-5 text-center mx-auto rounded-md flex items-center gap-2 cairo">
       <HiMiniSquaresPlus size={30} color='blue' /> يجب عليك تسجيل الدخول كـ 
      </h1>
      
      <div className='flex flex-col justify-center items-center gap-4'>  
        <Link href="/login" className="bg-[#416aef]  text-white px-20 py-2 rounded-md mb-2 mt-2 flex items-center gap-2 cairo bold ">
        <FaPersonDotsFromLine size={30} color='blue'/>سائح 
        </Link>
        <Link href="" className="bg-[#416aef] text-white px-16 py-2 rounded-md flex items-center gap-2 cairo">
        <SiTravisci size={30} color='blue'/> مرشد سياحي 
        </Link>
      </div>
    </div>
  )
}

export default page;

