import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function BirdDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bird, setBird] = useState(null)

  useEffect(() => {
    api.get(`/api/birds/${id}`).then(({ data }) => setBird(data))
  }, [id])

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja deletar?')) return
    await api.delete(`/api/birds/${id}`)
    navigate('/dashboard')
  }

  if (!bird) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <p className="text-center text-gray-400 text-sm mt-16">Carregando...</p>
    </div>
  )

  const fields = [
    { label: 'Nome científico', value: bird.scientificName },
    { label: 'Espécie', value: bird.species },
    { label: 'Cor predominante', value: bird.color },
    { label: 'Observações', value: bird.notes },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-lg mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1 transition-colors"
        >
          ← Voltar
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">{bird.name}</h1>
            {bird.scientificName && (
              <p className="text-sm text-gray-400 italic mt-1">{bird.scientificName}</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {fields.map(field => field.value && (
              <div key={field.label}>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{field.label}</p>
                <p className="text-sm text-gray-700">{field.value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            <Link
              to={`/birds/${id}/edit`}
              className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Editar
            </Link>
            <button
              onClick={handleDelete}
              className="flex-1 py-2 rounded-lg border border-red-100 text-sm text-red-400 hover:bg-red-50 transition-colors"
            >
              Deletar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}