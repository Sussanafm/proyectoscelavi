import {router} from "@inertiajs/react";
import Swal from "sweetalert2";
import {useState} from "react";
import Boton from "@/Components/Boton.jsx";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import TooltipButtonIcon from "@/Components/TooltipButtonIcon.jsx";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";


export default function Tabla({nombre, campos, filas, datos, columnas, coleccion, crud=true}) {
    console.log(`nombre de tabla ${nombre}`);
    console.log(`Campos  ${campos}`);
    console.log(`Filas  ${filas}`);
    console.log(`Columnas  ${columnas}`);
    console.log(`Coleccion  ${coleccion}`);

    // Función para manejar el reordenamiento
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(filas);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        items.forEach((item, index) => {
            item.order = index + 1;
        });

        // Enviar los datos actualizados al backend
        guardarOrdenEnBaseDeDatos(items);
    };

    const guardarOrdenEnBaseDeDatos = (items) => {

        axios.put(`/admin/galeria/ordenar`, { filas: items })
            .then(response => {
                console.log('Orden actualizado correctamente');
                window.location.reload(); // Recargar la página
            })
            .catch(error => {
                console.error('Error al actualizar el orden:', error);
            });
    };


    const handlenuevaFila = () => {
        console.log("en nueva Fila")
        // Inertia::get("proyectos");

        router.get(`${nombre}/create`);
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
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col items-center justify-center p-5">
                <div className="flex flex-row items-center justify-center w-full px-20">
                    <h1 className="text-4xl text-secondary-600">Ordenar {nombre} {coleccion}</h1>
                </div>

                <div className="overflow-x-auto h-full w-full">
                    {datos && (
                        <table
                            className="table table-auto table-pin-rows table-pin-cols bg-white table-zebra table-lg min-w-full sm:min-w-0">
                            <thead>
                            <tr>
                                {columnas.map((columna, index) => (
                                    <th key={index}
                                        className={`text-base text-secondary text-center ${index > 1 ? 'ocultar-columna sm:table-cell' : ''}`}>
                                        {columna}
                                    </th>
                                ))}
                                <th></th>
                            </tr>
                            </thead>
                            <Droppable droppableId="filas">
                                {(provided) => (
                                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                    {filas.map((fila, index) => (
                                        <Draggable key={fila.id.toString()} draggableId={fila.id.toString()}
                                                   index={index}>
                                            {(provided) => (
                                                <tr {...provided.draggableProps} {...provided.dragHandleProps}
                                                    ref={provided.innerRef} title="Pulsa y arrastra la fila para mover la imagen de orden">

                                                    {campos.map((campo, indexCampo) => (
                                                        <td key={indexCampo}
                                                            className={`text-center ${indexCampo > 1 ? 'ocultar-columna sm:table-cell' : ''}`}>
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
                                                    {crud && (
                                                        <>

                                                            <td className="w-20">
                                                                <TooltipButtonIcon onClick={() => handleDelete(fila.id)}
                                                                                   icon={faTrash} message={'Eliminar'}/>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {/* Marcador de posición */}
                                    {provided.placeholder}
                                    </tbody>
                                )}
                            </Droppable>
                        </table>
                    )}
                    {!datos && (
                        <div className="bg-white mt-40 w-full h-40 flex items-center justify-center">
                            <p className="text-2xl font-medium">No existen datos</p>
                        </div>
                    )}
                </div>
            </div>
        </DragDropContext>
    )
}
