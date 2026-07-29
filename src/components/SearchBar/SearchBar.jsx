import "./Sidebar.css";
import {
    FaHome,
    FaSearch,
    FaBoxes,
    FaTruckLoading,
    FaWarehouse,
    FaCog,
    FaDatabase,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar({ open, onClose }) {

    return (

        <aside
            className={
                open
                    ? "sidebar open"
                    : "sidebar"
            }
        >

            <div className="sidebar-logo">

                <h2>⚡</h2>

                <p>SUPERSPORTS</p>

            </div>

            <NavLink to="/" onClick={onClose}>
                <FaHome />
                <span>Dashboard</span>
            </NavLink>

            <NavLink to="/finder" onClick={onClose}>
                <FaSearch />
                <span>Product Finder</span>
            </NavLink>

            <NavLink to="/shipment" onClick={onClose}>
                <FaBoxes />
                <span>Shipment</span>
            </NavLink>

            <NavLink to="/putaway" onClick={onClose}>
                <FaTruckLoading />
                <span>Put Away</span>
            </NavLink>

            <NavLink to="/inventory" onClick={onClose}>
                <FaWarehouse />
                <span>Inventory</span>
            </NavLink>

            <NavLink to="/settings" onClick={onClose}>
                <FaCog />
                <span>Settings</span>
            </NavLink>

            <NavLink to="/data-center" onClick={onClose}>
                <FaDatabase />
                <span>Database</span>
            </NavLink>

        </aside>

    );

}

export default Sidebar;