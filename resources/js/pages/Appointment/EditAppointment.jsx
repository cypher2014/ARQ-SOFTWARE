import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EditAppointment({ appointment }) {
    // Formatear la fecha para el input datetime-local (yyyy-MM-ddTHH:mm)
    const formattedDate = appointment.DATE_RECOLECTION
        ? appointment.DATE_RECOLECTION.replace(' ', 'T').slice(0, 16)
        : '';

    const { data, setData, put, processing, errors } = useForm({
        DATE_RECOLECTION: formattedDate,
        USER_MESSAGE: appointment.USER_MESSAGE || '',
        status_recolection: appointment.status_recolection || 'pendiente',
    });

    const submit = (e) => {
        e.preventDefault();

        // Reconstruir fecha para enviar a Laravel en formato yyyy-MM-dd HH:mm:ss
        const sendData = {
            ...data,
            DATE_RECOLECTION: data.DATE_RECOLECTION ? data.DATE_RECOLECTION.replace('T', ' ') + ':00' : null,
        };

        put(route('appointment.update', appointment.id_agenda), {
            data: sendData,
            preserveScroll: true,
            onSuccess: () => {
                console.log('Solicitud actualizada correctamente');
            },
            onError: (errors) => {
                console.error('Errores al actualizar:', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar Solicitud" />

            <form
                onSubmit={submit}
                className="space-y-5 max-w-xl mx-auto p-6 bg-white shadow rounded-lg"
            >
                <h1 className="text-center text-xl font-bold">
                    Editar Solicitud de Recolección
                </h1>

                <div>
                    <InputLabel
                        htmlFor="DATE_RECOLECTION"
                        value="Fecha y Hora de Recolección"
                    />
                    <TextInput
                        id="DATE_RECOLECTION"
                        type="datetime-local"
                        name="DATE_RECOLECTION"
                        value={data.DATE_RECOLECTION}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                        onChange={(e) => setData('DATE_RECOLECTION', e.target.value)}
                        required
                    />
                    <InputError
                        message={errors.DATE_RECOLECTION}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="USER_MESSAGE" value="Mensaje (Opcional)" />
                    <textarea
                        id="USER_MESSAGE"
                        name="USER_MESSAGE"
                        value={data.USER_MESSAGE}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                        rows="3"
                        onChange={(e) => setData('USER_MESSAGE', e.target.value)}
                    />
                    <InputError
                        message={errors.USER_MESSAGE}
                        className="mt-2"
                    />
                </div>

                <input
                    type="hidden"
                    name="status_recolection"
                    value={data.status_recolection}
                />

                <div className="mt-6 flex justify-end">
                    <PrimaryButton
                        className="ms-4 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-2 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-indigo-700 focus:ring-2 focus:ring-indigo-400"
                        disabled={processing}
                    >
                        Actualizar
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}


