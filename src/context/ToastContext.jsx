import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((msg, type = 'info', dur = 4000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, dur)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}

const icons = { success: '✅', error: '❌', info: '💙', warning: '⚠️' }
const borderColors = { success: '#10B981', error: '#EF4444', info: '#1A56DB', warning: '#F59E0B' }

function ToastContainer({ toasts, onRemove }) {
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 10
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#fff',
          border: '1px solid #E5E7EB',
          borderLeft: `4px solid ${borderColors[t.type] || borderColors.info}`,
          padding: '14px 18px', borderRadius: 12,
          minWidth: 280, maxWidth: 360,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          fontSize: 14, fontFamily: 'var(--body)',
          animation: 'fadeUp .35s ease'
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>{icons[t.type] || '💙'}</span>
          <span style={{ flex: 1, lineHeight: 1.4, color: '#374151' }}>{t.msg}</span>
          <span
            onClick={() => onRemove(t.id)}
            style={{ cursor: 'pointer', color: '#9CA3AF', fontSize: 16 }}
          >✕</span>
        </div>
      ))}
    </div>
  )
}
