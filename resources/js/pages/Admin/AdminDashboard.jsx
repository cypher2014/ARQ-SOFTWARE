import { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/Components/ui/card";
import { FaRecycle, FaBox, FaTrash, FaRegFileAlt, FaRegClipboard } from "react-icons/fa"; // íconos de ejemplo

export default function AdminDashboard() {
    const { auth, topMaterials } = usePage().props;

    useEffect(() => {
        if (auth?.user?.ID_USERS) {
            Cookies.set("admin_id", auth.user.ID_USERS, { expires: 7 });
        }
    }, [auth]);

    // Construir nombre completo
    const fullName = auth?.user
        ? `${auth.user.name_user ?? ""} ${auth.user.last_name ?? ""}`.trim()
        : "Administrador";

    // Iconos para cada material
    const materialIcons = {
        Papel: <FaRegFileAlt size={24} className="text-blue-500" />,
        Cartón: <FaRegClipboard size={24} className="text-yellow-500" />,
        Plástico: <FaRecycle size={24} className="text-green-500" />,
        Bolsas: <FaTrash size={24} className="text-purple-500" />,
        Vidrio: <FaBox size={24} className="text-cyan-500" />,
    };

    return (
        <>
            <Head title="Panel de Administrador" />

            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Bienvenido, {fullName}
                    </h1>
                    <form method="POST" action={route("admin/logout")}>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Cerrar sesión
                        </button>
                    </form>
                </div>

                {/* Panel de administración */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Card className="cursor-pointer hover:shadow-lg transition rounded-2xl">
                        <CardContent className="p-6 text-center font-semibold">
                            📑 Ver Solicitudes
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-lg transition rounded-2xl">
                        <CardContent className="p-6 text-center font-semibold">
                            🛣️ Ver Rutas
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-lg transition rounded-2xl">
                        <CardContent className="p-6 text-center font-semibold">
                            📦 Inventario
                        </CardContent>
                    </Card>
                </div>

                {/* Materiales más recolectados en tarjetas modernas */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">
                        Materiales más recolectados
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {(topMaterials ?? [
                            { name: "Papel", total: 120 },
                            { name: "Cartón", total: 95 },
                            { name: "Plástico", total: 80 },
                            { name: "Bolsas", total: 70 },
                            { name: "Vidrio", total: 60 },
                        ]).map((mat, i) => (
                            <Card
                                key={i}
                                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                            >
                                <div className="mb-3">
                                    {materialIcons[mat.name] ?? <FaRecycle size={24} className="text-gray-400" />}
                                </div>
                                <span className="text-lg font-semibold">{mat.name}</span>
                                <span className="text-gray-600 mt-1">{mat.total} kg</span>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}










