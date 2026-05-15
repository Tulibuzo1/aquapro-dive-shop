import { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

export const useProducts = () => useContext(ProductContext)

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Cargar datos iniciales del JSON
    fetch('/data/productos.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [])

  const addProduct = (newProduct) => {
    // Asignar un ID secuencial simple
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    const productToAdd = { id: newId, ...newProduct }
    setProducts(prev => [...prev, productToAdd])
  }

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
