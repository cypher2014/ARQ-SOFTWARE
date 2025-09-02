import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Package, RefreshCcw, Eye } from 'lucide-react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">
                    Panel Principal
                </h2>
            }
        >
            <Head title="Panel Principal" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        
                        {/* Card 1 - Montar Solicitud */}
                        <Link href="/solicitudes/create">
                            <div className="group rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-xl bg-white/20 p-4">
                                        <Package className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        Montar Solicitud
                                    </h3>
                                </div>
                                <p className="mt-4 text-sm text-white/80">
                                    Registra una nueva solicitud de recolección.
                                </p>
                            </div>
                        </Link>

                        {/* Card 2 - Actualizar Solicitudes */}
                        <Link href="/solicitudes/update">
                            <div className="group rounded-2xl bg-gradient-to-br from-green-500 to-green-700 p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-xl bg-white/20 p-4">
                                        <RefreshCcw className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        Actualizar Solicitudes
                                    </h3>
                                </div>
                                <p className="mt-4 text-sm text-white/80">
                                    Modifica solicitudes existentes fácilmente.
                                </p>
                            </div>
                        </Link>

                        {/* Card 3 - Ver Solicitudes */}
                        <Link href="/solicitudes">
                            <div className="group rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-xl bg-white/20 p-4">
                                        <Eye className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        Ver Solicitudes
                                    </h3>
                                </div>
                                <p className="mt-4 text-sm text-white/80">
                                    Consulta todas las solicitudes creadas.
                                </p>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

