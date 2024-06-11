import {router, usePage} from "@inertiajs/react";
import Swal from "sweetalert2";
import {useState} from "react";
import Boton from "@/Components/Boton.jsx";
import TooltipButton from "@/Components/TooltipButton.jsx";
import { faImages, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import TooltipButtonIcon from "@/Components/TooltipButtonIcon.jsx";


export default function Tabla({nombre, campos, filas, datos, columnas, crud=true}) {
    // console.log(`nombre de tabla ${nombre}`);
    // console.log(`Campos  ${campos}`);
    console.log(`Filas  ${filas}`);
    console.log(`Columnas  ${columnas}`);

    //Recojo la variable de sesión
    const success = usePage().props.success;
    const handlenuevaFila = () => {
        console.log("en nueva Fila")
        // Inertia::get("proyectos");

        router.get(`${nombre}/create`);
    }

    const handleEditGallery = (id) => {
        // Inertia::get("proyectos");

        router.get(`galeria/${id}/index`);
    }

    const handleEdit = (id) => {
        console.log("en nueva Fila")
        // Inertia::get("proyectos");

        router.get(`${nombre}/${id}/edit`);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: `¿Estás seguro?`,
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, bórralo!',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'swal-confirm-custom',
                cancelButton: 'swal-cancel-custom'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("borrando ");
                router.delete(`${nombre}/${id}`)
            }
        });
    }

    const [orden, setOrden] = useState({
        campo: campos[0],
        ascendente: true
    })

    function ordenar(e,campo) {
        e.stopPropagation();
        setOrden((ordenActual)=>{
                if (ordenActual.campo == campo)
                    return{
                        campo,
                        ascendente:!ordenActual.ascendente
                    }
                else
                    return{
                        campo,
                        ascendente: true
                    }

            }
        )
    }
    const filasOrdenadas=[...filas].sort((a,b)=>{
        let valorA = a[orden.campo]
        let valorB = b[orden.campo]
        if (!isNaN(valorA)){
            valorA=Number(valorA)
            valorB=Number(valorB)
        }

        if (valorA<valorB)
            return orden.ascendente? -1:1;
        if (valorA>valorB)
            return orden.ascendente? 1:-1;
        return 0

    })

    return (
        <>
            <div className="flex flex-col items-center justify-center p-5">
                {success && (
                    <div role="alert" className="alert" style={{ borderRadius: '0', backgroundColor: '#AAF2D7' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-info shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path  strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{success}</span>
                    </div>
                )}
                <div className="flex flex-row items-center justify-between w-full px-20">
                    <h1 className="text-4xl text-secondary-600">Listado de {nombre}</h1>
                    {crud && (
                        <Boton onClick={handlenuevaFila}>
                            Añadir {nombre}
                        </Boton>
                    )}
                </div>

                <div className="overflow-x-auto h-full w-full">
                    {datos && (
                        <table className="table table-auto table-pin-rows table-pin-cols bg-white table-zebra table-lg min-w-full sm:min-w-0">
                        <thead>
                        <tr>
                            {columnas.map((columna, index) => (
                                <th key={index} className={`text-center ${index > 1 ? 'ocultar-columna sm:table-cell' : ''}`}>
                                <TooltipButton
                                        key={index}
                                        message={`Ordenar por ${columna}`}
                                        onClick={ordenar}
                                        columna={columna}
                                        orden={orden}
                                        campos={campos}
                                        index={index}
                                    />
                                </th>
                            ))}
                            {nombre === "acabados" && (
                                <th></th>
                            )}
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {filasOrdenadas.map((fila) => (
                            <tr key={fila.id}>
                                {campos.map((campo, indexCampo) => (
                                    <td key={indexCampo} className={`text-center ${indexCampo > 1 ? 'ocultar-columna sm:table-cell' : ''}`}>
                                        {campo === 'imagen' ? (
                                            <div className="flex justify-center items-center h-32">  {/* Ajusta la altura según tus necesidades */}
                                                <div className="w-20 mx-auto">
                                                    <img src={`/storage/${fila[campo]}`} alt="Imagen" className="block mx-auto" />
                                                </div>
                                            </div>
                                        ) : (campo == "url" ? (
                                            <a href={`/storage/${fila[campo]}`} target="_blank"
                                               rel="noopener noreferrer">{fila[campo]}</a>

                                        ) : (
                                            fila[campo]
                                        ))}
                                    </td>
                                ))}
                                {/*Editar*/}
                                {crud &&(
                                    <>
                                        {nombre === "acabados" && (
                                            <td className="w-20">
                                                <TooltipButtonIcon onClick={() => handleEditGallery(fila.id)} icon={faImages} message={"Ordenar Galería"} />
                                            </td>
                                        )}
                                        <td className="w-20">
                                            <TooltipButtonIcon onClick={() => handleEdit(fila.id)} icon={faEdit} message={'Editar'} />
                                        </td>

                                        <td className="w-20">
                                            <TooltipButtonIcon onClick={() => handleDelete(fila.id)} icon={faTrash} message={'Eliminar'} />
                                        </td>
                                    </>
                                )}

                            </tr>
                        ))}
                        </tbody>
                    </table>
                    )}
                    {!datos && (
                        <div className="bg-white mt-40 w-full h-40 flex items-center justify-center">
                            <p className="text-2xl font-medium">No existen datos</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
