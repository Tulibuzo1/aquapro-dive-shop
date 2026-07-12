import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { Helmet } from 'react-helmet-async'
import Spinner from '../components/Spinner/Spinner'
import styled from 'styled-components'
import { FaSave, FaArrowLeft, FaImage, FaTag, FaDollarSign, FaBoxes, FaTrash } from 'react-icons/fa'
import ConfirmModal from '../components/ConfirmModal/ConfirmModal'

const FormWrapper = styled.div`
  max-width: 560px;
  margin: 1rem auto;
  padding: 2rem;
  background: var(--bg-card, #fff);
  border-radius: var(--radius);
  border: 1px solid var(--border, #d4dde6);
  box-shadow: var(--shadow-md);
`

const Title = styled.h2`
  font-weight: 800;
  color: var(--text-h, #0c2d48);
  margin-bottom: 1.5rem;
`

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #8a9bb5;
    font-size: 0.85rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.7rem 0.7rem 0.7rem 2.6rem;
    border: 1.5px solid ${props => props.$error ? '#e63946' : 'var(--border, #d4dde6)'};
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    background: var(--bg, #f0f4f8);
    color: var(--text-h, #0c2d48);
    box-sizing: border-box;
    transition: all 0.25s ease;

    &:focus {
      outline: none;
      border-color: var(--accent, #0077b6);
      background: var(--bg-card, #fff);
      box-shadow: 0 0 0 3px var(--accent-bg);
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`

const ErrorText = styled.small`
  color: #e63946;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`

const SubmitButton = styled.button`
  flex: 1;
  min-width: 150px;
  padding: 0.75rem;
  border: none;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #0077b6, #00b4d8);
  color: #fff;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  box-shadow: 0 2px 12px rgba(0, 119, 182, 0.3);

  &:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0, 119, 182, 0.4); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`

const DeleteButton = styled.button`
  padding: 0.75rem 1.2rem;
  border: 1.5px solid #e63946;
  border-radius: var(--radius-sm);
  background: transparent;
  color: #e63946;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.25s ease;

  &:hover {
    background: linear-gradient(135deg, #e63946, #ff6b6b);
    color: #fff;
    box-shadow: 0 2px 10px rgba(230, 57, 70, 0.3);
  }
`

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  border: 1.5px solid var(--border, #d4dde6);
  border-radius: var(--radius-pill);
  background: var(--bg-card, #fff);
  color: var(--text, #5a6a7a);
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.25s ease;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: 1.5rem;

  &:hover {
    border-color: var(--accent, #0d6efd);
    color: var(--accent, #0d6efd);
  }
`

const EditarProducto = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, loading, updateProduct, deleteProduct } = useProducts()
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const product = useMemo(
    () => products.find(p => p.id === id || String(p.id) === String(id)),
    [products, id]
  )

  const initialForm = useMemo(() => {
    if (!product) return null
    return {
      nombre: product.nombre || '',
      precio: product.precio || '',
      stock: product.stock || '',
      imagen: product.imagen || '',
      categoria: product.categoria || '',
      descripcion: product.descripcion || ''
    }
  }, [product])

  const [form, setForm] = useState(null)

  // Sync form with initialForm when product loads
  const currentForm = form || initialForm

  const handleChange = (e) => {
    setForm({ ...(currentForm || {}), [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    if (!currentForm) return false
    const newErrors = {}
    if (!currentForm.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.'
    if (!currentForm.precio || parseFloat(currentForm.precio) <= 0) newErrors.precio = 'El precio debe ser mayor a 0.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const updates = {
      nombre: currentForm.nombre.trim(),
      precio: parseFloat(currentForm.precio),
      stock: parseInt(currentForm.stock) || 0,
      imagen: currentForm.imagen,
      categoria: currentForm.categoria,
      descripcion: currentForm.descripcion
    }

    const result = await updateProduct(id, updates)
    setSubmitting(false)

    if (result.success) {
      navigate('/productos')
    } else {
      setErrors({ submit: result.error })
    }
  }

  const handleDelete = async () => {
    setShowModal(false)
    const result = await deleteProduct(id)
    if (result.success) {
      navigate('/productos')
    } else {
      setErrors({ submit: result.error })
    }
  }

  if (loading) return <Spinner text="Cargando producto..." />
  if (!currentForm) return <div className="container mt-4"><p>Producto no encontrado.</p></div>

  return (
    <>
      <Helmet>
        <title>Editar {currentForm.nombre} | AquaPro Dive Shop</title>
      </Helmet>
      <FormWrapper>
        <BackLink onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </BackLink>
        <Title>Editar producto</Title>
        {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
        <form onSubmit={handleSubmit}>
          <InputGroup $error={errors.nombre}>
            <FaTag />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del producto"
              value={currentForm.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <ErrorText>{errors.nombre}</ErrorText>}
          </InputGroup>
          <InputGroup $error={errors.precio}>
            <FaDollarSign />
            <input
              type="number"
              step="0.01"
              name="precio"
              placeholder="Precio"
              value={currentForm.precio}
              onChange={handleChange}
            />
            {errors.precio && <ErrorText>{errors.precio}</ErrorText>}
          </InputGroup>
          <InputGroup>
            <FaBoxes />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={currentForm.stock}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <FaTag />
            <input
              type="text"
              name="categoria"
              placeholder="Categoría"
              value={currentForm.categoria}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <FaImage />
            <input
              type="url"
              name="imagen"
              placeholder="URL de imagen"
              value={currentForm.imagen}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <FaTag />
            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={currentForm.descripcion}
              onChange={handleChange}
            />
          </InputGroup>
          <ButtonRow>
            <SubmitButton type="submit" disabled={submitting}>
              <FaSave /> {submitting ? 'Guardando...' : 'Guardar cambios'}
            </SubmitButton>
            <DeleteButton type="button" onClick={() => setShowModal(true)}>
              <FaTrash /> Eliminar
            </DeleteButton>
          </ButtonRow>
        </form>
      </FormWrapper>

      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Eliminar producto"
        message={`¿Estás seguro de que deseas eliminar "${currentForm.nombre}"? Esta acción no se puede deshacer.`}
      />
    </>
  )
}

export default EditarProducto
