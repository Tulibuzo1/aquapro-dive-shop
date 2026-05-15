import { Link } from 'react-router-dom'
const HomePage = () => (
  <div className="text-center">
    <h2>Bienvenido a AquaPro Dive Shop</h2>
    <p className="lead">Descubre la mejor selección de equipos de buceo para profesionales y aficionados.</p>
    <Link to="/productos" className="btn btn-primary btn-lg">Ver productos</Link>
  </div>
)
export default HomePage