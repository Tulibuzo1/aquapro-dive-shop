import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styled, { keyframes } from 'styled-components'
import { FaShoppingBag, FaShieldAlt, FaTruck, FaAward, FaEnvelope } from 'react-icons/fa'
import ContactForm from '../components/ContactForm/ContactForm'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const HeroSection = styled.div`
  text-align: center;
  padding: 4rem 1.5rem;
  background: linear-gradient(135deg, #023e8a 0%, #0077b6 50%, #00b4d8 100%);
  border-radius: 20px;
  margin-top: 1rem;
  color: #fff;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.7s ease;

  &::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -40%;
    left: -10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
    border-radius: 50%;
  }
`

const HeroTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }
`

const HeroText = styled.p`
  font-size: 1.2rem;
  max-width: 550px;
  margin: 0 auto 2rem;
  opacity: 0.92;
  line-height: 1.7;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2.2rem;
  background: #fff;
  color: #023e8a;
  text-decoration: none;
  border-radius: var(--radius-pill);
  font-size: 1.05rem;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    color: #023e8a;
  }
`

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2.2rem;
  background: transparent;
  color: #fff;
  text-decoration: none;
  border-radius: var(--radius-pill);
  font-size: 1.05rem;
  font-weight: 700;
  border: 2px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
    color: #fff;
    transform: translateY(-3px);
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
  position: relative;
  z-index: 1;
`

const FeatureCard = styled.div`
  padding: 1.8rem 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius);
  backdrop-filter: blur(8px);
  text-align: center;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-4px);
  }

  h5 {
    color: #fff;
    font-weight: 700;
    margin-bottom: 0.3rem;
  }

  p {
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.88rem;
    margin: 0;
  }
`

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.8rem;

  svg {
    font-size: 1.4rem;
    color: #90e0ef;
  }
`

const ContactSection = styled.div`
  margin-top: 4rem;
  scroll-margin-top: 100px;
`

const HomePage = () => {
  const scrollToContact = (e) => {
    e.preventDefault()
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>AquaPro Dive Shop - Equipamiento de Buceo</title>
        <meta name="description" content="La mejor selección de equipos de buceo para profesionales y aficionados. Máscaras, aletas, trajes y más." />
      </Helmet>
      <HeroSection>
        <HeroTitle>Bienvenido a AquaPro Dive Shop</HeroTitle>
        <HeroText>
          Descubrí la mejor selección de equipos de buceo para profesionales y aficionados.
          Calidad, seguridad y los mejores precios del mercado.
        </HeroText>
        <ButtonRow>
          <CTAButton to="/productos">
            <FaShoppingBag /> Ver productos
          </CTAButton>
          <ContactButton href="#contacto" onClick={scrollToContact}>
            <FaEnvelope /> Contactanos
          </ContactButton>
        </ButtonRow>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon><FaAward /></FeatureIcon>
            <h5>Calidad Premium</h5>
            <p>Solo marcas reconocidas mundialmente</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon><FaTruck /></FeatureIcon>
            <h5>Envío Gratis</h5>
            <p>En compras superiores a $500</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon><FaShieldAlt /></FeatureIcon>
            <h5>Garantía Total</h5>
            <p>Todos nuestros productos con garantía</p>
          </FeatureCard>
        </FeatureGrid>
      </HeroSection>
      <ContactSection id="contacto">
        <ContactForm />
      </ContactSection>
    </>
  )
}

export default HomePage
