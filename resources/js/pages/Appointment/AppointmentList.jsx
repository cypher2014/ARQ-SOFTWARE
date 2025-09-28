import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function AppointmentList({ appointment }) {
  return (
    <AuthenticatedLayout>
      <Head title="Solicitudes" />

      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Lista de Solicitudes
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
                    Fecha de Recolección
                  </th>
                  <th className="px-4 py-3 border text-sm font-semibold text-gray-700">
                    Mensaje
                  </th>
                  <th className="px-4 py-3 border text-sm font-semibold text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointment.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="text-center hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 border text-sm text-gray-700">
                      {appointment.id}
                    </td>
                    <td className="px-4 py-3 border text-sm text-gray-700">
                      {appointment.date_recolection}
                    </td>
                    <td className="px-4 py-3 border text-sm text-gray-700">
                      {appointment.user_message || "Sin mensaje"}
                    </td>
                    <td className="px-4 py-3 border space-x-2 flex justify-center">
                      <Link href={route('appointment.show', appointment.id)}>
                        <PrimaryButton className="rounded-full bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-1 text-sm font-medium text-white shadow hover:from-purple-600 hover:to-purple-700">
                          View
                        </PrimaryButton>
                      </Link>
                      <Link href={route('appointment.edit', appointment.id)}>
                        <PrimaryButton className="rounded-full bg-gradient-to-r from-green-500 to-green-600 px-4 py-1 text-sm font-medium text-white shadow hover:from-green-600 hover:to-green-700">
                          Update
                        </PrimaryButton>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
