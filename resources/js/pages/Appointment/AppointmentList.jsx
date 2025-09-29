import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import React, { useState } from "react";

export default function AppointmentList({ appointment }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("view");

  // useForm de Inertia para manejar los datos del formulario
  const { data, setData, put, processing } = useForm({
    date_recolection: "",
    user_message: "",
    status_recolection: "",
  });

  // Abrir modal de vista
  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setMode("view");
    setShowModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setData({
      date_recolection: appointment.date_recolection || "",
      user_message: appointment.user_message || "",
      status_recolection: appointment.status_recolection || "",
    });
    setMode("edit");
    setShowModal(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  // Actualizar solicitud
  const handleUpdate = (e) => {
    e.preventDefault();

    put(route("appointment.update", selectedAppointment.id_agenda), {
      onSuccess: () => {
        setShowModal(false);
        alert(" Solicitud actualizada correctamente");
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Solicitudes" />

      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Lista de Solicitudes de Recolección
        </h1>

        {appointment.length === 0 ? (
          <p className="text-gray-500 text-center">
            No tienes solicitudes registradas.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-3 border text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-4 py-3 border text-sm font-semibold text-gray-700">
                    Fecha
                  </th>
                  <th className="px-4 py-3 border text-sm font-semibold text-gray-700">
                    Mensaje
                  </th>
                  <th className="px-4 py-3 border text-sm font-semibold text-gray-700">
                    Estado
                  </th>
                  <th className="px-4 py-3 border text-sm font-semibold text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointment.map((a) => (
                  <tr
                    key={a.id_agenda}
                    className="text-center hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 border text-sm text-gray-700">
                      {a.id_agenda}
                    </td>
                    <td className="px-4 py-3 border text-sm text-gray-700">
                      {a.date_recolection}
                    </td>
                    <td className="px-4 py-3 border text-sm text-gray-700">
                      {a.user_message || "Sin mensaje"}
                    </td>
                    <td className="px-4 py-3 border text-sm text-gray-700">
                      {a.status_recolection}
                    </td>
                    <td className="px-4 py-3 border space-x-2 flex justify-center">
                      <PrimaryButton
                        onClick={() => handleView(a)}
                        className="rounded-full bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-1 text-sm font-medium text-white shadow hover:from-purple-600 hover:to-purple-700"
                      >
                        View
                      </PrimaryButton>
                      <PrimaryButton
                        onClick={() => handleEdit(a)}
                        className="rounded-full bg-gradient-to-r from-green-500 to-green-600 px-4 py-1 text-sm font-medium text-white shadow hover:from-green-600 hover:to-green-700"
                      >
                        Update
                      </PrimaryButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">
            <h2 className="text-xl font-bold mb-4 text-center text-purple-700">
              {mode === "view" ? "Detalles de la Solicitud" : "Editar Solicitud"}
            </h2>

            {mode === "view" ? (
              <div className="space-y-3 text-sm">
                <p>
                  <strong>ID:</strong> {selectedAppointment.id_agenda}
                </p>
                <p>
                  <strong>Fecha:</strong> {selectedAppointment.date_recolection}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {selectedAppointment.status_recolection}
                </p>
                <p>
                  <strong>Mensaje:</strong>{" "}
                  {selectedAppointment.user_message || "Sin mensaje"}
                </p>

                <div className="mt-5 flex justify-center">
                  <PrimaryButton
                    onClick={closeModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-full"
                  >
                    Cerrar
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-3 text-sm">
                <div>
                  <label className="block font-semibold">
                    Fecha de Recolección:
                  </label>
                  <input
                    type="date"
                    value={data.date_recolection}
                    onChange={(e) =>
                      setData("date_recolection", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded p-2 mt-1"
                    required
                  />
                </div>

                {/* Estado bloqueado */}
                <div>
                  <label className="block font-semibold">Estado:</label>
                  <input
                    type="text"
                    value={data.status_recolection}
                    className="w-full border border-gray-300 rounded p-2 mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                    readOnly
                    disabled
                  />
                  <p className="text-xs text-gray-400 mt-1">
                  </p>
                </div>

                <div>
                  <label className="block font-semibold">Mensaje:</label>
                  <textarea
                    className="w-full border border-gray-300 rounded p-2 mt-1"
                    value={data.user_message}
                    onChange={(e) => setData("user_message", e.target.value)}
                  />
                </div>

                <div className="mt-5 flex justify-end gap-2">
                  <PrimaryButton
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-full"
                  >
                    Cerrar
                  </PrimaryButton>
                  <PrimaryButton
                    type="submit"
                    disabled={processing}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full"
                  >
                    Guardar
                  </PrimaryButton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
