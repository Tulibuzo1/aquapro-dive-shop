import { Link } from 'react-router-dom'

const Item = ({ producto }) => (
  <div className="col">
    <div className="card h-100 shadow-sm d-flex flex-column">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: '200px',
          backgroundColor: '#f8f9fa',
          overflow: 'hidden'
        }}
      >
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            padding: '8px'
          }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">${producto.precio}</p>
        <Link
          to={`/producto/${producto.id}`}
          className="btn btn-outline-primary rounded-pill shadow-sm mt-auto"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  </div>
)

export default Item
