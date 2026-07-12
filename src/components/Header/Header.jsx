import styled, { keyframes } from 'styled-components'
import { FaAnchor } from 'react-icons/fa'

const waveAnim = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
`

const HeaderWrapper = styled.header`
  background: linear-gradient(135deg, #023e8a 0%, #0077b6 40%, #00b4d8 100%);
  color: #fff;
  text-align: center;
  padding: 2.5rem 1rem 2rem;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%);
    pointer-events: none;
  }
`

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  margin: 0 0 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.5px;

  svg {
    animation: ${waveAnim} 3s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`

const Tagline = styled.p`
  font-size: 1.15rem;
  opacity: 0.92;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`

const Header = () => (
  <HeaderWrapper>
    <Title>
      <FaAnchor /> AquaPro Dive Shop
    </Title>
    <Tagline>Equipamiento para tus aventuras submarinas</Tagline>
  </HeaderWrapper>
)

export default Header
