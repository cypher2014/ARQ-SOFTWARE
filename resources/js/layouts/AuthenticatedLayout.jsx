import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { UserIcon } from "@heroicons/react/24/solid";

export default function AuthenticatedLayout({ header, children }) {
  const [open, setOpen] = useState(false);
  const { auth } = usePage().props;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo o título */}
            <div className="flex items-center">
              <h1 className="text-lg font-bold text-gray-800">Panel Principal</h1>
            </div>

            {/* Dropdown con ícono persona */}
            <div className="flex items-center relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                {/* Avatar circular */}
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white">
                  <UserIcon className="h-5 w-5" />
                </div>
                <span className="hidden sm:inline">
                  {auth?.user?.name || "Usuario"}
                </span>
              </button>

              {/* Menú */}
              {open && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50 overflow-hidden">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Configuración
                    </Link>
                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Cerrar sesión
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      {header && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      {/* Contenido */}
      <main>{children}</main>
    </div>
  );
}



