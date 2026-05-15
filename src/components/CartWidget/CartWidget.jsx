import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CartWidget = () => {
  const { totalItems } = useCart()
  return (
    <Link to="/carrito" className="btn btn-outline-light position-relative">
      🛒
      {totalItems > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
export default CartWidget