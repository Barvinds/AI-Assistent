import React, { useState } from 'react';
import './Nav.css';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { IoGameController } from "react-icons/io5";
import { TbListSearch } from "react-icons/tb";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";

const Nav = ({ onLoginClick }) => {
    const location = useLocation();

    return (
        <nav className="nav containers fixed-top">
            <Link to="/" className="nav__logo"><FaUserDoctor size="2em" />DR.GRANDMA</Link>

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
                            <span className="nav__name">Medicine</span>
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

            <div className="nav__img-container" onClick={onLoginClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkN9BY5gyMxjAxe5I3SbK0L_EJf8t-TtE4fJwH_JpMKQ&s" alt="" width="35px" height="35px" />
            </div>
        </nav>
    );
}

export default Nav;
