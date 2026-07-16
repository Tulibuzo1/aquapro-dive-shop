/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '../config/firebase'

const CouponContext = createContext()
export const useCoupons = () => useContext(CouponContext)

const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [useLocal, setUseLocal] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const snapshot = await getDocs(collection(db, 'cupones'))
        if (!cancelled) {
          const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
          if (items.length > 0) {
            setCoupons(items)
          } else {
            const res = await fetch('/data/cupones.json')
            const data = await res.json()
            setCoupons(data)
            setUseLocal(true)
          }
        }
      } catch {
        if (!cancelled) {
          try {
            const res = await fetch('/data/cupones.json')
            const data = await res.json()
            setCoupons(data)
            setUseLocal(true)
          } catch {
            if (!cancelled) setCoupons([])
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const addCoupon = async (newCoupon) => {
    const coupon = {
      ...newCoupon,
      codigo: newCoupon.codigo.toUpperCase().trim(),
      porcentaje: Number(newCoupon.porcentaje),
      activo: newCoupon.activo !== false
    }
    if (useLocal) {
      const newId = coupons.length > 0 ? Math.max(...coupons.map(c => c.id)) + 1 : 1
      setCoupons(prev => [...prev, { id: newId, ...coupon }])
      return { success: true }
    }
    try {
      const docRef = await addDoc(collection(db, 'cupones'), coupon)
      setCoupons(prev => [...prev, { id: docRef.id, ...coupon }])
      return { success: true }
    } catch (err) {
      console.error('Error adding coupon:', err)
      return { success: false, error: 'Error al agregar el cupón.' }
    }
  }

  const updateCoupon = async (id, updates) => {
    const matchId = (c) => String(c.id) === String(id)
    if (useLocal) {
      setCoupons(prev => prev.map(c => (matchId(c) ? { ...c, ...updates } : c)))
      return { success: true }
    }
    try {
      const couponRef = doc(db, 'cupones', id)
      await updateDoc(couponRef, updates)
      setCoupons(prev => prev.map(c => (matchId(c) ? { ...c, ...updates } : c)))
      return { success: true }
    } catch (err) {
      console.error('Error updating coupon:', err)
      return { success: false, error: 'Error al actualizar el cupón.' }
    }
  }

  const deleteCoupon = async (id) => {
    const matchId = (c) => String(c.id) === String(id)
    if (useLocal) {
      setCoupons(prev => prev.filter(c => !matchId(c)))
      return { success: true }
    }
    try {
      await deleteDoc(doc(db, 'cupones', id))
      setCoupons(prev => prev.filter(c => !matchId(c)))
      return { success: true }
    } catch (err) {
      console.error('Error deleting coupon:', err)
      return { success: false, error: 'Error al eliminar el cupón.' }
    }
  }

  const validateCoupon = (codigo) => {
    const found = coupons.find(
      c => c.codigo.toUpperCase() === codigo.toUpperCase().trim() && c.activo
    )
    if (!found) return { valid: false, error: 'Cupón no válido o inactivo.' }
    return { valid: true, coupon: found }
  }

  return (
    <CouponContext.Provider value={{
      coupons, loading,
      addCoupon, updateCoupon, deleteCoupon, validateCoupon
    }}>
      {children}
    </CouponContext.Provider>
  )
}

export default CouponProvider
