import { ResultsList } from "./results/ResultsList";
import Category from "./components/Category";

export default async function Page() {
    //const res = await fetch('http://localhost:3000/api/search');
    //const data = await res.json();

    return (
        <div className="flex flex-col min-h-screen">
            <br></br>
            <br></br>
            <div>
                <Category />
            </div>
            <ResultsList /*data={data}*/ />
        </div>
    );
}
