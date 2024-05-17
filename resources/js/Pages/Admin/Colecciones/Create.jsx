import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { router } from '@inertiajs/react'
import SelectInput from "@/Components/SelectInput.jsx";


export default function Create({auth, formatos, thickness, wearlayer }) {

    const  handleCancel=()=> {
        console.log("Create->método handleCancel");

        router.get("/admin/colecciones")
    }
    const handleSave = () => {
        post(route('colecciones.store'), {
            preserveScroll: true, // Esta opción mantiene la posición del scroll después de la carga
            onSuccess: () => {
                // Manejar éxito de la petición POST
                console.log('Datos enviados con éxito');
                // Podrías redirigir a otra página o realizar otras acciones aquí
            },
            onError: (errors) => {
                // Manejar errores de la petición POST
                console.error('Error al enviar datos:', errors);
            },
        });
    };



    console.log("Componente Create.jsx")
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        formato: "",
        thickness: "",
        wearlayer: "",
        typology: "",
        total_thickness:"",
    });

    const options_formato = formatos.map(formato => ({ value: formato, label: formato, key: formato }));
    const options_thickness = thickness.map(thickness => ({ value: thickness, label: thickness, key:thickness }));
    const options_wearlayer = wearlayer.map(wearlayer => ({ value: wearlayer, label: wearlayer, key:wearlayer }));


    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={route('admin.index')}>Panel de administración</Link></li>
                    <li><Link href={route('colecciones.index')}>Colecciones</Link></li>
                    <li>Creación</li>
                </ul>
            </div>}
        >
            <Head title="Creación de Colecciones" />

            <div className=" flex flex-row justify-center items-center p-8 h-full">
                    <form onSubmit={(e)=>e.preventDefault()} action="" method="POST" className="bg-white rounded p-5">

                        <div>
                            <InputLabel htmlFor="nombre" value="Nombre"/>
                            <TextInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={data.nombre}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('nombre', e.target.value)}
                            />
                            {errors.nombre && <InputError message={errors.nombre} className="mt-2"/>}
                        </div>

                        <div>
                            <InputLabel htmlFor="formato" value="Formato"/>

                            <SelectInput
                                id="formato"
                                name="formato"
                                placeholder="Seleccionar formato..."
                                options={options_formato}
                                className="mt-1 block w-full"
                                isFocused={true}
                                value={data.formato}
                                onChange={(e) => setData('formato', e.target.value)}
                            />
                            {errors.formato && <InputError message={errors.formato} className="mt-2"/>}
                        </div>

                        <div>
                            <InputLabel htmlFor="thickness" value="Thickness"/>

                            <SelectInput
                                id="thickness"
                                name="thickness"
                                placeholder="Seleccionar thickness..."
                                options={options_thickness}
                                className="mt-1 block w-full"
                                isFocused={true}
                                value={data.thickness}
                                onChange={(e) => setData('thickness', e.target.value)}
                            />
                            {errors.thickness && <InputError message={errors.thickness} className="mt-2"/>}
                        </div>

                        <div>
                            <InputLabel htmlFor="wearlayer" value="Wearlayer"/>

                            <SelectInput
                                id="wearlayer"
                                name="wearlayer"
                                placeholder="Seleccionar wearlayer..."
                                options={options_wearlayer}
                                className="mt-1 block w-full"
                                isFocused={true}
                                value={data.wearlayer}
                                onChange={(e) => setData('wearlayer', e.target.value)}
                            />
                            {errors.wearlayer && <InputError message={errors.wearlayer} className="mt-2"/>}
                        </div>

                        <div>
                            <InputLabel htmlFor="typology" value="Typology"/>
                            <TextInput
                                id="typology"
                                type="text"
                                name="typology"
                                value={data.typology}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('typology', e.target.value)}
                            />
                            {errors.typology && <InputError message={errors.typology} className="mt-2"/>}
                        </div>

                        <div>
                            <InputLabel htmlFor="total_thickness" value="Total Thickness"/>

                            <SelectInput
                                id="total_thickness"
                                name="total_thickness"
                                placeholder="Seleccionar thickness..."
                                options={options_thickness}
                                className="mt-1 block w-full"
                                isFocused={true}
                                value={data.total_thickness}
                                onChange={(e) => setData('total_thickness', e.target.value)}
                            />
                            {errors.total_thickness && <InputError message={errors.total_thickness} className="mt-2"/>}
                        </div>

                        <div className="p-4 m-4">
                            <PrimaryButton onClick={handleSave}  className="p-4 ms-4" disabled={processing}>
                                Guardar
                            </PrimaryButton>
                            <PrimaryButton onClick={handleCancel} className="p-4 ms-4" disabled={processing}>
                                Cancelar
                            </PrimaryButton>
                        </div>
                    </form>
            </div>

        </AuthenticatedLayout>
    );
}
