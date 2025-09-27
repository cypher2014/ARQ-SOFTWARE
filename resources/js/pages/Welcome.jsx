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
            icon: <LogIn className="w-12 h-12 text-[#76b043]" />,
            action: (
                <Button
                    asChild
                    className="bg-[#76b043] hover:bg-[#5e8e36] text-white font-semibold rounded-xl px-6 py-2 transition-transform hover:scale-105"
                >
                    <Link href={route('login')}>Entrar</Link>
                </Button>
            ),
        },
        {
            title: 'Registrarse',
            description: 'Crea una cuenta nueva en pocos pasos y únete a nuestra comunidad.',
            icon: <UserPlus className="w-12 h-12 text-blue-600" />,
            action: (
                <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2 transition-transform hover:scale-105"
                >
                    <Link href={route('register')}>Registrarse</Link>
                </Button>
            ),
        },
        {
            title: 'Acceso Administrativo',
            description: 'Panel exclusivo para administradores y gestión avanzada.',
            icon: <ShieldCheck className="w-12 h-12 text-purple-600" />,
            action: (
                <Button
                    asChild
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-6 py-2 transition-transform hover:scale-105"
                >
                    <Link href={route('admin.login')}>Administrar</Link>
                </Button>
            ),
        },
    ];

    return (
        <>
            <Head title="Dynamix" />

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12">
                <motion.h1
                    className="text-5xl font-extrabold text-gray-800 mb-12 text-center leading-tight"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Bienvenido a <span className="text-[#76b043]">Dynamix</span>
                </motion.h1>

                <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white">
                                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.3 }}
                                    >
                                        {card.icon}
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {card.title}
                                    </h2>
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


