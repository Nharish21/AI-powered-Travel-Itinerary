# 🤖 AI Travel Itinerary Generator

An interactive AI travel assistance platform built with **React (Vite)**, **TypeScript**, and the **Google Gemini API**. The application streams customized travel plans in real-time and provides live geocoded route mapping using **Leaflet.js** and **OpenStreetMap Nominatim**.

---

## 🏗️ System Workflow

```
[ Setup Preferences Form ] ➔ [ Fetch Gemini API Stream ] ➔ [ Render Streaming Markdown ]
                                                                      │
                                                             (Extract Places list)
                                                                      │
                                                                      v
                                                         [ Geocode Places (OSM) ]
                                                                      │
                                                                      v
                                                         [ Draw Route on Leaflet ]
```

1. **User input:** The traveler enters a destination, number of days, budget (budget-friendly, moderate, luxury), and select interest tags.
2. **API Streaming:** The frontend requests `v1beta/models/gemini-2.5-flash:streamGenerateContent` using server-sent events (SSE).
3. **Real-time Rendering:** Text tokens stream directly into a custom Markdown-to-HTML parser.
4. **Geocoding Queue:** The app extracts landmark names listed after the `PLACES:` tag and geocodes them sequentially via OpenStreetMap's Nominatim API. A delay of 1.2s prevents API rate limits.
5. **Interactive Mapping:** Markers are placed on a custom styled Leaflet.js map layer, connected sequentially by glowing polyline vectors.

---

## 🌟 Core Features

*   **Real-time Streaming:** Low-latency markdown rendering mimics chat-like typing.
*   **Custom Preferences:** Itineraries balance day limits, budgets, and user interests.
*   **Interactive Maps:** A glowing dark-mode CartoDB theme renders custom pulsing Leaflet markers and route traces.
*   **Nominatim Geocoding Queue:** Smart geocoding queue with rate-limit buffers prevents network lookup blocks.
*   **Responsive CSS Glassmorphism:** Sleek UI styled with custom variables, glowing borders, and animations.

---

## 🛠️ Tech Stack

*   **Framework:** React (Vite), TypeScript.
*   **AI Engine:** Google Gemini API (`gemini-2.5-flash`).
*   **Mapping:** Leaflet.js, OpenStreetMap Nominatim, CartoDB Dark Matter.
*   **Icons:** Lucide React.

---

## 🚀 Setup & Installation

1. Clone or download this project.
2. Install package dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Google Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open the local port in your web browser.
