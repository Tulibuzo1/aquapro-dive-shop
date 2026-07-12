import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

const SearchWrapper = styled.div`
  position: relative;
  max-width: 440px;
  margin: 0 auto 2rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.8rem;
  border: 2px solid var(--border, #d4dde6);
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  background: var(--bg-card, #fff);
  color: var(--text-h, #0c2d48);
  transition: all 0.25s ease;
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
    border-color: var(--accent, #0077b6);
    box-shadow: 0 0 0 3px var(--accent-bg), var(--shadow-md);
  }

  &::placeholder {
    color: #8a9bb5;
  }
`

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8a9bb5;
  font-size: 0.9rem;
  pointer-events: none;
`

const SearchBar = ({ value, onChange, placeholder = 'Buscar productos...' }) => (
  <SearchWrapper>
    <SearchIcon />
    <SearchInput
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </SearchWrapper>
)

export default SearchBar
