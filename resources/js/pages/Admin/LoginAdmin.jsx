import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function LoginAdmin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.submit'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl">
                
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                </div>

                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                    Login Administrador
                </h2>

                <form onSubmit={submit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Correo Electrónico" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                            autoFocus
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <InputLabel htmlFor="password" value="Contraseña" />
                        <TextInput
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                        />
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    {/* Botón azul */}
                    <PrimaryButton
                        className="w-full mt-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 shadow-md text-white font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5"
                        disabled={processing}
                    >
                        {processing ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
}



