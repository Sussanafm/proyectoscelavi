import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Index({ auth, isEmpty }) {
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

            <div className="py-36">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className={`p-6 text-gray-900 flex flex-wrap ${isEmpty ? 'justify-center' : 'justify-between'}`}>
                            <div className="main-boxarea">
                                <div className="boxarea">
                                    <div className="boxarea-img">
                                        <Link href={route('colecciones.index')}>
                                        <img src="/storage/images/img/COLORADO-CEMENT-mockup_new.jpg" alt="Imagen Colecciones"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="boxarea-content text-center h-20">
                                    <Link href={route('colecciones.index')}>
                                        Colecciones
                                    </Link>
                                </div>
                            </div>
                            {!isEmpty && (
                                <div className="main-boxarea">
                                    <div className="boxarea">
                                        <div className="boxarea-img">
                                            <Link href={route('acabados.index')}>
                                            <img src="/storage/images/img/SCELAVI-VOSS-GREY_MOCKUP.jpg"
                                                 alt="Imagen Acabados"/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="boxarea-content text-center h-20">
                                        <Link href={route('acabados.index')}>
                                            Acabados
                                        </Link>
                                    </div>
                                </div>
                            )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
