// src/utils/api.jss
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:50001api'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('rh_token')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type']
  }
  const res  = await fetch(`${BASE_URL}${endpoint}`, config)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

// ── Auth ──────────────────────────────────────────────────────
export const authAPI = {
  signup: (name, email, password) =>
    request('/auth/signup', { method:'POST', body: JSON.stringify({ name, email, password }) }),
  login: (email, password) =>
    request('/auth/login',  { method:'POST', body: JSON.stringify({ email, password }) }),
  me: () => request('/auth/me'),
}

// ── Orders ────────────────────────────────────────────────────
export const ordersAPI = {
  create:          (formData) => request('/orders',               { method:'POST', body: formData }),
  getAll:          ()         => request('/orders'),
  getStats:        ()         => request('/orders/stats'),
  getOne:          (id)       => request(`/orders/${id}`),
  getCompanyCount: ()         => request('/orders/company-count'),
}

// ── Payment ───────────────────────────────────────────────────
export const paymentAPI = {
  initialize: (orderId) =>
    request('/payment/initialize',        { method:'POST', body: JSON.stringify({ orderId }) }),
  verify: (reference, orderId) =>
    request('/payment/verify',            { method:'POST', body: JSON.stringify({ reference, orderId }) }),
  verifyByReference: (reference) =>
    request('/payment/verify-by-reference', { method:'POST', body: JSON.stringify({ reference }) }),
}

// ── Profile ───────────────────────────────────────────────────
export const profileAPI = {
  get: () => request('/profile'),
  update: (data) => request('/profile', { method:'PUT', body: JSON.stringify(data) }),
  uploadCV: (file) => {
    const fd = new FormData(); fd.append('cv', file)
    return request('/profile/upload-cv', { method:'POST', body: fd })
  },
  uploadCL: (file) => {
    const fd = new FormData(); fd.append('coverLetter', file)
    return request('/profile/upload-cl', { method:'POST', body: fd })
  },
}