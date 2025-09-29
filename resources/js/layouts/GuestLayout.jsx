import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-white pt-6 sm:pt-0">
            <div className="mb-2">
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            {/* Ahora ocupa todo el ancho */}
            <div className="mt-6 w-full bg-white px-8 py-6 rounded-none">
                {children}
            </div>
        </div>
    );
}

