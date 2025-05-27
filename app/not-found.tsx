import {headers} from 'next/headers'
import Link from 'next/link'

export default function NotFound() {
  const headersList = headers()
  const referer = headersList.get('referer')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
        Page introuvable
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        {"Oups, la page que vous cherchez n'existe pas ou a été déplacée."}
        {referer && (
          <span className="block text-sm mt-2 text-gray-400">
            Provenance : {referer}
          </span>
        )}
      </p>
      <Link
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
      >
        {"Retour à l'accueil"}
      </Link>
    </div>
  )
}
