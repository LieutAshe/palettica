import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between text-white fixed inset-1 bottom-auto z-50
            sm:inset-2 sm:bottom-auto
        ">
            <div className="flex items-center p-2
                sm:bg-gray-800 sm:rounded-lg sm:shadow-md 
            ">
                <Image
                    src={'/logo.png'}
                    alt="Palettica Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                <h1 className="text-xl font-bold font-quicksand">Palettica</h1>
            </div>

            {/* GitHub Star Button */}
            <div className="flex items-center
                sm:bg-gray-800 sm:rounded-lg sm:shadow-md
            ">
                <a
                    href="https://github.com/lieutAshe/palettica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm p-2 hover:bg-gray-600 transition font-medium rounded-lg"
                >
                    ⭐ Star on GitHub
                </a>
            </div>
        </header>
    );
}
