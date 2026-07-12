import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaEye, FaEdit } from 'react-icons/fa'
import styled from 'styled-components'

const Card = styled.div`
  background: var(--bg-card, #fff);
  border-radius: var(--radius, 14px);
  overflow: hidden;
  border: 1px solid var(--border, #d4dde6);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-border);
  }
`

const ImageWrapper = styled.div`
  height: 210px;
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-light));
    opacity: 0;
    transition: opacity 0.3s;
  }

  ${Card}:hover &::after {
    opacity: 1;
  }
`

const ProductImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const CardBody = styled.div`
  padding: 1.1rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const ProductName = styled.h5`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.35rem;
  color: var(--text-h, #0c2d48);
  line-height: 1.35;
`

const ProductPrice = styled.p`
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--accent, #0077b6);
  margin-bottom: 0.5rem;
`

const CategoryBadge = styled.span`
  display: inline-block;
  background: var(--accent-bg);
  color: var(--accent, #0077b6);
  padding: 0.2rem 0.7rem;
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
  width: fit-content;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`

const DetailLink = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.5rem;
  border: none;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
  color: #fff;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0, 119, 182, 0.25);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(0, 119, 182, 0.35);
    color: #fff;
  }
`

const EditLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.65rem;
  border: 1.5px solid var(--border, #d4dde6);
  border-radius: var(--radius-sm);
  color: var(--text, #5a6a7a);
  text-decoration: none;
  font-size: 0.88rem;
  background: var(--bg-card, #fff);
  transition: all 0.25s ease;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-bg);
  }
`

const Item = ({ producto }) => {
  const { user } = useAuth()

  return (
    <div className="col">
      <Card>
        <ImageWrapper>
          <ProductImage src={producto.imagen} alt={producto.nombre} />
        </ImageWrapper>
        <CardBody>
          <ProductName>{producto.nombre}</ProductName>
          {producto.categoria && <CategoryBadge>{producto.categoria}</CategoryBadge>}
          <ProductPrice>USD ${producto.precio}</ProductPrice>
          <ButtonGroup>
            <DetailLink to={`/producto/${producto.id}`}>
              <FaEye /> Ver detalle
            </DetailLink>
            {user && (
              <EditLink to={`/editar-producto/${producto.id}`}>
                <FaEdit />
              </EditLink>
            )}
          </ButtonGroup>
        </CardBody>
      </Card>
    </div>
  )
}

export default Item
