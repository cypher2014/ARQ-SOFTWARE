import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        type_document: '',
        name_user: '',      // 🔹 corregido
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
            <Head title="Registrarse" />

            <form onSubmit={submit}>
                {/* Dropdown Tipo de Documento */}
                <div>
                    <InputLabel htmlFor="type_document" value="Tipo de Documento" />

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                {data.type_document || 'Seleccione un tipo de documento'}
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content contentClasses="bg-white w-48">
                            <Dropdown.Link
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setData('type_document', 'CC');
                                }}
                            >
                                Cédula de Ciudadanía (CC)
                            </Dropdown.Link>
                            <Dropdown.Link
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setData('type_document', 'TI');
                                }}
                            >
                                Tarjeta de Identidad (TI)
                            </Dropdown.Link>
                            <Dropdown.Link
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setData('type_document', 'CE');
                                }}
                            >
                                Cédula de Extranjería (CE)
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>

                    <InputError message={errors.type_document} className="mt-2" />
                </div>

                {/* Nombre */}
                <div className="mt-4">
                    <InputLabel htmlFor="name_user" value="Nombres" />

                    <TextInput
                        id="name_user"
                        type="text"
                        name="name_user"
                        value={data.name_user}
                        className="mt-1 block w-full"
                        autoComplete="given-name"
                        onChange={(e) => setData('name_user', e.target.value)}
                        required
                    />

                    <InputError message={errors.name_user} className="mt-2" />
                </div>

                {/* Apellidos */}
                <div className="mt-4">
                    <InputLabel htmlFor="last_name" value="Apellidos" />

                    <TextInput
                        id="last_name"
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="family-name"
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo Electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Teléfono */}
                <div className="mt-4">
                    <InputLabel htmlFor="user_phone" value="Teléfono" />

                    <TextInput
                        id="user_phone"
                        type="number"
                        name="user_phone"
                        value={data.user_phone}
                        className="mt-1 block w-full"
                        autoComplete="tel"
                        onChange={(e) => setData('user_phone', e.target.value)}
                        required
                    />

                    <InputError message={errors.user_phone} className="mt-2" />
                </div>

                {/* Dirección */}
                <div className="mt-4">
                    <InputLabel htmlFor="user_address" value="Dirección de residencia" />

                    <TextInput
                        id="user_address"
                        type="text"
                        name="user_address"
                        value={data.user_address}
                        className="mt-1 block w-full"
                        autoComplete="street-address"
                        onChange={(e) => setData('user_address', e.target.value)}
                        required
                    />

                    <InputError message={errors.user_address} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirmar Password */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar contraseña"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Botón */}
                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        ¿Ya te has registrado?
                    </Link>

                    <PrimaryButton className="ms-4 rounded-lg" disabled={processing}>
                        Registrarse
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}



