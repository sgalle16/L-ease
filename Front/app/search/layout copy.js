import Header from "./Header";
import Footer from "./Footer";

export default function SearchLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow relative pt-4 container mx-auto bg-d6dbdc">
                {children}
            </main>
            <Footer />
        </div>
    );
}
