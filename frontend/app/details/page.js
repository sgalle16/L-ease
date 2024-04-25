import Details from "./Details";
import Title from "./Title";

export default async function Page() {
    const res = await fetch('http://localhost:3000/api/search');
    const data = await res.json();

    return (
        <div className="flex flex-col min-h-screen">
            <div>
                <Title />
                <Details />
            </div>
            
        </div>
    );
}
