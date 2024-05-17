import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={route('admin.index')}>Panel de administración</Link></li>
                </ul>
            </div>}
        >
            <Head title="Panel" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-wrap justify-center">
                            <div className="artboard artboard-horizontal phone-1 bg-neutral-content/100 mx-2 mb-2 flex items-center justify-center">
                                <Link href={route('colecciones.index')}>
                                Colecciones
                                </Link>
                            </div>
                            <div className="artboard artboard-horizontal phone-1 bg-neutral-content/100 mx-2 mb-2 flex items-center justify-center">
                                <Link href={route('acabados.index')}>
                                    Acabados
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
