import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({ password: '' });

    const confirmUserDeletion = () => setConfirmingUserDeletion(true);

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            {/* Header */}
            <header>
                <h2 className="text-xl font-semibold text-gray-900">
                    Eliminar cuenta
                </h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Una vez que elimines tu cuenta, todos tus recursos y datos
                    serán eliminados permanentemente. Antes de continuar,
                    descarga cualquier información que desees conservar.
                </p>
            </header>

            {/* Botón principal */}
            <DangerButton onClick={confirmUserDeletion}>
                Eliminar cuenta
            </DangerButton>

            {/* Modal de confirmación */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        ¿Estás seguro de que quieres eliminar tu cuenta?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        Esta acción no se puede deshacer. Todos tus recursos y
                        datos serán eliminados permanentemente. Ingresa tu
                        contraseña para confirmar.
                    </p>

                    {/* Campo contraseña */}
                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Contraseña" className="sr-only" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            isFocused
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Botones */}
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton type="button" onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>
                        <DangerButton disabled={processing}>
                            Confirmar eliminación
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

