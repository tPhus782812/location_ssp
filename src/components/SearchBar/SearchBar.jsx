import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

function SearchBar({

    value,

    onChange

}){

    return(

        <div className="search-container">

            <div className="search-box">

                <FaSearch className="search-icon"/>

                <input

                    className="search-input"

                    value={value}

                    onChange={onChange}

                    placeholder="Search Barcode, Item Number, Search Name..."

                />

            </div>

        </div>

    )

}

export default SearchBar;