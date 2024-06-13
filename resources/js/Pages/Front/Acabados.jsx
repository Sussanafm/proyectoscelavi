import {Head, Link} from '@inertiajs/react';
import Guest from "@/Layouts/GuestLayout.jsx";
import React, {useEffect, useState} from "react";


export default function Acabados({ auth, laravelVersion, phpVersion, imageUrl, acabados, nombre }) {

    const [acabadoData, setAcabadoData] = useState({});

    const showAcabado = async (id) => {
        try {
            const response = await axios.get(`/acabado/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching acabado:', error);
            return null;
        }
    };
    useEffect(() => {
        const fetchAcabadosData = async () => {
            const data = {};
            for (let acabado of acabados) {
                const acabadoInfo = await showAcabado(acabado.id);
                if (acabadoInfo) {
                    data[acabado.id] = acabadoInfo;
                }
            }
            setAcabadoData(data);
        };

        fetchAcabadosData();
    }, [acabados]);

    return (
        <Guest user={auth.user} laravelVersion={laravelVersion} phpVersion={phpVersion}
               header={<Link
                   href="/"
                   className="px-6 py-1 text-lg text-terciary ring-1 ring-transparent transition hover:text-terciary-dark focus:outline-none hidden md:block focus-visible:ring-[#FF2D20] uppercase"
               >
                   Catálogo
               </Link>}
               imageUrl={imageUrl}>

            <Head title={`Vinilo ${nombre}`} />
            <div className="absolute top-[-250px] left-0 w-full text-center py-8 hidden md:block">
                <h1 className="text-xl md:text-8xl text-terciary font-bold uppercase">
                    <a href="/" title="Ir a catálogo">Colección</a> > {nombre}
                </h1>
            </div>

            <div className="flex justify-center">
                {acabados.length > 0 ? (
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        {acabados.map((acabado, index) => (
                            <div key={acabado.id}  className="mb-8 lg:mb-4">
                                <a href={`/acabado/${acabado.id}/${nombre}/${acabado.nombre}`}>
                                <img
                                    src={`/storage/${acabadoData[acabado.id] ? acabadoData[acabado.id].imagen : '/images/acabados/empty.jpg'}`}
                                    alt={`Imagen ${acabado.nombre}`}
                                    className={``}
                                />
                                <div className="text-overlay">{acabado.nombre}</div>
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <img src="/storage/images/acabados/empty.jpg" alt="No hay imágen"/>
                )}
            </div>
        </Guest>
    );
}
