import Link from 'next/link';
import { Home, MapPin, Users } from 'react-feather';

export default function Sidebar() {
    return (
        <aside className="w-64 h-full bg-gray-800 text-white">
            <nav className="mt-10">
                <Link href="/dashboard">
                    <a className="flex items-center px-4 py-2 hover:bg-gray-700">
                        <Home className="mr-2" /> Dashboard
                    </a>
                </Link>
                <Link href="/locations">
                    <a className="flex items-center px-4 py-2 hover:bg-gray-700">
                        <MapPin className="mr-2" /> Locations
                    </a>
                </Link>
                <Link href="/maps">
                    <a className="flex items-center px-4 py-2 hover:bg-gray-700">
                        <MapPin className="mr-2" /> Maps
                    </a>
                </Link>
                <Link href="/users">
                    <a className="flex items-center px-4 py-2 hover:bg-gray-700">
                        <Users className="mr-2" /> User Management
                    </a>
                </Link>
            </nav>
        </aside>
    );
}