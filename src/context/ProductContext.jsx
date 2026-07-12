/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '../config/firebase'

const ProductContext = createContext()
export const useProducts = () => useContext(ProductContext)

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [useLocal, setUseLocal] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const snapshot = await getDocs(collection(db, 'productos'))
        if (!cancelled) {
          const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
          if (items.length > 0) {
            setProducts(items)
          } else {
            const res = await fetch('/data/productos.json')
            const data = await res.json()
            setProducts(data)
            setUseLocal(true)
          }
        }
      } catch (err) {
        console.warn('Firestore no disponible, usando productos locales:', err.message)
        if (!cancelled) {
          try {
            const res = await fetch('/data/productos.json')
            const data = await res.json()
            setProducts(data)
            setUseLocal(true)
          } catch {
            if (!cancelled) setError('Error al cargar los productos.')
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const addProduct = async (newProduct) => {
    if (useLocal) {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
      setProducts(prev => [...prev, { id: newId, ...newProduct }])
      return { success: true }
    }
    try {
      const docRef = await addDoc(collection(db, 'productos'), newProduct)
      setProducts(prev => [...prev, { id: docRef.id, ...newProduct }])
      return { success: true }
    } catch (err) {
      console.error('Error adding product:', err)
      return { success: false, error: 'Error al agregar el producto.' }
    }
  }

  const updateProduct = async (id, updates) => {
    if (useLocal) {
      setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)))
      return { success: true }
    }
    try {
      const productRef = doc(db, 'productos', id)
      await updateDoc(productRef, updates)
      setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)))
      return { success: true }
    } catch (err) {
      console.error('Error updating product:', err)
      return { success: false, error: 'Error al actualizar el producto.' }
    }
  }

  const deleteProduct = async (id) => {
    if (useLocal) {
      setProducts(prev => prev.filter(p => p.id !== id))
      return { success: true }
    }
    try {
      await deleteDoc(doc(db, 'productos', id))
      setProducts(prev => prev.filter(p => p.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting product:', err)
      return { success: false, error: 'Error al eliminar el producto.' }
    }
  }

  return (
    <ProductContext.Provider value={{
      products, loading, error,
      addProduct, updateProduct, deleteProduct,
      refreshProducts: async () => {
        if (useLocal) return
        try {
          const snapshot = await getDocs(collection(db, 'productos'))
          setProducts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
        } catch (err) {
          console.error('Error refreshing products:', err)
        }
      }
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
