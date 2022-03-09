import { Link } from 'react-router-dom'
import { useContext } from 'react'

import Logo from '../../assets/img/logo.png'

import styles from './Navbar.module.css'

/* Context */
import { Context } from '../../context/UserContext'

function Navbar() {

  const { authenticated, logout } = useContext(Context)
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get a Gift" />
        <h2>Get a Gift</h2>
      </div>
      <ul>
        <li>
          <>
            <Link to="/">Acquire</Link>
          </>
          </li>
          {/* exemplo do código abaixo: { auth ? () : () } */}
        {authenticated ? 
          (
            <>
              <li>
                <Link to="/thg/myacquire">My Acquisitions</Link>
              </li>
              <li>
                <Link to="/thg/mythgs">Things</Link>
              </li>
              <li>
                <Link to="/user/profile">Profile</Link>
              </li>
              <li onClick={logout}>Exit</li> 
            </>
          ) : 
          (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>        
            </>
          )
        }
      </ul>
    </nav>
  )
}

export default Navbar