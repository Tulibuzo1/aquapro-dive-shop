import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductContext'
import { Helmet } from 'react-helmet-async'
import Spinner from '../components/Spinner/Spinner'
import styled from 'styled-components'
import { FaShoppingCart, FaArrowLeft, FaCheck } from 'react-icons/fa'

const DetailWrapper = styled.div`
  margin-top: 1rem;
`

const BackButton = styled.button`
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

  &:hover {
    border-color: var(--accent, #0077b6);
    color: var(--accent, #0077b6);
  }
`

const ImageCard = styled.div`
  background: var(--bg-card, #fff);
  border-radius: var(--radius);
  border: 1px solid var(--border, #d4dde6);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
`

const ProductImage = styled.img`
  width: 100%;
  max-height: 380px;
  object-fit: contain;
`

const ProductName = styled.h2`
  font-weight: 800;
  color: var(--text-h, #0c2d48);
  letter-spacing: -0.3px;
`

const ProductPrice = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent, #0077b6);
  margin-bottom: 0.5rem;
`

const CategoryBadge = styled.span`
  display: inline-block;
  background: var(--accent-bg);
  color: var(--accent, #0077b6);
  padding: 0.25rem 0.8rem;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
`

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.8rem;
  background: linear-gradient(135deg, #0077b6, #00b4d8);
  color: #fff;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(0, 119, 182, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 119, 182, 0.4);
  }
`

const SuccessMessage = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem;
  background: linear-gradient(135deg, rgba(46, 196, 182, 0.12), rgba(46, 196, 182, 0.05));
  color: #0f5132;
  border: 1.5px solid rgba(46, 196, 182, 0.3);
  border-radius: var(--radius-sm);
  margin-top: 1rem;
  font-weight: 600;
  font-size: 0.92rem;
`

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { products, loading } = useProducts()
  const [addedKey, setAddedKey] = useState(0)

  const producto = products.find(p => p.id === id || String(p.id) === String(id))

  if (loading) return <Spinner text="Cargando producto..." />
  if (!producto) return <div className="container mt-4"><p>Producto no encontrado.</p></div>

  const handleAdd = () => {
    addToCart(producto)
    setAddedKey(prev => prev + 1)
  }

  return (
    <>
      <Helmet>
        <title>{producto.nombre} | AquaPro Dive Shop</title>
        <meta name="description" content={producto.descripcion || `Compra ${producto.nombre} en AquaPro Dive Shop`} />
      </Helmet>
      <DetailWrapper>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </BackButton>
        <div className="row">
          <div className="col-md-6 mb-4">
            <ImageCard>
              <ProductImage src={producto.imagen} alt={producto.nombre} />
            </ImageCard>
          </div>
          <div className="col-md-6">
            <ProductName>{producto.nombre}</ProductName>
            {producto.categoria && <CategoryBadge>{producto.categoria}</CategoryBadge>}
            <ProductPrice>USD ${producto.precio}</ProductPrice>
            <p style={{ color: 'var(--text)', lineHeight: '1.7', fontSize: '1.02rem' }}>{producto.descripcion}</p>
            <AddButton onClick={handleAdd}>
              <FaShoppingCart /> Agregar al carrito
            </AddButton>
            {addedKey > 0 && (
              <SuccessMessage key={addedKey}>
                <FaCheck /> ¡Agregado al carrito!
              </SuccessMessage>
            )}
          </div>
        </div>
      </DetailWrapper>
    </>
  )
}

export default ProductDetailPage
