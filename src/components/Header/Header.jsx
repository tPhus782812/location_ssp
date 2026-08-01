import "./Header.css";
import { FaBars } from "react-icons/fa";

function Header({ onMenuClick }) {

    return (

        <header className="header">

            <button
                className="menu-btn"
                onClick={onMenuClick}
                aria-label="Open menu"
            >
                <FaBars />
            </button>

            <div className="header-right">

                <div className="user-name">
                    👤 Lê Thanh Phú
                </div>

            </div>

        </header>

    );

}

export default Header;