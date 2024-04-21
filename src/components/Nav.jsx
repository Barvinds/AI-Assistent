import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { TbListSearch } from "react-icons/tb";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";

const Nav = () => {
    return (
        <nav className="nav container fixed-top">
            <Link to="/" className="nav__logo"><FaUserDoctor size="2em" />MR.MARUTHUVAR</Link>

            <div className="nav__menu" id="nav-menu">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to="/" className="nav__link active-link">
                            <AiFillHome />
                            <span className="nav__name">Home</span>
                        </Link>
                    </li>

                    <li className="nav__item">
                        <Link to="/doctors" className="nav__link">
                            <TbListSearch />
                            <span className="nav__name">Doctors</span>
                        </Link>
                    </li>
                        
                    <li className="nav__item">
                        <Link to="/chat" className="nav__link">
                            <HiChatBubbleLeftRight />
                            <span className="nav__name">Chat</span>
                        </Link>
                    </li>    

                    <li className="nav__item">
                        <Link to="/about" className="nav__link">
                            <TbInfoHexagonFilled />
                            <span className="nav__name">About</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <img src="assets/img/perfil.png" alt="" className="nav__img" />
        </nav>
    );
}

export default Nav;
