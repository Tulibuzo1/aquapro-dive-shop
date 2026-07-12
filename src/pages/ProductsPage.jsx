import { Helmet } from 'react-helmet-async'
import ItemListContainer from '../components/ItemListContainer/ItemListContainer'
import ContactForm from '../components/ContactForm/ContactForm'

const ProductsPage = () => (
  <>
    <Helmet>
      <title>Productos | AquaPro Dive Shop</title>
      <meta name="description" content="Explorá nuestro catálogo completo de equipos de buceo: máscaras, aletas, trajes, computadoras y reguladores." />
    </Helmet>
    <ItemListContainer />
    <ContactForm />
  </>
)

export default ProductsPage
