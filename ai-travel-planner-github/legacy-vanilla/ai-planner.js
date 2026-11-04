document.addEventListener("DOMContentLoaded", function () {
    // Generate button click
    document.getElementById("generateBtn").addEventListener("click", function () {
        generateItinerary();
    });
});

// Decodes a base64 encoded API key to prevent easy plaintext scraping
function getApiKey() {

    return atob(encoded);
}

function generateItinerary() {
    var apiKey = getApiKey();
    var destination = document.getElementById("destination").value.trim();
    var days = document.getElementById("days").value;
    var budget = document.getElementById("budget").value;

    // Get selected interests
    var interests = [];
    var checkboxes = document.querySelectorAll(".interest-tag input[type='checkbox']");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            interests.push(checkboxes[i].value);
        }
    }

    // Validation
    if (!destination) {
        showError("Please enter a destination.");
        return;
    }
    if (interests.length === 0) {
        showError("Please select at least one interest.");
        return;
    }

    // Show loading, hide others
    document.getElementById("loading").style.display = "block";
    document.getElementById("error").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("generateBtn").disabled = true;

    // Build prompt
    var prompt = "Create a " + days + "-day travel itinerary for " + destination + ".\n" +
        "Budget level: " + budget + "\n" +
        "Traveler interests: " + interests.join(", ") + "\n\n" +
        "Please format the itinerary clearly with:\n" +
        "- Day number and a theme for each day\n" +
        "- Morning, Afternoon, and Evening activities\n" +
        "- Specific place names, landmarks, and restaurants to visit\n" +
        "- Estimated cost for each activity in INR\n" +
        "- A short travel tip at the end of each day\n\n" +
        "At the very end of your response, add a line starting with 'PLACES:' followed by a comma-separated list of the main places and landmarks mentioned in the itinerary.\n" +
        "Keep the itinerary practical, realistic, and fun.";

    // Call Gemini API with streaming
    callGeminiStream(apiKey, prompt, destination);
}


function callGeminiStream(apiKey, prompt, destination) {
    var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=" + apiKey;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    })
    .then(function (response) {
        if (!response.ok) {
            return response.json().then(function (errData) {
                throw new Error(errData.error ? errData.error.message : "API request failed with status " + response.status);
            });
        }

        // Show results area
        document.getElementById("loading").style.display = "none";
        document.getElementById("results").style.display = "block";

        var itineraryDiv = document.getElementById("itineraryText");
        itineraryDiv.innerHTML = '<span class="cursor"></span>';

        var fullText = "";
        var reader = response.body.getReader();
        var decoder = new TextDecoder();
        var buffer = "";

        function readChunk() {
            return reader.read().then(function (result) {
                if (result.done) {
                    // Streaming finished
                    itineraryDiv.innerHTML = formatText(fullText);
                    document.getElementById("generateBtn").disabled = false;

                    // Setup map after text is complete
                    setupMap(destination, fullText);
                    return;
                }

                buffer += decoder.decode(result.value, { stream: true });
                var lines = buffer.split("\n");
                buffer = lines.pop(); // keep last incomplete line

                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (line.indexOf("data: ") === 0) {
                        var data = line.substring(6).trim();
                        if (data === "[DONE]") continue;

                        try {
                            var json = JSON.parse(data);
                            var text = "";
                            if (json.candidates && json.candidates[0] &&
                                json.candidates[0].content && json.candidates[0].content.parts &&
                                json.candidates[0].content.parts[0]) {
                                text = json.candidates[0].content.parts[0].text || "";
                            }

                            if (text) {
                                fullText += text;
                                itineraryDiv.innerHTML = formatText(fullText) + '<span class="cursor"></span>';
                                itineraryDiv.scrollTop = itineraryDiv.scrollHeight;
                            }
                        } catch (e) {
                            // skip malformed JSON chunks
                        }
                    }
                }

                return readChunk();
            });
        }

        return readChunk();
    })
    .catch(function (err) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("generateBtn").disabled = false;
        showError("Error: " + err.message);
    });
}


function formatText(text) {
    // Simple formatting - convert basic markdown to HTML
    var html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic text
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Headings
    html = html.replace(/^### (.*$)/gm, '<h4 style="margin: 12px 0 5px; color: #2c3e50;">$1</h4>');
    html = html.replace(/^## (.*$)/gm, '<h3 style="margin: 18px 0 8px; color: #2c3e50;">$1</h3>');
    html = html.replace(/^# (.*$)/gm, '<h3 style="margin: 18px 0 8px; color: #e74c3c;">$1</h3>');

    // Line breaks
    html = html.replace(/\n/g, "<br>");

    // Hide the PLACES line from display
    html = html.replace(/<br>PLACES:.*$/i, "");

    return html;
}


function showError(msg) {
    var errorDiv = document.getElementById("error");
    errorDiv.textContent = msg;
    errorDiv.style.display = "block";
    document.getElementById("loading").style.display = "none";
    document.getElementById("generateBtn").disabled = false;
}


function setupMap(destination, fullText) {
    var mapDiv = document.getElementById("map");

    // Extract places from the PLACES: line
    var places = [];
    var placesMatch = fullText.match(/PLACES:\s*(.+)/i);
    if (placesMatch) {
        var items = placesMatch[1].split(",");
        for (var i = 0; i < items.length; i++) {
            var place = items[i].trim();
            if (place.length > 0) {
                places.push(place);
            }
        }
    }

    // Always include the destination as fallback
    if (places.length === 0) {
        places.push(destination);
    }

    // Geocode the main destination to center the map
    geocode(destination + ", India").then(function (coords) {
        if (!coords) {
            mapDiv.innerHTML = '<p style="padding: 20px; text-align: center; color: #999;">Could not load map for this location.</p>';
            return;
        }

        var map = L.map("map").setView([coords.lat, coords.lon], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Add markers for each place (limit to 10 to avoid rate limits)
        var maxPlaces = Math.min(places.length, 10);
        var markers = [];
        var index = 0;

        function addNextMarker() {
            if (index >= maxPlaces) {
                // All markers added, fit bounds
                if (markers.length > 1) {
                    var group = L.featureGroup(markers);
                    map.fitBounds(group.getBounds().pad(0.2));
                }

                // Draw dashed line connecting markers
                if (markers.length > 1) {
                    var latlngs = [];
                    for (var j = 0; j < markers.length; j++) {
                        latlngs.push(markers[j].getLatLng());
                    }
                    L.polyline(latlngs, {
                        color: "#e74c3c",
                        weight: 2,
                        dashArray: "8, 6",
                        opacity: 0.7
                    }).addTo(map);
                }
                return;
            }

            var place = places[index];
            var searchQuery = place + ", " + destination + ", India";

            geocode(searchQuery).then(function (placeCoords) {
                if (placeCoords) {
                    var marker = L.marker([placeCoords.lat, placeCoords.lon])
                        .addTo(map)
                        .bindPopup("<strong>" + place + "</strong>");
                    markers.push(marker);
                }

                index++;
                // Wait 1.1 seconds between requests (Nominatim rate limit)
                setTimeout(addNextMarker, 1100);
            });
        }

        addNextMarker();
    });
}


function geocode(query) {
    var url = "https://nominatim.openstreetmap.org/search?format=json&q=" +
        encodeURIComponent(query) + "&limit=1";

    return fetch(url, {
        headers: { "User-Agent": "HariTravelsApp/1.0" }
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };
        }
        return null;
    })
    .catch(function (err) {
        console.error("Geocoding error:", err);
        return null;
    });
}
