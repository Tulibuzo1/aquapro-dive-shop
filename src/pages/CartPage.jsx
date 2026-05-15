import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4">
        <h3>Tu carrito está vacío</h3>
        <Link to="/productos" className="btn btn-primary rounded-pill shadow-sm">Ir a comprar</Link>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h2>Carrito de compras</h2>
      <ul className="list-group mb-3">
        {cartItems.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.nombre}</h5>
              <p>${item.precio} x {item.cantidad} = ${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
            <button className="btn btn-danger btn-sm rounded-pill" onClick={() => removeFromCart(item.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button className="btn btn-warning rounded-pill shadow-sm me-2" onClick={clearCart}>Vaciar carrito</button>
      <Link to="/productos" className="btn btn-secondary rounded-pill shadow-sm">Seguir comprando</Link>
    </div>
  )
}

export default CartPage
