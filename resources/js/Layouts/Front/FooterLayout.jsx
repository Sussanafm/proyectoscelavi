import {Link} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function FooterLayout({ laravelVersion, phpVersion }){
    return (
        <footer className="py-16 bg-secondary text-sm text-terciary w-full mt-10 flex justify-center items-center">
            <div className="flex items-center">
                <a href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200 mr-4" />
                </a>
                <span className="ml-4 text-terciary">Laravel v{laravelVersion} (PHP v{phpVersion})</span>
            </div>
        </footer>


    )
}
