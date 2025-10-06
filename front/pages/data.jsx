import React, { useEffect, useState } from 'react'

export default function Data() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const run = async () => {
            try {
                setLoading(true)
                const res = await fetch('https://dummyjson.com/users?limit=10')
                if (!res.ok) throw new Error('Erreur API')
                const json = await res.json()
                setUsers(json.users || [])
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        run()
    }, [])

    return (
        <div>
            <h1>Data</h1>
            <p className="small">Source: dummyjson.com pour une simulation de donnée.</p>
            {loading && <div className="card">Chargement…</div>}
            {error && <div className="card">Erreur: {error}</div>}
            {!loading && !error && (
                <div className="list">
                    {users.map(u => (
                        <div key={u.id} className="card" aria-label={`Utilisateur ${u.firstName} ${u.lastName}`}>
                            <div className="row">
                                <img src={u.image} alt="" width="40" height="40" style={{borderRadius: 8}} />
                                <div>
                                    <div><strong>{u.firstName} {u.lastName}</strong></div>
                                    <div className="small">{u.email}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}