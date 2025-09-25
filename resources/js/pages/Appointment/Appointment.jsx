import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Appointment() {
    const { data, setData, post, processing, errors, reset } = useForm({
        date_recolection: '',
        status_recolection: 'pendiente', 
        user_message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('appointment.store'), {
            onFinish: () => reset('date_recolection', 'user_message'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Agendar Recolección" />

            <form onSubmit={submit} className="space-y-5">
                <h1 className="text-center text-xl font-bold">Agendar Cita de Recolección</h1>

                {/* Fecha y Hora de Recolección */}
                <div>
                    <InputLabel htmlFor="date_recolection" value="Fecha y Hora de Recolección" />
                    <TextInput
                        id="date_recolection"
                        type="datetime-local"
                        name="date_recolection"
                        value={data.date_recolection}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        onChange={(e) => setData('date_recolection', e.target.value)}
                        required
                    />
                    <InputError message={errors.date_recolection} className="mt-2" />
                </div>

                {/* Mensaje*/}
                <div>
                    <InputLabel htmlFor="user_message" value="Mensaje (Opcional)" />
                    <textarea
                        id="user_message"
                        name="user_message"
                        value={data.user_message}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        rows="3"
                        onChange={(e) => setData('user_message', e.target.value)}
                    />
                    <InputError message={errors.user_message} className="mt-2" />
                </div>

                {/* Estado oculto */}
                <input type="hidden" name="status_recolection" value={data.status_recolection} />

                {/* Botón */}
                <div className="mt-6 flex justify-end">
                    <PrimaryButton
                        className="ms-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 text-white font-semibold shadow-md hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-400"
                        disabled={processing}
                    >
                        Agendar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
