import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">
                    Actualizar información
                </h2>
            }
        >
            <Head title="Perfil" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
                    
                    {/* Información del perfil */}
                    <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 transition hover:shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Información Personal
                        </h3>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 transition hover:shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Seguridad
                        </h3>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Eliminar cuenta */}
                    <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 transition hover:shadow-lg">
                        <h3 className="text-lg font-semibold text-red-600 mb-4">
                            Eliminar Cuenta
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Ten cuidado, esta acción no se puede deshacer. 
                            Se eliminarán permanentemente todos tus datos.
                        </p>
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

