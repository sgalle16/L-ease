"use client";
import { useState, useRef } from "react";
import Image from "next/image";



export default function Footer() {
  const ref = useRef(null);
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto flex justify-between">
        <div className="text-red-500 hidden md:block">
          <Image src="/images/logo1.png" height={50} width={172} alt="Logo" />
        </div>
        <div className="hidden md:flex flex-grow items-center justify-center">
          {/* Aquí puedes agregar contenido adicional para el pie de página */}
        </div>
        <div className="md:hidden">
          {/* Contenido adicional para dispositivos móviles si es necesario */}
        </div>
      </div>
    </footer>
  );
}
