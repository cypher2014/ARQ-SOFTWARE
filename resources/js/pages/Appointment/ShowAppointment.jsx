import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ShowAppointment({ appointment }) {
  return (
    <GuestLayout>
      <Head title="Detalle de Solicitud" />

      <form className="space-y-5">
        <h1 className="text-center text-xl font-bold">
          Detalle de la Solicitud
        </h1>

        <div>
          <InputLabel htmlFor="id" value="ID" />
          <TextInput
            id="id"
            type="text"
            name="id"
            value={appointment.id_agenda}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
            readOnly
          />
        </div>

        <div>
          <InputLabel htmlFor="date_recolection" value="Fecha de Recolección" />
          <TextInput
            id="date_recolection"
            type="text"
            name="date_recolection"
            value={appointment.date_recolection}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
            readOnly
          />
        </div>

        <div>
          <InputLabel htmlFor="status_recolection" value="Estado" />
          <TextInput
            id="status_recolection"
            type="text"
            name="status_recolection"
            value={appointment.status_recolection}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
            readOnly
          />
        </div>

        <div>
          <InputLabel htmlFor="user_message" value="Mensaje" />
          <textarea
            id="user_message"
            name="user_message"
            value={appointment.user_message || "Sin mensaje"}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
            rows="3"
            readOnly
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Link href={route("appointment.index")}>
            <PrimaryButton className="rounded-full bg-gray-500 hover:bg-gray-600">
              Volver
            </PrimaryButton>
          </Link>
          <Link href={route("appointment.edit", appointment.id_agenda)}>
            <PrimaryButton className="rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              Editar
            </PrimaryButton>
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
