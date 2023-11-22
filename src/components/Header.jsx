import {useState} from 'react'
// import mobile menu
import MobileMenu from './MobileMenu'
import {Link} from "react-router-dom"
// import List for bootstrap icons
import { List } from 'react-bootstrap-icons'
//import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_BASEURL

const Header = () => {
  //set a state to check if the mobile menu is open or not
  const [menuIsOpen, openMenu] = useState(false);

  const toggleMobileMenu = () => {
      openMenu(!menuIsOpen);
      document.body.classList.toggle('no-scroll');
  }
return (
  <>
   <div id='topnav'>
    <div id='logo'>
    <Link to="/">
         <img src="/assets/Frame 4.png" alt="Colour Me Beautiful Logo" />
    </Link>
    </div>

      {/* Desktop Menu */}
      <ul id='menu'>
          <li>
              <Link to="/">HOME</Link>
          </li>
          <li>
              <Link to="/consultants">FIND A CONSULTANT</Link>
          </li>
          <li>
              <Link to="/services">SERVICES</Link>
          </li>
          <li>
              <Link to="/trainings">TRAINING</Link>
          </li>
          <li>
              <Link to="/shop">SHOP</Link>
          </li>
          <li>
              <Link to="/contact">CONTACT</Link>
          </li>
      </ul>

      {/* Hamburger on desktop */}
      <div id='menu-container'>
          <button id='menu-button' className='show-mobile-menu-button' onClick={toggleMobileMenu}>
              <List id='hamburger-icon'/>
          </button>
      </div>
   </div>

   {/* If menuIsOpen, show the mobile menu */}
   {/* give the mobile menu our close method as a prop */}
   {menuIsOpen && <MobileMenu closeMethod={toggleMobileMenu}/>}
  </>
)
}

export default Header
