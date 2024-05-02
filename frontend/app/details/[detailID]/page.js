"use client";
import { useParams } from 'next/navigation';
import Details from '../Details';
import Title from '../Title';
import Head from 'next/head';

// Importa los datos JSON.
import data from '../../listingsData.json';

export default function Page() {
    // Obtén el ID dinámico de la ruta.
    const { detailID } = useParams();
    console.log('detailID:', detailID);


    // Convierte el detailID a un número para compararlo con los IDs del JSON.
    const detailIDNum = parseInt(detailID, 10);

    // Imprime el valor de detailIDNum para depurar.
    console.log('detailIDNum:', detailIDNum);

    // Filtra para obtener la propiedad que coincida con el ID.
    let property = null;
    data.forEach(item => {
        // Imprime el valor de item.id para depurar.
        console.log('item.id:', item.id);
        if (item.id === detailIDNum) {
            property = item;
        }
    });

    // Si no se encuentra la propiedad, devuelve "Property not found".
    if (!property) {
        return <div>Property not found</div>;
    }

    // Si se encuentra la propiedad, se muestra su información.
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Property Details - {property.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Title apartment={property} />
                <Details apartment={property} />
            </div>
        </div>
    );
}
