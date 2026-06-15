import React from 'react';
import { Shield, Sparkles, Heart } from 'lucide-react';

const About: React.FC = () => {
  const milestones = [
    { year: '2020', title: 'Company Founded', desc: 'Hari Travels started in Chennai with a single tourist bus and a vision for quality regional transport.' },
    { year: '2022', title: 'Expanded Fleet', desc: 'Introduced car rental and premium van services to meet the growing demands of group and corporate travelers.' },
    { year: '2024', title: 'Digital Transformation', desc: 'Launched booking platforms and customized tour packages for Kerala, Goa, and North India.' },
    { year: '2026', title: 'AI Travel Planner Integration', desc: 'Incorporated cutting-edge Gemini AI to provide personalized itineraries and dynamic route maps instantly.' }
  ];

  const values = [
    { icon: <Shield size={24} />, title: 'Uncompromising Safety', desc: 'All vehicles undergo rigorous periodic checkups and are driven by fully licensed, background-checked operators.' },
    { icon: <Sparkles size={24} />, title: 'Personalized Journeys', desc: 'We believe travel is unique. Our custom itineraries match your interests, budget, and travel speed.' },
    { icon: <Heart size={24} />, title: 'Customer First', desc: '24/7 dedicated helpline ensuring support is always a phone call away, wherever you are.' }
  ];

  return (
    <div className="container section-padding">
      {/* Introduction */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          About <span className="gradient-text">Hari Travels</span>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          For over half a decade, Hari Travels has been a trusted partner for thousands of travelers. From reliable local transits to highly customized multi-day package tours, we blend convenience, comfort, and advanced tech to deliver seamless experiences.
        </p>
      </div>

      {/* Grid of Values */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        marginBottom: '80px'
      }}>
        {values.map((v, idx) => (
          <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{
              background: 'var(--accent-purple-gradient)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)'
            }}>
              {v.icon}
            </div>
            <h3 style={{ fontSize: '20px' }}>{v.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-lg)', padding: '50px 30px', border: '1px solid var(--border-color)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px' }} className="gradient-text-purple">
          Our Journey
        </h2>

        <div className="timeline-wrapper" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'var(--accent-purple-gradient)'
          }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            {milestones.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                {/* Timeline node */}
                <div style={{
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--accent-purple)',
                  border: '4px solid var(--bg-primary)',
                  position: 'absolute',
                  left: '13px',
                  top: '6px',
                  zIndex: 2,
                  boxShadow: '0 0 10px var(--accent-purple)'
                }}></div>

                <div style={{ paddingLeft: '50px' }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: 'var(--accent-blue)',
                    fontFamily: 'var(--font-heading)',
                    display: 'block'
                  }}>
                    {m.year}
                  </span>
                  <h3 style={{ fontSize: '20px', marginTop: '4px', marginBottom: '6px' }}>{m.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
