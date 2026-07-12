import { useEffect } from 'react'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash === '#contacto') {
      setTimeout(() => {
        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location])

  return (
    <>
      <Header />
      <NavBar />
      <main className="container my-4">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
