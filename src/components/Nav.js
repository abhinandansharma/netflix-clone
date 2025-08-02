import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./Nav.css";

const sections = ["home", "originals", "trending", "toprated", "action", "comedy", "horror"];

const Nav = () => {
    const [show, setShow] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 50);

            let currentSection = "home";
            for (let id of sections) {
                const element = document.getElementById(id);
                if (element) {
                    const offsetTop = element.offsetTop - 150;
                    if (window.scrollY >= offsetTop) {
                        currentSection = id;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <div className="nav-left">
                <img
                    alt="Netflix logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                    className="nav__logo"
                />
            </div>

            <div className="nav-right">
                <div className="nav-container">
                    {sections.map((id) => (
                        <span
                            key={id}
                            className={`nav-item ${activeSection === id ? "active" : ""}`}
                            onClick={() => scrollToSection(id)}
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </span>
                    ))}
                </div>

                <div className="nav-icons">
                    <SearchIcon className="nav-icon" />
                    <NotificationsIcon className="nav-icon" />
                </div>

                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <CloseIcon className="nav-icon" /> : <MenuIcon className="nav-icon" />}
                </div>
            </div>

            {menuOpen && (
                <div className="mobile-nav">
                    {sections.map((id) => (
                        <span
                            key={id}
                            className={`nav-item ${activeSection === id ? "active" : ""}`}
                            onClick={() => scrollToSection(id)}
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </span>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Nav;