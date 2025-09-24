import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { appearance } from '@/routes';
import { Palette } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Apariencia',
        href: appearance().url,
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuración de Apariencia" />

            <SettingsLayout>
                <div className="space-y-8">
                    {/* Encabezado */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-xl">
                            <Palette className="w-6 h-6 text-green-600" />
                        </div>
                        <HeadingSmall 
                            title="Configuración de Apariencia" 
                            description="Personaliza cómo se ve tu cuenta y ajusta la interfaz a tu estilo." 
                        />
                    </div>

                    {/* Contenido */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition">
                        <AppearanceTabs />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

