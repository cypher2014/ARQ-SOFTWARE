import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { UserIcon, EnvelopeIcon, PhoneIcon, LockClosedIcon, MapPinIcon, BriefcaseIcon, IdentificationIcon } from '@heroicons/react/24/outline';

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

    const inputClass = "mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-10";

    return (
        <>
            <Head title="Registro de Administrador" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-12">
                <div className="w-full max-w-xl p-8 bg-white rounded-3xl shadow-2xl">
                    
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
                        Registro de Administrador
                    </h2>

                    <form onSubmit={submit} className="space-y-6">

                        {/* DNI */}
                        <div className="relative">
                            <InputLabel htmlFor="ID_USERS" value="DNI" />
                            <IdentificationIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                            <TextInput
                                id="ID_USERS"
                                value={data.ID_USERS}
                                onChange={(e) => setData('ID_USERS', e.target.value)}
                                className={inputClass}
                                required
                                placeholder="1234567890"
                            />
                            <InputError message={errors.ID_USERS} className="mt-1" />
                        </div>

                        {/* Nombre y Apellido */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <InputLabel htmlFor="NAME_USER" value="Nombre" />
                                <UserIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="NAME_USER"
                                    value={data.NAME_USER}
                                    onChange={(e) => setData('NAME_USER', e.target.value)}
                                    className={inputClass}
                                    required
                                    placeholder="Juan"
                                />
                                <InputError message={errors.NAME_USER} className="mt-1" />
                            </div>
                            <div className="relative">
                                <InputLabel htmlFor="LAST_NAME" value="Apellido" />
                                <UserIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="LAST_NAME"
                                    value={data.LAST_NAME}
                                    onChange={(e) => setData('LAST_NAME', e.target.value)}
                                    className={inputClass}
                                    required
                                    placeholder="Pérez"
                                />
                                <InputError message={errors.LAST_NAME} className="mt-1" />
                            </div>
                        </div>

                        {/* Correo y Teléfono */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <InputLabel htmlFor="EMAIL" value="Correo Electrónico" />
                                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="EMAIL"
                                    type="email"
                                    value={data.EMAIL}
                                    onChange={(e) => setData('EMAIL', e.target.value)}
                                    className={inputClass}
                                    required
                                    placeholder="correo@ejemplo.com"
                                />
                                <InputError message={errors.EMAIL} className="mt-1" />
                            </div>
                            <div className="relative">
                                <InputLabel htmlFor="USER_PHONE" value="Teléfono" />
                                <PhoneIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="USER_PHONE"
                                    value={data.USER_PHONE}
                                    onChange={(e) => setData('USER_PHONE', e.target.value)}
                                    className={inputClass}
                                    placeholder="+57 300 000 0000"
                                />
                                <InputError message={errors.USER_PHONE} className="mt-1" />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className="relative">
                            <InputLabel htmlFor="PASSWORD" value="Contraseña" />
                            <LockClosedIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                            <TextInput
                                id="PASSWORD"
                                type="password"
                                value={data.PASSWORD}
                                onChange={(e) => setData('PASSWORD', e.target.value)}
                                className={inputClass}
                                required
                                placeholder="********"
                            />
                            <InputError message={errors.PASSWORD} className="mt-1" />
                        </div>

                        {/* Cargo y Ciudad */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <InputLabel htmlFor="USER_POSITION" value="Cargo" />
                                <BriefcaseIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="USER_POSITION"
                                    value={data.USER_POSITION}
                                    onChange={(e) => setData('USER_POSITION', e.target.value)}
                                    className={inputClass}
                                    placeholder="Gerente"
                                />
                                <InputError message={errors.USER_POSITION} className="mt-1" />
                            </div>
                            <div className="relative">
                                <InputLabel htmlFor="CITY" value="Ciudad" />
                                <MapPinIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="CITY"
                                    value={data.CITY}
                                    onChange={(e) => setData('CITY', e.target.value)}
                                    className={inputClass}
                                    placeholder="Bogotá"
                                />
                                <InputError message={errors.CITY} className="mt-1" />
                            </div>
                        </div>

                        {/* Botón centrado */}
                        <div className="flex justify-center mt-6">
                            <PrimaryButton
                                className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-10 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                                disabled={processing}
                            >
                                {processing ? 'Registrando...' : 'Registrarse'}
                            </PrimaryButton>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}








