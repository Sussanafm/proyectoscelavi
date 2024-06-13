import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import { router } from '@inertiajs/react'
import SelectInput from "@/Components/SelectInput.jsx";
import ImageInput from "@/Components/ImageInput.jsx";
import BotonPrimary from "@/Components/BotonPrimary.jsx";
import BotonSecondary from "@/Components/BotonSecondary.jsx";

export default function Create({auth, colecciones, colores }) {

    console.log("Componente acabados Create.jsx")
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        coleccion_id: "",
        descripcion: "",
        color: "",
        precio_m2: "",
        imagenes: [],  // Agrega el campo para las imágenes
    });

    const options_colecciones = colecciones.map((coleccion) => ({
        value: coleccion.id,
        label: coleccion.nombre
    }));
    const options_colores = colores.map(color => ({ value: color, label: color, key:color }));

    console.log(options_colecciones)

    const handleImageChange = (files) => {
        setData('imagenes', files);
    };

    const  handleCancel=()=> {
        console.log("Create->método handleCancel");

        router.get("/admin/acabados")
    }
    const handleSave = () => {
        const formData = new FormData();

        formData.append('nombre', data.nombre);
        formData.append('coleccion_id', data.coleccion_id);
        formData.append('descripcion', data.descripcion);
        formData.append('color', data.color);
        formData.append('precio_m2', data.precio_m2);

        data.imagenes.forEach((file, index) => {
            formData.append(`imagenes[${index}]`, file);
        });
        console.log(formData);
        post(route('acabados.store'), {
            data: formData,
            preserveScroll: true, // Esta opción mantiene la posición del scroll después de la carga
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
                    <li><Link href={route('acabados.index')}>Acabados</Link></li>
                    <li>Creación</li>
                </ul>
            </div>}
        >
            <Head title="Creación de Acabados" />

            <div className=" flex flex-row justify-center items-center p-8 h-full">
                <form onSubmit={(e)=>e.preventDefault()} action="" encType="multipart/form-data" method="POST" className="bg-white rounded p-5 w-90v">
                    <div className="flex flex-row justify-center">
                        <h1 className="text-4xl text-secondary-600 ">Creación de Acabados</h1>
                    </div>
                    <div className="mt-6">
                        <InputLabel htmlFor="coleccion" value="Coleccion"/>

                        <SelectInput
                            id="coleccion"
                            name="coleccion"
                            placeholder="Seleccionar coleccion..."
                            options={options_colecciones}
                            className="mt-1 block w-30v"
                            isFocused={true}
                            defaultValue={data.coleccion_id}
                            onChange={(e) => setData('coleccion_id', e.target.value)}
                        />
                        {errors.coleccion_id && <InputError message={errors.coleccion_id} className="mt-2"/>}
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
                        <InputLabel htmlFor="descripcion" value="Descripción"/>
                        <TextInput
                            id="descripcion"
                            type="text"
                            name="descripcion"
                            value={data.descripcion}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && <InputError message={errors.descripcion} className="mt-2"/>}
                    </div>

                    <div className="mt-6 flex flex-wrap justify-between">
                        <div className="w-full md:w-1/2 lg:w-auto lg:flex-grow">
                            <InputLabel htmlFor="color" value="Color"/>

                            <SelectInput
                                id="color"
                                name="color"
                                placeholder="Seleccionar color..."
                                options={options_colores}
                                className="mt-1 block w-30v"
                                isFocused={true}
                                defaultValue={data.color}
                                onChange={(e) => setData('color', e.target.value)}
                            />
                            {errors.color && <InputError message={errors.color} className="mt-2"/>}
                        </div>

                        <div className="lg:ml-6 w-full md:w-1/2 lg:w-auto lg:flex-grow">
                            <InputLabel htmlFor="precio_m2" value="Precio m2 (euros)"/>
                            <TextInput
                                id="precio_m2"
                                type="text"
                                name="precio_m2"
                                value={data.precio_m2}
                                className="mt-1 block w-30v"
                                isFocused={true}
                                onChange={(e) => setData('precio_m2', e.target.value)}
                            />
                            {errors.precio_m2 && <InputError message={errors.precio_m2} className="mt-2"/>}
                        </div>
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="imagenes" value="Imágenes" />
                        <ImageInput
                            name="imagenes"
                            multiple={true}
                            onChange={handleImageChange}
                        />
                        {errors.imagenes && <InputError message={errors.imagenes} className="mt-2" />}
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
