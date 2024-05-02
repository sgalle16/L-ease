"use client";
import React from 'react'
import Link from 'next/link';
import { BsHouses } from "react-icons/bs"
import { LiaFileContractSolid } from "react-icons/lia"
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { FaHouseMedical } from "react-icons/fa6";




const Category = () => {
  return (
    <div className="flex justify-center space-x-5 sm:space-x-14 p-4 px-4 border-b-2
     border-b-slate-200 text-gray-600">
      <Link href="/create">
        <p className="flex flex-col items-center hover:text-black border-b-2
        border-transparent hover:border-black hover:cursor-pointer pb-2">
          <FaHouseMedical className="text-3xl" />
          Subir Propiedad
        </p>
      </Link>
      <p className="flex flex-col items-center hover:text-black border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2">
        <BsHouses className="text-3xl" />
        Mis Propiedades
      </p>
      <p className="flex flex-col items-center hover:text-black border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2">
        <LiaFileContractSolid className="text-3xl" />
        Mis contratos
      </p>
      <p className="flex flex-col items-center hover:text-black border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2">
        <HiClipboardDocumentList className="text-3xl" />
        Historial de contratos
      </p>
      <p className="flex flex-col items-center hover:text-black border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2">
        <FaRegUser className="text-3xl" />
        Mi Perfil
      </p>
    </div>
  )
}

export default Category
