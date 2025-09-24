import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { MailCheck, RefreshCw } from 'lucide-react';

export default function VerificarEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificación de correo electrónico" />

            <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-center mb-4">
                    <MailCheck className="w-12 h-12 text-indigo-600" />
                </div>

                <h1 className="text-xl font-semibold text-gray-800 text-center mb-3">
                    Verifica tu correo electrónico
                </h1>

                <p className="text-sm text-gray-600 text-center leading-relaxed">
                    ¡Gracias por registrarte! Antes de comenzar, necesitamos que
                    confirmes tu dirección de correo electrónico haciendo clic en el
                    enlace que te enviamos.  
                    <br />
                    Si no recibiste el correo, no te preocupes: podemos enviarte otro.
                </p>

                {status === 'verification-link-sent' && (
                    <div className="mt-4 p-3 text-sm font-medium text-green-700 bg-green-100 rounded-lg border border-green-200">
                        Hemos enviado un nuevo enlace de verificación al correo
                        electrónico que proporcionaste durante el registro.
                    </div>
                )}

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <PrimaryButton
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reenviar correo de verificación
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full text-center text-sm text-gray-600 hover:text-gray-900 underline focus:outline-none"
                    >
                        Cerrar sesión
                    </Link>
                </form>
            </div>
        </GuestLayout>
    );
}

