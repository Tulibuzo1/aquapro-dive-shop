const team = [
  { nombre: 'Marina Coral', rol: 'CEO & Buzo profesional', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200' },
  { nombre: 'Lucas Nadal', rol: 'Instructor PADI', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { nombre: 'Elena Arrecife', rol: 'Especialista en equipos', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200' }
]

const Nosotros = () => (
  <div className="container mt-4">
    <h2 className="mb-4">Nuestro equipo</h2>
    <p className="lead">Somos un grupo de apasionados del buceo dedicados a ofrecer el mejor equipamiento.</p>
    <div className="row mt-4">
      {team.map((persona, idx) => (
        <div key={idx} className="col-md-4 mb-4">
          <div className="card text-center shadow-sm">
            <img src={persona.img} className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt={persona.nombre} />
            <div className="card-body">
              <h5 className="card-title">{persona.nombre}</h5>
              <p className="text-muted">{persona.rol}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Nosotros
