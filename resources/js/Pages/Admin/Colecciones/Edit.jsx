import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm, router, Link, Head} from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput.jsx";
import Swal from "sweetalert2";
import BotonPrimary from "@/Components/BotonPrimary.jsx";
import BotonSecondary from "@/Components/BotonSecondary.jsx";
import ImageInput from "@/Components/ImageInput.jsx";
import {useState} from "react";
import axios from 'axios';



export default function Edit({auth, fila, nombre, formatos, thickness, wearlayer}) {
    console.log(nombre)
    console.log("Componente edit.jsx")
    console.log(fila)

    const [existeImagen, setExisteImagen] = useState(false); // Define existeImagen como estado inicial false

    const { data, setData, post, processing, errors, reset, setError } = useForm({
        nombre: fila.nombre || "",
        formato: fila.formato || "",
        thickness: fila.thickness || "",
        wearlayer: fila.wearlayer || "",
        typology: fila.typology || "",
        total_thickness: fila.total_thickness || "",
        imagen: fila.imagen || null,
        imagen_new: null,
    });

    const options_formato = formatos.map(formato => ({ value: formato, label: formato, key: formato }));
    const options_thickness = thickness.map(thickness => ({ value: thickness, label: thickness, key:thickness }));
    const options_wearlayer = wearlayer.map(wearlayer => ({ value: wearlayer, label: wearlayer, key:wearlayer }));

    const handleImageChange = (files) => {
        setData('imagen_new', files[0]); // Asignar el primer archivo
        setExisteImagen(true); // Establecer existeImagen como true
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
        if (!data.typology) {
            setError('typology', 'La tipología es requerida');
            valid = false;
        }

        return valid;
    };
    const handleUpdate = async (id) => {
        if (!validate()) {
            return;
        }

        const result = await Swal.fire({
            title: `¿Confirmas la actualización?`,
            text: "Los datos se modificarán",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cambialo!',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'swal-confirm-custom',
                cancelButton: 'swal-cancel-custom'
            }
        });

        if (result.isConfirmed) {
            try {
                console.log("actualizando ");
                // Crear un nuevo objeto FormData para el formulario
                const formData = new FormData();

                // Agregar la imagen al objeto FormData si está presente
                if (data.imagen_new) {
                    formData.append('imagen_new', data.imagen_new);
                    // Agregar los campos del formulario al objeto FormData
                    /*formData.append('nombre', data.nombre);
                    formData.append('formato', data.formato);
                    formData.append('thickness', data.thickness);
                    formData.append('wearlayer', data.wearlayer);
                    formData.append('typology', data.typology);
                    formData.append('total_thickness', data.total_thickness);*/

                    console.log('FormData:', Array.from(formData.entries())); // Log de contenidos de FormData

                    // Enviar la solicitud usando Axios
                    const response = await axios.post(`/admin/${nombre}/${id}/imagen`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }

                console.log("datos actualizados");
                console.log(data);
                //router.put(`/admin/${nombre}/${id}`, data);
                await axios.put(`/admin/${nombre}/${id}`, data);

                window.location.href=("/admin/colecciones");


            } catch (error) {
                if (error.response && error.response.status === 422) {
                    console.log('Errores de validación:', error.response.data.errors);
                } else {
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
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={route('admin.index')}>Panel de administración</Link></li>
                    <li><Link href={route('colecciones.index')}>Colecciones</Link></li>
                    <li>Edición</li>
                </ul>
            </div>}
        >
            <Head title="Edición de Colecciones" />

            <div className=" flex flex-row justify-center items-center p-8 h-full">
                <form onSubmit={(e)=>e.preventDefault()} className="bg-white rounded p-5 w-90v">
                    <div className="flex flex-row justify-center">
                        <h1 className="text-4xl text-secondary-600 ">Edición de colecciones</h1>
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
                            defaultValue={data.formato}
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
                            defaultValue={data.thickness}
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
                            defaultValue={data.wearlayer}
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
                            defaultValue={data.total_thickness}
                            onChange={(e) => setData('total_thickness', e.target.value)}
                        />
                        {errors.total_thickness && <InputError message={errors.total_thickness} className="mt-2"/>}
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="imagen_new" value="Imágen" />
                        <ImageInput
                            name="imagen_new"
                            multiple={false}
                            onChange={handleImageChange}

                        />
                        {errors.imagen_new && <InputError message={errors.imagen_new} className="mt-2" />}
                        <p className="text-xs">Tamaño recomendado imagen 500x500 (px)</p>
                    </div>

                    {!existeImagen && (
                        <div className="mt-6">
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <img
                                    src={data.imagen}
                                    alt="Imagen coleccion"
                                    style={{ maxWidth: '200px', height: 'auto' }}
                                />
                            </div>
                        </div>
                    )}


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
