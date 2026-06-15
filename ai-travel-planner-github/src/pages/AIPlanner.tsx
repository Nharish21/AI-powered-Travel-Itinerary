import React, { useState, useRef, useEffect } from 'react';
import { Bus, Calendar, Wallet, Check, AlertCircle, MapPin, Navigation, Compass } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Interest {
  label: string;
  checked: boolean;
}

const AIPlanner: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('3');
  const [budget, setBudget] = useState('moderate');
  const [interests, setInterests] = useState<Interest[]>([
    { label: 'History', checked: true },
    { label: 'Food', checked: true },
    { label: 'Adventure', checked: false },
    { label: 'Nature', checked: false },
    { label: 'Shopping', checked: false },
    { label: 'Culture', checked: false },
    { label: 'Nightlife', checked: false },
    { label: 'Relaxation', checked: false },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [showResults, setShowResults] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activeTimeoutsRef = useRef<number[]>([]);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearGeocodeQueue();
      destroyMap();
    };
  }, []);

  const clearGeocodeQueue = () => {
    activeTimeoutsRef.current.forEach(t => window.clearTimeout(t));
    activeTimeoutsRef.current = [];
  };

  const destroyMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  };

  const handleInterestChange = (index: number) => {
    const updated = [...interests];
    updated[index].checked = !updated[index].checked;
    setInterests(updated);
  };

  // Decode legacy base64 API key
  const getApiKey = (): string => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey) return envKey;
    // Fallback to the legacy encoded key
    const encoded = ""; // Add your Gemini key in .env
    return encoded || "YOUR_GEMINI_API_KEY";
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setError('Please enter a destination.');
      return;
    }

    const selectedInterests = interests.filter(i => i.checked).map(i => i.label);
    if (selectedInterests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }

    // Reset states
    setError('');
    setLoading(true);
    setStreamingText('');
    setShowResults(false);
    clearGeocodeQueue();
    destroyMap();

    const apiKey = getApiKey();
    const prompt = `Create a ${days}-day travel itinerary for ${destination.trim()}.\n` +
      `Budget level: ${budget}\n` +
      `Traveler interests: ${selectedInterests.join(', ')}\n\n` +
      `Please format the itinerary clearly with:\n` +
      `- Day number and a theme for each day\n` +
      `- Morning, Afternoon, and Evening activities\n` +
      `- Specific place names, landmarks, and restaurants to visit\n` +
      `- Estimated cost for each activity in INR\n` +
      `- A short travel tip at the end of each day\n\n` +
      `At the very end of your response, add a line starting with 'PLACES:' followed by a comma-separated list of the main places and landmarks mentioned in the itinerary.\n` +
      `Keep the itinerary practical, realistic, and fun.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error ? errData.error.message : `API request failed with status ${response.status}`);
      }

      setLoading(false);
      setShowResults(true);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullItinerary = '';

      if (!reader) {
        throw new Error('Response stream reader not available.');
      }

      const readChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          // Streaming finished
          if (isMountedRef.current) {
            setupItineraryMap(destination, fullItinerary);
          }
          return;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // keep last incomplete line

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6).trim();
            if (data === '[DONE]') continue;

            try {
              const json = JSON.parse(data);
              const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (text && isMountedRef.current) {
                fullItinerary += text;
                setStreamingText(fullItinerary);
              }
            } catch (e) {
              // Ignore partial JSON parsing errors
            }
          }
        }
        await readChunk();
      };

      await readChunk();
    } catch (err: any) {
      if (isMountedRef.current) {
        setLoading(false);
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    }
  };

  const setupItineraryMap = async (dest: string, text: string) => {
    if (!mapContainerRef.current) return;

    // Extract places from PLACES: line
    const places: string[] = [];
    const placesMatch = text.match(/PLACES:\s*(.+)/i);
    if (placesMatch) {
      const items = placesMatch[1].split(',');
      for (const item of items) {
        const place = item.trim();
        if (place.length > 0) {
          places.push(place);
        }
      }
    }

    if (places.length === 0) {
      places.push(dest);
    }

    try {
      // Geocode destination to center the map
      const destCoords = await geocode(`${dest}, India`);
      if (!destCoords || !isMountedRef.current) return;

      // Initialize Map
      const map = L.map(mapContainerRef.current).setView([destCoords.lat, destCoords.lon], 12);
      mapInstanceRef.current = map;

      // Premium CartoDB Dark Matter tile layer for dark styling
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);
      // Create glowing Pulsing Custom Markers
      const createPulsingMarker = () => {
        return L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div class="marker-container">
              <div class="marker-pulse"></div>
              <div class="marker-dot"></div>
            </div>
            <style>
              .custom-leaflet-marker {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .marker-container {
                position: relative;
                width: 20px;
                height: 20px;
              }
              .marker-pulse {
                position: absolute;
                width: 24px;
                height: 24px;
                left: -2px;
                top: -2px;
                border-radius: 50%;
                background: rgba(255, 126, 95, 0.4);
                animation: marker-glow-pulse 1.8s infinite ease-out;
              }
              .marker-dot {
                position: absolute;
                width: 10px;
                height: 10px;
                left: 5px;
                top: 5px;
                border-radius: 50%;
                background: var(--accent-gradient);
                border: 2px solid white;
              }
              @keyframes marker-glow-pulse {
                0% { transform: scale(0.6); opacity: 1; }
                100% { transform: scale(2.0); opacity: 0; }
              }
            </style>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
      };

      const maxPlaces = Math.min(places.length, 10);
      const markers: L.Marker[] = [];
      let index = 0;

      const addNextMarker = async () => {
        if (!isMountedRef.current || index >= maxPlaces) {
          // Drawing route path if multiple coordinates found
          if (markers.length > 1 && mapInstanceRef.current) {
            const latlngs = markers.map(m => m.getLatLng());
            L.polyline(latlngs, {
              color: '#ff7e5f',
              weight: 3,
              dashArray: '10, 8',
              opacity: 0.85
            }).addTo(mapInstanceRef.current);

            const group = L.featureGroup(markers);
            mapInstanceRef.current.fitBounds(group.getBounds().pad(0.2));
          }
          return;
        }

        const place = places[index];
        const query = `${place}, ${dest}, India`;
        
        try {
          const placeCoords = await geocode(query);
          if (placeCoords && mapInstanceRef.current && isMountedRef.current) {
            const customIcon = createPulsingMarker();
            const marker = L.marker([placeCoords.lat, placeCoords.lon], { icon: customIcon })
              .addTo(mapInstanceRef.current)
              .bindPopup(`<strong style="color:var(--text-main); font-family:var(--font-heading);">${place}</strong>`);
            markers.push(marker);
          }
        } catch (e) {
          console.error("Geocoding failed for:", place);
        }

        index++;
        
        // Wait 1200ms between geocoding calls to avoid OpenStreetMap Nominatim rate limits
        if (isMountedRef.current) {
          const timeoutId = window.setTimeout(addNextMarker, 1200);
          activeTimeoutsRef.current.push(timeoutId);
        }
      };

      await addNextMarker();

    } catch (err) {
      console.error("Error setting up map:", err);
    }
  };

  const geocode = async (query: string): Promise<{ lat: number; lon: number } | null> => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'HariTravelsApp/2.0' }
      });
      const data = await res.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
      }
      return null;
    } catch (e) {
      console.error('Geocoding fetch error:', e);
      return null;
    }
  };

  const formatText = (text: string) => {
    // Basic Markdown parser for React
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headings
    html = html.replace(/^### (.*$)/gm, '<h4 style="margin: 18px 0 6px; color: var(--accent-blue); font-family: var(--font-heading); font-size:18px;">$1</h4>');
    html = html.replace(/^## (.*$)/gm, '<h3 style="margin: 24px 0 10px; color: var(--text-main); font-family: var(--font-heading); border-bottom:1px solid var(--border-color); padding-bottom:4px; font-size:22px;">$1</h3>');
    html = html.replace(/^# (.*$)/gm, '<h2 style="margin: 28px 0 12px; color: var(--accent-primary); font-family: var(--font-heading); font-size:26px;">$1</h2>');

    // Bold & Italics
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-main); font-weight:700;">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em style="color:var(--text-muted);">$1</em>');

    // Newlines & line breaks
    html = html.replace(/\n/g, '<br>');

    // Hide the PLACES tag from rendering
    html = html.replace(/<br>PLACES:.*$/i, '');

    return html;
  };

  return (
    <div className="container section-padding">
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>
          AI Travel <span className="gradient-text">Itinerary Generator</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
          Leverage Google Gemini AI to plan your perfect vacation. Custom days, budget levels, and interests.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Planner Settings Form */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass style={{ color: 'var(--accent-primary)' }} /> Setup Preferences
          </h2>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>Where is your destination?</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Goa, Manali, Kerala, Jaipur"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
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
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}><Calendar size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Days</label>
                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
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
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="7">7 Days</option>
                  <option value="10">10 Days</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}><Wallet size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
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
                  <option value="budget">Budget Friendly</option>
                  <option value="moderate">Moderate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>

            {/* Checkbox Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>Your Interests</label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: '10px'
              }}>
                {interests.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleInterestChange(idx)}
                    style={{
                      background: item.checked ? 'var(--accent-purple-gradient)' : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid',
                      borderColor: item.checked ? 'var(--accent-purple)' : 'var(--border-color)',
                      color: 'var(--text-main)',
                      padding: '8px 10px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    {item.checked && <Check size={12} />}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                color: '#ef4444',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-premium"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px',
                fontSize: '16px',
                marginTop: '10px'
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
                  Generating...
                </span>
              ) : (
                '🚀 Generate Custom Itinerary'
              )}
            </button>
          </form>
        </div>

        {/* Streaming & Map Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Loader Placeholder */}
          {loading && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
              <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Assembling Your Plan...</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                Querying Gemini AI for the best attractions, food joints, and rates for {destination}.
              </p>
            </div>
          )}

          {/* Results Output */}
          {showResults && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-card" style={{ padding: '30px' }}>
                <h2 style={{ fontSize: '26px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Bus size={24} style={{ color: 'var(--accent-primary)' }} />
                  <span>Your Itinerary for {destination}</span>
                </h2>

                <div
                  style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    paddingRight: '10px',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: 'var(--text-muted)'
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: formatText(streamingText) }} />
                  {!streamingText && <span style={{ fontStyle: 'italic' }}>Initializing stream connection...</span>}
                  {/* Blinking cursor while generating */}
                  {streamingText && !mapInstanceRef.current && (
                    <span style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '14px',
                      background: 'var(--accent-primary)',
                      marginLeft: '4px',
                      animation: 'blink 0.8s infinite'
                    }}></span>
                  )}
                </div>
              </div>

              {/* Leaflet Map Card */}
              <div className="glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Navigation size={20} style={{ color: 'var(--accent-blue)' }} /> Route Visualization Map
                </h3>
                <div
                  ref={mapContainerRef}
                  style={{
                    height: '350px',
                    width: '100%',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    zIndex: 1
                  }}
                ></div>
                <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '10px', fontSize: '11px', textAlign: 'center' }}>
                  Routes are drawn sequentially connecting attractions geocoded via OpenStreetMap.
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
