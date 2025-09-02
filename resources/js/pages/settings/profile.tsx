// External libraries
import { Transition } from "@headlessui/react";
import { Form, Head, Link, usePage } from "@inertiajs/react";

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
  { title: "Profile settings", href: edit().url },
];

interface ProfileProps {
  mustVerifyEmail: boolean;
  status?: string;
}

export default function Profile({ mustVerifyEmail, status }: ProfileProps) {
  const { auth } = usePage<SharedData>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />

      <SettingsLayout>
        <div className="space-y-6">
          {/* Profile section */}
          <HeadingSmall
            title="Profile information"
            description="Update your name and email address"
          />

          <Form
            {...ProfileController.update.form()}
            options={{ preserveScroll: true }}
            className="space-y-6"
          >
            {({ processing, recentlySuccessful, errors }) => (
              <>
                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={auth.user.name}
                    required
                    autoComplete="name"
                    placeholder="Full name"
                    className="mt-1 block w-full"
                  />
                  <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={auth.user.email}
                    required
                    autoComplete="username"
                    placeholder="Email address"
                    className="mt-1 block w-full"
                  />
                  <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Email verification */}
                {mustVerifyEmail && !auth.user.email_verified_at && (
                  <div>
                    <p className="-mt-4 text-sm text-muted-foreground">
                      Your email address is unverified.{" "}
                      <Link
                        href={send()}
                        as="button"
                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-current"
                      >
                        Click here to resend the verification email.
                      </Link>
                    </p>

                    {status === "verification-link-sent" && (
                      <p className="mt-2 text-sm font-medium text-green-600">
                        A new verification link has been sent to your email
                        address.
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <Button disabled={processing}>
                    {processing ? "Saving..." : "Save"}
                  </Button>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-neutral-600">✅ Saved</p>
                  </Transition>
                </div>
              </>
            )}
          </Form>
        </div>

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  );
}

