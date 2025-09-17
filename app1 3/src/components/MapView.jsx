import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

// Fake disaster data
const disasterData = [
  {
    id: 1,
    type: "Flood",
    severity: "High",
    location: [28.7041, 77.1025], // Delhi
    description: "Severe flooding in low-lying areas due to heavy rainfall."
  },
  {
    id: 2,
    type: "Landslide",
    severity: "Medium",
    location: [27.533, 88.5122], // Sikkim
    description: "Landslide blocking National Highway, affecting traffic."
  },
  {
    id: 3,
    type: "Cyclone",
    severity: "Critical",
    location: [19.076, 72.8777], // Mumbai
    description: "Cyclone warnings issued for coastal areas."
  },
  {
    id: 4,
    type: "Earthquake",
    severity: "Low",
    location: [23.2599, 77.4126], // Bhopal
    description: "Minor tremors felt in the city."
  },
  {
    id: 5,
    type: "Flood",
    severity: "High",
    location: [25.3176, 82.9739], // Varanasi
    description: "Rivers overflowing, evacuation underway."
  },
  {
    id: 6,
    type: "Drought",
    severity: "Medium",
    location: [15.3173, 75.7139], // Karnataka
    description: "Water shortage reported in rural areas."
  },
  {
    id: 7,
    type: "Cyclone",
    severity: "Critical",
    location: [13.0827, 80.2707], // Chennai
    description: "Cyclone landfall expected in 24 hours."
  },
  {
    id: 8,
    type: "Flood",
    severity: "Low",
    location: [26.9124, 75.7873], // Jaipur
    description: "Localized flooding after heavy rain."
  },
  {
    id: 9,
    type: "Earthquake",
    severity: "High",
    location: [24.8170, 93.9368], // Manipur
    description: "Strong quake, damage to buildings reported."
  },
  {
    id: 10,
    type: "Landslide",
    severity: "Critical",
    location: [32.2432, 77.1892], // Himachal Pradesh
    description: "Major landslide disrupting mountain highways."
  },
  {
    id: 11,
    type: "Cyclone",
    severity: "Medium",
    location: [21.1458, 79.0882], // Nagpur
    description: "Cyclone-induced strong winds affecting electricity."
  },
  {
    id: 12,
    type: "Drought",
    severity: "High",
    location: [22.5726, 88.3639], // Kolkata
    description: "Extended dry season leading to crop failure."
  }
];


// Simple icons by disaster type
const disasterIcons = {
  Flood: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png", iconSize: [32, 32] }),
  Landslide: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png", iconSize: [32, 32] }),
  Cyclone: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484582.png", iconSize: [32, 32] }),
  Earthquake: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/2910/2910768.png", iconSize: [32, 32] })
};

export default function MapView() {
  return (
    <div className="map-view">
      <h2>Interactive Hazard Map</h2>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {disasterData.map((disaster) => (
          <Marker
            key={disaster.id}
            position={disaster.location}
            icon={disasterIcons[disaster.type] || disasterIcons.Flood}
          >
            <Popup>
              <b>{disaster.type}</b> ({disaster.severity}) <br />
              {disaster.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
