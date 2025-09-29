import { useState, useRef, useEffect, Fragment } from "react";
import { Link, usePage } from "@inertiajs/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";

export default function AuthenticatedLayout({ header, children }) {
  const [open, setOpen] = useState(false);
  const { auth } = usePage().props;
  const containerRef = useRef(null);
  const firstItemRef = useRef(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Cuando se abre, enfocar el primer item del menú (accesibilidad)
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 50);
    }
  }, [open]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Título + Links */}
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />

              {/* Título */}
              <h1 className="text-lg font-bold text-gray-800 whitespace-nowrap">
                PANEL ADMINISTRATIVO
              </h1>

              {/* Links principales */}
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  Inicio
                </Link>
                <Link
                  href="/appointment"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  Solicitudes
                </Link>
                <Link
                  href="/reports"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  Reportes
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  Configuración
                </Link>
              </div>
            </div>

            {/* Dropdown usuario */}
            <div className="relative" ref={containerRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="menu"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white">
                  <UserIcon className="h-5 w-5" />
                </div>
                <span className="hidden sm:inline">
                  {auth?.user?.name_user || "Mi Perfil"}
                </span>
              </button>

              {/* Menú Dropdown */}
              <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-150"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div
                  className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50 overflow-hidden"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-2">
                    <Link
                      href="/profile"
                      ref={firstItemRef}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      Mi Perfil
                    </Link>

                    <Link
                      href="/reportes"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      Reportes
                    </Link>

                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                      role="menuitem"
                    >
                      Cerrar sesión
                    </Link>
                  </div>
                </div>
              </Transition>
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
      <main className="flex-1">{children}</main>
    </div>
  );
}





