import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Package, RefreshCcw, Eye, X, CheckCircle } from "lucide-react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { auth } = usePage().props;
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Formulario
  const { data, setData, post, processing, errors, reset } = useForm({
    DATE_RECOLECTION: "",
    STATUS_RECOLECTION: "OPEN",
    USER_MESSAGE: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("appointment.store"), {
      onSuccess: () => {
        reset();
        setSuccessMessage("✅ Solicitud agendada con éxito");
        setTimeout(() => {
          setSuccessMessage("");
          setShowModal(false);
        }, 2000);
      },
    });
  };

  const cards = [
    {
      title: "Montar Solicitud",
      description: "Registra una nueva solicitud de recolección.",
      action: () => setShowModal(true),
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

  return (
    <AuthenticatedLayout
      header={
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Bienvenido,{" "}
            <span className="text-indigo-600">{auth.user?.name}</span>
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Este es tu panel principal, gestiona tus solicitudes fácilmente.
          </p>
        </div>
      }
    >
      <Head title="Panel Principal" />

      {/* GRID DE TARJETAS */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ title, description, href, action, icon: Icon, gradient }) => {
              const content = (
                <div
                  className={`rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl cursor-pointer`}
                  onClick={action}
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-xl bg-white/20 p-4">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-white/80">{description}</p>
                </div>
              );

              return href ? (
                <a key={title} href={href} className="group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-400 rounded-2xl">
                  {content}
                </a>
              ) : (
                <div key={title} className="group rounded-2xl">{content}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative overflow-hidden"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Mensaje de éxito */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-medium"
                  >
                    {successMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center mt-2">
                Agendar Solicitud de Recolección
              </h2>

              <form onSubmit={submit} className="space-y-5">
                {/* Fecha */}
                <div>
                  <InputLabel htmlFor="DATE_RECOLECTION" value="Fecha y Hora de Recolección" />
                  <TextInput
                    id="DATE_RECOLECTION"
                    type="datetime-local"
                    name="DATE_RECOLECTION"
                    value={data.DATE_RECOLECTION}
                    onChange={(e) => setData("DATE_RECOLECTION", e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                    required
                  />
                  <InputError message={errors.DATE_RECOLECTION} className="mt-2" />
                </div>

                {/* Mensaje */}
                <div>
                  <InputLabel htmlFor="USER_MESSAGE" value="Mensaje (Opcional)" />
                  <textarea
                    id="USER_MESSAGE"
                    name="USER_MESSAGE"
                    value={data.USER_MESSAGE}
                    onChange={(e) => setData("USER_MESSAGE", e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                    rows="3"
                  />
                  <InputError message={errors.USER_MESSAGE} className="mt-2" />
                </div>

                <input
                  type="hidden"
                  name="STATUS_RECOLECTION"
                  value={data.STATUS_RECOLECTION}
                />

                {/* Botón */}
                <div className="flex justify-end">
                  <PrimaryButton
                    disabled={processing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-2 transition-transform hover:scale-105"
                  >
                    {processing ? "Agendando..." : "Agendar"}
                  </PrimaryButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthenticatedLayout>
  );
}












