import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    LockClosedIcon,
    MapPinIcon,
    BriefcaseIcon,
    IdentificationIcon,
} from '@heroicons/react/24/outline';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        id_users: '',
        name_user: '',
        last_name: '',
        email: '',
        password: '',
        user_phone: '',
        user_position: '',
        city: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.gestores.store'), {
            onFinish: () => reset('password'),
        });
    };

    const inputClass =
        'mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all pl-10 py-2 disabled:bg-gray-100';

    return (
        <>
            <Head title="Registro de Administrador" />

            <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
                <div className="w-full max-w-xl p-8 bg-white rounded-3xl shadow-2xl">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src="/logo.png" alt="Logo de la App" className="h-20 w-auto" />
                    </div>

                    {/* Título */}
                    <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
                        Registro de Administrador
                    </h2>

                    <form onSubmit={submit} className="space-y-6" noValidate>
                        {/* DNI */}
                        <div className="relative">
                            <InputLabel htmlFor="id_users" value="DNI" />
                            <IdentificationIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                            <TextInput
                                id="id_users"
                                name="id_users"
                                value={data.id_users}
                                onChange={(e) => setData('id_users', e.target.value)}
                                className={inputClass}
                                required
                                placeholder="1234567890"
                                autoComplete="off"
                                aria-invalid={errors.id_users ? 'true' : 'false'}
                                disabled={processing}
                            />
                            <InputError message={errors.id_users} className="mt-1" />
                        </div>

                        {/* Nombre y Apellido */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <InputLabel htmlFor="name_user" value="Nombre" />
                                <UserIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="name_user"
                                    name="name_user"
                                    value={data.name_user}
                                    onChange={(e) => setData('name_user', e.target.value)}
                                    className={inputClass}
                                    required
                                    placeholder="Juan"
                                    autoComplete="given-name"
                                    aria-invalid={errors.name_user ? 'true' : 'false'}
                                    disabled={processing}
                                />
                                <InputError message={errors.name_user} className="mt-1" />
                            </div>

                            <div className="relative">
                                <InputLabel htmlFor="last_name" value="Apellido" />
                                <UserIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="last_name"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    className={inputClass}
                                    required
                                    placeholder="Pérez"
                                    autoComplete="family-name"
                                    aria-invalid={errors.last_name ? 'true' : 'false'}
                                    disabled={processing}
                                />
                                <InputError message={errors.last_name} className="mt-1" />
                            </div>
                        </div>

                        {/* Correo y Teléfono */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <InputLabel htmlFor="email" value="Correo Electrónico" />
                                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={inputClass}
                                    required
                                    placeholder="correo@ejemplo.com"
                                    autoComplete="email"
                                    aria-invalid={errors.email ? 'true' : 'false'}
                                    disabled={processing}
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div className="relative">
                                <InputLabel htmlFor="user_phone" value="Teléfono" />
                                <PhoneIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="user_phone"
                                    name="user_phone"
                                    value={data.user_phone}
                                    onChange={(e) => setData('user_phone', e.target.value)}
                                    className={inputClass}
                                    placeholder="+57 300 000 0000"
                                    autoComplete="tel"
                                    inputMode="tel"
                                    aria-invalid={errors.user_phone ? 'true' : 'false'}
                                    disabled={processing}
                                />
                                <InputError message={errors.user_phone} className="mt-1" />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className="relative">
                            <InputLabel htmlFor="password" value="Contraseña" />
                            <LockClosedIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                            <TextInput
                                id="password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={inputClass}
                                required
                                placeholder="********"
                                autoComplete="new-password"
                                aria-invalid={errors.password ? 'true' : 'false'}
                                disabled={processing}
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Cargo y Ciudad */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <InputLabel htmlFor="user_position" value="Cargo" />
                                <BriefcaseIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="user_position"
                                    name="user_position"
                                    value={data.user_position}
                                    onChange={(e) => setData('user_position', e.target.value)}
                                    className={inputClass}
                                    placeholder="Gerente"
                                    autoComplete="organization-title"
                                    aria-invalid={errors.user_position ? 'true' : 'false'}
                                    disabled={processing}
                                />
                                <InputError message={errors.user_position} className="mt-1" />
                            </div>

                            <div className="relative">
                                <InputLabel htmlFor="city" value="Ciudad" />
                                <MapPinIcon className="w-5 h-5 absolute left-3 top-11 text-gray-400 pointer-events-none" />
                                <TextInput
                                    id="city"
                                    name="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    className={inputClass}
                                    placeholder="Bogotá"
                                    autoComplete="address-level2"
                                    aria-invalid={errors.city ? 'true' : 'false'}
                                    disabled={processing}
                                />
                                <InputError message={errors.city} className="mt-1" />
                            </div>
                        </div>

                        {/* Botón centrado */}
                        <div className="flex justify-center mt-6">
                            <PrimaryButton
                                className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-10 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
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














