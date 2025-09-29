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

            <div className="min-h-screen flex items-center justify-center bg-white px-6 py-11">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10">
                    {/* Título principal */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-green-600">
                            Registro de Usuarios
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Completa el siguiente formulario para crear tu cuenta
                        </p>
                    </div>

                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tipo de documento */}
                        <div className="col-span-1">
                            <InputLabel htmlFor="type_document" value="Tipo de Documento" />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="mt-2 w-full flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    >
                                        <FaIdCard className="text-green-500" />
                                        {data.type_document || 'Seleccione'}
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content contentClasses="bg-white w-full rounded-lg shadow-lg">
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

                        {/* Número de documento */}
                        <div className="col-span-1">
                            <InputLabel htmlFor="id_user" value="Número de Documento" />
                            <div className="relative">
                                <FaIdCard className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="id_user"
                                    type="text"
                                    name="id_user"
                                    value={data.id_user}
                                    className="mt-2 pl-10 block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    onChange={(e) => setData('id_user', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.id_user} className="mt-2" />
                        </div>

                        {/* Nombres */}
                        <div className="col-span-1">
                            <InputLabel htmlFor="name_user" value="Nombres" />
                            <div className="relative">
                                <FaUser className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="name_user"
                                    type="text"
                                    name="name_user"
                                    value={data.name_user}
                                    className="mt-2 pl-10 block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    onChange={(e) => setData('name_user', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.name_user} className="mt-2" />
                        </div>

                        {/* Apellidos */}
                        <div className="col-span-1">
                            <InputLabel htmlFor="last_name" value="Apellidos" />
                            <div className="relative">
                                <FaUser className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    className="mt-2 pl-10 block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.last_name} className="mt-2" />
                        </div>

                        {/* Email */}
                        <div className="col-span-1">
                            <InputLabel htmlFor="email" value="Correo Electrónico" />
                            <div className="relative">
                                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-2 pl-10 block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Teléfono */}
                        <div className="col-span-1">
                            <InputLabel htmlFor="user_phone" value="Teléfono" />
                            <div className="relative">
                                <FaPhone className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="user_phone"
                                    type="tel"
                                    name="user_phone"
                                    value={data.user_phone}
                                    className="mt-2 pl-10 block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    onChange={(e) => setData('user_phone', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.user_phone} className="mt-2" />
                        </div>

                        {/* Dirección (ocupa todo el ancho) */}
                        <div className="col-span-2">
                            <InputLabel htmlFor="user_address" value="Dirección" />
                            <div className="relative">
                                <FaHome className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="user_address"
                                    type="text"
                                    name="user_address"
                                    value={data.user_address}
                                    className="mt-2 pl-10 block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    onChange={(e) => setData('user_address', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.user_address} className="mt-2" />
                        </div>

                        {/* Ciudad */}
                        <div className="col-span-1">
                            <InputLabel htmlFor="city" value="Ciudad" />
                            <div className="relative">
                                <FaCity className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={data.city}
                                    className="mt-2 pl-10 block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    onChange={(e) => setData('city', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.city} className="mt-2" />
                        </div>

                        {/* Contraseña */}
                        <div className="col-span-1">
                            <InputLabel htmlFor="password" value="Contraseña" />
                            <div className="relative">
                                <FaLock className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2 pl-10 block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Confirmar Contraseña */}
                        <div className="col-span-1">
                            <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                            <div className="relative">
                                <FaLock className="absolute top-3 left-3 text-gray-400" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-2 pl-10 block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        {/* Botón (ocupa todo el ancho) */}
                        <div className="col-span-2 flex flex-col items-center gap-4 pt-6">
                            <Link
                                href={route('login')}
                                className="text-sm text-gray-600 hover:text-green-600 underline"
                            >
                                ¿Ya tienes cuenta? Inicia sesión
                            </Link>

                            <PrimaryButton
                                className="w-full flex justify-center items-center rounded-full bg-gradient-to-r from-green-500 to-green-600 py-3 text-white font-semibold shadow-md hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-400 transition"
                                disabled={processing}
                            >
                                Registrarse
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}











