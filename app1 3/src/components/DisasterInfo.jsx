import './DisasterInfo.css';

export default function DisasterInfo() {
  const disasterInfo = [
    {
      type: "Flood",
      icon: "🌊",
      description: "Floods occur when water overflows from rivers, lakes, or coastal areas onto normally dry land.",
      causes: [
        "Heavy rainfall and monsoons",
        "River overflow and dam failures", 
        "Poor drainage systems",
        "Coastal storm surges"
      ],
      effects: [
        "Property damage and displacement",
        "Loss of life and livestock",
        "Crop destruction and food shortage",
        "Water contamination and disease outbreaks"
      ],
      preparedness: [
        "Keep emergency supplies ready",
        "Know evacuation routes",
        "Stay informed about weather warnings",
        "Avoid driving through flooded areas"
      ],
      commonAreas: "West Bengal, Assam, Bihar, Odisha, Kerala, Mumbai"
    },
    {
      type: "Earthquake",
      icon: "🏚️",
      description: "Earthquakes are sudden shaking of the ground caused by the movement of tectonic plates beneath Earth's surface.",
      causes: [
        "Tectonic plate movements",
        "Volcanic activity",
        "Human activities like mining",
        "Fault line ruptures"
      ],
      effects: [
        "Building collapse and infrastructure damage",
        "Ground ruptures and landslides",
        "Tsunamis (if underwater)",
        "Psychological trauma and casualties"
      ],
      preparedness: [
        "Secure heavy furniture and objects",
        "Practice 'Drop, Cover, Hold' drills",
        "Keep emergency kits accessible",
        "Identify safe spots in buildings"
      ],
      commonAreas: "Kashmir, Himachal Pradesh, Uttarakhand, Northeast states, Gujarat"
    },
    {
      type: "Landslide",
      icon: "⛰️",
      description: "Landslides involve the downward movement of rock, soil, and debris on slopes due to gravity.",
      causes: [
        "Heavy rainfall and water saturation",
        "Earthquakes and vibrations",
        "Deforestation and erosion",
        "Human construction activities"
      ],
      effects: [
        "Road and railway blockages",
        "Property destruction in hilly areas",
        "River damming and flooding",
        "Loss of agricultural land"
      ],
      preparedness: [
        "Avoid construction on steep slopes",
        "Plant vegetation to stabilize soil",
        "Monitor slope stability",
        "Have evacuation plans for hilly areas"
      ],
      commonAreas: "Himachal Pradesh, Uttarakhand, Kashmir, Western Ghats, Northeast"
    },
    {
      type: "Cyclone",
      icon: "🌀",
      description: "Cyclones are intense circular storm systems with strong winds formed over warm ocean waters.",
      causes: [
        "Warm ocean surface temperatures",
        "Low atmospheric pressure",
        "Earth's rotation (Coriolis effect)",
        "Moisture and atmospheric instability"
      ],
      effects: [
        "Extreme winds and storm surges",
        "Coastal flooding and erosion",
        "Uprooted trees and power outages",
        "Damage to agriculture and fishing"
      ],
      preparedness: [
        "Monitor weather forecasts regularly",
        "Secure outdoor items and shutters",
        "Stock emergency supplies",
        "Follow evacuation orders promptly"
      ],
      commonAreas: "Odisha, West Bengal, Andhra Pradesh, Tamil Nadu, Gujarat coast"
    },
    {
      type: "Drought",
      icon: "🏜️",
      description: "Drought is a prolonged period of below-normal precipitation leading to water shortage.",
      causes: [
        "Below-normal rainfall patterns",
        "High temperatures and evaporation",
        "Climate change effects",
        "Poor water management"
      ],
      effects: [
        "Crop failure and food insecurity",
        "Water scarcity for drinking",
        "Livestock deaths and migration",
        "Economic losses in agriculture"
      ],
      preparedness: [
        "Practice water conservation",
        "Use drought-resistant crops",
        "Implement rainwater harvesting",
        "Maintain strategic water reserves"
      ],
      commonAreas: "Rajasthan, Maharashtra (Marathwada), Karnataka, Andhra Pradesh"
    },
    {
      type: "Forest Fire",
      icon: "🔥",
      description: "Forest fires are uncontrolled fires that spread rapidly through vegetation and forested areas.",
      causes: [
        "Natural causes like lightning",
        "Human negligence and activities",
        "Dry weather and high temperatures",
        "Accumulation of dry vegetation"
      ],
      effects: [
        "Loss of forest cover and wildlife",
        "Air pollution and smoke hazards",
        "Property damage in forest areas",
        "Soil erosion and ecosystem damage"
      ],
      preparedness: [
        "Create firebreaks around properties",
        "Avoid open fires in dry seasons",
        "Report fire incidents immediately",
        "Maintain emergency evacuation plans"
      ],
      commonAreas: "Uttarakhand, Himachal Pradesh, Madhya Pradesh, Odisha hills"
    },
    {
      type: "Tsunami",
      icon: "🌊",
      description: "Tsunamis are large ocean waves typically caused by underwater earthquakes or volcanic eruptions.",
      causes: [
        "Underwater earthquakes",
        "Volcanic eruptions in oceans",
        "Submarine landslides",
        "Meteorite impacts (rare)"
      ],
      effects: [
        "Massive coastal flooding",
        "Complete destruction of coastal areas",
        "High casualties and displacement",
        "Contamination of freshwater sources"
      ],
      preparedness: [
        "Learn tsunami warning signs",
        "Know evacuation routes to higher ground",
        "Practice evacuation drills",
        "Stay informed about ocean warnings"
      ],
      commonAreas: "Tamil Nadu, Kerala, Andhra Pradesh, Odisha, West Bengal coast"
    }
  ];

  return (
    <div className="disaster-info">
      <div className="disaster-info-container">
        {/* Header Section */}
        <div className="info-header">
          <h1>Disaster Information Center</h1>
          <p>Learn about different types of natural disasters, their causes, effects, and how to prepare for them</p>
        </div>

        {/* Emergency Numbers */}
        <div className="emergency-section">
          <h2>🚨 Emergency Contact Numbers</h2>
          <div className="emergency-numbers">
            <div className="emergency-card">
              <h3>National Emergency</h3>
              <p className="number">112</p>
            </div>
            <div className="emergency-card">
              <h3>Disaster Management</h3>
              <p className="number">1078</p>
            </div>
            <div className="emergency-card">
              <h3>Fire Services</h3>
              <p className="number">101</p>
            </div>
            <div className="emergency-card">
              <h3>Medical Emergency</h3>
              <p className="number">108</p>
            </div>
          </div>
        </div>

        {/* Disaster Types */}
        <div className="disasters-grid">
          {disasterInfo.map((disaster, index) => (
            <div key={index} className="disaster-card">
              <div className="disaster-header">
                <span className="disaster-icon">{disaster.icon}</span>
                <h2>{disaster.type}</h2>
              </div>
              
              <p className="disaster-description">{disaster.description}</p>
              
              <div className="disaster-details">
                <div className="detail-section">
                  <h3>🔍 Main Causes</h3>
                  <ul>
                    {disaster.causes.map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="detail-section">
                  <h3>⚠️ Effects</h3>
                  <ul>
                    {disaster.effects.map((effect, i) => (
                      <li key={i}>{effect}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="detail-section">
                  <h3>🛡️ Preparedness</h3>
                  <ul>
                    {disaster.preparedness.map((prep, i) => (
                      <li key={i}>{prep}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="detail-section">
                  <h3>📍 Common Areas in India</h3>
                  <p className="common-areas">{disaster.commonAreas}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Safety Tips */}
        <div className="safety-tips">
          <h2>💡 General Safety Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Before Disaster</h3>
              <ul>
                <li>Create an emergency plan with your family</li>
                <li>Keep emergency supplies stocked</li>
                <li>Stay informed about local risks</li>
                <li>Learn first aid and basic safety skills</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>During Disaster</h3>
              <ul>
                <li>Stay calm and follow emergency plans</li>
                <li>Listen to official announcements</li>
                <li>Avoid unnecessary risks and travel</li>
                <li>Help others if it's safe to do so</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>After Disaster</h3>
              <ul>
                <li>Check for injuries and damages</li>
                <li>Contact family and authorities</li>
                <li>Document damages for insurance</li>
                <li>Be cautious of structural damage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}