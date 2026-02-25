import { useEffect, useRef, useState } from 'react';
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom';
export default function Navbar() {
    let [isOpen , setIsOpen] = useState(false)
    let isHomePage = useLocation().pathname === '/';
    let isLoginPage = useLocation().pathname === '/login';
    let isSignupPage =  useLocation().pathname === '/signup'

    let menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener('mouseout',handleClickOutside)
        return () => {
            document.removeEventListener('mouseout', handleClickOutside)
        }
    }, [])

    useEffect(() =>{
        if(isOpen){
            document.body.style.overflow = "hidden"
        }
        else{
            document.body.style.overflow = ""
        }
    } , [isOpen])
    
    return (
        <div className="navbar-container">
            <div className="nav-links" ref={menuRef}>
                <div className="left">
                    <div id="logo"></div>
                    <h4 className='title'>Smart Split</h4>
                </div>
                <div className='menu-btn' onClick={() => setIsOpen(!isOpen)}>☰ </div>
                {!isLoginPage && !isSignupPage && !isHomePage && (
                <nav className={`right ${isOpen ? "show" : ""}`}>
                    <Link to="/dashboard" >Dashboard</Link>
                    <Link to="/about" >About</Link>
                    <Link to="/contact" >Contact Us</Link>
                    <Link to="/profile">Profile</Link>
                </nav>)}
            </div>
        </div>
    )
}