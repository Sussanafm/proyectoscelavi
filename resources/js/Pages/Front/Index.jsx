import {Head, Link} from '@inertiajs/react';
import Guest from "@/Layouts/GuestLayout.jsx";
import SliderComponent from "@/Components/SliderComponent.jsx";

export default function Index({ auth, laravelVersion, phpVersion, imageUrl, imagenes }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const sliderElement = document.getElementById('slider-component');

    console.log(imagenes);
    return (
        <Guest user={auth.user} laravelVersion={laravelVersion} phpVersion={phpVersion}
               header={<Link
                   href="/"
                   className="px-6 py-1 text-lg text-terciary ring-1 ring-transparent transition hover:text-terciary-dark focus:outline-none hidden md:block focus-visible:ring-[#FF2D20] uppercase"
                   >
                   Catálogo
                   </Link>}
               imageUrl={imageUrl}>

            <Head title="Vinilo " />
            <div className="absolute top-[-250px] left-0 w-full text-center py-8 hidden md:block">
                <h1 className="text-xl md:text-8xl text-terciary font-bold uppercase">Colección</h1>
            </div>

            <div className="flex justify-center">
                {imagenes.length > 0 ? (
                    <SliderComponent imagenes={imagenes} />
                ) : (
                    <div className="bg-white mt-40 w-full h-40 flex items-center justify-center">
                        <p className="text-2xl font-medium">EL CATÁLOGO ESTÁ VACÍO</p>
                    </div>
                )}
            </div>
        </Guest>
    );
}
