import styled from 'styled-components'
import { FaAnchor, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa'

const FooterWrapper = styled.footer`
  background: linear-gradient(180deg, #0a1628 0%, #060e1a 100%);
  color: #8a9bb5;
  padding: 3rem 0 1.5rem;
  margin-top: auto;
`

const FooterTitle = styled.h5`
  color: #fff;
  font-weight: 800;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const FooterDesc = styled.p`
  max-width: 400px;
  margin: 0 auto;
  font-size: 0.92rem;
  line-height: 1.6;
`

const SocialRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 1.2rem 0;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 180, 216, 0.1);
  color: #48cae4;
  font-size: 1rem;
  transition: all 0.25s ease;
  text-decoration: none;

  &:hover {
    background: var(--accent, #0077b6);
    color: #fff;
    transform: translateY(-2px);
  }
`

const Copyright = styled.div`
  text-align: center;
  padding: 1.2rem 0 0;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.82rem;
  color: #5a6a7a;
`

const Footer = () => (
  <FooterWrapper>
    <div className="container text-center">
      <FooterTitle><FaAnchor /> AquaPro Dive Shop</FooterTitle>
      <FooterDesc>
        Somos líderes en venta de equipos de buceo desde 2010.
        Calidad y seguridad garantizadas para cada inmersión.
      </FooterDesc>
      <SocialRow>
        <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></SocialLink>
        <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></SocialLink>
        <SocialLink href="mailto:contacto@aquaprodiveshop.com"><FaEnvelope /></SocialLink>
      </SocialRow>
      <Copyright>
        © 2026 AquaPro Dive Shop — Todos los derechos reservados.
      </Copyright>
    </div>
  </FooterWrapper>
)

export default Footer
