import { useState, useMemo } from 'react'
import { useProducts } from '../../context/ProductContext'
import Item from '../Item/Item'
import SearchBar from '../SearchBar/SearchBar'
import Pagination from '../Pagination/Pagination'
import Spinner from '../Spinner/Spinner'
import styled from 'styled-components'
import { FaExclamationTriangle } from 'react-icons/fa'

const ITEMS_PER_PAGE = 6

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text, #6b6375);
  font-size: 1.1rem;
`

const ErrorWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f8d7da;
  border-radius: 12px;
  color: #842029;
`

const ItemListContainer = () => {
  const { products, loading, error } = useProducts()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    if (!search.trim()) return products
    const term = search.toLowerCase()
    return products.filter(p =>
      p.nombre?.toLowerCase().includes(term) ||
      p.categoria?.toLowerCase().includes(term) ||
      p.descripcion?.toLowerCase().includes(term)
    )
  }, [products, search])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSearch = (value) => {
    setSearch(value)
    setCurrentPage(1)
  }

  if (loading) return <Spinner text="Cargando productos..." />
  if (error) return (
    <ErrorWrapper>
      <FaExclamationTriangle size={32} className="mb-2" />
      <p>{error}</p>
    </ErrorWrapper>
  )

  return (
    <div>
      <h2 className="my-4">Catálogo de productos</h2>
      <SearchBar value={search} onChange={handleSearch} />
      {filtered.length === 0 ? (
        <EmptyMessage>
          {search ? `No se encontraron productos para "${search}"` : 'No hay productos disponibles.'}
        </EmptyMessage>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {paginated.map(prod => (
              <Item key={prod.id} producto={prod} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}

export default ItemListContainer
