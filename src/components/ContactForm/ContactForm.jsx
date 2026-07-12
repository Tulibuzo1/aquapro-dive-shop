import { useState } from 'react'
import styled from 'styled-components'
import { FaPaperPlane, FaCheck, FaUser, FaEnvelope, FaCommentDots, FaExclamationTriangle } from 'react-icons/fa'

const FORMSPREE_ID = 'xqevgyjp'

const FormWrapper = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: var(--bg-card, #fff);
  border-radius: var(--radius);
  border: 1px solid var(--border, #d4dde6);
  box-shadow: var(--shadow-md);
`

const Title = styled.h3`
  font-weight: 800;
  color: var(--text-h, #0c2d48);
  margin-bottom: 1.5rem;
  letter-spacing: -0.3px;
`

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;

  svg {
    position: absolute;
    left: 14px;
    top: 14px;
    color: #8a9bb5;
    font-size: 0.85rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.7rem 0.7rem 0.7rem 2.6rem;
    border: 1.5px solid ${props => props.$error ? '#e63946' : 'var(--border, #d4dde6)'};
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    background: var(--bg, #f0f4f8);
    color: var(--text-h, #0c2d48);
    box-sizing: border-box;
    transition: all 0.25s ease;

    &:focus {
      outline: none;
      border-color: var(--accent, #0077b6);
      background: var(--bg-card, #fff);
      box-shadow: 0 0 0 3px var(--accent-bg);
    }

    &::placeholder {
      color: #8a9bb5;
    }
  }

  textarea {
    min-height: 110px;
    resize: vertical;
  }
`

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.8rem;
  border: none;
  border-radius: var(--radius-pill);
  background: linear-gradient(135deg, #0077b6, #00b4d8);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 12px rgba(0, 119, 182, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 18px rgba(0, 119, 182, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const SuccessAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, rgba(46, 196, 182, 0.1), rgba(46, 196, 182, 0.05));
  color: #0f5132;
  border: 1.5px solid rgba(46, 196, 182, 0.3);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 0.92rem;
`

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(230, 57, 70, 0.08);
  color: #e63946;
  border: 1.5px solid rgba(230, 57, 70, 0.2);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 0.92rem;
`

const ContactForm = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          mensaje: formData.mensaje
        })
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ nombre: '', email: '', mensaje: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <FormWrapper>
      <Title>Contacto</Title>
      {status === 'success' && (
        <SuccessAlert><FaCheck /> ¡Gracias por contactarnos! En breve responderemos tu consulta.</SuccessAlert>
      )}
      {status === 'error' && (
        <ErrorAlert><FaExclamationTriangle /> Error al enviar. Intentá de nuevo.</ErrorAlert>
      )}
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <FaUser />
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <FaEnvelope />
          <input
            type="email"
            name="email"
            placeholder="Tu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <FaCommentDots />
          <textarea
            name="mensaje"
            placeholder="Tu mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <SubmitButton type="submit" disabled={status === 'sending'}>
          <FaPaperPlane /> {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </SubmitButton>
      </form>
    </FormWrapper>
  )
}

export default ContactForm
