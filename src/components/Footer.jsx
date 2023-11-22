import React from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer >
    <div id='footer' className='footer'>
      <div className='footer-links'>
      <ul id='footer-menu'>
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
      </div>
      <Link to="/">
         <img src="/assets/Frame 6.png" alt="Colour Me Beautiful Logo" />
    </Link>
      <div className='footer-bottom'>
        <p>&copy; 2023 Colour Me Beautiful New Zealand | All Rights Reserved | Design By Maria Stromova</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
