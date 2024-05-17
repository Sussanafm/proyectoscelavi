import HeaderLayout from "@/Layouts/Admin/HeaderLayour.jsx";
import NavLayout from "@/Layouts/Admin/NavLayout.jsx";
import MainLayout from "@/Layouts/Admin/MainLayout.jsx";
import FooterLayout from "@/Layouts/Admin/FooterLayout.jsx";

export default function Authenticated({ user, header, children }) {

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <NavLayout user={user} />

            {header && (
                <HeaderLayout header={header} />
            )}

            <MainLayout>
                {children}
            </MainLayout>
            <FooterLayout />
        </div>
    );
}
