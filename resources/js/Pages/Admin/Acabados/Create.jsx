import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { router } from '@inertiajs/react'
import SelectInput from "@/Components/SelectInput.jsx";


export default function Create({auth, colecciones, colores }) {

    const  handleCancel=()=> {
        console.log("Create->método handleCancel");

        router.get("/admin/acabados")
    }
    const handleSave = () => {
        post(route('acabados.store'), {
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
        coleccion_id: "",
        descripcion: "",
        color: "",
        precio_m2: "",
    });

    //const options_colecciones = colecciones.map(coleccion => ({ value: coleccion, label: coleccion, key: coleccion }));
    const options_colecciones = colecciones.map((coleccion) => (coleccion.nombre));
    console.log(coleccion.nombre)
    const options_colores = colores.map(color => ({ value: color, label: color, key:color }));

    console.log(options_colecciones)
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
                        <InputLabel htmlFor="coleccion" value="Coleccion"/>

                        <SelectInput
                            id="coleccion"
                            name="coleccion"
                            placeholder="Seleccionar coleccion..."
                            options={options_colecciones}
                            className="mt-1 block w-full"
                            isFocused={true}
                            value={data.coleccion_id}
                            onChange={(e) => setData('coleccion_id', e.target.value)}
                        />
                        {errors.coleccion_id && <InputError message={errors.coleccion_id} className="mt-2"/>}
                    </div>

                    <div>
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

                    <div>
                        <InputLabel htmlFor="color" value="Color"/>

                        <SelectInput
                            id="color"
                            name="color"
                            placeholder="Seleccionar color..."
                            options={options_colores}
                            className="mt-1 block w-full"
                            isFocused={true}
                            value={data.color}
                            onChange={(e) => setData('color', e.target.value)}
                        />
                        {errors.color && <InputError message={errors.color} className="mt-2"/>}
                    </div>

                    <div>
                        <InputLabel htmlFor="precio_m2" value="Precio"/>
                        <TextInput
                            id="precio_m2"
                            type="text"
                            name="precio_m2"
                            value={data.precio_m2}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('precio_m2', e.target.value)}
                        />
                        {errors.precio_m2 && <InputError message={errors.precio_m2} className="mt-2"/>}
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
