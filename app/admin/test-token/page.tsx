// Página de prueba para verificar el token
'use client'

import { useState } from 'react'

export default function TestTokenPage() {
  const [token, setToken] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testToken = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        setResult(`✅ Token válido! Estadísticas cargadas: ${data.totalDonations} donaciones`)
      } else {
        setResult(`❌ Error: ${data.error} (Status: ${response.status})`)
      }
    } catch (error) {
      setResult(`❌ Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">🔧 Test de Token Admin</h1>
        
        <div className="bg-[var(--color-background-alt)] border border-[var(--color-border)] rounded-lg p-6 mb-4">
          <label className="block text-sm font-medium mb-2">
            Token de Administración:
          </label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="santivilla-admin-2026-abc123"
            className="w-full px-4 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-background)] text-[var(--color-text)] mb-4"
          />
          <button
            onClick={testToken}
            disabled={loading || !token}
            className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-secondary)] disabled:opacity-50"
          >
            {loading ? 'Probando...' : 'Probar Token'}
          </button>
        </div>

        {result && (
          <div className={`p-4 rounded-md ${
            result.startsWith('✅') 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h2 className="font-bold mb-2">📋 Token Correcto (según .env.local):</h2>
          <code className="text-sm">santivilla-admin-2026-abc123</code>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h2 className="font-bold mb-2">🔧 Pasos:</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Copia el token correcto de arriba</li>
            <li>Pégalo en el campo de arriba</li>
            <li>Haz clic en "Probar Token"</li>
            <li>Si funciona ✅, el problema es el localStorage</li>
            <li>Si no funciona ❌, el servidor necesita reiniciarse</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

