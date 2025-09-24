import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={`rounded-2xl bg-white shadow-md p-6 ${className}`}>
            <header className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    🔒 Actualizar contraseña
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Mantén tu cuenta segura usando una contraseña fuerte y única.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                {/* Contraseña actual */}
                <div>
                    <InputLabel htmlFor="current_password" value="Contraseña actual" />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData("current_password", e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        placeholder="Ingresa tu contraseña actual"
                    />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                {/* Nueva contraseña */}
                <div>
                    <InputLabel htmlFor="password" value="Nueva contraseña" />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        placeholder="Escribe una nueva contraseña segura"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirmar contraseña */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        placeholder="Repite la nueva contraseña"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {processing ? "Guardando..." : "Guardar"}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <p className="text-sm text-green-600 font-semibold">
                            ✅ Contraseña actualizada con éxito
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}




