import { ResultsList } from "./ResultsList";
import Category from "../components/Category";

export default async function Page() {

    return (
        <div className="flex flex-col min-h-screen">
            <br></br>
            <br></br>
            <Category />
            <ResultsList/>
        </div>
    );
}
