import Details from "./Details";
import Title from "./Title";
import Head from 'next/head'

export default async function Page() {
    const res = await fetch('http://localhost:3000/api/search');
    const data = await res.json();

    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>RentEvo - Home Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>Eclipse Tech</p>
            <p>‎ </p>
            <div>
                <Title />
                <Details />
            </div>
            
        </div>
    );
}
