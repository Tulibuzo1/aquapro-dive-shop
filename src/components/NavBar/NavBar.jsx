import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import CartWidget from '../CartWidget/CartWidget'
import styled from 'styled-components'
import { FaHome, FaBox, FaPlus, FaUsers, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaEnvelope } from 'react-icons/fa'

const Nav = styled.nav`
  background: linear-gradient(180deg, #0a1628 0%, #0f2035 100%) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border-bottom: 2px solid rgba(0, 180, 216, 0.15);
`

const Brand = styled(Link)`
  font-weight: 800;
  font-size: 1.35rem;
  color: #fff !important;
  text-decoration: none;
  letter-spacing: -0.3px;

  &:hover {
    text-decoration: none;
    color: #48cae4 !important;
  }
`

const NavIcon = styled.span`
  margin-right: 0.4rem;
  display: inline-flex;
  vertical-align: middle;
  opacity: 0.85;
`

const NavBar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const handleContactClick = (e) => {
    e.preventDefault()
    if (isHome) {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#contacto')
    }
  }

  return (
    <Nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Brand to="/">AquaPro</Brand>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/"><NavIcon><FaHome /></NavIcon>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos"><NavIcon><FaBox /></NavIcon>Productos</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto" onClick={handleContactClick}><NavIcon><FaEnvelope /></NavIcon>Contacto</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros"><NavIcon><FaUsers /></NavIcon>Nosotros</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/nuevo-producto"><NavIcon><FaPlus /></NavIcon>Nuevo Producto</Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <CartWidget />
            {user ? (
              <>
                <span className="text-info small d-none d-lg-inline fw-semibold">
                  {user.displayName || user.email}
                </span>
                <button className="btn btn-sm rounded-pill" style={{ border: '1.5px solid #48cae4', color: '#48cae4', background: 'transparent' }} onClick={logout}>
                  <FaSignOutAlt className="me-1" />Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm rounded-pill" style={{ border: '1.5px solid #48cae4', color: '#48cae4', background: 'transparent' }}>
                  <FaSignInAlt className="me-1" />Ingresar
                </Link>
                <Link to="/registro" className="btn btn-sm rounded-pill" style={{ background: '#00b4d8', color: '#fff', border: 'none' }}>
                  <FaUserPlus className="me-1" />Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Nav>
  )
}

export default NavBar
