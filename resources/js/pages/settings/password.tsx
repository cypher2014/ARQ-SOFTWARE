import { useRef } from 'react';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';

import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { edit } from '@/routes/password';
import { KeyRound } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Configuración de contraseña',
    href: edit().url,
  },
];

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Configuración de contraseña" />

      <SettingsLayout>
        <div className="space-y-6">
          {/* Encabezado con icono */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <KeyRound className="w-6 h-6 text-[#76b043]" />
            </div>
            <HeadingSmall
              title="Actualizar contraseña"
              description="Mantén tu cuenta segura usando una contraseña larga y única."
            />
          </div>

          <Form
            {...PasswordController.update.form()}
            options={{
              preserveScroll: true,
            }}
            resetOnError={['password', 'password_confirmation', 'current_password']}
            resetOnSuccess
            onError={(errors) => {
              if (errors.password) {
                passwordInput.current?.focus();
              }
              if (errors.current_password) {
                currentPasswordInput.current?.focus();
              }
            }}
            className="space-y-6"
          >
            {({ errors, processing, recentlySuccessful }) => (
              <>
                {/* Contraseña actual */}
                <div className="grid gap-2">
                  <Label htmlFor="current_password">Contraseña actual</Label>
                  <Input
                    id="current_password"
                    ref={currentPasswordInput}
                    name="current_password"
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <InputError message={errors.current_password} />
                </div>

                {/* Nueva contraseña */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Nueva contraseña</Label>
                  <Input
                    id="password"
                    ref={passwordInput}
                    name="password"
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    placeholder="Ingresa una nueva contraseña segura"
                  />
                  <InputError message={errors.password} />
                </div>

                {/* Confirmar contraseña */}
                <div className="grid gap-2">
                  <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    placeholder="Confirma tu nueva contraseña"
                  />
                  <InputError message={errors.password_confirmation} />
                </div>

                {/* Botón y feedback */}
                <div className="flex items-center gap-4">
                  <Button
                    className="bg-[#76b043] hover:bg-green-700 text-white"
                    disabled={processing}
                  >
                    {processing ? 'Guardando...' : 'Guardar contraseña'}
                  </Button>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <p className="text-sm font-medium text-green-600">
                      ✅ Contraseña actualizada
                    </p>
                  </Transition>
                </div>
              </>
            )}
          </Form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}

