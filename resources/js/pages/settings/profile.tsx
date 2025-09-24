// External libraries
import { Transition } from "@headlessui/react";
import { Form, Head, Link, usePage } from "@inertiajs/react";
import { Loader2, UserCircle } from "lucide-react";

// Types
import type { BreadcrumbItem, SharedData } from "@/types";

// Controllers & routes
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";
import { send } from "@/routes/verification";
import { edit } from "@/routes/profile";

// Components
import DeleteUser from "@/components/delete-user";
import HeadingSmall from "@/components/heading-small";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Layouts
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Configuración de perfil", href: edit().url },
];

interface ProfileProps {
  mustVerifyEmail: boolean;
  status?: string;
}

export default function Profile({ mustVerifyEmail, status }: ProfileProps) {
  const { auth } = usePage<SharedData>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Configuración de perfil" />

      <SettingsLayout>
        <div className="space-y-6">
          {/* Encabezado */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <UserCircle className="w-6 h-6 text-[#76b043]" />
            </div>
            <HeadingSmall
              title="Información del perfil"
              description="Actualiza tu nombre y dirección de correo electrónico"
            />
          </div>

          <Form
            {...ProfileController.update.form()}
            options={{ preserveScroll: true }}
            className="space-y-6"
          >
            {({ processing, recentlySuccessful, errors }) => (
              <>
                {/* Nombre */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={auth.user.name}
                    required
                    autoComplete="name"
                    placeholder="Ingresa tu nombre"
                  />
                  <InputError message={errors.name} />
                </div>

                {/* Correo */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={auth.user.email}
                    required
                    autoComplete="username"
                    placeholder="ejemplo@correo.com"
                  />
                  <InputError message={errors.email} />
                </div>

                {/* Verificación de correo */}
                {mustVerifyEmail && !auth.user.email_verified_at && (
                  <div className="rounded-md bg-neutral-50 p-4 text-sm">
                    <p className="text-neutral-700">
                      Tu dirección de correo no está verificada.{" "}
                      <Link
                        href={send()}
                        as="button"
                        className="text-[#76b043] underline underline-offset-4 hover:text-green-700 transition"
                      >
                        Haz clic aquí para reenviar el correo de verificación.
                      </Link>
                    </p>

                    {status === "verification-link-sent" && (
                      <p className="mt-2 font-medium text-green-600">
                        ✅ Se ha enviado un nuevo enlace de verificación a tu correo.
                      </p>
                    )}
                  </div>
                )}

                {/* Acciones */}
                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    disabled={processing}
                    className="bg-[#76b043] hover:bg-green-700 text-white"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      "Guardar cambios"
                    )}
                  </Button>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-out duration-300"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <p className="text-sm text-green-600 font-medium">
                      ✅ Cambios guardados correctamente
                    </p>
                  </Transition>
                </div>
              </>
            )}
          </Form>
        </div>

        {/* Eliminar cuenta */}
        <div className="border-t pt-6 mt-6">
          <DeleteUser />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}


