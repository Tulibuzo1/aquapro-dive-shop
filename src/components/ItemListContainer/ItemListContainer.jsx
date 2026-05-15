import { useProducts } from '../../context/ProductContext'
import Item from '../Item/Item'

const ItemListContainer = () => {
  const { products } = useProducts()

  return (
    <div className="container">
      <h2 className="my-4">Catálogo de productos</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map(prod => (
          <Item key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  )
}

export default ItemListContainer
