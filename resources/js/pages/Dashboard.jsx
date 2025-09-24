import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Package, RefreshCcw, Eye } from "lucide-react";

const cards = [
  {
    title: "Montar Solicitud",
    description: "Registra una nueva solicitud de recolección.",
    href: "/solicitudes/create",
    icon: Package,
    gradient: "from-indigo-500 to-indigo-700",
  },
  {
    title: "Actualizar Solicitudes",
    description: "Modifica solicitudes existentes fácilmente.",
    href: "/solicitudes/update",
    icon: RefreshCcw,
    gradient: "from-green-500 to-green-700",
  },
  {
    title: "Ver Solicitudes",
    description: "Consulta todas las solicitudes creadas.",
    href: "/solicitudes",
    icon: Eye,
    gradient: "from-purple-500 to-purple-700",
  },
];

export default function Dashboard() {
  const { auth } = usePage().props; // sin tipado TS

  return (
    <AuthenticatedLayout
      header={
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Bienvenido, <span className="text-indigo-600">{auth.user.name}</span>
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Este es tu panel principal, gestiona tus solicitudes fácilmente.
          </p>
        </div>
      }
    >
      <Head title="Panel Principal" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ title, description, href, icon: Icon, gradient }) => (
              <Link
                key={title}
                href={href}
                className="group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-400 rounded-2xl"
              >
                <div
                  className={`rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-xl bg-white/20 p-4">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-white/80">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}




