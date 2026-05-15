import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import NuevoProducto from './pages/NuevoProducto'
import Nosotros from './pages/Nosotros'
import CartProvider from './context/CartContext'
import ProductProvider from './context/ProductContext'

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="productos" element={<ProductsPage />} />
              <Route path="producto/:id" element={<ProductDetailPage />} />
              <Route path="carrito" element={<CartPage />} />
              <Route path="nuevo-producto" element={<NuevoProducto />} />
              <Route path="nosotros" element={<Nosotros />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </CartProvider>
  )
}

export default App
