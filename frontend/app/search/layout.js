import Header from "./Header";
import Footer from "./Footer";

export default function SearchLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="relative pt-20 container mx-auto bg-FFFFFF">
                {children}
            </main>
            <Footer />
        </div>
    );
}
