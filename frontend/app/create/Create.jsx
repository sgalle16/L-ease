"use client";
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { truncate } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../search/components/LoadingSpinner/LoadingSpinner'; // Asegúrate de tener un componente de carga

export default function Create() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState('');
    const [price, setPrice] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado para la carga
    const [errorMessage, setErrorMessage] = useState(''); // Nuevo estado para el mensaje de error

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Add Apartment form submitted');
        
        // Verifica que los campos requeridos estén llenos
        if (!name || !location || !description || links.length !== 1 || !price) {
            console.log('Form data does not meet the required conditions');
            setErrorMessage('Please fill in all required fields.');
            return;
        }
        
        const params = {
            name,
            owner,
            description,
            location,
            images: links.slice(0, 5).join(','),
            price,
            email,
            phone
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
                setErrorMessage('Error saving data. Please try again.');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            setErrorMessage('Error sending request. Please try again.');
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
            <div className="w-11/12 md:w-3/5 h-7/12 p-6">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-left items-center">
                        <p className="font-semibold text-black">Registra tu Propiedad</p>
                    </div>

                    {/* Círculo de carga */}
                    {isLoading && <LoadingSpinner />}

                    {/* Mensaje de error */}
                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                    )}

                    {/* Resto del formulario */}
                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="text"
                            name="name"
                            placeholder="Título"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="text"
                            name="owner"
                            placeholder="Nombre completo del arrendador"
                            onChange={(e) => setOwner(e.target.value)}
                            value={owner}
                            required
                        />
                    </div>

                    {/* Precio */}
                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="number"
                            step={1000}
                            min={100000}
                            name="price"
                            placeholder="Price (COP)"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>

                    {/* Links de imágenes */}
                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block flex-1 text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="url"
                            name="images"
                            placeholder="Images"
                            onChange={(e) => setImages(e.target.value)}
                            value={images}
                        />

                        {links.length !== 1 && (
                            <button
                                onClick={addImage}
                                type="button"
                                className="p-2 bg-[#000000] text-white rounded-full text-sm"
                            >
                                Add image link
                            </button>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">At least 1 image links is required</p>

                    {/* Mostrar imágenes cargadas */}
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

                    {/* Ubicación */}
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

                    {/* Descripción */}
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

                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="text"
                            name="email"
                            placeholder="Correo electrónico del arrendador"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
                        <input
                            className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                            type="text"
                            name="phone"
                            placeholder="Teléfono del arrendador"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                        />
                    </div>

                    {/* Botón de envío */}
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
