import { Link } from 'react-router-dom'

export default function BirdCard({ bird, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{bird.name}</h3>
          {bird.scientificName && (
            <p className="text-xs text-gray-400 italic mt-0.5">{bird.scientificName}</p>
          )}
        </div>
        {bird.color && (
          <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-full border border-gray-100">
            {bird.color}
          </span>
        )}
      </div>

      {bird.notes && (
        <p className="text-sm text-gray-500 line-clamp-2">{bird.notes}</p>
      )}

      <div className="flex gap-2 pt-1">
        <Link
          to={`/birds/${bird.id}`}
          className="flex-1 text-center text-sm py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Ver
        </Link>
        <Link
          to={`/birds/${bird.id}/edit`}
          className="flex-1 text-center text-sm py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Editar
        </Link>
        <button
          onClick={() => onDelete(bird.id)}
          className="flex-1 text-sm py-1.5 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 transition-colors"
        >
          Deletar
        </button>
      </div>
    </div>
  )
}