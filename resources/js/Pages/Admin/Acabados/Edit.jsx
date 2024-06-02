import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm, router, Link, Head} from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput.jsx";
import ImageInput from "@/Components/ImageInput.jsx";
import Swal from "sweetalert2";
import {Inertia} from "@inertiajs/inertia";
import axios from 'axios';
import TooltipButtonIcon from "@/Components/TooltipButtonIcon.jsx";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import BotonSecondary from "@/Components/BotonSecondary.jsx";
import BotonPrimary from "@/Components/BotonPrimary.jsx";

export default function Edit({auth, fila, nombre, colecciones, colores, imagenes}) {

    console.log("Componente edit.jsx")


    const { data, setData, post, processing, errors, reset, setError } = useForm({
        nombre: fila.nombre || "",
        coleccion_id: fila.coleccion_id || "",
        descripcion: fila.descripcion || "",
        color: fila.color || "",
        precio_m2: fila.precio_m2 || "",
        imagenes_new: [],  // Agrega el campo para las imágenes
    });


    const options_colecciones = colecciones.map((coleccion) => ({
        value: coleccion.id,
        label: coleccion.nombre
    }));
    const options_colores = colores.map(color => ({ value: color, label: color, key:color }));

    const handleImageChange = (files) => {
        setData('imagenes_new', files);
    };

    const  handleCancel=()=>{
        console.log("Create->método handleCancel");

        router.get(`/admin/${nombre}`)
    }

    const validate = () => {
        let valid = true;
        if (!data.nombre) {
            setError('nombre', 'El nombre es requerido');
            valid = false;
        }
        if (!data.descripcion) {
            setError('descripcion', 'La descripción es requerida');
            valid = false;
        }
        if (!data.precio_m2) {
            setError('precio_m2', 'El precio por m² es requerido');
            valid = false;
        }
        return valid;
    };
    const handleUpdate = async (id) => {
        if (!validate()) {
            return;
        }

        const { value: isConfirmed } = await Swal.fire({
            title: '¿Confirmas la actualización?',
            text: "Los datos se modificarán",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cámbialo!',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'swal-confirm-custom',
                cancelButton: 'swal-cancel-custom'
            }
        });

        if (isConfirmed) {
            try {
                console.log('Iniciando actualización...');

                // Enviar las nuevas imágenes al servidor utilizando el método POST
                if (data.imagenes_new.length > 0) {
                    const newImagesFormData = new FormData();
                    data.imagenes_new.forEach((file, index) => {
                        newImagesFormData.append(`imagenes_new[${index}]`, file);
                    });

                    const imageResponse = await axios.post(`/admin/${nombre}/${id}/imagenes`, newImagesFormData);
                    console.log('Respuesta del servidor al subir imágenes:', imageResponse.data);
                    console.log('Nuevas imágenes cargadas correctamente.');
                }

                // Realizar la solicitud PUT para actualizar datos
                const updateResponse = await axios.put(`/admin/${nombre}/${id}`, data);
                console.log('Respuesta del servidor al actualizar datos:', updateResponse.data);
                console.log('Datos actualizados correctamente.');

                // Redirigir a la página después de la actualización
                window.location.href=("/admin/acabados");

            } catch (error) {
                console.error('Error durante la actualización:', error.response?.data || error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'No has añadido algún dato requerido',
                    text: 'Comprueba que has introducido todos los datos.',
                    confirmButtonText: 'Cerrar',
                    customClass: {
                        confirmButton: 'swal-confirm-custom'
                    }
                });
            }
        }
    };


    const handleDeleteImage = (id) => {
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar esta imagen?`,
            text: "La imagen se eliminará permanentemente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, borrala!',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'swal-confirm-custom',
                cancelButton: 'swal-cancel-custom'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("borrando ");
                axios.delete(`/imagenes/${id}`)
                    .then(response => {
                        console.log(response.data.message);
                        Inertia.reload();
                    })
                    .catch(error => {
                        console.error("Hubo un error al borrar la imagen: ", error);
                    });
            }
        }).catch(error => {
            console.error('Hubo un problema al eliminar la imagen', error);
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={route('admin.index')}>Panel de administración</Link></li>
                    <li><Link href={route('acabados.index')}>Acabados</Link></li>
                    <li>Edición</li>
                </ul>
            </div>}
        >
            <Head title="Edición de Acabados" />

            <div className="flex flex-row justify-center items-center p-8 h-full">
                <form onSubmit={(e)=>e.preventDefault()} action="" method="POST" className="bg-white rounded p-5 w-90v">
                    <div className="flex flex-row justify-center">
                        <h1 className="text-4xl text-secondary-600 ">Edición de Acabados</h1>
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
                            value={data.coleccion_id}
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
                                value={data.color}
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
                        <InputLabel htmlFor="imagenes_new" value="Imágenes" />
                        <ImageInput
                            name="imagenes_new"
                            multiple={true}
                            onChange={handleImageChange}

                        />
                        {errors.imagenes && <InputError message={errors.imagenes} className="mt-2" />}
                    </div>

                    <div className="mt-6">
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {imagenes.map((imagen) => (
                            <div key={imagen.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <img
                                    src={imagen.imagen}
                                    alt={`Imagen ${imagen.id}`}
                                    style={{ maxWidth: '200px', height: 'auto' }}
                                />
                                <div style={{ position: 'relative', marginLeft: '0', top: '-90px', left:'-20px' }}>
                                    <TooltipButtonIcon
                                        onClick={() => handleDeleteImage(imagen.id)}
                                        icon={faTimes}
                                        message={'Eliminar'}
                                        className="custom-tooltip-icon"
                                    />
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>


                    <div className="p-4 m-4 flex justify-center space-x-8">
                        <BotonPrimary onClick={()=>handleUpdate(fila.id)}>
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
