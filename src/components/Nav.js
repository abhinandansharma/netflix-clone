import React,{useState,useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./Nav.css";

const Nav= ()=> {
    const [show, handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", () =>{
            if(window.scrollY > 50){
                handleShow(true);
            }else{
                handleShow(false);
            }
            
        });
        return () => {
            window.removeEventListener("scroll",()=>{})
        }
    }, [])
    
    return (
        <nav className={`nav ${show && "nav__black"}`}>
            {/* left side of the nav bar */}
            <img
                alt="Netflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                className="nav__logo"
            />
            <div className="nav-container">
                <h4 id="activeCategory">Home</h4>
                <h4 className="category">TV Shows</h4>
                <h4 className="category">Movies</h4>
                <h4 className="category">Recently Added</h4>
                <h4 className="category">My List</h4>
            </div>
            {/* right side of the nav bar */}
            <div className="navIcon-container">
                <SearchIcon className="navIcon"/>
                <NotificationsIcon className="navIcon"/>
            </div>
            <img
                alt="User logged"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                className="nav__avatar"
            />
        </nav>
    )
}

export default Nav;