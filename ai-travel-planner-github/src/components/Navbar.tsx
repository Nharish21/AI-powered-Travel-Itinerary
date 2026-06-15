import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Bus } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'AI Planner', path: '/ai-planner' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(10, 15, 29, 0.75)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '16px 0',
      transition: 'var(--transition-smooth)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: 'var(--text-main)',
          fontSize: '24px',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)'
        }}>
          <Bus size={28} style={{ color: 'var(--accent-primary)' }} />
          <span>Hari<span className="gradient-text">Travels</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="desktop-menu" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'var(--transition-smooth)',
                position: 'relative',
                paddingBottom: '4px'
              })}
              className="nav-item-link"
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/ai-planner" className="btn-premium" style={{ padding: '8px 18px', fontSize: '14px', borderRadius: '12px' }}>
            🚀 AI Trip Planner
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={toggleMenu} 
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'none'
          }}
          className="mobile-toggle-btn"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="mobile-menu" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-color)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          zIndex: 999
        }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-primary)' : 'var(--text-main)',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '18px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              })}
            >
              {link.name}
            </NavLink>
          ))}
          <Link 
            to="/ai-planner" 
            onClick={() => setIsOpen(false)} 
            className="btn-premium" 
            style={{ 
              justifyContent: 'center', 
              marginTop: '10px' 
            }}
          >
            🚀 Launch AI Planner
          </Link>
        </div>
      )}

      {/* Responsive Inline CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
        }
        
        .nav-item-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background: var(--accent-gradient);
          transition: var(--transition-smooth);
        }
        
        .nav-item-link:hover::after {
          width: 100%;
        }
        
        .nav-item-link:hover {
          color: var(--text-main) !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
