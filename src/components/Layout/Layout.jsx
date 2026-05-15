import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => (
  <>
    <Header />
    <NavBar />
    <main className="container my-4">
      <Outlet />
    </main>
    <Footer />
  </>
)
export default Layout