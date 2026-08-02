export interface NewsArticle {
  id: string;
  title: string;
  category: 'Executive Order' | 'Public Advisory' | 'Infrastructure' | 'Agriculture' | 'Health & Safety' | 'Culture & Events';
  date: string;
  summary: string;
  content: string;
  author: string;
  image: string;
  featured?: boolean;
  docRef?: string;
}

export interface TouristSpot {
  id: string;
  name: string;
  category: 'Nature & Adventure' | 'Parks & Recreation' | 'Local Dining';
  location: string;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  entranceFee: string;
  image: string;
  rating: number;
  travelTips: string;
  coordinates: { lat: number; lng: number };
}

export interface Barangay {
  name: string;
  captain: string;
  zone: 'Poblacion District' | 'Northern Agricultural Plains' | 'Central Plains' | 'Southern Foothills' | 'Eastern Upland' | 'Western Riverlands';
  contact: string;
  population: string;
  mainLivelihood: string;
  hallLocation: string;
}

export interface MunicipalOfficial {
  name: string;
  position: string;
  committee: string;
  officeHours: string;
  image: string;
  quote?: string;
}

export interface EmergencyContact {
  office: string;
  hotline: string;
  landline?: string;
  address: string;
  available: string;
  icon: string;
}

export const TOWN_DETAILS = {
  name: "Municipality of Umingan",
  province: "Pangasinan",
  region: "Region I (Ilocos Region)",
  zipCode: "2443",
  tagline: "Bayang Masagana, Mamamayang Magkatuwang",
  mayor: "Hon. Atty. Chris Evert B. Tadeo-Leynes",
  viceMayor: "Hon. Emil Tristan T. Trinidad",
  termYear: "2026 Administration",
  foundedYear: "1811",
  landArea: "258.49 km²",
  population: "78,094",
  barangayCount: 58,
  classification: "1st Class Municipality",
  hallAddress: "Mun. Hall, Poblacion West, Umingan, Pangasinan 2443",
  operatingHours: "Monday - Friday, 8:00 AM - 5:00 PM (Except Holidays)",
  email: "umingan_mcruz2016@yahoo.com",
  phone: "(075) 574-1234 / +63 917 888 2443"
};

export const MUNICIPAL_OFFICIALS: MunicipalOfficial[] = [
  {
    name: "Hon. Atty. Chris Evert B. Tadeo-Leynes",
    position: "Municipal Mayor (2026)",
    committee: "Executive & Administrative Operations",
    officeHours: "Mon-Fri 8:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    quote: "Dedicated to driving transparent digital public governance, modernizing agricultural cold storage hubs, and promoting Umingan's eco-tourism landmarks."
  },
  {
    name: "Hon. Emil Tristan T. Trinidad",
    position: "Municipal Vice Mayor (2026)",
    committee: "Presiding Officer, Sangguniang Bayan",
    officeHours: "Mon-Fri 8:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    quote: "Fostering progressive municipal ordinances that directly empower local onion farmers, youth scholars, and MSMEs across our 58 barangays."
  },
  {
    name: "Hon. Michael Bryan O. Onia",
    position: "Sangguniang Bayan Member",
    committee: "Chairman, Agriculture & Cooperative Development",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hon. Jocelyn R. Ibasan",
    position: "Sangguniang Bayan Member",
    committee: "Chairwoman, Health, Sanitation & Social Services",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hon. Rosalina A. De Leon",
    position: "Sangguniang Bayan Member",
    committee: "Chairwoman, Education, Youth & Sports Development",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hon. Fernando Ma M. Cruz Jr.",
    position: "Sangguniang Bayan Member",
    committee: "Chairman, Infrastructure, Public Works & Zoning",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hon. Danica Mae M. Darapiza",
    position: "Sangguniang Bayan Member",
    committee: "Chairwoman, Tourism, Trade, Industry & Culture",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hon. Edgar Rafael M. Tumbocon",
    position: "Sangguniang Bayan Member",
    committee: "Chairman, Ways & Means, Finance & Appropriation",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hon. Fred A. Fernandez",
    position: "Sangguniang Bayan Member",
    committee: "Chairman, Public Order, Safety & Disaster Management",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hon. Virgilio P. Padilla",
    position: "Sangguniang Bayan Member",
    committee: "Chairman, Environmental Protection & Natural Resources",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hon. Alain Jermen P. Rabang",
    position: "Sangguniang Bayan Member",
    committee: "Chairman, Information Technology & Digital Innovation",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hon. Wilmer M. Escobar",
    position: "Sangguniang Bayan Member",
    committee: "Chairman, Barangay Affairs & Rural Development",
    officeHours: "Tue & Thu Sessions",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80"
  }
];

export const MUNICIPAL_NEWS: NewsArticle[] = [
  {
    id: "news-01",
    title: "Mayor Atty. Chris Evert B. Tadeo-Leynes Breaks Ground on ₱45M Agri-Processing Hub in Barangay Alo-o",
    category: "Infrastructure",
    date: "July 28, 2026",
    summary: "Mayor Tadeo-Leynes initiates construction of the 500-metric-ton cold storage facility and solar drying complex to protect local onion and rice harvests.",
    content: "The Local Government Unit of Umingan, Pangasinan, under Mayor Atty. Chris Evert B. Tadeo-Leynes, officially initiated the construction of a state-of-the-art Agri-Processing & Cold Storage Facility in Barangay Alo-o. Funded through combined municipal capital development funds and Department of Agriculture grants, the facility features a 500-metric-ton cold storage capacity, automated sorting sheds, and solar drying pavements to drastically minimize post-harvest losses for onion and vegetable growers across Eastern Pangasinan.",
    author: "Umingan Information Office",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    docRef: "EO-2026-042"
  },
  {
    id: "news-02",
    title: "Annual Kanen Festival 2026 Set to Celebrate Umingan's Sticky Rice Heritage This December",
    category: "Culture & Events",
    date: "July 22, 2026",
    summary: "Grand Kanen Festival preparations begin featuring the giant Tupig and Suman exhibition, street dancing, and municipal trade fairs.",
    content: "The Municipal Tourism Office announced the official schedule for the annual Kanen Festival 2026. Highlighting Umingan's culinary identity, the festival brings together 58 barangays to showcase authentic Pangasinan and Ilocano sticky rice dainties like Tupig, Suman, Kalamay, and Patupat. Events will include a street dancing parade along the Municipal Plaza, cook-off challenges, and an evening agri-craft night market.",
    author: "Municipal Tourism Office",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    docRef: "MUNICIPAL-RES-2026-108"
  },
  {
    id: "news-03",
    title: "Executive Order No. 18 (2026): Digital BPLO One-Stop Shop Rollout Mandated by Mayor Tadeo-Leynes",
    category: "Executive Order",
    date: "July 15, 2026",
    summary: "Business owners can now compute tax assessments and submit permit renewals online via the official Umingan e-Services Portal.",
    content: "Under Executive Order No. 18, S-2026, Mayor Atty. Chris Evert B. Tadeo-Leynes mandates the integration of digital assessment tools for the Business Permit and Licensing Office (BPLO). Local entrepreneurs in Umingan can now calculate tax assessments, upload Barangay clearances, and schedule fire & sanitary inspections online, reducing processing times from 5 days down to under 24 hours.",
    author: "Office of the Municipal Mayor",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    docRef: "EO-2026-018"
  },
  {
    id: "news-04",
    title: "MDRRMO Advisory: Water Level Sensors Operational at Barat River Eco-Park Spillway",
    category: "Health & Safety",
    date: "July 10, 2026",
    summary: "Real-time telemetry water sensors active along the Barat River watershed for early flood warnings during monsoon rainfall.",
    content: "The Municipal Disaster Risk Reduction and Management Office (MDRRMO) of Umingan has activated early-warning telemetry gauges at the Barat River Spillway. Residents in low-lying barangays including Cabalitian, Barat, and San Vicente are advised to save emergency hotlines and monitor official LGU advisories during heavy afternoon downpours.",
    author: "MDRRMO Umingan",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    docRef: "ADV-2026-088"
  },
  {
    id: "news-05",
    title: "RSBSA Farmers Assistance: Subsidized Seeds & Fertilizer Vouchers Distributed",
    category: "Agriculture",
    date: "June 29, 2026",
    summary: "Over 3,200 registered farmers receive certified hybrid seeds and fuel vouchers at the Umingan Civic Center.",
    content: "The Municipal Agriculture Office conducted a three-day distribution of high-yield hybrid rice seeds, organic fertilizers, and fuel subsidy cards to farmers registered in the Registry System for Basic Sectors in Agriculture (RSBSA). Farmers who haven't updated their RSBSA profiles are encouraged to visit the Municipal Agriculture desk.",
    author: "Municipal Agriculture Office",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    docRef: "AGRI-BULL-2026-05"
  }
];

export const TOURIST_SPOTS: TouristSpot[] = [
  // 🏔️ Nature & Adventure (Peaks, Overlooks, Trails, Falls, Rivers & Adventure Farms)
  {
    id: "spot-peak-01",
    name: "VIEWtiful DECK Nature Park",
    category: "Nature & Adventure",
    location: "Sitio Tebag, Umingan, Pangasinan (7.7 mi from center)",
    description: "Features a short trek up a viewing platform in Sitio Tebag. It offers a sweeping 360-degree panoramic view of the green fields of Pangasinan. It is perfect for sunset viewing.",
    highlights: ["360° Panoramic View", "Sitio Tebag Short Trek", "Sunset Viewing Platform", "Green Fields Overlook"],
    bestTimeToVisit: "4:30 PM - 6:30 PM (Sunset Hours)",
    entranceFee: "Free Public Access / Minimal Park Fee",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    travelTips: "Perfect for sunset photography. Bring light windbreakers for evening breezes on the deck platform.",
    coordinates: { lat: 15.9380, lng: 120.8950 }
  },
  {
    id: "spot-peak-02",
    name: "Mini Chocolate Hills & Crisanto V. Rivera Nature Park",
    category: "Nature & Adventure",
    location: "Umingan, Pangasinan (3.4 mi from center)",
    description: "Small natural mounds resembling Bohol's iconic hills. There is a free public access trail alongside the curated Crisanto V. Rivera Nature Park.",
    highlights: ["Resembles Bohol Hills", "Free Public Access Trail", "Crisanto V. Rivera Nature Park", "Scenic Walking Trail"],
    bestTimeToVisit: "Morning & Late Afternoon",
    entranceFee: "Free Trail Access",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    travelTips: "Great for quick family walking tours, trail running, and scenic countryside photos.",
    coordinates: { lat: 15.9280, lng: 120.8600 }
  },
  {
    id: "spot-peak-03",
    name: "Hiking Mount Amorong (Mt. Amor)",
    category: "Nature & Adventure",
    location: "Barangay Esperanza / Luna Este, Umingan, Pangasinan (6.8 mi)",
    description: "An ancient, extinct volcano offering scenic mountain trail challenges for intermediate hikers with panoramic views over Pangasinan.",
    highlights: ["Extinct Volcano Trek", "Mountain Trail Challenge", "Peak Panorama Views", "Sunrise Sea of Clouds"],
    bestTimeToVisit: "4:30 AM - 10:00 AM",
    entranceFee: "₱30 Environmental Fee + Guide Fee",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    travelTips: "Register at the Barangay Esperanza Eco-Tourism outpost before ascending.",
    coordinates: { lat: 15.9321, lng: 120.8904 }
  },

  // 🚜 Adventure Parks & Farms
  {
    id: "spot-park-01",
    name: "Garden Lake Resort Adventure Park",
    category: "Nature & Adventure",
    location: "Barangay Luna Este, Umingan, Pangasinan (5.1 mi)",
    description: "Located in Barangay Luna Este. This specialized campsite offers structured unlimited 2-day ATV rentals, boodle fights, and direct hiking access to Mt. Amorong.",
    highlights: ["Unlimited 2-Day ATV Rentals", "Boodle Fight Dining", "Direct Mt. Amorong Trail Access", "Campsite Bonfires"],
    bestTimeToVisit: "8:00 AM - 6:00 PM (Overnight Camping Available)",
    entranceFee: "Resort Entrance / ATV Package Rates",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    travelTips: "Reserve ATV packages and boodle fight meals in advance for group weekend trips.",
    coordinates: { lat: 15.9150, lng: 120.8750 }
  },
  {
    id: "spot-park-02",
    name: "Dela Peña Farm Adventure & Spring Resort",
    category: "Nature & Adventure",
    location: "Barangay San Juan, Umingan, Pangasinan",
    description: "Located in San Juan. Offers unique green grape picking experiences, swimming, campsite bonfires, and open terrain ATV riding.",
    highlights: ["Green Grape Picking", "Natural Spring Swimming", "Campsite Bonfires", "Open Terrain ATV Riding"],
    bestTimeToVisit: "8:00 AM - 5:00 PM Daily",
    entranceFee: "Resort Day Pass & Grape Harvest Fees",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    travelTips: "Check with farm management regarding active grape picking harvest months.",
    coordinates: { lat: 15.9410, lng: 120.8500 }
  },
  {
    id: "spot-park-03",
    name: "EL Dorado Farm Resort",
    category: "Nature & Adventure",
    location: "Barangay Carayungan Sur, Umingan, Pangasinan",
    description: "Located in Carayungan Sur. Blends local agritourism training with swimming facilities and family farm recreation.",
    highlights: ["Agritourism Training", "Swimming Pools", "Farm Recreation", "Shaded Family Cottages"],
    bestTimeToVisit: "8:00 AM - 5:00 PM Daily",
    entranceFee: "Day Pass & Cottage Rates",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    travelTips: "Ideal for family swimming outings and agricultural learning tours.",
    coordinates: { lat: 15.9290, lng: 120.8350 }
  },

  // 🌊 Rivers & Secret Falls
  {
    id: "spot-river-01",
    name: "Diket Falls",
    category: "Nature & Adventure",
    location: "Barangay Diket, Umingan, Pangasinan (4.0 mi)",
    description: "A hidden local spot reached through an expansive farmland trek. It features boulder trails opening into shallow, cool pools enclosed by towering stone walls.",
    highlights: ["Farmland Trekking Trail", "Shallow Cool Pool Dip", "Towering Stone Walls", "Natural Boulder Trail"],
    bestTimeToVisit: "8:00 AM - 3:00 PM",
    entranceFee: "Free Trail Access / Local Guide",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
    rating: 3.4,
    travelTips: "Wear aqua shoes or sturdy trekking sandals to navigate the wet boulder trail.",
    coordinates: { lat: 15.9550, lng: 120.8720 }
  },
  {
    id: "spot-river-02",
    name: "Sinabaan Riverbank & Barat River Eco-Park",
    category: "Nature & Adventure",
    location: "Barangay Sinabaan & Barat, Umingan, Pangasinan (5.0 mi)",
    description: "A relaxing river hangout spot often used by locals for afternoon wading, bamboo cottage relaxing, and family picnics along running mountain stream waters.",
    highlights: ["Clear Mountain Stream Swimming", "Afternoon Wading", "Bamboo Picnic Cottages", "Sunset River Eco-Walk"],
    bestTimeToVisit: "9:00 AM - 5:00 PM",
    entranceFee: "Free River Access | Cottage Rental ₱250 - ₱500",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    rating: 4.4,
    travelTips: "Bring your own food picnic baskets. Please follow local LGU zero-waste guidelines.",
    coordinates: { lat: 15.9188, lng: 120.8655 }
  },

  // 🏛️ Town Center Plazas & Parks Recreation
  {
    id: "spot-park-rec-01",
    name: "Umingan Public Auditorium & Public Plaza",
    category: "Parks & Recreation",
    location: "Salientes St, Poblacion, Umingan, Pangasinan (0.3 mi)",
    description: "Situated along Salientes Street in the heart of the town, this lively community center serves as a primary spot to unwind, walk, and watch local seasonal events.",
    highlights: ["Salientes Street Location", "Lively Community Center", "Local Seasonal Events", "Walking & Relaxation Spot"],
    bestTimeToVisit: "8:00 AM - 9:00 PM",
    entranceFee: "Free Public Access",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    travelTips: "Great spot for evening walks and enjoying community seasonal events.",
    coordinates: { lat: 15.9242, lng: 120.8415 }
  },
  {
    id: "spot-park-rec-02",
    name: "Municipal Plaza",
    category: "Parks & Recreation",
    location: "Umingan Municipal Hall Grounds, Umingan, Pangasinan (0.3 mi)",
    description: "Located right outside the Umingan Municipal Hall, offering a wide open space with fresh air and a relaxed atmosphere for morning jogs or casual strolls.",
    highlights: ["Municipal Hall Open Grounds", "Fresh Air Relaxed Atmosphere", "Morning Jogging Track", "Casual Strolls"],
    bestTimeToVisit: "6:00 AM - 8:00 PM",
    entranceFee: "Free Public Access",
    image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    travelTips: "Popular among locals for early morning jogging and afternoon relaxation.",
    coordinates: { lat: 15.9238, lng: 120.8410 }
  },
  {
    id: "spot-park-rec-03",
    name: "Umingan Children's Park",
    category: "Parks & Recreation",
    location: "Town Center, Umingan, Pangasinan (0.3 mi)",
    description: "A small, family-friendly dedicated public playground built specifically for kids to play in a safe, shaded environment.",
    highlights: ["Dedicated Public Playground", "Family-Friendly Play Area", "Kids Play Equipment", "Safe Shaded Seating"],
    bestTimeToVisit: "7:00 AM - 6:00 PM",
    entranceFee: "Free Public Access",
    image: "https://images.unsplash.com/photo-1564429238817-393bd4286b2d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    travelTips: "Bring young children for safe afternoon play. Shaded benches available for parents.",
    coordinates: { lat: 15.9235, lng: 120.8418 }
  },
  {
    id: "spot-park-rec-04",
    name: "Umingan Sports Complex / Sports Center",
    category: "Parks & Recreation",
    location: "Municipal St, Umingan, Pangasinan (0.3 mi)",
    description: "Located right on Municipal Street, this is the hub for local indoor sports, containing community basketball courts and hosting municipal athletic meets.",
    highlights: ["Indoor Sports Hub", "Community Basketball Courts", "Municipal Athletic Meets", "Municipal Street Access"],
    bestTimeToVisit: "8:00 AM - 8:00 PM",
    entranceFee: "Free Access / Event Schedule Dependent",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    travelTips: "Check municipal sports schedule for local league basketball games.",
    coordinates: { lat: 15.9248, lng: 120.8405 }
  },
  {
    id: "spot-park-rec-05",
    name: "Poblacion East Outdoor Courts",
    category: "Parks & Recreation",
    location: "Poblacion East, Umingan, Pangasinan (0.3 mi)",
    description: "Fully accessible public outdoor courts that light up during late afternoons for neighborhood tournament games and community physical recreation.",
    highlights: ["Night-Lit Outdoor Courts", "Neighborhood Tournaments", "Community Physical Recreation", "Public Access"],
    bestTimeToVisit: "4:00 PM - 8:30 PM",
    entranceFee: "Free Public Access",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    travelTips: "Popular in late afternoons when local tournament games take place.",
    coordinates: { lat: 15.9245, lng: 120.8435 }
  },
  {
    id: "spot-park-rec-06",
    name: "Umingan MX Park",
    category: "Parks & Recreation",
    location: "Umingan, Pangasinan (5.2 mi)",
    description: "A specialized local dirt track catering specifically to motocross riders, off-road enthusiasts, and extreme bike hobbyists.",
    highlights: ["Specialized Local Dirt Track", "Motocross Riding", "Off-Road Terrain", "Extreme Bike Hobbyists"],
    bestTimeToVisit: "Weekend Mornings & Afternoons",
    entranceFee: "Track Access / Practice Pass",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    travelTips: "Proper motocross safety gear and helmets required for all track riders.",
    coordinates: { lat: 15.9100, lng: 120.8850 }
  },
  {
    id: "spot-park-rec-07",
    name: "Crisanto V. Rivera Nature Park",
    category: "Parks & Recreation",
    location: "Barangay Purao, Umingan, Pangasinan (3.4 mi)",
    description: "A private eco-park situated directly next to the Umingan Mini Chocolate Hills in Purao. It is highly popular among local bicycle clubs as a rest station and scenic backdrop for nature walks.",
    highlights: ["Adjacent to Mini Chocolate Hills", "Bicycle Club Rest Station", "Scenic Nature Walks", "Barangay Purao Location"],
    bestTimeToVisit: "6:30 AM - 5:30 PM",
    entranceFee: "Free Access / Park Donation",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    travelTips: "Ideal rest stop for cycling enthusiasts exploring the Purao hills route.",
    coordinates: { lat: 15.9280, lng: 120.8600 }
  },
  {
    id: "spot-park-rec-08",
    name: "Gloman Merritt Ecopark & Diket Eco-Tourism Park",
    category: "Parks & Recreation",
    location: "Barangay Diket & Rural Umingan, Pangasinan (3.7 mi)",
    description: "Budding, localized tree-filled green preserves set up to promote environmental awareness and shaded picnic getaways within rural barangays.",
    highlights: ["Tree-Filled Green Preserves", "Environmental Awareness", "Shaded Picnic Getaways", "Rural Barangay Nature"],
    bestTimeToVisit: "8:00 AM - 4:30 PM",
    entranceFee: "Free Admission",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    travelTips: "Bring your own snacks and water; observe leave-no-trace eco guidelines.",
    coordinates: { lat: 15.9520, lng: 120.8700 }
  },

  // 🏛️ Cultural & Heritage Sites (Parks & Recreation)
  {
    id: "spot-culture-01",
    name: "Umingan Town Plaza & Heritage Dancing Fountain",
    category: "Parks & Recreation",
    location: "Poblacion West, Umingan, Pangasinan",
    description: "The civic heart of Umingan. Features manicured landscaped gardens, historical LGU monuments, children's park, and a night dancing fountain show set against the Municipal Hall.",
    highlights: ["7:00 PM Musical Fountain Show", "Historical 1811 Founding Emblem", "Town Center Food Kiosks", "Children's Play Park"],
    bestTimeToVisit: "5:00 PM - 9:00 PM",
    entranceFee: "Free Admission",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    travelTips: "Sample fresh hot coconut-grilled Tupig and halo-halo from local vendors surrounding the plaza in the evening.",
    coordinates: { lat: 15.9234, lng: 120.8412 }
  },
  {
    id: "spot-culture-02",
    name: "St. Immaculate Conception Parish Church",
    category: "Parks & Recreation",
    location: "Poblacion East, Umingan, Pangasinan",
    description: "A historical Spanish-colonial Catholic parish church that serves as the spiritual home of Uminganeans. Known for its stone belfry, quiet courtyard garden, and grand December 8 patronal celebration.",
    highlights: ["Colonial Architectural Facade", "Peaceful Prayer Courtyard", "Heritage Bell Tower", "Dec 8 Patronal Feast"],
    bestTimeToVisit: "6:00 AM - 6:00 PM",
    entranceFee: "Free Admission",
    image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    travelTips: "Observe quiet reverence during ongoing services. Masses are celebrated in Ilocano, Tagalog, and English.",
    coordinates: { lat: 15.9240, lng: 120.8430 }
  },

  // 🍱 Signature Local Dining, Delicacies Markets & Restaurants
  {
    id: "spot-food-01",
    name: "Umingan Native Delicacies Market (Tupig & Kankanen)",
    category: "Local Dining",
    location: "Public Market Perimeter, Poblacion, Umingan",
    description: "The official culinary center for authentic Pangasinan Tupig (charcoal-grilled galapong rice, young coconut strips, muscovado), Puto Calasiao, Inkiwar (Ilocano biko), and Patupat wrapped in palm leaves.",
    highlights: ["Charcoal-Grilled Hot Tupig", "Puto Calasiao & Kankanen", "Patupat sugarcane boiled rice", "Inkiwar (Ilocano Biko)"],
    bestTimeToVisit: "6:00 AM - 6:00 PM Daily",
    entranceFee: "Free Market Access",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    travelTips: "Buy fresh hot Tupig packs right off the charcoal grill for authentic pasalubong.",
    coordinates: { lat: 15.9220, lng: 120.8420 }
  },
  {
    id: "spot-food-02",
    name: "Calle Salientes Café",
    category: "Local Dining",
    location: "399 Salientes St, Poblacion West, Umingan (0.4 mi)",
    description: "A trendy outdoor garden café known for its live acoustic performances, signature Bangus ala Calle, unlimited pork liempo rice meals, samgyupsal, and refreshing iced coffees.",
    highlights: ["Outdoor Garden Atmosphere", "Bangus ala Calle & Liempo", "Signature Iced Coffees", "Live Band Entertainment"],
    bestTimeToVisit: "11:00 AM - 9:00 PM Daily",
    entranceFee: "₱1 - ₱500 per meal",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    travelTips: "Great evening hangout for acoustic music, iced coffee blends, and group outdoor dining.",
    coordinates: { lat: 15.9230, lng: 120.8400 }
  },
  {
    id: "spot-food-03",
    name: "Emong's Kambingan & Native Dishes",
    category: "Local Dining",
    location: "San Quintin Road, Umingan, Pangasinan (0.9 mi)",
    description: "A legendary local morning dining pitstop famous for hot, authentic Pinapaitan, Sinampalukang Kambing, Dinakdakan, and savory Pigarrang Baka.",
    highlights: ["Authentic Pinapaitan & Sinampalukan", "Crispy Dinakdakan", "Flash-Fried Pigarrang Baka", "Early Morning Breakfast"],
    bestTimeToVisit: "6:00 AM - 2:00 PM (Sells out early)",
    entranceFee: "₱1 - ₱200 per dish",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    rating: 4.3,
    travelTips: "Arrive before 9:00 AM for the freshest bowls of Pinapaitan and Sinampalukan.",
    coordinates: { lat: 15.9300, lng: 120.8450 }
  },
  {
    id: "spot-food-04",
    name: "Andrelito's Chicken Inasal",
    category: "Local Dining",
    location: "321 Gomez St, Umingan, Pangasinan (0.2 mi)",
    description: "Comfortable air-conditioned indoor restaurant specializing in authentic grilled chicken inasal, garlic rice, and Filipino comfort dishes.",
    highlights: ["Air-Conditioned Indoor Dining", "Authentic Chicken Inasal", "Garlic Rice Combos", "Family Meal Platter"],
    bestTimeToVisit: "11:00 AM - 9:00 PM",
    entranceFee: "Moderate Prices",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    travelTips: "Ideal lunch spot in Poblacion for air-conditioned dining and quick chicken inasal.",
    coordinates: { lat: 15.9235, lng: 120.8415 }
  },
  {
    id: "spot-food-05",
    name: "Eun-hye Bowl (Korean-Filipino Fusion)",
    category: "Local Dining",
    location: "Gomez St, Poblacion West, Umingan (0.1 mi)",
    description: "A specialized women-owned restaurant merging authentic Korean rice bowls and dishes with Filipino flavors. Features free Wi-Fi and healthy vegetarian menu items.",
    highlights: ["Korean Bibimbap & Rice Bowls", "Healthy Vegetarian Options", "Women-Owned Establishment", "Free Wi-Fi & Cozy Seating"],
    bestTimeToVisit: "9:00 AM - 7:00 PM (Mon-Sat)",
    entranceFee: "Moderate Prices",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    travelTips: "Try their vegetarian rice bowls and Korean fried chicken sets.",
    coordinates: { lat: 15.9238, lng: 120.8412 }
  },
  {
    id: "spot-food-06",
    name: "Sir Marlon Food Hub & B-One Tapsilog",
    category: "Local Dining",
    location: "70 Belisario St & Salientes St, Umingan (0.3 mi)",
    description: "Popular local hubs serving affordable Silog breakfast favorites (Bangsilog starting at ₱60), crispy fried chicken, barbecue skewers, burgers, fries, and sweet-savory Pares to Go.",
    highlights: ["₱60+ Bangsilog & Tapsilog", "Crispy Fried Chicken & Burgers", "Sweet-Savory Pares Stew", "Belisario & Salientes St Hubs"],
    bestTimeToVisit: "7:00 AM - 9:00 PM Daily",
    entranceFee: "Budget Friendly (₱60 - ₱180)",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    travelTips: "Quick, tasty, and economical meals right around Belisario and Salientes streets.",
    coordinates: { lat: 15.9240, lng: 120.8408 }
  },
  {
    id: "spot-food-07",
    name: "Authentic Pancit Cabagan & Batil Patong",
    category: "Local Dining",
    location: "Poblacion West, Umingan, Pangasinan (0.3 mi)",
    description: "Specialized noodle restaurant serving heavy, stir-fried Isabela and Tuguegarao noodle plates topped with crunchy lechon kawali, poached eggs, and rich egg soup.",
    highlights: ["Pancit Batil Patong with Lechon", "Pancit Cabagan Noodle Plates", "Poached Egg & Calamansi Dip", "Heavy Noodle Bilao"],
    bestTimeToVisit: "9:00 AM - 9:00 PM Daily",
    entranceFee: "Starting around ₱130",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    travelTips: "Order a full platter for sharing; mix the calamansi, onion, and soy sauce dip into your noodles.",
    coordinates: { lat: 15.9232, lng: 120.8422 }
  },
  {
    id: "spot-food-08",
    name: "Mamu's Goto Mami, Slurp Ramen & JS2 Samgyupsal",
    category: "Local Dining",
    location: "Barangay San Leon & The PAD Bldg / Holycare Bldg, Umingan",
    description: "Community dining favorites offering rich beef mami and goto in San Leon, Japanese ramen bowls at Slurp Ramen, and tabletop meat grilling at JS2 Samgyupsal in The PAD Building.",
    highlights: ["San Leon Rich Beef Mami & Goto", "Pansit Malabon Bilao Orders", "Japanese Slurp Ramen Bowls", "Tabletop Samgyupsal Grilling"],
    bestTimeToVisit: "10:00 AM - 9:00 PM",
    entranceFee: "Budget to Moderate",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    travelTips: "Great for weekend noodle cravings or group samgyupsal sessions.",
    coordinates: { lat: 15.9250, lng: 120.8400 }
  }
];

export const BARANGAYS: Barangay[] = [
  // Poblacion District
  { name: "Poblacion East", captain: "Hon. Reynaldo D. Garcia", zone: "Poblacion District", contact: "0917-555-0101", population: "3,850", mainLivelihood: "Commercial & Retail", hallLocation: "Rizal St., Poblacion East" },
  { name: "Poblacion West", captain: "Hon. Arlene S. Ramos", zone: "Poblacion District", contact: "0917-555-0102", population: "4,120", mainLivelihood: "Services & Governance", hallLocation: "Municipal Compound, Poblacion West" },

  // Northern Agricultural Plains
  { name: "Alo-o", captain: "Hon. Mario V. Soriano", zone: "Northern Agricultural Plains", contact: "0917-555-0104", population: "3,400", mainLivelihood: "Onion & Rice Farming", hallLocation: "Alo-o National Highway" },
  { name: "Abot Molina", captain: "Hon. Jaime P. Molina", zone: "Northern Agricultural Plains", contact: "0917-555-0113", population: "1,450", mainLivelihood: "Rice & Corn Farming", hallLocation: "Abot Molina Center" },
  { name: "Amaronan", captain: "Hon. Wilfredo S. Santos", zone: "Northern Agricultural Plains", contact: "0917-555-0114", population: "1,620", mainLivelihood: "Rice & Vegetable Farming", hallLocation: "Amaronan Proper" },
  { name: "Annam (San Felipe)", captain: "Hon. Felipe R. Tadeo", zone: "Northern Agricultural Plains", contact: "0917-555-0115", population: "1,880", mainLivelihood: "Rice & Crop Production", hallLocation: "Annam Road" },
  { name: "Bantug", captain: "Hon. Nestor C. Perez", zone: "Northern Agricultural Plains", contact: "0917-555-0116", population: "1,750", mainLivelihood: "Agricultural Crops", hallLocation: "Bantug Main St." },
  { name: "Baracbac", captain: "Hon. Ernesto L. Cruz", zone: "Northern Agricultural Plains", contact: "0917-555-0117", population: "1,390", mainLivelihood: "Rice & Livestock", hallLocation: "Baracbac Road" },
  { name: "Buenavista", captain: "Hon. Rodolfo M. Reyes", zone: "Northern Agricultural Plains", contact: "0917-555-0118", population: "1,520", mainLivelihood: "Agri-Crops & Poultry", hallLocation: "Buenavista Plaza" },
  { name: "Cabangaran", captain: "Hon. Dante B. Aquilino", zone: "Northern Agricultural Plains", contact: "0917-555-0119", population: "1,680", mainLivelihood: "Onion & Corn Farming", hallLocation: "Cabangaran Center" },
  { name: "Cabaruan", captain: "Hon. Manuel G. Toribio", zone: "Northern Agricultural Plains", contact: "0917-555-0120", population: "1,410", mainLivelihood: "Rice & Grain Drying", hallLocation: "Cabaruan Road" },
  { name: "Cabatuan", captain: "Hon. Gregorio V. Ramos", zone: "Northern Agricultural Plains", contact: "0917-555-0121", population: "1,590", mainLivelihood: "Vegetable Crops", hallLocation: "Cabatuan Proper" },
  { name: "Cádiz", captain: "Hon. Eduardo R. Fernandez", zone: "Northern Agricultural Plains", contact: "0917-555-0122", population: "1,350", mainLivelihood: "Rice & Corn Production", hallLocation: "Cadiz Center" },
  { name: "Calitlitan", captain: "Hon. Oscar P. Castro", zone: "Northern Agricultural Plains", contact: "0917-555-0123", population: "1,720", mainLivelihood: "Agri-Farming", hallLocation: "Calitlitan Main Rd" },
  { name: "Capas", captain: "Hon. Benigno S. Alcantara", zone: "Northern Agricultural Plains", contact: "0917-555-0124", population: "1,280", mainLivelihood: "Rice & Livestock", hallLocation: "Capas Proper" },
  { name: "Carayungan Sur", captain: "Hon. Tomas D. Villanueva", zone: "Northern Agricultural Plains", contact: "0917-555-0125", population: "1,840", mainLivelihood: "Onion & Rice Cultivation", hallLocation: "Carayungan Sur Road" },
  { name: "Prado", captain: "Hon. Teresa B. Mendoza", zone: "Northern Agricultural Plains", contact: "0917-555-0109", population: "2,740", mainLivelihood: "Rice & Seed Production", hallLocation: "Prado Center" },

  // Western Riverlands
  { name: "Barat", captain: "Hon. Fernando C. Aquino", zone: "Western Riverlands", contact: "0917-555-0103", population: "2,980", mainLivelihood: "Eco-Tourism & Agriculture", hallLocation: "Barat River Road" },
  { name: "Cabalitian", captain: "Hon. Danilo E. Castro", zone: "Western Riverlands", contact: "0917-555-0105", population: "2,650", mainLivelihood: "Corn & Vegetable Crop", hallLocation: "Near Cabalitian Elem. School" },
  { name: "Carosalesan", captain: "Hon. Ramon F. Navarro", zone: "Western Riverlands", contact: "0917-555-0126", population: "1,630", mainLivelihood: "Riverland Crops & Fishing", hallLocation: "Carosalesan Proper" },
  { name: "Casilan", captain: "Hon. Francisco T. Roxas", zone: "Western Riverlands", contact: "0917-555-0127", population: "1,490", mainLivelihood: "Rice & Vegetable Farming", hallLocation: "Casilan Main St." },
  { name: "Caurdanetaan", captain: "Hon. Silverio B. Soriano", zone: "Western Riverlands", contact: "0917-555-0128", population: "1,770", mainLivelihood: "Corn & Grain Production", hallLocation: "Caurdanetaan Center" },
  { name: "Concepción", captain: "Hon. Antonio M. Valdez", zone: "Western Riverlands", contact: "0917-555-0129", population: "1,820", mainLivelihood: "Rice & Agri-Trade", hallLocation: "Concepcion Proper" },
  { name: "Decreto", captain: "Hon. Victorio C. Imperial", zone: "Western Riverlands", contact: "0917-555-0130", population: "1,210", mainLivelihood: "Upland Rice Farming", hallLocation: "Decreto Road" },
  { name: "Diaz", captain: "Hon. Pedro S. Agpalo", zone: "Western Riverlands", contact: "0917-555-0131", population: "1,550", mainLivelihood: "Vegetable Farming", hallLocation: "Diaz Proper" },

  // Eastern Upland
  { name: "Esperanza", captain: "Hon. Benigno P. Bautista", zone: "Eastern Upland", contact: "0917-555-0107", population: "1,890", mainLivelihood: "Mount Amor Trekking & Orchard", hallLocation: "Mt. Amor Base, Esperanza" },
  { name: "Del Rosario (Treinta y Siete)", captain: "Hon. Lilia C. Flores", zone: "Eastern Upland", contact: "0917-555-0112", population: "2,050", mainLivelihood: "Dairy & Livestock Raising", hallLocation: "Del Rosario Road" },
  { name: "Diket", captain: "Hon. Apolinario D. Guico", zone: "Eastern Upland", contact: "0917-555-0132", population: "1,340", mainLivelihood: "Upland Crops & Forestry", hallLocation: "Diket Center" },
  { name: "Don Justo Ábalos (Caroan)", captain: "Hon. Bernardo K. Abalos", zone: "Eastern Upland", contact: "0917-555-0133", population: "1,790", mainLivelihood: "Orchard & Rice Cultivation", hallLocation: "Don Justo Abalos Hall" },
  { name: "Don Montano (Cadamortisan)", captain: "Hon. Crispulo R. Montano", zone: "Eastern Upland", contact: "0917-555-0134", population: "1,670", mainLivelihood: "Upland Farming & Livestock", hallLocation: "Don Montano Center" },
  { name: "Evangelista", captain: "Hon. Herminio A. Evangelista", zone: "Eastern Upland", contact: "0917-555-0135", population: "1,480", mainLivelihood: "Fruit Orchards & Rice", hallLocation: "Evangelista Road" },
  { name: "Flores", captain: "Hon. Teodoro S. Flores", zone: "Eastern Upland", contact: "0917-555-0136", population: "1,610", mainLivelihood: "Upland Agriculture", hallLocation: "Flores Proper" },
  { name: "Fulgosino", captain: "Hon. Maximino P. Fulgencio", zone: "Eastern Upland", contact: "0917-555-0137", population: "1,290", mainLivelihood: "Root Crops & Poultry", hallLocation: "Fulgosino Hall" },

  // Southern Foothills
  { name: "San Vicente", captain: "Hon. Rodrigo T. Dela Cruz", zone: "Southern Foothills", contact: "0917-555-0108", population: "3,150", mainLivelihood: "Rice & Livestock Raising", hallLocation: "San Vicente Main Rd" },
  { name: "La Paz", captain: "Hon. Ernesto M. Reyes", zone: "Southern Foothills", contact: "0917-555-0110", population: "2,300", mainLivelihood: "Fruit Orchards & Poultry", hallLocation: "La Paz Plaza" },
  { name: "Gonzales (Carayungan)", captain: "Hon. Gabriel D. Gonzales", zone: "Southern Foothills", contact: "0917-555-0138", population: "1,920", mainLivelihood: "Onion & Rice Cultivation", hallLocation: "Gonzales Center" },
  { name: "Labuan", captain: "Hon. Artemio C. Serrano", zone: "Southern Foothills", contact: "0917-555-0139", population: "1,510", mainLivelihood: "Livestock & Grains", hallLocation: "Labuan Road" },
  { name: "Lauren", captain: "Hon. Lorenzo M. Pascual", zone: "Southern Foothills", contact: "0917-555-0140", population: "1,380", mainLivelihood: "Rice Farming", hallLocation: "Lauren Center" },
  { name: "Lubong", captain: "Hon. Hipolito F. Santos", zone: "Southern Foothills", contact: "0917-555-0141", population: "1,650", mainLivelihood: "Corn & Vegetable Crops", hallLocation: "Lubong Main Rd" },
  { name: "Luna Weste", captain: "Hon. Nicanor S. Luna", zone: "Southern Foothills", contact: "0917-555-0142", population: "1,740", mainLivelihood: "Rice & Seed Crops", hallLocation: "Luna Weste Plaza" },
  { name: "Luna Este", captain: "Hon. Mario S. Luna", zone: "Southern Foothills", contact: "0917-555-0143", population: "1,680", mainLivelihood: "Rice & Grain Production", hallLocation: "Luna Este Hall" },
  { name: "Mantacdang", captain: "Hon. Esteban P. Corpuz", zone: "Southern Foothills", contact: "0917-555-0144", population: "1,420", mainLivelihood: "Poultry & Rice", hallLocation: "Mantacdang Center" },

  // Central Plains & Agricultural Hubs
  { name: "Maseil-seil", captain: "Hon. Virgilio R. Domingo", zone: "Central Plains", contact: "0917-555-0145", population: "1,310", mainLivelihood: "Rice & High-Value Crops", hallLocation: "Maseil-seil Proper" },
  { name: "Nampalcan", captain: "Hon. Romulo C. Tadeo", zone: "Central Plains", contact: "0917-555-0146", population: "1,560", mainLivelihood: "Agricultural Trade", hallLocation: "Nampalcan Road" },
  { name: "Nancalabasaan", captain: "Hon. Severino M. Aguilar", zone: "Central Plains", contact: "0917-555-0147", population: "1,830", mainLivelihood: "Onion & Rice Cultivation", hallLocation: "Nancalabasaan Center" },
  { name: "Pangangaan", captain: "Hon. Felixberto G. Soriano", zone: "Central Plains", contact: "0917-555-0148", population: "1,270", mainLivelihood: "Rice & Corn Farming", hallLocation: "Pangangaan Proper" },
  { name: "Papallasen", captain: "Hon. Cenon P. Aquino", zone: "Central Plains", contact: "0917-555-0149", population: "1,440", mainLivelihood: "Crop Farming", hallLocation: "Papallasen Hall" },
  { name: "Pemienta", captain: "Hon. Juanito D. Pimentel", zone: "Central Plains", contact: "0917-555-0150", population: "1,360", mainLivelihood: "Vegetable Crops", hallLocation: "Pemienta Center" },
  { name: "Resurrección", captain: "Hon. Salvador M. Resurreccion", zone: "Central Plains", contact: "0917-555-0151", population: "1,690", mainLivelihood: "Rice & Grain Processing", hallLocation: "Resurreccion Road" },
  { name: "Ricos", captain: "Hon. Dionisio P. Ricos", zone: "Central Plains", contact: "0917-555-0152", population: "1,400", mainLivelihood: "Rice Farming", hallLocation: "Ricos Proper" },
  { name: "San Andrés (Parang)", captain: "Hon. Andres T. De Leon", zone: "Central Plains", contact: "0917-555-0153", population: "1,710", mainLivelihood: "Rice & Pasture Crops", hallLocation: "San Andres Plaza" },
  { name: "San Juan", captain: "Hon. Juanito C. Bautista", zone: "Central Plains", contact: "0917-555-0154", population: "1,950", mainLivelihood: "Commercial & Farming", hallLocation: "San Juan Center" },
  { name: "San Leon", captain: "Hon. Leoncio M. De Cruz", zone: "Central Plains", contact: "0917-555-0155", population: "1,880", mainLivelihood: "Onion & Rice Farming", hallLocation: "San Leon Road" },
  { name: "San Pablo", captain: "Hon. Pablo R. Fernandez", zone: "Central Plains", contact: "0917-555-0156", population: "1,640", mainLivelihood: "Grain & Seed Crops", hallLocation: "San Pablo Center" },
  { name: "Santa María", captain: "Hon. Maria C. Santos", zone: "Central Plains", contact: "0917-555-0157", population: "1,780", mainLivelihood: "Rice & High-Value Crops", hallLocation: "Santa Maria Plaza" },
  { name: "Santa Rosa", captain: "Hon. Rosalina G. Perez", zone: "Central Plains", contact: "0917-555-0158", population: "1,530", mainLivelihood: "Vegetable & Corn Farming", hallLocation: "Santa Rosa Hall" },
  { name: "Sinabaan (Mondragon)", captain: "Hon. Amado V. Mondragon", zone: "Central Plains", contact: "0917-555-0159", population: "1,660", mainLivelihood: "Onion & Rice Cultivation", hallLocation: "Sinabaan Road" },
  { name: "Tanggal Sawang", captain: "Hon. Catalino B. Sawang", zone: "Central Plains", contact: "0917-555-0160", population: "1,320", mainLivelihood: "Upland Rice & Livestock", hallLocation: "Tanggal Sawang Center" }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { office: "MDRRMO Rescue 911 Umingan", hotline: "+63 917 123 4567", landline: "(075) 574-9111", address: "MDRRMO Bldg., Municipal Hall Compound", available: "24/7 Active Operations", icon: "ShieldAlert" },
  { office: "PNP Umingan Police Station", hotline: "+63 998 598 5092", landline: "(075) 574-2110", address: "Poblacion West, Umingan", available: "24/7 Police Patrol", icon: "Siren" },
  { office: "BFP Bureau of Fire Protection", hotline: "+63 923 741 8912", landline: "(075) 574-3221", address: "Fire Station, Gov. Forbes St., Umingan", available: "24/7 Fire & Rescue", icon: "Flame" },
  { office: "Umingan Community Medicare Hospital / RHU", hotline: "+63 920 888 7766", landline: "(075) 574-4100", address: "Health Center Road, Poblacion East", available: "24/7 Emergency Room", icon: "HeartPulse" },
  { office: "Municipal Agriculture & Disaster Hotline", hotline: "+63 918 444 3322", address: "Agri Bldg., Municipal Hall", available: "Mon-Fri 8am-5pm", icon: "Sprout" },
  { office: "PANELCO III Electric Cooperative (Umingan Desk)", hotline: "+63 919 333 8811", landline: "(075) 574-0012", address: "Substation, Umingan", available: "24/7 Line Maintenance", icon: "Zap" }
];
