import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('/data/productos.json')
      .then(res => res.json())
      .then(data => {
        const prod = data.find(p => p.id === parseInt(id))
        if (prod) setProducto(prod)
      })
  }, [id])

  if (!producto) return <div className="container mt-4">Cargando...</div>
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={producto.imagen} className="img-fluid" alt={producto.nombre} />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p className="lead">${producto.precio}</p>
          <p>{producto.descripcion}</p>
          <button className="btn btn-primary" onClick={() => addToCart(producto)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductDetailPage