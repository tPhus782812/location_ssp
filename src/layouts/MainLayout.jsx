import { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./MainLayout.css";

function MainLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="layout">

            <Sidebar
                open={sidebarOpen}
                close={() => setSidebarOpen(false)}
            />

            {
                sidebarOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setSidebarOpen(false)}
                    />
                )
            }

            <div className="content">

                <Header
                    openSidebar={() => setSidebarOpen(true)}
                />

                <main className="page">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default MainLayout;