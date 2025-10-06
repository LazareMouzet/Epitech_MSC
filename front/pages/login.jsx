import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('kminchelle')
    const [password, setPassword] = useState('0lelplR')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    expiresInMins: 30
                })
            })

            if (!res.ok) {
                const msg = await res.text()
                console.error('Login failed:', res.status, msg)
                throw new Error('Identifiants invalides')
            }

            const data = await res.json()
            localStorage.setItem('tm_token', data.token)
            localStorage.setItem('tm_user', JSON.stringify({ username: data.username, id: data.id }))
            navigate('/')
        } catch (e) {
            setError(e.message || 'Erreur de connexion')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit} className="card" aria-label="Formulaire de connexion">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input id="username" className="input" value={username} onChange={e=>setUsername(e.target.value)} required />
                <div style={{ height: 8 }} />
                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
                <div style={{ height: 12 }} />
                <button className="btn" type="submit" disabled={loading}>
                    {loading ? 'Connexion…' : 'Se connecter'}
                </button>
                {error && <p role="alert" className="small">❌ {error}</p>}
            </form>
        </div>
    )
}