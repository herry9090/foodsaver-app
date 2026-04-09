'use client';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { user, login, logout, theme, toggleTheme, points } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDemoLogin = () => {
    login({ name: 'Alex Doe', email: 'alex@example.com', avatar: 'https://ui-avatars.com/api/?name=Alex+Doe&background=10b981&color=fff' });
  };

  return (
    <nav className="navbar glass-panel">
      <div className="container nav-container">
        <Link href="/" className="logo">
          <span className="gradient-text" style={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: 'Outfit' }}>FoodSaver</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/report">Report Waste</Link>
          <Link href="/rewards">Rewards</Link>
          {user && <Link href="/dashboard">Dashboard</Link>}
          
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <div className="user-menu">
              <span className="points-badge">
                🏅 {points} pts
              </span>
              <img src={user.avatar} alt="User avatar" className="avatar" />
              <button className="btn-secondary btn-sm" onClick={logout}>Logout</button>
            </div>
          ) : (
            <button className="btn-primary" onClick={handleDemoLogin}>Login</button>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu glass-panel">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/report" onClick={() => setIsMenuOpen(false)}>Report Waste</Link>
          <Link href="/rewards" onClick={() => setIsMenuOpen(false)}>Rewards</Link>
          {user && <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>}
          {user ? (
             <button className="btn-secondary w-full" onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</button>
          ) : (
             <button className="btn-primary w-full" onClick={() => { handleDemoLogin(); setIsMenuOpen(false); }}>Login</button>
          )}
        </div>
      )}
    </nav>
  );
}
