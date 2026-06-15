import React, { useState } from 'react';
import { Bus, Car, Users, Calendar, Sparkles, Printer, User, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BusService {
  from: string;
  to: string;
  duration: string;
  price: number;
}

interface CarRental {
  type: string;
  seats: number;
  pricePerDay: number;
}

interface VanService {
  type: string;
  seats: number;
  pricePerDay: number;
}

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buses' | 'cars' | 'vans'>('buses');
  // Booking Form States
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState<'Bus' | 'Car' | 'Van'>('Bus');
  const [selectedItem, setSelectedItem] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Original data from travels.java
  const buses: BusService[] = [
    { from: 'Chennai', to: 'Bangalore', duration: '6', price: 799 },
    { from: 'Chennai', to: 'Madurai', duration: '8', price: 599 },
    { from: 'Chennai', to: 'Coimbatore', duration: '9', price: 899 },
    { from: 'Bangalore', to: 'Hyderabad', duration: '10', price: 1099 },
    { from: 'Mumbai', to: 'Pune', duration: '3', price: 499 }
  ];

  const cars: CarRental[] = [
    { type: 'Sedan', seats: 4, pricePerDay: 1200 },
    { type: 'SUV', seats: 7, pricePerDay: 2500 },
    { type: 'Luxury', seats: 4, pricePerDay: 5000 }
  ];

  const vans: VanService[] = [
    { type: 'Tempo Traveller', seats: 12, pricePerDay: 3500 },
    { type: 'Mini Bus', seats: 20, pricePerDay: 6000 },
    { type: 'Luxury Van', seats: 10, pricePerDay: 4500 }
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selectedItem || !startDate || !endDate) {
      alert("Please fill in all details before booking.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("End Date must be after or equal to Start Date.");
      return;
    }

    // Trigger canvas-confetti for premium celebration!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff7e5f', '#feb47b', '#a855f7', '#3b82f6']
    });

    const randomId = 'HT-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomId);
    setBookingConfirmed(true);
  };

  const handleReset = () => {
    setName('');
    setSelectedItem('');
    setPassengers(1);
    setStartDate('');
    setEndDate('');
    setBookingConfirmed(false);
  };

  const getDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const getPrice = () => {
    const daysCount = getDays();
    if (serviceType === 'Bus') {
      const bus = buses.find(b => `${b.from} to ${b.to}` === selectedItem);
      return bus ? bus.price * passengers : 0;
    } else if (serviceType === 'Car') {
      const car = cars.find(c => c.type === selectedItem);
      return car ? car.pricePerDay * daysCount : 0;
    } else {
      const van = vans.find(v => v.type === selectedItem);
      return van ? van.pricePerDay * daysCount : 0;
    }
  };
  
  return (
    <div className="container section-padding">
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>
          Explore Our <span className="gradient-text">Fleet & Routes</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
          We provide high-quality travel options at unmatched prices. Browse schedules, rentals, and book directly.
        </p>
      </div>

      {/* Tab Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('buses')}
          className={activeTab === 'buses' ? 'btn-premium' : 'btn-secondary'}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Bus size={18} /> Bus Services
        </button>
        <button
          onClick={() => setActiveTab('cars')}
          className={activeTab === 'cars' ? 'btn-premium' : 'btn-secondary'}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Car size={18} /> Car Rentals
        </button>
        <button
          onClick={() => setActiveTab('vans')}
          className={activeTab === 'vans' ? 'btn-premium' : 'btn-secondary'}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Users size={18} /> Van Services
        </button>
      </div>

      {/* Services Listings Grid */}
      <div style={{ marginBottom: '80px' }}>
        {activeTab === 'buses' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {buses.map((b, idx) => (
              <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '13px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-blue)', padding: '4px 10px', borderRadius: '15px', fontWeight: 'bold' }}>
                    AC Sleeper / Seater
                  </span>
                  <h3 style={{ fontSize: '20px', marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {b.from} <ArrowRight size={16} /> {b.to}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '5px' }}>
                    Duration: {b.duration} hours
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>₹{b.price}</span>
                  <button onClick={() => { setServiceType('Bus'); setSelectedItem(`${b.from} to ${b.to}`); }} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                    Select Route
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cars' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {cars.map((c, idx) => (
              <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '13px', background: 'rgba(168, 85, 247, 0.1)', color: 'var(--accent-purple)', padding: '4px 10px', borderRadius: '15px', fontWeight: 'bold' }}>
                    Chauffeur or Self-Drive
                  </span>
                  <h3 style={{ fontSize: '20px', marginTop: '15px' }}>{c.type} Rental</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} /> {c.seats} Passenger Seats
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                  <div>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>₹{c.pricePerDay}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/day</span>
                  </div>
                  <button onClick={() => { setServiceType('Car'); setSelectedItem(c.type); }} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                    Select Car
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vans' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {vans.map((v, idx) => (
              <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '13px', background: 'rgba(255, 126, 95, 0.1)', color: 'var(--accent-primary)', padding: '4px 10px', borderRadius: '15px', fontWeight: 'bold' }}>
                    Group Travels
                  </span>
                  <h3 style={{ fontSize: '20px', marginTop: '15px' }}>{v.type}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} /> Up to {v.seats} Passenger Seats
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                  <div>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>₹{v.pricePerDay}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/day</span>
                  </div>
                  <button onClick={() => { setServiceType('Van'); setSelectedItem(v.type); }} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                    Select Van
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Form Simulator Section */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        {!bookingConfirmed ? (
          <div className="glass-card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '25px', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
              🎟️ Online <span className="gradient-text">Booking Simulator</span>
            </h2>

            <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Your Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 40px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'white',
                      fontSize: '15px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Service Class</label>
                  <select
                    value={serviceType}
                    onChange={(e) => {
                      const val = e.target.value as 'Bus' | 'Car' | 'Van';
                      setServiceType(val);
                      setSelectedItem('');
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#0f172a',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'white',
                      fontSize: '15px'
                    }}
                  >
                    <option value="Bus">Bus Route</option>
                    <option value="Car">Car Rental</option>
                    <option value="Van">Van Service</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Select Vehicle / Route</label>
                  <select
                    required
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#0f172a',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'white',
                      fontSize: '15px'
                    }}
                  >
                    <option value="">-- Choose Option --</option>
                    {serviceType === 'Bus' && buses.map((b, idx) => (
                      <option key={idx} value={`${b.from} to ${b.to}`}>{b.from} to {b.to} (₹{b.price})</option>
                    ))}
                    {serviceType === 'Car' && cars.map((c, idx) => (
                      <option key={idx} value={c.type}>{c.type} Rental (₹{c.pricePerDay}/day)</option>
                    ))}
                    {serviceType === 'Van' && vans.map((v, idx) => (
                      <option key={idx} value={v.type}>{v.type} (₹{v.pricePerDay}/day)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Start Date</label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        fontSize: '15px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>End Date</label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        fontSize: '15px'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>No. of Passengers</label>
                  <input
                    type="number"
                    min="1"
                    max={serviceType === 'Car' ? 7 : serviceType === 'Van' ? 20 : 10}
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
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
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Duration</label>
                  <input
                    type="text"
                    readOnly
                    value={startDate && endDate ? `${getDays()} Day(s)` : '--'}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-muted)',
                      fontSize: '15px',
                      outline: 'none',
                      cursor: 'not-allowed'
                    }}
                  />
                </div>
              </div>

              {selectedItem && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '15px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px'
                }}>
                  <span style={{ fontSize: '14px' }}>Estimated Ticket Fare:</span>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>₹{getPrice()}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-premium"
                style={{
                  justifyContent: 'center',
                  padding: '15px',
                  fontSize: '16px',
                  marginTop: '15px'
                }}
              >
                🚀 Confirm Simulated Booking
              </button>
            </form>
          </div>
        ) : (
          /* Printable Ticket Mockup */
          <div className="glass-card" style={{
            padding: '0',
            overflow: 'hidden',
            border: '2px dashed var(--accent-primary)',
            background: 'var(--bg-secondary)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
          }}>
            {/* Ticket Header */}
            <div style={{
              background: 'var(--accent-gradient)',
              padding: '24px',
              color: 'var(--text-inverse)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>Hari Travels Boarding Pass</h3>
                <span style={{ fontSize: '12px', opacity: 0.8, letterSpacing: '1px' }}>DIGITAL BOOKING CONFIRMATION</span>
              </div>
              <Sparkles size={32} />
            </div>

            {/* Ticket Details */}
            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-main)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Passenger Name</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{name}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Ticket Reference</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--accent-blue)' }}>{ticketId}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Service Detail</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{serviceType}: {selectedItem}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Travel Duration</span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', display: 'block' }}>{startDate} to {endDate}</span>
                  <span style={{ fontSize: '12px', color: 'var(--accent-blue)', fontWeight: 'bold' }}>({getDays()} Day(s))</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Seats / Passengers</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{passengers} Ticket(s)</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Total Paid (INR)</span>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>₹{getPrice()}</span>
                </div>
              </div>

              <div style={{
                marginTop: '15px',
                borderTop: '1px dashed var(--border-color)',
                paddingTop: '20px',
                textAlign: 'center',
                fontSize: '13px',
                color: 'var(--text-muted)'
              }}>
                <p>✅ Boarding Pass Simulated Successfully.</p>
                <p style={{ fontSize: '11px', marginTop: '4px' }}>Thank you for choosing Hari Travels. This is a local simulation mimicking travels.java.</p>
              </div>
            </div>

            {/* Ticket Footer Actions */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '20px 30px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button onClick={handleReset} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                Book Another
              </button>
              <button onClick={() => window.print()} className="btn-premium" style={{ padding: '8px 16px', fontSize: '14px' }}>
                <Printer size={16} /> Print Boarding Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
