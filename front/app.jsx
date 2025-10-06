import React from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Home from './pages/home.jsx'
import Data from './pages/data.jsx'
import Login from './pages/login.jsx'

function Nav() {
    const navClass = ({ isActive }) => (isActive ? 'active' : '')
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('tm_user') || 'null')

    const logout = () => {
        localStorage.removeItem('tm_user')
        localStorage.removeItem('tm_token')
        navigate('/login')
    }

    return (
        <nav className="nav" aria-label="Navigation">
            <NavLink to="/" className={navClass}>Home</NavLink>
            <NavLink to="/data" className={navClass}>Data</NavLink>
            <NavLink to="/login" className={navClass}>Login</NavLink>
            <div style={{marginLeft:'auto'}} className="small">
                {user ? <>Connecté : <strong>{user.username}</strong> · <button className="btn" onClick={logout}>Logout</button></> : <em>Non connecté</em>}
            </div>
        </nav>
    )
}

export default function App() {
    return (
        <>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/data" element={<Data />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </>
    )
}