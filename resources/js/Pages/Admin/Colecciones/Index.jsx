import Tabla from "@/Components/Tabla.jsx";
import {Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({auth, tabla, campos, filas, datos, columnas}){
    console.log(`usuario ${auth.user}`);
    console.log(`nombre de tabla ${tabla}`);
    console.log(`Campos  ${campos}`);
    console.log(`Datos  ${datos}`);
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={route('admin.index')}>Panel de administración</Link></li>
                    <li>Colecciones</li>
                </ul>
            </div>}
        >
            <Head title="Listado Colecciones" />

            <Tabla campos={campos} filas={filas} nombre={tabla} datos={datos} columnas={columnas} />


        </AuthenticatedLayout>
    );
}
