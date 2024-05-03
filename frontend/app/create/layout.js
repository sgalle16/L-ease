import Header from "../search/Header";
import Footer from "../search/Footer";

export default function SearchLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="relative container mx-auto bg-FFFFFF flex-grow pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}
