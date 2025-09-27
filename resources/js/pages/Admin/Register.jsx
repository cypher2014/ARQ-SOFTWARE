import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        ID_USERS: '',
        NAME_USER: '',
        LAST_NAME: '',
        EMAIL: '',
        PASSWORD: '',
        USER_PHONE: '',
        USER_POSITION: '',
        CITY: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.register.store'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-xl">
                
                {/* Logo animado */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-16 w-auto transform scale-0 animate-logo-load"
                    />
                </div>

                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                    Registro de Administrador
                </h2>

                <form onSubmit={submit} className="space-y-6">

                    {/* DNI */}
                    <div>
                        <InputLabel htmlFor="ID_USERS" value="DNI" />
                        <TextInput
                            id="ID_USERS"
                            value={data.ID_USERS}
                            onChange={(e) => setData('ID_USERS', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                            placeholder="1234567890"
                        />
                        <InputError message={errors.ID_USERS} className="mt-1" />
                    </div>

                    {/* Nombre y Apellido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="NAME_USER" value="Nombre" />
                            <TextInput
                                id="NAME_USER"
                                value={data.NAME_USER}
                                onChange={(e) => setData('NAME_USER', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                                placeholder="Juan"
                            />
                            <InputError message={errors.NAME_USER} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="LAST_NAME" value="Apellido" />
                            <TextInput
                                id="LAST_NAME"
                                value={data.LAST_NAME}
                                onChange={(e) => setData('LAST_NAME', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                                placeholder="Pérez"
                            />
                            <InputError message={errors.LAST_NAME} className="mt-1" />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="EMAIL" value="Correo Electrónico" />
                        <TextInput
                            id="EMAIL"
                            type="email"
                            value={data.EMAIL}
                            onChange={(e) => setData('EMAIL', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                            placeholder="correo@ejemplo.com"
                        />
                        <InputError message={errors.EMAIL} className="mt-1" />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <InputLabel htmlFor="PASSWORD" value="Contraseña" />
                        <TextInput
                            id="PASSWORD"
                            type="password"
                            value={data.PASSWORD}
                            onChange={(e) => setData('PASSWORD', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                            placeholder="********"
                        />
                        <InputError message={errors.PASSWORD} className="mt-1" />
                    </div>

                    {/* Teléfono, Cargo y Ciudad */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <InputLabel htmlFor="USER_PHONE" value="Teléfono" />
                            <TextInput
                                id="USER_PHONE"
                                value={data.USER_PHONE}
                                onChange={(e) => setData('USER_PHONE', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="+57 300 000 0000"
                            />
                            <InputError message={errors.USER_PHONE} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="USER_POSITION" value="Cargo" />
                            <TextInput
                                id="USER_POSITION"
                                value={data.USER_POSITION}
                                onChange={(e) => setData('USER_POSITION', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Gerente"
                            />
                            <InputError message={errors.USER_POSITION} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="CITY" value="Ciudad" />
                            <TextInput
                                id="CITY"
                                value={data.CITY}
                                onChange={(e) => setData('CITY', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Bogotá"
                            />
                            <InputError message={errors.CITY} className="mt-1" />
                        </div>
                    </div>

                    {/* Botón de envío azul moderno */}
                    <PrimaryButton
                        className="w-full mt-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 shadow-md text-white font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5"
                        disabled={processing}
                    >
                        {processing ? 'Registrando...' : 'Registrarse'}
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
}





