import TablaOrder from "@/Components/TablaOrder.jsx";
import {Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({auth, tabla, campos, filas, datos, columnas, coleccionNombre}){
    console.log(`usuario ${auth.user}`);
    console.log(`nombre de tabla ${tabla}`);
    console.log(`Campos  ${campos}`);
    console.log(`Datos  ${datos}`);
    console.log(`Coleccion  ${coleccionNombre}`);
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={route('admin.index')}>Panel de administración</Link></li>
                    <li><Link href={route('acabados.index')}>Acabados</Link></li>
                    <li>Galeria</li>
                </ul>
            </div>}
        >
            <Head title={`Listado Galeria ${coleccionNombre}`} />

            <TablaOrder campos={campos} filas={filas} nombre={tabla} datos={datos} columnas={columnas} coleccion={coleccionNombre} />


        </AuthenticatedLayout>
    );
}
