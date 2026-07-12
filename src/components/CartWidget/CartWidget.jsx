import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'
import styled from 'styled-components'

const CartLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.6rem;
  color: #fff;
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 180, 216, 0.15);
    color: #48cae4;
  }
`

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #e63946 0%, #ff6b6b 100%);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 800;
  min-width: 19px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0 4px;
  box-shadow: 0 2px 6px rgba(230, 57, 70, 0.4);
`

const CartWidget = () => {
  const { totalItems } = useCart()
  return (
    <CartLink to="/carrito">
      <FaShoppingCart size={20} />
      {totalItems > 0 && <Badge>{totalItems}</Badge>}
    </CartLink>
  )
}

export default CartWidget
