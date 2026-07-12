import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { FaTrash, FaShoppingBag, FaArrowLeft, FaCreditCard, FaCheck } from 'react-icons/fa'

const CartTitle = styled.h2`
  font-weight: 800;
  color: var(--text-h, #0c2d48);
  letter-spacing: -0.3px;
`

const EmptyWrapper = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: var(--bg-card, #fff);
  border-radius: var(--radius);
  border: 2px dashed var(--border, #d4dde6);
`

const ItemRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  background: var(--bg-card, #fff);
  border-radius: var(--radius-sm);
  margin-bottom: 0.6rem;
  border: 1px solid var(--border, #d4dde6);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s;
  flex-wrap: wrap;
  gap: 0.5rem;

  &:hover {
    border-color: var(--accent-border);
  }

  @media (max-width: 576px) {
    flex-direction: column;
    text-align: center;
  }
`

const ItemInfo = styled.div`
  flex: 1;
`

const ItemName = styled.h5`
  margin: 0;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-h);
`

const ItemDetail = styled.p`
  margin: 0.2rem 0 0;
  color: var(--text, #5a6a7a);
  font-size: 0.92rem;
`

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.45rem 0.9rem;
  border: none;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #e63946, #ff6b6b);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(230, 57, 70, 0.25);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(230, 57, 70, 0.35);
  }
`

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.5rem;
  background: linear-gradient(135deg, #023e8a, #0077b6);
  border-radius: var(--radius-sm);
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: #fff;
  box-shadow: 0 4px 16px rgba(2, 62, 138, 0.25);
`

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1.3rem;
  border: 1.5px solid ${props => {
    if (props.$variant === 'danger') return '#e63946'
    if (props.$variant === 'primary') return 'transparent'
    return 'var(--border, #d4dde6)'
  }};
  border-radius: var(--radius-pill);
  background: ${props => {
    if (props.$variant === 'danger') return 'linear-gradient(135deg, #e63946, #ff6b6b)'
    if (props.$variant === 'primary') return 'linear-gradient(135deg, #0077b6, #00b4d8)'
    return 'transparent'
  }};
  color: ${props => (props.$variant === 'danger' || props.$variant === 'primary') ? '#fff' : 'var(--text, #5a6a7a)'};
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${props => (props.$variant === 'danger' || props.$variant === 'primary') ? '0 2px 10px rgba(0,0,0,0.15)' : 'none'};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart()
  const [completed, setCompleted] = useState(false)
  const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const handleCheckout = () => {
    clearCart()
    setCompleted(true)
  }

  if (completed || cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>{completed ? '¡Gracias por tu compra! | AquaPro Dive Shop' : 'Carrito vacío | AquaPro Dive Shop'}</title>
          <meta name="description" content={completed ? 'Tu compra en AquaPro Dive Shop fue exitosa.' : 'Tu carrito de AquaPro Dive Shop está vacío. Explorá nuestros productos de buceo.'} />
        </Helmet>
        <EmptyWrapper>
          {completed ? (
            <>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #2ec4b6, #00b4d8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
                <FaCheck size={32} color="#fff" />
              </div>
              <h3 style={{ color: 'var(--text-h)' }}>¡Gracias por tu compra!</h3>
              <p style={{ color: 'var(--text, #5a6a7a)', marginBottom: '1.5rem' }}>En breve recibirás un email con el detalle de tu pedido.</p>
              <Link to="/productos" className="btn rounded-pill" style={{ background: 'linear-gradient(135deg, #0077b6, #00b4d8)', color: '#fff', fontWeight: 600, padding: '0.6rem 1.5rem', border: 'none' }}>
                Seguir comprando
              </Link>
            </>
          ) : (
            <>
              <FaShoppingBag size={52} style={{ color: 'var(--border, #d4dde6)', marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--text-h)' }}>Tu carrito está vacío</h3>
              <p style={{ color: 'var(--text, #5a6a7a)', marginBottom: '1.5rem' }}>Agregá productos para comenzar tu compra.</p>
              <Link to="/productos" className="btn rounded-pill" style={{ background: 'linear-gradient(135deg, #0077b6, #00b4d8)', color: '#fff', fontWeight: 600, padding: '0.6rem 1.5rem', border: 'none' }}>
                <FaArrowLeft className="me-1" /> Ir a comprar
              </Link>
            </>
          )}
        </EmptyWrapper>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Carrito de Compras | AquaPro Dive Shop</title>
        <meta name="description" content="Revisá los productos en tu carrito de compras." />
      </Helmet>
      <CartTitle>Carrito de compras</CartTitle>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map(item => (
          <ItemRow key={item.id}>
            <ItemInfo>
              <ItemName>{item.nombre}</ItemName>
              <ItemDetail>
                USD ${item.precio} x {item.cantidad} = USD ${(item.precio * item.cantidad).toFixed(2)}
              </ItemDetail>
            </ItemInfo>
            <RemoveButton onClick={() => removeFromCart(item.id)}>
              <FaTrash /> Eliminar
            </RemoveButton>
          </ItemRow>
        ))}
      </ul>
      <TotalSection>
        <span>Total:</span>
        <span>USD ${total.toFixed(2)}</span>
      </TotalSection>
      <div className="d-flex gap-2 flex-wrap">
        <ActionButton $variant="danger" onClick={clearCart}>
          <FaTrash /> Vaciar carrito
        </ActionButton>
        <ActionButton as={Link} to="/productos">
          <FaArrowLeft /> Seguir comprando
        </ActionButton>
        <ActionButton $variant="primary" onClick={handleCheckout}>
          <FaCreditCard /> Finalizar compra
        </ActionButton>
      </div>
    </>
  )
}

export default CartPage
