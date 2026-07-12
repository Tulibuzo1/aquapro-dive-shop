import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'

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

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError('Email o contraseña incorrectos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión | AquaPro Dive Shop</title>
        <meta name="description" content="Inicia sesión en tu cuenta de AquaPro Dive Shop" />
      </Helmet>
      <FormWrapper>
        <Title>Iniciar Sesión</Title>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <FaEnvelope />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </InputGroup>
          <InputGroup>
            <FaLock />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </InputGroup>
          <SubmitButton type="submit" disabled={loading}>
            <FaSignInAlt /> {loading ? 'Ingresando...' : 'Ingresar'}
          </SubmitButton>
        </form>
        <p className="text-center mt-3">
          ¿No tenés cuenta? <Link to="/registro">Registrate aquí</Link>
        </p>
      </FormWrapper>
    </>
  )
}

export default LoginPage
