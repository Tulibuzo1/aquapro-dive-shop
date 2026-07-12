import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa'

const FormWrapper = styled.div`
  max-width: 440px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--bg-card, #fff);
  border-radius: var(--radius);
  border: 1px solid var(--border, #d4dde6);
  box-shadow: var(--shadow-md);
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-h, #0c2d48);
  font-weight: 800;
`

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #8a9bb5;
    font-size: 0.85rem;
  }

  input {
    width: 100%;
    padding: 0.7rem 0.7rem 0.7rem 2.6rem;
    border: 1.5px solid var(--border, #d4dde6);
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
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #0077b6, #00b4d8);
  color: #fff;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  box-shadow: 0 2px 12px rgba(0, 119, 182, 0.3);

  &:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0, 119, 182, 0.4); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`

const ErrorAlert = styled.div`
  background: rgba(230, 57, 70, 0.08);
  color: #e63946;
  border: 1.5px solid rgba(230, 57, 70, 0.2);
  padding: 0.65rem 1rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
`

const RegisterPage = () => {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) return setError('Las contraseñas no coinciden.')
    if (form.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')

    setLoading(true)
    try {
      await register(form.email, form.password, form.nombre)
      navigate('/')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('Este email ya está registrado.')
      else setError('Error al crear la cuenta. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Registro | AquaPro Dive Shop</title>
        <meta name="description" content="Creá tu cuenta en AquaPro Dive Shop" />
      </Helmet>
      <FormWrapper>
        <Title>Crear Cuenta</Title>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <FaUser />
            <input type="text" name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <FaEnvelope />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <FaLock />
            <input type="password" name="password" placeholder="Contraseña (mín. 6 caracteres)" value={form.password} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <FaLock />
            <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={form.confirmPassword} onChange={handleChange} required />
          </InputGroup>
          <SubmitButton type="submit" disabled={loading}>
            <FaUserPlus /> {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </SubmitButton>
        </form>
        <p className="text-center mt-3">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </FormWrapper>
    </>
  )
}

export default RegisterPage
