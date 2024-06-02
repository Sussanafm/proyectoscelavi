import {Link} from "@inertiajs/react";

export default function NavLayout({user}) {
    return (
        <nav className="-mx-3 flex flex-1 justify-end">
            {user ? (
                <Link
                    href={route('admin.index')}
                    className="rounded-md px-3 py-2 text-terciary ring-1 ring-transparent transition hover:text-terciary-dark focus:outline-none focus-visible:ring-[#FF2D20]"
                >
                    Panel Administración
                </Link>
            ) : (
                <>
                    <Link
                        href={route('login')}
                        className="rounded-md px-3 py-2 text-terciary ring-1 ring-transparent transition hover:text-terciary-dark focus:outline-none focus-visible:ring-[#FF2D20]"
                    >
                        Iniciar sesión
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-md px-3 py-2 text-terciary ring-1 ring-transparent transition hover:text-terciary-dark focus:outline-none focus-visible:ring-[#FF2D20]"
                    >
                        Registrarse
                    </Link>
                </>
            )}
        </nav>
    )
}
