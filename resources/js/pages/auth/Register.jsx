import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    FaUser,
    FaIdCard,
    FaEnvelope,
    FaPhone,
    FaHome,
    FaCity,
    FaLock,
} from 'react-icons/fa';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        id_user: '',
        type_document: '',
        name_user: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        user_phone: '',
        user_address: '',
        city: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registro de Usuarios" />

            <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl mt-6">
                {/* Título principal */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-green-600 mb-2">
                        Registro de Usuarios
                    </h1>
                    <p className="text-gray-500 text-base">
                        Completa el siguiente formulario para crear tu cuenta
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    {/* Documento */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="type_document" value="Tipo de Documento" />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="mt-1 w-full flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400 sm:text-sm"
                                    >
                                        <FaIdCard className="text-green-500" />
                                        {data.type_document || 'Seleccione'}
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content contentClasses="bg-white w-56 rounded-lg shadow-lg">
                                    {[
                                        { value: 'CC', label: 'Cédula de Ciudadanía (CC)' },
                                        { value: 'TI', label: 'Tarjeta de Identidad (TI)' },
                                        { value: 'CE', label: 'Cédula de Extranjería (CE)' },
                                    ].map((doc) => (
                                        <Dropdown.Link
                                            key={doc.value}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setData('type_document', doc.value);
                                            }}
                                        >
                                            {doc.label}
                                        </Dropdown.Link>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                            <InputError message={errors.type_document} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="id_user" value="Número de Documento" />
                            <div className="relative">
                                <FaIdCard className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="id_user"
                                    type="text"
                                    name="id_user"
                                    value={data.id_user}
                                    className="mt-1 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                                    onChange={(e) => setData('id_user', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.id_user} className="mt-2" />
                        </div>
                    </div>

                    {/* Nombre y Apellido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="name_user" value="Nombres" />
                            <div className="relative">
                                <FaUser className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="name_user"
                                    type="text"
                                    name="name_user"
                                    value={data.name_user}
                                    className="mt-1 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                                    onChange={(e) => setData('name_user', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.name_user} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="last_name" value="Apellidos" />
                            <div className="relative">
                                <FaUser className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    className="mt-1 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.last_name} className="mt-2" />
                        </div>
                    </div>

                    {/* Contacto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="email" value="Correo Electrónico" />
                            <div className="relative">
                                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="user_phone" value="Teléfono" />
                            <div className="relative">
                                <FaPhone className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="user_phone"
                                    type="tel"
                                    name="user_phone"
                                    value={data.user_phone}
                                    className="mt-1 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                                    onChange={(e) => setData('user_phone', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.user_phone} className="mt-2" />
                        </div>
                    </div>

                    {/* Dirección y Ciudad */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="user_address" value="Dirección" />
                            <div className="relative">
                                <FaHome className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="user_address"
                                    type="text"
                                    name="user_address"
                                    value={data.user_address}
                                    className="mt-1 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                                    onChange={(e) => setData('user_address', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.user_address} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="city" value="Ciudad" />
                            <div className="relative">
                                <FaCity className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={data.city}
                                    className="mt-1 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                                    onChange={(e) => setData('city', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.city} className="mt-2" />
                        </div>
                    </div>

                    {/* Contraseñas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="password" value="Contraseña" />
                            <div className="relative">
                                <FaLock className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                            <div className="relative">
                                <FaLock className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>

                    {/* Botón */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                        <Link
                            href={route('login')}
                            className="text-sm text-gray-600 hover:text-green-600 underline"
                        >
                            ¿Ya tienes cuenta? Inicia sesión
                        </Link>

                        <PrimaryButton
                            className="w-full md:w-auto rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 py-2 text-white font-semibold shadow-md hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-400 transition"
                            disabled={processing}
                        >
                            Registrarse
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}







