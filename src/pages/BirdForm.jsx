import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function BirdForm() {
  const { id } = useParams()
  const isEditing = !!id && id !== 'new'
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', scientificName: '', species: '', color: '', notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEditing) {
      api.get(`/api/birds/${id}`).then(({ data }) => setForm(data))
    }
  }, [id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isEditing) {
        await api.put(`/api/birds/${id}`, form)
      } else {
        await api.post('/api/birds', form)
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-lg mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEditing ? 'Editar Pássaro' : 'Novo Pássaro'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {isEditing ? 'Atualize as informações' : 'Adicione ao seu catálogo'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { name: 'name', label: 'Nome *', placeholder: 'Ex: Bem-te-vi', required: true },
              { name: 'scientificName', label: 'Nome científico', placeholder: 'Ex: Pitangus sulphuratus' },
              { name: 'species', label: 'Espécie', placeholder: 'Ex: Tiranídeos' },
              { name: 'color', label: 'Cor predominante', placeholder: 'Ex: Amarelo e preto' },
            ].map(field => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-600">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-600">Observações</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Anotações pessoais sobre esse pássaro..."
                rows={3}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Salvando...' : isEditing ? 'Salvar' : 'Adicionar'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}