
export default function SearchLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="relative pt-20 container mx-auto bg-FFFFFF">
                {children}
            </main>
        </div>
    );
}
