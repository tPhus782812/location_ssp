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

function Sidebar({ open, close }) {

  return (
    <aside
      className={open ? "sidebar open" : "sidebar"}
    >

      <div className="sidebar-logo">

        <div className="logo">

          <div className="logo-icon">⚡</div>

          <h2>SUPERSPORTS</h2>

          <p>Warehouse Pro</p>

        </div>

      </div>

      <NavLink to="/" end onClick={close}>
        <FaHome />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/finder" onClick={close}>
        <FaSearch />
        <span>Product Finder</span>
      </NavLink>

      <NavLink to="/shipment" onClick={close}>
        <FaBoxes />
        <span>Shipment</span>
      </NavLink>

      <NavLink to="/putaway" onClick={close}>
        <FaTruckLoading />
        <span>Put Away</span>
      </NavLink>

      <NavLink to="/inventory" onClick={close}>
        <FaWarehouse />
        <span>Inventory</span>
      </NavLink>

      <NavLink to="/settings" onClick={close}>
        <FaCog />
        <span>Settings</span>
      </NavLink>

      <NavLink to="/data-center" onClick={close}>
        <FaDatabase />
        <span>Database</span>
      </NavLink>

    </aside>
  );
}

export default Sidebar;