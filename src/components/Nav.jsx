import React, { useState } from 'react';
import './Nav.css';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { IoGameController } from "react-icons/io5";
import { TbListSearch } from "react-icons/tb";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";

const Nav = () => {
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="nav container fixed-top">
            <Link to="/" className="nav__logo"><FaUserDoctor size="2em" />MR.MARUTHUVAR</Link>

            <div className="nav__menu" id="nav-menu">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to="/" className={`nav__link ${location.pathname === '/' ? 'active-link' : ''}`}>
                            <AiFillHome />
                            <span className="nav__name">Home</span>
                        </Link>
                    </li>

                    <li className="nav__item">
                        <Link to="/doctors" className={`nav__link ${location.pathname === '/doctors' ? 'active-link' : ''}`}>
                            <TbListSearch />
                            <span className="nav__name">Doctors</span>
                        </Link>
                    </li>
                        
                    <li className="nav__item">
                        <Link to="/game" className={`nav__link ${location.pathname === '/game' ? 'active-link' : ''}`}>
                            <IoGameController />
                            <span className="nav__name">Game</span>
                        </Link>
                    </li>    

                    <li className="nav__item">
                        <Link to="/about" className={`nav__link ${location.pathname === '/about' ? 'active-link' : ''}`}>
                            <TbInfoHexagonFilled />
                            <span className="nav__name">About</span>
                        </Link>
                    </li>
                </ul>
            </div>
            
            <div className="nav__img-container" onClick={toggleDropdown}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkN9BY5gyMxjAxe5I3SbK0L_EJf8t-TtE4fJwH_JpMKQ&s" alt="" width="35px" height="35px" />
                {showDropdown && (
                    <div className="dropdown">
                        <button className="logout-button">Login</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Nav;
