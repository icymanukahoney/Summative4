import {Link} from 'react-router-dom'
import { X } from 'react-bootstrap-icons'

const MobileMenu = ({closeMethod}) => {
    return (
        <>
          <button id='close-nav-menu' onClick={closeMethod}>
            <X />
          </button>
          <ul id='mobile-menu'>
            {/* Mobile Nav Links */}
            <li>
              <Link to='/' onClick={closeMethod}>HOME</Link>
            </li>
            <li>
              <Link to='/consultants' onClick={closeMethod}>FIND A CONSULTANT</Link>
            </li>
            <li>
              <Link to='/services' onClick={closeMethod}>SERVICES</Link>
            </li>
            <li>
              <Link to='/trainings' onClick={closeMethod}>TRAINING</Link>
            </li>
            <li>
              <Link to='/shop' onClick={closeMethod}>SHOP</Link>
            </li>
            <li>
              <Link to='/contact' onClick={closeMethod}>CONTACT</Link>
            </li>
          </ul>
        </>
      )
    }

export default MobileMenu
