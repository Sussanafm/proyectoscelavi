import {router} from "@inertiajs/react";
import Swal from "sweetalert2";
import {useState} from "react";

export default function Tabla({nombre, campos, filas, datos, crud=true}) {
    // console.log(`nombre de tabla ${nombre}`);
    // console.log(`Campos  ${campos}`);
    // console.log(`Filas  ${filas}`);
    const handlenuevaFila = () => {
        console.log("en nueva Fila")
        // Inertia::get("proyectos");

        router.get(`${nombre}/create`);
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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!',
            cancelButtonText: 'Cancelar'
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
            <div className="flex flex-col items-center justify-center h-full p-5">
                <div className="flex flex-row">

                    <h1 className="text-4xl text-green-700 ,t-4"> Listado de {nombre}</h1>
                    {crud && (<button onClick={handlenuevaFila} className="btn btn-sm btn-primary m-2">Añadir {nombre}</button>)}
                </div>
                <div className="overflow-x-auto h-full">
                    {datos && (
                    <table className="table table-auto table-xs table-pin-rows table-pin-cols">
                        <thead>
                        <tr>
                            {campos.map((campo, index) => (
                                <th key={index}>
                                    <button className="btn btn-sm btn-primary" onClick={(e) => ordenar(e,campo)}>
                                        {campo}
                                        {orden.campo===campo &&(
                                            orden.ascendente? ' ▲': ' ▼')}
                                    </button>
                                </th>
                            ))}
                            <td></td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {filasOrdenadas.map((fila) => (
                            <tr key={fila.id}>
                                {campos.map((campo, indexCampo) => (
                                    <td key={indexCampo}>
                                        {campo === 'avatar' ? (
                                            <div className="avatar">
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img src={fila[campo]} alt="Avatar"/>
                                                    </div>
                                                </div>

                                            </div>
                                        ) :(campo=="url" ? (
                                            <a href={fila[campo]} target="_blank"
                                               rel="noopener noreferrer">{fila[campo]}</a>

                                        ):(
                                            fila[campo]
                                        ))}
                                    </td>
                                ))}
                                {/*Editar*/}
                                {crud &&(
                                    <>
                                        <td>
                                            <button onClick={() => handleEdit(fila.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5}
                                                     stroke="currentColor" className="w-6 h-6 text-blue-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                </svg>
                                            </button>

                                        </td>
                                        {/*Borrar*/}

                                        <td>
                                            <button onClick={() => handleDelete(fila.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                                     stroke="currentColor" className="w-6 h-6 text-red-700">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </>
                                )}

                            </tr>
                        ))}
                        </tbody>
                    </table>
                    )}
                    {!datos && (
                        <div>
                            <p> No existen datos</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
