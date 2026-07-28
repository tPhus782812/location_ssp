import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./MainLayout.css";

function MainLayout({ children }) {
    return (
        <div className="layout">

            <Sidebar />

            <div className="content">

                <Header />

                <main className="page">

                    {children}

                </main>

            </div>

        </div>
    );
}

export default MainLayout;