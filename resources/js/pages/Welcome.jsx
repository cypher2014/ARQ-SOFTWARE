import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, ShieldCheck } from 'lucide-react';

export default function Welcome({ auth }) {
    const cards = [
        {
            title: 'Iniciar Sesión',
            description: 'Accede a tu cuenta y disfruta de todas las funcionalidades.',
            icon: <LogIn className="w-10 h-10 text-green-600" />,
            action: (
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-2">
                    <Link href={route('login')}>Entrar</Link>
                </Button>
            ),
        },
        {
            title: 'Registrarse',
            description: 'Crea una cuenta nueva en pocos pasos y únete a nuestra comunidad.',
            icon: <UserPlus className="w-10 h-10 text-blue-600" />,
            action: (
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2">
                    <Link href={route('register')}>Registrarse</Link>
                </Button>
            ),
        },
        {
            title: 'Acceso Administrativo',
            description: 'Panel exclusivo para administradores y gestión avanzada.',
            icon: <ShieldCheck className="w-10 h-10 text-purple-600" />,
            action: (
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-2">
                    <Link href={route('dashboard')}>Administrar</Link>
                </Button>
            ),
        },
    ];

    return (
        <>
            <Head title="Dyamix" />

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6 py-12">
                <motion.h1
                    className="text-4xl font-extrabold text-gray-800 mb-12 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Bienvenido a Dynamix
                </motion.h1>

                <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-shadow bg-white">
                                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                    {card.icon}
                                    <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
                                    <p className="text-gray-600">{card.description}</p>
                                    {card.action}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}

