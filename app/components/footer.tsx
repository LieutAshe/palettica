import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <p className="text-sm">© 2025 Palettica. All rights reserved.</p>
            <p>Star this <Link href={''}>project</Link> on Github! Made by LieutAshe</p>
        </footer>
    );
}