import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function RecuperarContrasena({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar contraseña" />

            <form
                onSubmit={submit}
                className="bg-white p-8 shadow-lg rounded-[20px] max-w-md mx-auto"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Recuperar contraseña
                </h2>

                <p className="mb-6 text-sm text-gray-600 text-center">
                    ¿Olvidaste tu contraseña? No te preocupes.  
                    Ingresa tu correo electrónico y te enviaremos un enlace 
                    para restablecerla fácilmente.
                </p>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center">
                        {status}
                    </div>
                )}

                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-[20px] px-4 py-2"
                        isFocused={true}
                        placeholder="ejemplo@correo.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-center">
                    <PrimaryButton
                        className="bg-green-600 hover:bg-green-700 text-white rounded-[20px] px-6 py-2"
                        disabled={processing}
                    >
                        Enviar enlace
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

