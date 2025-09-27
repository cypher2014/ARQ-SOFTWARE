import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EditAppointment({ appointment }) {
    const { data, setData, put, processing, errors } = useForm({
        date_recolection: appointment.date_recolection || '',
        user_message: appointment.user_message || '',
        status_recolection: appointment.status_recolection || 'pendiente',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('appointment.update', appointment.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar Solicitud" />

            <form onSubmit={submit} className="space-y-5 max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
                <h1 className="text-center text-xl font-bold">Editar Solicitud de Recolección</h1>

                <div>
                    <InputLabel htmlFor="date_recolection" value="Fecha y Hora de Recolección" />
                    <TextInput
                        id="date_recolection"
                        type="datetime-local"
                        name="date_recolection"
                        value={data.date_recolection}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                        onChange={(e) => setData('date_recolection', e.target.value)}
                        required
                    />
                    <InputError message={errors.date_recolection} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="user_message" value="Mensaje (Opcional)" />
                    <textarea
                        id="user_message"
                        name="user_message"
                        value={data.user_message}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                        rows="3"
                        onChange={(e) => setData('user_message', e.target.value)}
                    />
                    <InputError message={errors.user_message} className="mt-2" />
                </div>

                <input type="hidden" name="status_recolection" value={data.status_recolection} />

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
