import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { UserCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name || "",
      email: user.email || "",
    });

  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };

  return (
    <section
      className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 ${className}`}
    >
      {/* Encabezado */}
      <header className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <UserCircleIcon className="h-6 w-6 text-indigo-600" />
          Información del Perfil
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Mantén tu información de perfil actualizada para mejorar tu
          experiencia.
        </p>
      </header>

      {/* Formulario */}
      <form onSubmit={submit} className="space-y-6">
        {/* Nombre */}
        <div>
          <InputLabel htmlFor="name" value="Nombre completo" />
          <div className="mt-1 relative rounded-lg shadow-sm">
            <TextInput
              id="name"
              className="block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <InputError className="mt-2" message={errors.name} />
        </div>

        {/* Correo electrónico */}
        <div>
          <InputLabel htmlFor="email" value="Correo electrónico" />
          <div className="mt-1 relative rounded-lg shadow-sm">
            <TextInput
              id="email"
              type="email"
              className="block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              required
              autoComplete="username"
            />
            <EnvelopeIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <InputError className="mt-2" message={errors.email} />
        </div>

        {/* Aviso de verificación */}
        {mustVerifyEmail && user.email_verified_at === null && (
          <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
            <p className="text-sm text-yellow-700">
              Tu dirección de correo no está verificada.{" "}
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="font-medium text-indigo-600 hover:text-indigo-800 underline"
              >
                Haz clic aquí para reenviar el correo de verificación.
              </Link>
            </p>
            {status === "verification-link-sent" && (
              <p className="mt-2 text-sm font-medium text-green-600">
                Se ha enviado un nuevo enlace de verificación a tu correo
                electrónico.
              </p>
            )}
          </div>
        )}

        {/* Acciones */}
        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>
            {processing ? "Guardando..." : "Guardar"}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <p
              className="text-sm text-green-600 font-medium"
              aria-live="polite"
            >
              ✅ Cambios guardados con éxito
            </p>
          </Transition>
        </div>
      </form>
    </section>
  );
}



