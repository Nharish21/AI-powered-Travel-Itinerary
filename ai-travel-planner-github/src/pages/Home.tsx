import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, Star, Users } from 'lucide-react';

const Home: React.FC = () => {
  const packages = [
    {
      title: 'Goa Beach Tour',
      duration: '3 Days / 2 Nights',
      price: '₹5,999',
      image: '/packages.webp',
      description: 'Relax on golden sands and explore historic churches in coastal Goa.'
    },
    {
      title: 'Manali Adventure',
      duration: '5 Days / 4 Nights',
      price: '₹8,499',
      image: '/packages.webp',
      description: 'Thrill yourself with paragliding, skiing, and trekking in the Himalayas.'
    },
    {
      title: 'Kerala Backwaters',
      duration: '4 Days / 3 Nights',
      price: '₹7,299',
      image: '/packages.webp',
      description: 'Cruise through peaceful backwaters in a traditional luxury houseboat.'
    }
  ];

  const features = [
    {
      icon: <Award size={32} style={{ color: 'var(--accent-primary)' }} />,
      title: 'Best Prices',
      description: 'We offer the most competitive rates in the market, ensuring exceptional value.'
    },
    {
      icon: <Users size={32} style={{ color: 'var(--accent-primary)' }} />,
      title: '24/7 Support',
      description: 'Our dedicated team of support agents is available round the clock for assistance.'
    },
    {
      icon: <Compass size={32} style={{ color: 'var(--accent-primary)' }} />,
      title: 'Expert Guides',
      description: 'Travel with experienced and local guides who know the regions inside out.'
    }
  ];

  const testimonials = [
    {
      quote: "Amazing experience! The Goa trip was perfectly planned. The hotels, transport, and guide were top notch.",
      author: "Rahul Sharma",
      location: "Delhi"
    },
    {
      quote: "Best travel agency I've ever used. The AI planner generated a fantastic customized schedule for my Manali trip!",
      author: "Priya Patel",
      location: "Mumbai"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '120px 24px',
        backgroundImage: 'linear-gradient(rgba(10, 15, 29, 0.65), rgba(10, 15, 29, 0.85)), url("/packages.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--text-main)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '56px', lineHeight: '1.2', marginBottom: '20px' }}>
            Explore the World with <span className="gradient-text">Hari Travels</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-muted)', marginBottom: '30px' }}>
            Experience the best travel planning and customized tours at affordable rates. Discover destinations with handpicked guides.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn-premium">
              Book Your Service
            </Link>
            <Link to="/ai-planner" className="btn-secondary">
              🚀 Try AI Planner
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="section-padding container">
        <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '10px' }}>
          Popular Packages
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}>
          Choose from our pre-assembled, customer-favorite itineraries with everything taken care of.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {packages.map((pkg, idx) => (
            <div key={idx} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }} 
                  className="package-img"
                />
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'var(--accent-gradient)',
                  color: 'var(--text-inverse)',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {pkg.price}
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '22px', marginBottom: '5px' }}>{pkg.title}</h3>
                <p style={{ color: 'var(--accent-blue)', fontSize: '14px', fontWeight: 'semibold', marginBottom: '12px' }}>
                  {pkg.duration}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                  {pkg.description}
                </p>
                <Link to="/services" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  View & Book Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: 'rgba(15, 23, 42, 0.5)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }} className="section-padding">
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '50px' }}>
            Why Choose Us?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feat, idx) => (
              <div key={idx} className="glass-card" style={{ textAlign: 'center', padding: '40px 30px' }}>
                <div style={{
                  background: 'rgba(255, 126, 95, 0.1)',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  {feat.icon}
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{feat.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding container">
        <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '50px' }}>
          What Our Travelers Say
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontStyle: 'italic', fontSize: '15px', marginBottom: '20px', color: 'var(--text-main)' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--accent-gradient)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                  <Star size={18} style={{ color: 'var(--text-inverse)' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-main)' }}>{t.author}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .glass-card:hover .package-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
};

export default Home;
