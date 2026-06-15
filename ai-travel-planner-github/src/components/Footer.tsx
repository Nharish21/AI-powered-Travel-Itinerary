import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '60px 0 30px',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Info */}
          <div>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--text-main)',
              fontSize: '22px',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              marginBottom: '18px'
            }}>
              <Bus size={24} style={{ color: 'var(--accent-primary)' }} />
              <span>Hari<span className="gradient-text">Travels</span></span>
            </Link>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
              Chennai's premier travel agency. Crafting personalized itineraries and providing premium bus, car, and van services across South India and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '18px', fontSize: '16px', fontFamily: 'var(--font-heading)' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li>
                <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="footer-link">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/ai-planner" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="footer-link">
                  AI Itinerary Planner
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="footer-link">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Services */}
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '18px', fontSize: '16px', fontFamily: 'var(--font-heading)' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li>
                <Link to="/services" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }} className="footer-link">
                  Bus Bookings <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }} className="footer-link">
                  Car Rentals <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }} className="footer-link">
                  Van / Group Rentals <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '18px', fontSize: '16px', fontFamily: 'var(--font-heading)' }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>+91 98765 43210</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>support@haritravels.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          fontSize: '13px'
        }}>
          <p>&copy; {currentYear} Hari Travels. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="footer-link">Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent-primary) !important;
          padding-left: 3px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
