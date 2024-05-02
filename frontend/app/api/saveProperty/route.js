import fs from 'fs';
import path from 'path';

export async function POST(req) {
    console.log('API POST ha sido llamada');

    try {
        const data = await req.json(); // Parsear JSON desde el request

        // Ruta al archivo JSON
        const jsonFilePath = path.join(process.cwd(), 'app/listingsData.json');

        // Cargar los datos existentes del archivo JSON
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        const listings = JSON.parse(jsonData);

        // Obtener el ID autoincrementable
        const lastId = listings.length > 0 ? listings[listings.length - 1].id : 0;
        const newId = lastId + 1;

        // Crear un nuevo objeto con los datos del formulario
        const newListing = {
            id: newId,
            name: data.name,
            owner: data.owner,
            description: data.description,
            location: data.location,
            image: data.images.split(',')[0], // Utiliza el primer enlace de los cinco
            price: parseFloat(data.price),
            email: data.email,
            phone: data.phone,
            rating: 4.0, // Calificación por defecto
        };

        // Agregar el nuevo objeto a los datos existentes
        listings.push(newListing);

        // Sobrescribir el archivo JSON con los datos actualizados
        fs.writeFileSync(jsonFilePath, JSON.stringify(listings, null, 2), 'utf-8');

        // Enviar respuesta exitosa
        return new Response(
            JSON.stringify({ message: 'Datos guardados con éxito' }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        // Registrar el error para ayudar a depurar problemas
        console.error('Error al guardar los datos:', error);

        // Enviar respuesta de error con un mensaje claro
        return new Response(
            JSON.stringify({ message: 'Error al guardar los datos', error: error.message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}

export async function GET(req) {
    console.log('API GET ha sido llamada');

    try {
        // Ruta al archivo JSON
        const jsonFilePath = path.join(process.cwd(), 'app/listingsData.json');

        // Cargar los datos existentes del archivo JSON
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        const listings = JSON.parse(jsonData);

        // Enviar los datos como respuesta
        return new Response(
            JSON.stringify(listings),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        // Registrar el error para ayudar a depurar problemas
        console.error('Error al cargar los datos:', error);

        // Enviar respuesta de error con un mensaje claro
        return new Response(
            JSON.stringify({ message: 'Error al cargar los datos', error: error.message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
