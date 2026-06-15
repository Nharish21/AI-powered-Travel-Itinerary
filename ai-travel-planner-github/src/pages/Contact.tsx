import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="container section-padding">
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>
          Contact <span className="gradient-text">Our Team</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
          Have questions about routes, pricing, or custom tour details? Get in touch with us.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Contact Info Panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '10px' }}>Get in Touch</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
            We're here to help you coordinate your upcoming journey. Feel free to call us directly, send an email, or drop by our office.
          </p>

          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px' }}>
            <div style={{
              background: 'rgba(255, 126, 95, 0.1)',
              width: '45px',
              height: '45px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)'
            }}>
              <MapPin size={22} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Office Headquarters</span>
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>12, Anna Salai, Mount Road, Chennai, India</span>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px' }}>
            <div style={{
              background: 'rgba(56, 189, 248, 0.1)',
              width: '45px',
              height: '45px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-blue)'
            }}>
              <Phone size={22} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Call Center</span>
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>+91 98765 43210 (24/7 Helpline)</span>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px' }}>
            <div style={{
              background: 'rgba(168, 85, 247, 0.1)',
              width: '45px',
              height: '45px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-purple)'
            }}>
              <Mail size={22} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Email Support</span>
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>support@haritravels.com</span>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="glass-card" style={{ padding: '35px' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '5px' }}>Send a Message</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                    fontSize: '15px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                    fontSize: '15px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>Message Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type details of your inquiry here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn-premium" style={{ justifyContent: 'center', padding: '14px', fontSize: '15px', marginTop: '10px' }}>
                <Send size={16} /> Send Message
              </button>
            </form>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                background: 'rgba(74, 222, 128, 0.1)',
                color: '#4ade80',
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(74, 222, 128, 0.2)'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#4ade80' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
                  Thank you, <strong>{name}</strong>. We have successfully received your inquiry and our support desk will contact you at <strong>{email}</strong> within the next 24 hours.
                </p>
              </div>
              <button onClick={handleReset} className="btn-secondary" style={{ marginTop: '15px' }}>
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
