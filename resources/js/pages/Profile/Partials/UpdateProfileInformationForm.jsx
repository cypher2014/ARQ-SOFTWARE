import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || '',
            email: user.email || '',
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 ${className}`}>
            {/* Header */}
            <header className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Keep your profile information up to date to ensure smooth communication.
                </p>
            </header>

            {/* Form */}
            <form onSubmit={submit} className="space-y-5">
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email Address" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Verification Notice */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-md bg-yellow-50 p-4">
                        <p className="text-sm text-yellow-700">
                            Your email address is unverified.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-medium text-indigo-600 hover:text-indigo-800 underline"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <p className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </p>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        leave="transition-opacity duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 font-medium">
                            ✅ Changes saved successfully
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

