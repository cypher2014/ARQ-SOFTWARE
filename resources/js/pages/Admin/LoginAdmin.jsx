import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function LoginAdmin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.submit'));
    };

    const inputClass = "mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-10";

    return (
        <>
            <Head title="Login Administrador" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-12">
                <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl">
                    
                    {/* Logo animado */}
                    <div className="flex justify-center mb-6">
                        <img
                            src="/logo.png"
                            alt="Logo de la App"
                            className="h-20 w-auto animate-fade-in"
                        />
                    </div>

                    {/* Título */}
                    <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
                        Login Administrador
                    </h2>

                    <form onSubmit={submit} className="space-y-6">

                        {/* Email */}
                        <div className="relative">
                            <InputLabel htmlFor="email" value="Correo Electrónico" />
                            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={inputClass}
                                required
                                autoFocus
                                placeholder="correo@ejemplo.com"
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Contraseña */}
                        <div className="relative">
                            <InputLabel htmlFor="password" value="Contraseña" />
                            <LockClosedIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={inputClass}
                                required
                                placeholder="********"
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Botón centrado verde igual que registro */}
                        <div className="flex justify-center mt-6">
    <PrimaryButton
        className="w-full py-3 text-lg bg-green-600 hover:bg-green-700 shadow-lg text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        disabled={processing}
    >
        {processing ? 'Iniciando sesión...' : 'Iniciar sesión'}
    </PrimaryButton>
</div>

                    </form>
                </div>
            </div>
        </>
    );
}






