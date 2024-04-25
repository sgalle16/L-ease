"use client";
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { truncate } from '@/utils/helper';
import { useRouter } from 'next/navigation';

export default function Create() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState('');
    const [price, setPrice] = useState('');
    const [links, setLinks] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Add Apartment form submitted');

        if (!name || !location || !description || links.length !== 5 || !price) {
            console.log('Form data does not meet the required conditions');
            return;
        }

        const params = {
            name,
            description,
            location,
            images: links.slice(0, 5).join(','),
            price,
        };

        try {
            const response = await fetch('/api/saveProperty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (response.ok) {
                console.log('Datos guardados con éxito');
                
                // Redirige a la página principal
                router.push('/');
            } else {
                console.error('Error al guardar los datos');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const addImage = () => {
        if (links.length !== 5) {
            setLinks((prevState) => [...prevState, images]);
        }
        setImages('');
    };

    const removeImage = (index) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
    };

    return (
        <div className="h-screen flex justify-center mx-auto">
            <div className="w-11/12 md:w-2/5 h-7/12 p-6">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-center items-center">
                        <p className="font-semibold text-black">Add Property</p>
                    </div>

                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="text"
                            name="name"
                            placeholder="Room Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="number"
                            step={10000}
                            min={100000}
                            name="price"
                            placeholder="Price (COP)"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block flex-1 text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="url"
                            name="images"
                            placeholder="Images"
                            onChange={(e) => setImages(e.target.value)}
                            value={images}
                        />

                        {links.length !== 5 && (
                            <button
                                onClick={addImage}
                                type="button"
                                className="p-2 bg-[#000000] text-white rounded-full text-sm"
                            >
                                Add image link
                            </button>
                        )}
                    </div>

                    <div className="flex flex-row justify-start items-center rounded-xl mt-5 space-x-1 flex-wrap">
                        {links.map((link, i) => (
                            <div key={i} className="p-2 rounded-full text-gray-500 bg-gray-200 font-semibold flex items-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease space-x-2 text-xs">
                                <span>{truncate(link, 4, 4, 11)}</span>
                                <button
                                    onClick={() => removeImage(i)}
                                    type="button"
                                    className="bg-transparent hover focus:outline-none"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="text"
                            name="location"
                            placeholder="Location"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <textarea
                            className="block w-full text-sm resize-none text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0 h-20"
                            name="description"
                            placeholder="Room Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        ></textarea>
                    </div>
                        
                    <button
                        type="submit"
                        className="flex flex-row justify-center items-center w-full text-white text-md bg-[#000000] py-2 px-5 rounded-full drop-shadow-xl hover:bg-white border-transparent border hover:text-[#000000] hover:border-[#000000] mt-5 transition-all duration-500 ease-in-out"
                    >
                        Add Apartment
                    </button>
                </form>
            </div>
        </div>
    );
}
