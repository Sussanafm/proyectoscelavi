import {Head, Link, useForm} from '@inertiajs/react';
import Guest from "@/Layouts/GuestLayout.jsx";
import React, {useEffect, useState} from "react";
import SliderInfiniteComponent from "@/Components/SliderInfiniteComponent.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import axios from "axios";

export default function Acabados({ auth, laravelVersion, phpVersion, imageUrl, acabados, coleccion, galeria, monedas }) {

    // API https://api.cambio.today/v1/quotes/EUR/USD/json?quantity=30&key=52653%7COJJsZ7ZRSnbFxGX9shXd
    //const MY_KEY = "52653%7COJJsZ7ZRSnbFxGX9shXd";
    const [moneda, setMoneda] = useState("EUR");
    const [precio, setPrecio] = useState(acabados.precio_m2);

    const {data, setData, post, processing, reset} = useForm({
        cambio: "EUR",
    });

    useEffect(() => {
        setMoneda(data.cambio);
    }, [data.cambio]);

    const options_monedas = monedas.map(cambio => ({value: cambio, label: cambio, key: cambio}));

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setData('cambio', selectedValue);

        //const url = `https://api.cambio.today/v1/quotes/${moneda}/${selectedValue}/json?quantity=${precio}&key=${MY_KEY}`;
        const url = `/proxy/quotes/${moneda}/${selectedValue}?quantity=${precio}`;


        axios.get(url)
            .then((response) => {
                // Convertir la cantidad a un número entero
                const precioRedondeado = Math.round(parseInt(response.data.result.amount));
                setPrecio(precioRedondeado);

            })
            .catch = ((error) => {
            console.error("Error en handleChange")
            console.error(error)
        })
    };

    return (
        <Guest user={auth.user} laravelVersion={laravelVersion} phpVersion={phpVersion}
               header={<Link
                   href="/"
                   className="px-6 py-1 text-lg text-terciary ring-1 ring-transparent transition hover:text-terciary-dark focus:outline-none hidden md:block focus-visible:ring-[#FF2D20] uppercase"
               >
                   Catálogo
               </Link>}
               imageUrl={imageUrl}>

            <Head title={`Vinilo ${coleccion.nombre} ${acabados.nombre} `} />
            <div className="absolute top-[-10px] md:top-[-250px] left-0 w-full text-center py-8">
                <h1 className="sm:text-4xl md:text-8xl text-terciary font-bold uppercase flex items-center justify-center">
                    <a href={`/coleccion/${coleccion.id}/${coleccion.nombre}`} title="Ir a acabados">{coleccion.nombre}</a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-[1em] md:h-[1em] mx-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    {acabados.nombre}
                </h1>
            </div>
            <div className="flex justify-center">
                {galeria.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="col-span-1">
                            <SliderInfiniteComponent imagenes={galeria} />
                        </div>
                        <div className="col-span-1">
                            <h2 className="text-lg md:text-6xl text-secondary font-bold mb-4">Vinilo {coleccion.nombre} {acabados.nombre}</h2>
                            <p className="ml-3 text-lg">Tamaño: {coleccion.formato}</p>
                            <p className="ml-3 text-lg">Tickness: {coleccion.thickness}</p>
                            <p className="ml-3 text-lg">Wear layer: {coleccion.wearlayer}</p>
                            <p className="ml-3 text-lg">PAD typology: {coleccion.typology}</p>
                            <p className="ml-3 text-lg">Total Tickness: {coleccion.total_thickness}</p>
                            <br/>
                            <p className="ml-3 text-lg">Descripción: {acabados.descripcion}</p>
                            <div className="flex items-center">
                                <p className="ml-3 text-lg mr-4">Precio/m2: {precio} </p>
                                <form onSubmit={(e) => e.preventDefault()} action="" method="POST">
                                    <div>
                                        <SelectInput
                                            id="cambio"
                                            name="cambio"
                                            placeholder="..."
                                            options={options_monedas}
                                            className="mt-1 block w-10v bg-primary-light"
                                            isFocused={true}
                                            defaultValue={moneda}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <img src="/storage/images/acabados/empty.jpg" alt="No hay imágenes"/>
                )}
            </div>
        </Guest>
    );
}
