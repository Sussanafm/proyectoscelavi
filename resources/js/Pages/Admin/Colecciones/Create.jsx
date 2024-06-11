import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import { router } from '@inertiajs/react'
import SelectInput from "@/Components/SelectInput.jsx";
import BotonPrimary from "@/Components/BotonPrimary.jsx";
import BotonSecondary from "@/Components/BotonSecondary.jsx";
import ImageInput from "@/Components/ImageInput.jsx";


export default function Create({auth, formatos, thickness, wearlayer }) {

    console.log("Componente coleccion Create.jsx")
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        formato: "",
        thickness: "",
        wearlayer: "",
        typology: "",
        total_thickness:"",
        imagen: null,
    });

    const options_formato = formatos.map(formato => ({ value: formato, label: formato, key: formato }));
    const options_thickness = thickness.map(thickness => ({ value: thickness, label: thickness, key:thickness }));
    const options_wearlayer = wearlayer.map(wearlayer => ({ value: wearlayer, label: wearlayer, key:wearlayer }));

    const handleImageChange = (files) => {
        setData('imagen', files[0]); // Asignar el primer archivo
    };

    const  handleCancel=()=> {
        console.log("Create->método handleCancel");

        router.get("/admin/colecciones")
    }
    const handleSave = () => {
        const formData = new FormData(); // Crear un nuevo objeto FormData para el formulario

        // Agregar los campos del formulario al objeto FormData
        formData.append('nombre', data.nombre);
        formData.append('formato', data.formato);
        formData.append('thickness', data.thickness);
        formData.append('wearlayer', data.wearlayer);
        formData.append('typology', data.typology);
        formData.append('total_thickness', data.total_thickness);

        // Agregar la imagen al objeto FormData si está presente
        if (data.imagen) {
            formData.append('imagen', data.imagen);
        }

        // Realizar la solicitud POST con los datos del formulario
        post(route('colecciones.store'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Datos enviados con éxito');
            },
            onError: (errors) => {
                console.error('Error al enviar datos:', errors);
            },
        });
    };


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
                    <form onSubmit={(e)=>e.preventDefault()} action="" method="POST" className="bg-white rounded p-5 w-90v">
                        <div className="flex flex-row justify-center">
                            <h1 className="text-4xl text-secondary-600 ">Creación de Colecciones</h1>
                        </div>
                        <div className="mt-6">
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

                        <div className="mt-6">
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

                        <div className="mt-6">
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

                        <div className="mt-6">
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

                        <div className="mt-6">
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

                        <div className="mt-6">
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

                        <div className="mt-6">
                            <InputLabel htmlFor="imagen" value="Imágen" />
                            <ImageInput
                                name="imagenes"
                                multiple={false}
                                onChange={handleImageChange}
                            />
                            {errors.imagen && <InputError message={errors.imagen} className="mt-2" />}
                            <p className="text-xs">Tamaño recomendado imagen 500x500 (px)</p>
                        </div>

                        <div className="p-4 m-4 flex justify-center space-x-8">
                            <BotonPrimary onClick={handleSave}>
                                Guardar
                            </BotonPrimary>

                            <BotonSecondary onClick={handleCancel}>
                                Cancelar
                            </BotonSecondary>
                        </div>
                    </form>
            </div>

        </AuthenticatedLayout>
    );
}
