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

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">

    <h2>⚡</h2>

    <p>SUPERSPORTS</p>

</div>

      <NavLink to="/" end>
        <FaHome />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/finder">
        <FaSearch />
        <span>Product Finder</span>
      </NavLink>

      <NavLink to="/shipment">
        <FaBoxes />
        <span>Shipment</span>
      </NavLink>

      <NavLink to="/putaway">
        <FaTruckLoading />
        <span>Put Away</span>
      </NavLink>

      <NavLink to="/inventory">
        <FaWarehouse />
        <span>Inventory</span>
      </NavLink>

      <NavLink to="/settings">
        <FaCog />
        <span>Settings</span>
      </NavLink>
      <NavLink to="/data-center">
        <FaDatabase />
        <span>Database</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;