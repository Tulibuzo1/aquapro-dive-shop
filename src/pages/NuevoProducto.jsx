import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'

const NuevoProducto = () => {
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '', imagen: '' })
  const { addProduct } = useProducts()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      nombre: form.nombre,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      imagen: form.imagen || 'https://picsum.photos/200?random=' + Date.now(),
      categoria: 'nuevo',
      descripcion: 'Producto añadido manualmente'
    }
    addProduct(newProduct)
    setForm({ nombre: '', precio: '', stock: '', imagen: '' })
    navigate('/productos')
  }

  return (
    <div className="container mt-4">
      <h2>Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" step="0.01" name="precio" className="form-control" value={form.precio} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input type="number" name="stock" className="form-control" value={form.stock} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen (URL)</label>
          <input type="url" name="imagen" className="form-control" value={form.imagen} onChange={handleChange} placeholder="https://..." />
          <small className="text-muted">Si no pones imagen, se usará una aleatoria.</small>
        </div>
        <button type="submit" className="btn btn-primary rounded-pill shadow-sm px-4">Agregar producto</button>
      </form>
    </div>
  )
}

export default NuevoProducto
