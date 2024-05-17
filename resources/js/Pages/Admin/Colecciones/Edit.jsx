import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm, router, Link, Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import Swal from "sweetalert2";


export default function Edit({auth, fila, nombre, formatos, thickness, wearlayer}) {
    console.log(nombre)
    console.log("Componente edit.jsx")
    console.log(fila)

    const  handleCancel=()=>{
        console.log("Create->método handleCancel");

        router.get(`/admin/${nombre}`)
    }
    const handleUpdate = (id) => {
        Swal.fire({
            title: `¿Confirmas la actualización?`,
            text: "Los datos se modificarán",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cambialo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("actualizando ");
                router.put(`/admin/${nombre}/${id}`,data)
            }
        });
    }


    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: fila.nombre || "",
        formato: fila.formato || "",
        thickness: fila.thickness || "",
        wearlayer: fila.wearlayer || "",
        typology: fila.typology || "",
        total_thickness: fila.total_thickness || "",
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
                    <li>Edición</li>
                </ul>
            </div>}
        >
            <Head title="Edición de Colecciones" />

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

                        <PrimaryButton onClick={()=>handleUpdate(fila.id)} className="p-4 ms-4"
                                       disabled={processing}>
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
