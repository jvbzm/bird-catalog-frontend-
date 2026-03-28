import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BirdCard from '../components/BirdCard'
import api from '../services/api'

export default function Dashboard() {
  const [birds, setBirds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBirds()
  }, [])

  async function fetchBirds() {
    try {
      const { data } = await api.get('/api/birds')
      setBirds(data)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja deletar?')) return
    await api.delete(`/api/birds/${id}`)
    setBirds(birds.filter(b => b.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Meus Pássaros</h1>
            <p className="text-sm text-gray-400 mt-1">{birds.length} no catálogo</p>
          </div>
          <Link
            to="/birds/new"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            + Adicionar
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400 text-center py-12">Carregando...</p>
        ) : birds.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🐦</p>
            <p className="text-gray-500 font-medium">Nenhum pássaro cadastrado ainda</p>
            <p className="text-sm text-gray-400 mt-1">Clique em "Adicionar" para começar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {birds.map(bird => (
              <BirdCard key={bird.id} bird={bird} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}