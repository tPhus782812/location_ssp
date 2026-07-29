import "./Header.css";
import { FaBars } from "react-icons/fa";

function Header({ openSidebar }) {

    return (

        <header className="header">
            <button

                className="menu-btn"

                onClick={openSidebar}

            >

                <FaBars />

            </button>
            {/* <div>

                <h2>Warehouse Manager Pro</h2>

            </div> */}

            <div className="header-right">

                🔔

                👤 Lê Thanh Phú

            </div>

        </header>

    );

}

export default Header;