import { useEffect } from "react";
import { Head, usePage, Link, router } from "@inertiajs/react";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/Components/ui/card";

export default function AdminDashboard() {
    const { auth, topMaterials } = usePage().props;

    // Guardar ID del admin en cookie
    useEffect(() => {
        if (auth?.user?.ID_USERS) {
            Cookies.set("admin_id", auth.user.ID_USERS, { expires: 7 });
        }
    }, [auth]);

    return (
        <>
            <Head title="Panel de Administrador" />

            <div className="max-w-7xl mx-auto p-6">
                {/* Header: Bienvenida + Logout */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Bienvenido, {auth?.user?.NAME_USER ?? "Administrador"}
                    </h1>
                    <button
                        onClick={() => router.post(route('admin.logout'))}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Cerrar sesión
                    </button>
                </div>

                {/* Tarjetas principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Link href={route('admin.solicitudes.index')}>
                        <Card className="cursor-pointer hover:shadow-lg transition rounded-2xl">
                            <CardContent className="p-6 text-center font-semibold">
                                📑 Ver Solicitudes
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href={route('admin.rutas.index')}>
                        <Card className="cursor-pointer hover:shadow-lg transition rounded-2xl">
                            <CardContent className="p-6 text-center font-semibold">
                                🛣️ Ver Rutas
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href={route('admin.inventario.index')}>
                        <Card className="cursor-pointer hover:shadow-lg transition rounded-2xl">
                            <CardContent className="p-6 text-center font-semibold">
                                📦 Inventario
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Materiales más recolectados */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">
                        Materiales más recolectados
                    </h2>

                    <ul className="space-y-2">
                        {(topMaterials ?? [
                            { name: "Papel", total: 120 },
                            { name: "Cartón", total: 95 },
                            { name: "Plástico", total: 80 },
                            { name: "Bolsas", total: 70 },
                            { name: "Vidrio", total: 60 },
                        ]).map((mat, i) => (
                            <li
                                key={i}
                                className="flex justify-between border-b pb-2 text-gray-700"
                            >
                                <span>{mat.name}</span>
                                <span className="font-semibold">{mat.total}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}








