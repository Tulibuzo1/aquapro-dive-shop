import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { FaUsers, FaWater } from 'react-icons/fa'

const team = [
  { nombre: 'Marina Coral', rol: 'CEO & Buzo profesional', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200' },
  { nombre: 'Lucas Nadal', rol: 'Instructor PADI', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { nombre: 'Elena Arrecife', rol: 'Especialista en equipos', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200' }
]

const PageTitle = styled.h2`
  font-weight: 800;
  color: var(--text-h, #0c2d48);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  letter-spacing: -0.3px;
`

const TeamCard = styled.div`
  background: var(--bg-card, #fff);
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border, #d4dde6);
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-border);
  }
`

const CardTop = styled.div`
  height: 8px;
  background: linear-gradient(90deg, #023e8a, #0077b6, #00b4d8);
`

const TeamPhoto = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  margin: 1.5rem auto 0;
  border: 4px solid var(--accent-bg);
  box-shadow: 0 4px 14px rgba(0, 119, 182, 0.15);
`

const TeamName = styled.h5`
  font-weight: 700;
  margin-bottom: 0.2rem;
  color: var(--text-h);
`

const TeamRole = styled.p`
  color: var(--accent, #0077b6);
  font-size: 0.88rem;
  font-weight: 500;
`

const Nosotros = () => (
  <>
    <Helmet>
      <title>Nosotros | AquaPro Dive Shop</title>
      <meta name="description" content="Conocé al equipo detrás de AquaPro Dive Shop. Profesionales apasionados por el buceo." />
    </Helmet>
    <div className="container mt-4">
      <PageTitle><FaUsers /> Nuestro equipo</PageTitle>
      <p style={{ color: 'var(--text)', fontSize: '1.05rem', maxWidth: '600px' }}>
        Somos un grupo de apasionados del buceo dedicados a ofrecer el mejor equipamiento.
      </p>
      <div className="row mt-4">
        {team.map((persona, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <TeamCard>
              <CardTop />
              <TeamPhoto src={persona.img} alt={persona.nombre} />
              <div className="card-body">
                <TeamName>{persona.nombre}</TeamName>
                <TeamRole><FaWater style={{ marginRight: '4px', fontSize: '0.8rem' }} />{persona.rol}</TeamRole>
              </div>
            </TeamCard>
          </div>
        ))}
      </div>
    </div>
  </>
)

export default Nosotros
