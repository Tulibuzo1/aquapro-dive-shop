import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import NuevoProducto from './pages/NuevoProducto'
import EditarProducto from './pages/EditarProducto'
import Nosotros from './pages/Nosotros'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CuponesPage from './pages/CuponesPage'
import CartProvider from './context/CartContext'
import ProductProvider from './context/ProductContext'
import AuthProvider from './context/AuthContext'
import CouponProvider from './context/CouponContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <CouponProvider>
            <ProductProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="productos" element={<ProductsPage />} />
                  <Route path="producto/:id" element={<ProductDetailPage />} />
                  <Route path="carrito" element={<CartPage />} />
                  <Route path="nosotros" element={<Nosotros />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="registro" element={<RegisterPage />} />
                  <Route path="nuevo-producto" element={
                    <ProtectedRoute><NuevoProducto /></ProtectedRoute>
                  } />
                  <Route path="editar-producto/:id" element={
                    <ProtectedRoute><EditarProducto /></ProtectedRoute>
                  } />
                  <Route path="cupones" element={
                    <ProtectedRoute><CuponesPage /></ProtectedRoute>
                  } />
                </Route>
              </Routes>
            </BrowserRouter>
            </ProductProvider>
          </CouponProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
