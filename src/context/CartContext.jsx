/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
const CartContext = createContext()
export const useCart = () => useContext(CartContext)

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (producto) => {
    setCartItems(prev => {
      const existente = prev.find(item => item.id === producto.id)
      if (existente) {
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id))
  const clearCart = () => setCartItems([])
  const totalItems = cartItems.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider