import { useSession, signOut } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import { User } from 'react-feather';

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex justify-between items-center p-4 bg-white shadow">
            <div className="logo">MyApp</div>
            <Menu as="div" className="relative">
                <Menu.Button>
                    <User />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`block px-4 py-2 ${active && 'bg-gray-100'}`}
                                onClick={() => signOut()}
                            >
                                Logout
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </header>
    );
}