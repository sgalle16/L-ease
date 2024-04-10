"use client";
import React from 'react'
import { TbBeach } from 'react-icons/tb'
import { GiCampingTent, GiIsland } from 'react-icons/gi'
import { BsSnow2 } from 'react-icons/bs'
import { RiHotelLine } from 'react-icons/ri'

import { BsHouses } from "react-icons/bs"
import { LiaFileContractSolid } from "react-icons/lia"
import { LiaSearchLocationSolid } from "react-icons/lia"
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";




const Category = () => {
  return (
    <div className="flex justify-center space-x-5 sm:space-x-14 p-4 px-4 border-b-2
     border-b-slate-200 text-gray-600">
      <p className="flex flex-col items-center hover:text-black border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2">
        <LiaSearchLocationSolid className="text-3xl" />
        Search Properties
      </p>
      <p className="flex flex-col items-center hover:text-black border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2">
        <BsHouses className="text-3xl" />
        My Properties
      </p>
      <p className="flex flex-col items-center hover:text-black border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2">
        <LiaFileContractSolid className="text-3xl" />
        My Contracts
      </p>
      <p className="flex flex-col items-center hover:text-black border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2">
        <HiClipboardDocumentList className="text-3xl" />
        Contract History
      </p>
      <p className="flex flex-col items-center hover:text-black border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2">
        <FaRegUser className="text-3xl" />
        My Profile
      </p>
    </div>
  )
}

export default Category
