// Static disaster data for the application
export const disasterTypes = [
  'Flood', 'Earthquake', 'Landslide', 'Cyclone', 'Drought', 'Forest Fire', 'Tsunami'
];

export const disasterPosts = [
  {
    id: 1,
    title: "Severe flooding in Chennai - Marina Beach area underwater",
    type: "Flood",
    location: "Chennai, Tamil Nadu",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    severity: "High",
    timeAgo: "2 hours ago",
    author: "CitizenReporter123",
    description: "Heavy rainfall has caused severe flooding in Marina Beach area. Water level is 3-4 feet in many streets. Several vehicles stranded.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1605283176405-1d9a3d2ea298?q=80&w=1200&auto=format&fit=crop", caption: "Flooded street near Marina Beach" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", caption: "Live footage of flooding", poster: "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1200&auto=format&fit=crop" }
    ],
    upvotes: 234,
    downvotes: 12,
    comments: 45,
    verified: true
  },
  {
    id: 2,
    title: "Landslide blocks highway in Himachal Pradesh",
    type: "Landslide", 
    location: "Shimla, Himachal Pradesh",
    coordinates: { lat: 31.1048, lng: 77.1734 },
    severity: "Medium",
    timeAgo: "5 hours ago",
    author: "MountainRescue",
    description: "Heavy monsoon rains triggered landslide on NH-5. Road blocked completely. Rescue teams deployed.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop", caption: "Landslide blocking highway" }
    ],
    upvotes: 156,
    downvotes: 8,
    comments: 23,
    verified: true
  },
  {
    id: 3,
    title: "Earthquake tremors felt across Delhi NCR",
    type: "Earthquake",
    location: "Delhi, NCR",
    coordinates: { lat: 28.6139, lng: 77.2090 },
    severity: "Low",
    timeAgo: "1 day ago", 
    author: "DelhiAlert",
    description: "Mild earthquake tremors felt around 3:30 AM. Magnitude 4.2. No major damage reported yet.",
    media: [],
    upvotes: 89,
    downvotes: 15,
    comments: 34,
    verified: false
  },
  {
    id: 4,
    title: "Cyclone Biparjoy approaching Gujarat coast",
    type: "Cyclone",
    location: "Kutch, Gujarat", 
    coordinates: { lat: 23.7337, lng: 69.8597 },
    severity: "High",
    timeAgo: "6 hours ago",
    author: "WeatherOfficial",
    description: "Cyclone expected to make landfall in next 12 hours. Wind speed 120-130 kmph. Evacuation in progress.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?q=80&w=1200&auto=format&fit=crop", caption: "Satellite view of cyclone" },
      { type: "image", url: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop", caption: "Evacuation in coastal areas" }
    ],
    upvotes: 445,
    downvotes: 5,
    comments: 78,
    verified: true
  },
  {
    id: 5,
    title: "Forest fire spreading in Uttarakhand hills",
    type: "Forest Fire",
    location: "Nainital, Uttarakhand",
    coordinates: { lat: 29.3803, lng: 79.4636 },
    severity: "High",
    timeAgo: "8 hours ago",
    author: "ForestGuard",
    description: "Multiple forest fire spots detected. Fire fighting operations ongoing. Smoke visible from 10km away.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop", caption: "Forest fire in hills" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm", caption: "Aerial view of fire", poster: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop" }
    ],
    upvotes: 267,
    downvotes: 18,
    comments: 56,
    verified: true
  },
  {
    id: 6,
    title: "Drought conditions worsening in Marathwada",
    type: "Drought",
    location: "Marathwada, Maharashtra",
    coordinates: { lat: 19.1383, lng: 76.7094 },
    severity: "Medium",
    timeAgo: "1 day ago",
    author: "FarmerUnion",
    description: "Severe water shortage affecting crops. Wells dried up in 15 villages. Tanker water supply arranged.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1618477461850-3d6a8f3c1d05?q=80&w=1200&auto=format&fit=crop", caption: "Dried up well" },
      { type: "image", url: "https://images.unsplash.com/photo-1542038382126-77ae2819338d?q=80&w=1200&auto=format&fit=crop", caption: "Water tanker distribution" }
    ],
    upvotes: 123,
    downvotes: 7,
    comments: 29,
    verified: false
  }
];

export const userRoles = {
  CITIZEN: 'citizen',
  VOLUNTEER: 'volunteer', 
  OFFICIAL: 'official'
};

export const severityLevels = {
  LOW: { color: '#22c55e', label: 'Low' },
  MEDIUM: { color: '#f59e0b', label: 'Medium' },
  HIGH: { color: '#dc2626', label: 'High' },
  CRITICAL: { color: '#7c2d12', label: 'Critical' }
};