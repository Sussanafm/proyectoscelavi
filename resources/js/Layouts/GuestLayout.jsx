import HeaderLayout from "@/Layouts/Front/HeaderLayout.jsx";
import MainLayout from "@/Layouts/Front/MainLayout.jsx";
import FooterLayout from "@/Layouts/Front/FooterLayout.jsx";

export default function Guest({ user, laravelVersion, phpVersion, header, children, imageUrl }) {
    console.log(imageUrl);

    return (
        <>
            <div className="bg-primary-light text-black/50 dark:bg-black dark:text-white/50 relative">
                <img
                    id="background"
                    src={imageUrl}
                    alt="Imagen de suelo vinilo SENSATION de Scelavi"
                />
                <div className="min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white relative z-10">
                    <HeaderLayout user={user} header={header} />
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <MainLayout>
                            {children}
                        </MainLayout>
                    </div>
                    <FooterLayout laravelVersion={laravelVersion} phpVersion={phpVersion}/>
                </div>
            </div>

        </>
    );
}
