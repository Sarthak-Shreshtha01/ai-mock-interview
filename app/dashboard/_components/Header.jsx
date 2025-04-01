"use client"
import React, { useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Header = () => {


  const path= usePathname();
  useEffect(()=>{
    console.log(path)
  },[]);

  return (
    <div className='flex p4 items-center justify-between bg-secondary shadow-sm ' >
      <Image src={"/logo.svg" } width={160} height={100} alt="logo" />
      <ul className=' hidden md:flex gap-6' >
        <li className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${path === "/dashboard" ? "text-[#4845D2] font-bold" : ""}`}>
          DashBoard
        </li>
        <li className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${path === "/dashboard/questions" ? "text-[#4845D2] font-bold" : ""}`}>
          Questions
        </li>
        <li className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${path === "/dashboard/upgrade" ? "text-[#4845D2] font-bold" : ""}`}>
          Upgrade
        </li>
        <li className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${path === "/dashboard/how" ? "text-[#4845D2] font-bold" : ""}`}>
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header