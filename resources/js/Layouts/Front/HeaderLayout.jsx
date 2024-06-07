import NavLayout from "@/Layouts/Front/NavLayout.jsx";
import {Link} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function HeaderLayout({user, header}) {

    return(
        <header className="fixed top-0 left-0 items-center flex lg:justify-center gap-2 py-10 bg-secondary bg-opacity-70 w-full z-50">
            <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                <div className="flex lg:justify-center lg:col-start-2 items-center space-x-4">
                    <a href="/">
                        <ApplicationLogo
                            className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"
                        />
                    </a>
                    {header}
                    <NavLayout user={user} />
                </div>
            </div>
        </header>

    );
}
