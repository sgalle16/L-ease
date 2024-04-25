"use client";
import { FaTimes } from 'react-icons/fa'

export default function Add() {
   
  return (
    <div className="h-screen flex justify-center mx-auto">
      <div className="w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex justify-center items-center">
            <p className="font-semibold text-black">Add Property</p>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="name"
              placeholder="Room Name "
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (ETH)"
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
            <input
              className="block flex-1 text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="url"
              name="images"
              placeholder="Images"
            />

            
            <button
              type="button"
              className="p-2 bg-[#000000] text-white rounded-full text-sm"
            >
              Add image link
            </button>
            
          </div>

          <div
            className="flex flex-row justify-start items-center
          rounded-xl mt-5 space-x-1 flex-wrap"
          >
           
            <div
              className="p-2 rounded-full text-gray-500 bg-gray-200 font-semibold
              flex items-center w-max cursor-pointer active:bg-gray-300
              transition duration-300 ease space-x-2 text-xs"
            >
              
              <button
                onClick={() => removeImage(i)}
                type="button"
                className="bg-transparent hover focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
            
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 p-2 rounded-xl mt-5"
          >
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="location"
              placeholder="Location"
              required
            />
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 p-2 rounded-xl mt-5"
          >
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="rooms"
              placeholder="Number of room"
              required
            />
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 p-2 rounded-xl mt-5"
          >
            <textarea
              className="block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Room Description"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`flex flex-row justify-center items-center
            w-full text-white text-md bg-[#000000]
            py-2 px-5 rounded-full drop-shadow-xl hover:bg-white
            border-transparent border
            hover:hover:text-[#000000]
            hover:border-[#000000]
            mt-5 transition-all duration-500 ease-in-out`}
          >
            Add Appartment
          </button>
        </form>
      </div>
    </div>
  )
}
