import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const PaginationWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  margin: 2.5rem 0;
  flex-wrap: wrap;
`

const PageButton = styled.button`
  padding: 0.5rem 0.9rem;
  border: 1.5px solid ${props => props.$active ? 'var(--accent, #0077b6)' : 'var(--border, #d4dde6)'};
  border-radius: var(--radius-sm);
  background: ${({ $active }) => ($active ? 'linear-gradient(135deg, #0077b6, #00b4d8)' : 'var(--bg-card, #fff)')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--text-h, #0c2d48)')};
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${({ $active }) => ($active ? '0 2px 10px rgba(0, 119, 182, 0.3)' : 'none')};

  &:hover:not(:disabled) {
    border-color: var(--accent, #0077b6);
    background: linear-gradient(135deg, #0077b6, #00b4d8);
    color: #fff;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`

const NavButton = styled(PageButton)`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <PaginationWrapper>
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft /> Anterior
      </NavButton>
      {getPages().map(page => (
        <PageButton
          key={page}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente <FaChevronRight />
      </NavButton>
    </PaginationWrapper>
  )
}

export default Pagination
