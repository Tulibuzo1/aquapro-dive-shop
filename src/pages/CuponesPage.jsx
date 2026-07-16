import { useState } from 'react'
import { useCoupons } from '../context/CouponContext'
import { Helmet } from 'react-helmet-async'
import Spinner from '../components/Spinner/Spinner'
import ConfirmModal from '../components/ConfirmModal/ConfirmModal'
import styled from 'styled-components'
import { FaPlus, FaSave, FaTrash, FaEdit, FaTicketAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa'

const PageWrapper = styled.div`
  max-width: 700px;
  margin: 1.5rem auto;
  padding: 0 1rem;
`

const Title = styled.h2`
  font-weight: 800;
  color: var(--text-h, #0c2d48);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FormCard = styled.div`
  background: var(--bg-card, #fff);
  border-radius: var(--radius);
  border: 1px solid var(--border, #d4dde6);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

const FormTitle = styled.h4`
  font-weight: 700;
  color: var(--text-h);
  margin-bottom: 1rem;
  font-size: 1rem;
`

const InputRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  input {
    flex: 1;
    min-width: 120px;
    padding: 0.65rem 0.9rem;
    border: 1.5px solid var(--border, #d4dde6);
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    background: var(--bg, #f0f4f8);
    color: var(--text-h, #0c2d48);
    transition: all 0.25s ease;

    &:focus {
      outline: none;
      border-color: var(--accent, #0077b6);
      background: var(--bg-card, #fff);
      box-shadow: 0 0 0 3px var(--accent-bg);
    }
  }
`

const ErrorText = styled.small`
  color: #e63946;
  font-size: 0.8rem;
  display: block;
  margin-top: -0.5rem;
  margin-bottom: 0.75rem;
`

const SaveButton = styled.button`
  padding: 0.65rem 1.5rem;
  border: none;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #0077b6, #00b4d8);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.25s ease;
  box-shadow: 0 2px 10px rgba(0, 119, 182, 0.3);

  &:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0, 119, 182, 0.4); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`

const CancelButton = styled.button`
  padding: 0.65rem 1.2rem;
  border: 1.5px solid var(--border, #d4dde6);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text, #5a6a7a);
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { border-color: var(--accent, #0077b6); color: var(--accent, #0077b6); }
`

const CouponTable = styled.div`
  background: var(--bg-card, #fff);
  border-radius: var(--radius);
  border: 1px solid var(--border, #d4dde6);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`

const CouponRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid var(--border, #d4dde6);
  gap: 1rem;
  transition: background 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: var(--bg, #f0f4f8); }

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`

const CouponCode = styled.span`
  font-weight: 800;
  font-size: 1rem;
  color: var(--accent, #0077b6);
  min-width: 100px;
  letter-spacing: 0.5px;
`

const CouponPct = styled.span`
  font-weight: 700;
  color: var(--text-h);
  min-width: 50px;
`

const Badge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-pill);
  background: ${props => props.$active ? 'rgba(46,196,182,0.15)' : 'rgba(230,57,70,0.12)'};
  color: ${props => props.$active ? '#2ec4b6' : '#e63946'};
`

const ActionBtn = styled.button`
  padding: 0.4rem 0.7rem;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s;
  background: ${props => {
    if (props.$variant === 'danger') return 'rgba(230,57,70,0.1)'
    if (props.$variant === 'toggle') return 'rgba(46,196,182,0.1)'
    return 'rgba(0,119,182,0.1)'
  }};
  color: ${props => {
    if (props.$variant === 'danger') return '#e63946'
    if (props.$variant === 'toggle') return '#2ec4b6'
    return '#0077b6'
  }};

  &:hover { opacity: 0.8; transform: translateY(-1px); }
`

const EmptyMsg = styled.p`
  text-align: center;
  padding: 2rem;
  color: var(--text, #5a6a7a);
  font-size: 0.95rem;
`

const CuponesPage = () => {
  const { coupons, loading, addCoupon, updateCoupon, deleteCoupon } = useCoupons()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ codigo: '', porcentaje: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const resetForm = () => {
    setForm({ codigo: '', porcentaje: '' })
    setErrors({})
    setEditingId(null)
    setShowForm(false)
  }

  const startEdit = (coupon) => {
    setForm({ codigo: coupon.codigo, porcentaje: coupon.porcentaje })
    setEditingId(coupon.id)
    setShowForm(true)
  }

  const validate = () => {
    const errs = {}
    if (!form.codigo.trim()) errs.codigo = 'El código es obligatorio.'
    if (!form.porcentaje || Number(form.porcentaje) <= 0 || Number(form.porcentaje) > 100) {
      errs.porcentaje = 'El porcentaje debe ser entre 1 y 100.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    let result
    if (editingId) {
      result = await updateCoupon(editingId, {
        codigo: form.codigo.toUpperCase().trim(),
        porcentaje: Number(form.porcentaje)
      })
    } else {
      result = await addCoupon({ ...form, activo: true })
    }
    setSubmitting(false)
    if (result.success) resetForm()
    else setErrors({ submit: result.error })
  }

  const handleDelete = async () => {
    setShowModal(false)
    await deleteCoupon(deleteId)
    setDeleteId(null)
  }

  const toggleActive = async (coupon) => {
    await updateCoupon(coupon.id, { activo: !coupon.activo })
  }

  if (loading) return <Spinner text="Cargando cupones..." />

  return (
    <>
      <Helmet>
        <title>Gestionar Cupones | AquaPro Dive Shop</title>
        <meta name="description" content="Administrar cupones de descuento." />
      </Helmet>
      <PageWrapper>
        <Title><FaTicketAlt /> Cupones de descuento</Title>

        {!showForm && (
          <SaveButton onClick={() => { resetForm(); setShowForm(true) }} style={{ marginBottom: '1.5rem' }}>
            <FaPlus /> Nuevo cupón
          </SaveButton>
        )}

        {showForm && (
          <FormCard>
            <FormTitle>{editingId ? 'Editar cupón' : 'Nuevo cupón'}</FormTitle>
            {errors.submit && <ErrorText>{errors.submit}</ErrorText>}
            <form onSubmit={handleSubmit}>
              <InputRow>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Código (ej: BUCEO10)"
                    value={form.codigo}
                    onChange={e => setForm({ ...form, codigo: e.target.value })}
                    maxLength={20}
                  />
                  {errors.codigo && <ErrorText>{errors.codigo}</ErrorText>}
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    placeholder="Descuento %"
                    min="1"
                    max="100"
                    value={form.porcentaje}
                    onChange={e => setForm({ ...form, porcentaje: e.target.value })}
                  />
                  {errors.porcentaje && <ErrorText>{errors.porcentaje}</ErrorText>}
                </div>
              </InputRow>
              <div className="d-flex gap-2">
                <SaveButton type="submit" disabled={submitting}>
                  <FaSave /> {submitting ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear')}
                </SaveButton>
                <CancelButton type="button" onClick={resetForm}>Cancelar</CancelButton>
              </div>
            </form>
          </FormCard>
        )}

        <CouponTable>
          {coupons.length === 0 && <EmptyMsg>No hay cupones creados.</EmptyMsg>}
          {coupons.map(c => (
            <CouponRow key={c.id}>
              <CouponCode>{c.codigo}</CouponCode>
              <CouponPct>{c.porcentaje}%</CouponPct>
              <Badge $active={c.activo}>{c.activo ? 'Activo' : 'Inactivo'}</Badge>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
                <ActionBtn $variant="toggle" onClick={() => toggleActive(c)} title={c.activo ? 'Desactivar' : 'Activar'}>
                  {c.activo ? <FaToggleOn /> : <FaToggleOff />}
                </ActionBtn>
                <ActionBtn onClick={() => startEdit(c)} title="Editar">
                  <FaEdit />
                </ActionBtn>
                <ActionBtn $variant="danger" onClick={() => { setDeleteId(c.id); setShowModal(true) }} title="Eliminar">
                  <FaTrash />
                </ActionBtn>
              </div>
            </CouponRow>
          ))}
        </CouponTable>
      </PageWrapper>

      <ConfirmModal
        show={showModal}
        onHide={() => { setShowModal(false); setDeleteId(null) }}
        onConfirm={handleDelete}
        title="Eliminar cupón"
        message="¿Estás seguro de que deseas eliminar este cupón? Esta acción no se puede deshacer."
      />
    </>
  )
}

export default CuponesPage
