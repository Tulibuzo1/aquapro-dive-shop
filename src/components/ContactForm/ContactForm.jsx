import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    setEnviado(true)
    setFormData({ nombre: '', email: '', mensaje: '' })
  }

  return (
    <div className="mt-5">
      <h3>Contacto</h3>
      {enviado && <div className="alert alert-success">¡Mensaje enviado con éxito!</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea name="mensaje" className="form-control" value={formData.mensaje} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary rounded-pill shadow-sm px-4">Enviar</button>
      </form>
    </div>
  )
}

export default ContactForm
