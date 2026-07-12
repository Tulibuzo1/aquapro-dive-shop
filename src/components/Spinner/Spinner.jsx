import styled, { keyframes } from 'styled-components'
import { FaWater } from 'react-icons/fa'

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.15); opacity: 1; }
`

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  gap: 1.2rem;
`

const SpinnerIcon = styled(FaWater)`
  font-size: 2.8rem;
  color: var(--accent, #0077b6);
  animation: ${pulse} 1.2s ease-in-out infinite;
`

const SpinnerText = styled.p`
  color: var(--text, #5a6a7a);
  font-size: 0.95rem;
  font-weight: 500;
`

const Spinner = ({ text = 'Cargando...' }) => (
  <SpinnerWrapper>
    <SpinnerIcon />
    <SpinnerText>{text}</SpinnerText>
  </SpinnerWrapper>
)

export default Spinner
