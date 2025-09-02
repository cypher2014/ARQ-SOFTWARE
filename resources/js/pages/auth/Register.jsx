import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

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
            <Head title="Registrarse" />

            <form onSubmit={submit} className="space-y-5">
                {/* Tipo de Documento */}

                <div>
                    <h1 className='text-center'>Registrarse</h1>
                </div>
                <div>
                    <InputLabel htmlFor="type_document" value="Tipo de Documento" />

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left text-gray-700 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400 sm:text-sm"
                            >
                                {data.type_document || 'Seleccione un tipo de documento'}
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

                    <InputError message={errors.id} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="name_user" value="Numero de documento" />
                    <TextInput
                        id="id_user"
                        type="text"
                        name="id_user"
                        value={data.id_user}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        autoComplete="given-name"
                        onChange={(e) => setData('id_user', e.target.value)}
                        required
                    />
                    <InputError message={errors.id_user} className="mt-2" />
                </div>

                {/* Nombre */}
            
                <div>
                    <InputLabel htmlFor="name_user" value="Nombres" />
                    <TextInput
                        id="name_user"
                        type="text"
                        name="name_user"
                        value={data.name_user}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        autoComplete="given-name"
                        onChange={(e) => setData('name_user', e.target.value)}
                        required
                    />
                    <InputError message={errors.name_user} className="mt-2" />
                </div>

                {/* Apellidos */}
                <div>
                    <InputLabel htmlFor="last_name" value="Apellidos" />
                    <TextInput
                        id="last_name"
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        autoComplete="family-name"
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                {/* Correo */}
                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Teléfono */}
                <div>
                    <InputLabel htmlFor="user_phone" value="Teléfono" />
                    <TextInput
                        id="user_phone"
                        type="tel"
                        name="user_phone"
                        value={data.user_phone}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        autoComplete="tel"
                        onChange={(e) => setData('user_phone', e.target.value)}
                        required
                    />
                    <InputError message={errors.user_phone} className="mt-2" />
                </div>

                {/* Dirección */}
                <div>
                    <InputLabel htmlFor="user_address" value="Dirección de residencia" />
                    <TextInput
                        id="user_address"
                        type="text"
                        name="user_address"
                        value={data.user_address}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        autoComplete="street-address"
                        onChange={(e) => setData('user_address', e.target.value)}
                        required
                    />
                    <InputError message={errors.user_address} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="icy" value="Ciudad" />
                    <TextInput
                        id="city"
                        type="text"
                        name="city"
                        value={data.city}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        autoComplete="street-address"
                        onChange={(e) => setData('city', e.target.value)}
                        required
                    />
                    <InputError message={errors.city} className="mt-2" />
                </div>

                {/* Contraseña */}
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirmar Contraseña */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Botón */}
                <div className="mt-6 flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                        ¿Ya tienes cuenta? Inicia sesión
                    </Link>

                    <PrimaryButton
                        className="ms-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 text-white font-semibold shadow-md hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-400"
                        disabled={processing}
                    >
                        Registrarse
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}





