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
  category: 'Nature & Adventure' | 'Cultural & Heritage' | 'Agri-Tourism' | 'Food & Delicacies' | 'Parks & Recreation';
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
  zone: 'Poblacion District' | 'Northern Agricultural Plains' | 'Southern Foothills' | 'Eastern Upland' | 'Western Riverlands';
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
  mayor: "Hon. Michael Carleone M. Cruz",
  viceMayor: "Hon. Catherine M. Perez",
  foundedYear: "1811",
  landArea: "258.49 km²",
  barangayCount: 58,
  classification: "1st Class Municipality",
  hallAddress: "Poblacion West, Umingan, Pangasinan 2443",
  operatingHours: "Monday - Friday, 8:00 AM - 5:00 PM (Except Holidays)",
  email: "contact@umingan.gov.ph",
  phone: "(075) 574-1234 / +63 917 888 2443"
};

export const MUNICIPAL_OFFICIALS: MunicipalOfficial[] = [
  {
    name: "Hon. Michael Carleone M. Cruz",
    position: "Municipal Mayor",
    committee: "Executive & Administrative Operations",
    officeHours: "Mon-Fri 8:00 AM - 5:00 PM",
    image: "https://picsum.photos/seed/mayor_umingan/400/400",
    quote: "Serving every Uminganean with integrity, transparency, and continuous development for a resilient town."
  },
  {
    name: "Hon. Catherine M. Perez",
    position: "Municipal Vice Mayor",
    committee: "Presiding Officer, Sangguniang Bayan",
    officeHours: "Mon-Fri 8:00 AM - 5:00 PM",
    image: "https://picsum.photos/seed/vicemayor_umingan/400/400",
    quote: "Fostering progressive legislation that directly uplifts our farmers, youth, and local entrepreneurs."
  },
  {
    name: "Hon. Eduardo R. Santos",
    position: "Sangguniang Bayan Member",
    committee: "Chairman, Agriculture & Cooperative Development",
    officeHours: "Tue & Thu Sessions",
    image: "https://picsum.photos/seed/sb_santos/400/400"
  },
  {
    name: "Hon. Maria Luisa A. Gonzales",
    position: "Sangguniang Bayan Member",
    committee: "Chairwoman, Health, Sanitation & Social Services",
    officeHours: "Tue & Thu Sessions",
    image: "https://picsum.photos/seed/sb_gonzales/400/400"
  },
  {
    name: "Hon. Roberto P. Villanueva",
    position: "Sangguniang Bayan Member",
    committee: "Chairman, Infrastructure, Public Works & Zoning",
    officeHours: "Tue & Thu Sessions",
    image: "https://picsum.photos/seed/sb_villanueva/400/400"
  },
  {
    name: "Hon. Grace T. Fernandez",
    position: "Sangguniang Bayan Member",
    committee: "Chairwoman, Tourism, Trade & Cultural Heritage",
    officeHours: "Tue & Thu Sessions",
    image: "https://picsum.photos/seed/sb_fernandez/400/400"
  }
];

export const MUNICIPAL_NEWS: NewsArticle[] = [
  {
    id: "news-01",
    title: "LGU Umingan Breaks Ground on New Agri-Processing & Cold Storage Facility in Barangay Alo-o",
    category: "Infrastructure",
    date: "July 28, 2026",
    summary: "Mayor Cruz leads the ceremonial groundbreaking for the ₱45-Million modern agricultural center aimed at empowering local onion, corn, and vegetable farmers.",
    content: "The Local Government Unit of Umingan, Pangasinan officially initiated the construction of a state-of-the-art Agri-Processing & Cold Storage Facility in Barangay Alo-o. Funded through combined municipal capital development funds and Department of Agriculture grants, the facility will feature a 500-metric-ton cold storage capacity, solar drying pavements, and an automated sorting shed. This initiative will drastically minimize post-harvest losses for local onion and vegetable growers across Eastern Pangasinan.",
    author: "Umingan Information Office",
    image: "https://picsum.photos/seed/agri_facility_umingan/800/500",
    featured: true,
    docRef: "EO-2026-042"
  },
  {
    id: "news-02",
    title: "Annual Kanen Festival 2026 Set to Celebrate Umingan's Sticky Rice Delicacies This December",
    category: "Culture & Events",
    date: "July 22, 2026",
    summary: "Preparations are underway for the grand Kanen Festival, featuring the longest Tupig and Suman display, street dancing competitions, and trade fairs.",
    content: "The Municipal Tourism Office announced the official schedule for the annual Kanen Festival 2026. Highlighting Umingan's culinary heritage, the festival brings together 58 barangays to showcase authentic Pangasinan and Ilocano sticky rice dainties like Tupig, Suman, Kalamay, and Patupat. Events will include a street dancing parade along the Municipal Plaza, cook-off challenges, and an evening agri-craft night market.",
    author: "Municipal Tourism Office",
    image: "https://picsum.photos/seed/kanen_festival_umingan/800/500",
    featured: true,
    docRef: "MUNICIPAL-RES-2026-108"
  },
  {
    id: "news-03",
    title: "Executive Order No. 18: Streamlined Business Permit Renewal & One-Stop Shop Rollout",
    category: "Executive Order",
    date: "July 15, 2026",
    summary: "Business owners can now assess tax fees and process clearance applications online via the official Umingan e-Services Portal.",
    content: "Under Executive Order No. 18, S-2026, Mayor Michael Carleone M. Cruz mandates the integration of digital assessment tools for the Business Permit and Licensing Office (BPLO). Local entrepreneurs in Umingan can now calculate tax assessments, upload Barangay clearances, and schedule fire & sanitary inspections online, reducing processing times from 5 days down to under 24 hours.",
    author: "Office of the Municipal Mayor",
    image: "https://picsum.photos/seed/bplo_umingan/800/500",
    featured: false,
    docRef: "EO-2026-018"
  },
  {
    id: "news-04",
    title: "MDRRMO Advisory: Water Level Monitoring & Flood Preparedness along Barat River Watershed",
    category: "Health & Safety",
    date: "July 10, 2026",
    summary: "Real-time telemetry water level sensors installed at Barat River Spillway to ensure early warning alerts during monsoon rains.",
    content: "The Municipal Disaster Risk Reduction and Management Office (MDRRMO) of Umingan has activated early-warning telemetry gauges at the Barat River Spillway. Residents in low-lying barangays including Cabalitian, Barat, and San Vicente are advised to save emergency hotlines and monitor official LGU advisories during heavy afternoon downpours.",
    author: "MDRRMO Umingan",
    image: "https://picsum.photos/seed/mdrrmo_umingan/800/500",
    featured: false,
    docRef: "ADV-2026-088"
  },
  {
    id: "news-05",
    title: "RSBSA Farmers Assistance Drive: Distribution of Subsidized Seeds & Fertilizer Vouchers",
    category: "Agriculture",
    date: "June 29, 2026",
    summary: "Over 3,200 registered rice and corn farmers receive high-yield certified seeds and fuel vouchers at the Umingan Civic Center.",
    content: "The Municipal Agriculture Office conducted a three-day distribution of high-yield hybrid rice seeds, organic fertilizers, and fuel subsidy cards to farmers registered in the Registry System for Basic Sectors in Agriculture (RSBSA). Farmers who haven't updated their RSBSA profiles are encouraged to visit the Municipal Agriculture desk.",
    author: "Municipal Agriculture Office",
    image: "https://picsum.photos/seed/farming_umingan/800/500",
    featured: false,
    docRef: "AGRI-BULL-2026-05"
  }
];

export const TOURIST_SPOTS: TouristSpot[] = [
  {
    id: "spot-01",
    name: "Mount Amor Hike & Panoramic View Deck",
    category: "Nature & Adventure",
    location: "Barangay Esperanza / Foothills of Caraballo Range, Umingan",
    description: "A breathtaking mountain peak offering sweeping 360-degree views of Pangasinan rice plains and the Caraballo mountain range. Ideal for morning trekking, camping, and sea-of-clouds photography.",
    highlights: ["Panoramic View Deck", "Sunrise Sea of Clouds", "Eco-Trail Trekking", "Camping Grounds"],
    bestTimeToVisit: "5:00 AM - 10:00 AM (Dry Season Nov - May)",
    entranceFee: "₱30 Environmental Fee + Local Guide Fee",
    image: "https://picsum.photos/seed/mount_amor_umingan/800/600",
    rating: 4.9,
    travelTips: "Wear sturdy hiking shoes, bring water bottles, and register at the Barangay Esperanza Eco-Tourism outpost prior to ascents.",
    coordinates: { lat: 15.9321, lng: 120.8904 }
  },
  {
    id: "spot-02",
    name: "Barat River Eco-Park & River Spillway",
    category: "Parks & Recreation",
    location: "Barangay Barat, Umingan, Pangasinan",
    description: "A serene eco-park featuring fresh mountain stream waters flowing through the Barat River spillway. Local families gather for weekend picnics, bamboo rafting, and refreshing swims.",
    highlights: ["Clean River Swimming", "Shaded Picnic Cottages", "Bamboo Rafting", "Sunset Riverside Walk"],
    bestTimeToVisit: "8:00 AM - 5:00 PM (Weekends & Holidays)",
    entranceFee: "₱20 Entrance | Cottage Rental ₱250 - ₱500",
    image: "https://picsum.photos/seed/barat_river_umingan/800/600",
    rating: 4.8,
    travelTips: "Maintain cleanliness and practice leave-no-trace principles. Floating vests are available for young children.",
    coordinates: { lat: 15.9188, lng: 120.8655 }
  },
  {
    id: "spot-03",
    name: "Salasa Natural Caves & Eco-Trail",
    category: "Nature & Adventure",
    location: "Barangay Salasa, Umingan",
    description: "A fascinating limestone cave formation surrounded by lush jungle foliage. Features underground limestone chambers, stalactite formations, and cool mountain breezes.",
    highlights: ["Limestone Formations", "Guided Cave Exploration", "Flora & Fauna Eco-Trail", "Nature Photography"],
    bestTimeToVisit: "8:00 AM - 3:00 PM",
    entranceFee: "₱50 Guide & Headlamp Rental included",
    image: "https://picsum.photos/seed/salasa_caves_umingan/800/600",
    rating: 4.7,
    travelTips: "Caving helmets and flashlights are provided at the barangay hall. Wear non-slip footwear.",
    coordinates: { lat: 15.9450, lng: 120.8800 }
  },
  {
    id: "spot-04",
    name: "Umingan Town Plaza & Dancing Heritage Fountain",
    category: "Cultural & Heritage",
    location: "Poblacion West, Umingan",
    description: "The vibrant heart of Umingan town center. Features manicured gardens, historical monuments, children's playground, and an evening musical fountain show.",
    highlights: ["Musical Fountain Show (7 PM)", "Historical Town Monument", "Food Stalls & Kiosks", "Children Play Park"],
    bestTimeToVisit: "5:00 PM - 9:00 PM",
    entranceFee: "Free Admission",
    image: "https://picsum.photos/seed/plaza_umingan/800/600",
    rating: 4.8,
    travelTips: "Try the freshly grilled Tupig and halo-halo from local vendors surrounding the plaza in the evening.",
    coordinates: { lat: 15.9234, lng: 120.8412 }
  },
  {
    id: "spot-05",
    name: "St. Immaculate Conception Parish Church",
    category: "Cultural & Heritage",
    location: "Poblacion East, Umingan, Pangasinan",
    description: "A historic Catholic church built with Spanish colonial architectural influences, standing as a spiritual and cultural anchor for generations of Uminganeans.",
    highlights: ["Spanish-Era Architecture", "Peaceful Prayer Courtyard", "Heritage Bell Tower", "Feast Day Dec 8"],
    bestTimeToVisit: "6:00 AM - 6:00 PM",
    entranceFee: "Free Admission",
    image: "https://picsum.photos/seed/church_umingan/800/600",
    rating: 4.9,
    travelTips: "Observe quiet reverence inside the sanctuary. Sunday masses are held in Ilocano, Tagalog, and English.",
    coordinates: { lat: 15.9240, lng: 120.8430 }
  },
  {
    id: "spot-06",
    name: "Umingan Kanen & Delicacies Street Market",
    category: "Food & Delicacies",
    location: "Public Market Perimeter, Poblacion",
    description: "The ultimate destination to taste authentic Pangasinan sticky rice delicacies (Kanen) baked over coconut husks, including hot Tupig, Patupat, Kalamay, and Bibingka.",
    highlights: ["Fresh Coconut Husk Tupig", "Traditional Kalamay", "Ilocano Pinakbet & Bagnet Eats", "Local Honey & Farm Products"],
    bestTimeToVisit: "6:00 AM - 6:00 PM Daily",
    entranceFee: "Free Admission",
    image: "https://picsum.photos/seed/tupig_delicacy_umingan/800/600",
    rating: 4.9,
    travelTips: "Buy pasalubong in boxes; sellers offer fresh hot tupig wrapped in banana leaves made daily.",
    coordinates: { lat: 15.9220, lng: 120.8420 }
  }
];

export const BARANGAYS: Barangay[] = [
  { name: "Poblacion East", captain: "Hon. Reynaldo D. Garcia", zone: "Poblacion District", contact: "0917-555-0101", population: "3,850", mainLivelihood: "Commercial & Retail", hallLocation: "Rizal St., Poblacion East" },
  { name: "Poblacion West", captain: "Hon. Arlene S. Ramos", zone: "Poblacion District", contact: "0917-555-0102", population: "4,120", mainLivelihood: "Services & Governance", hallLocation: "Municipal Compound, Poblacion West" },
  { name: "Barat", captain: "Hon. Fernando C. Aquino", zone: "Western Riverlands", contact: "0917-555-0103", population: "2,980", mainLivelihood: "Eco-Tourism & Agriculture", hallLocation: "Barat River Road" },
  { name: "Alo-o", captain: "Hon. Mario V. Soriano", zone: "Northern Agricultural Plains", contact: "0917-555-0104", population: "3,400", mainLivelihood: "Onion & Rice Farming", hallLocation: "Alo-o National Highway" },
  { name: "Cabalitian", captain: "Hon. Danilo E. Castro", zone: "Western Riverlands", contact: "0917-555-0105", population: "2,650", mainLivelihood: "Corn & Vegetable Crop", hallLocation: "Near Cabalitian Elem. School" },
  { name: "Salasa", captain: "Hon. Josefina M. Lopez", zone: "Eastern Upland", contact: "0917-555-0106", population: "2,100", mainLivelihood: "Caving Tourism & Upland Crops", hallLocation: "Salasa Proper" },
  { name: "Esperanza", captain: "Hon. Benigno P. Bautista", zone: "Eastern Upland", contact: "0917-555-0107", population: "1,890", mainLivelihood: "Mount Amor Trekking & Orchard", hallLocation: "Mt. Amor Base, Esperanza" },
  { name: "San Vicente", captain: "Hon. Rodrigo T. Dela Cruz", zone: "Southern Foothills", contact: "0917-555-0108", population: "3,150", mainLivelihood: "Rice & Livestock Raising", hallLocation: "San Vicente Main Rd" },
  { name: "Prado", captain: "Hon. Teresa B. Mendoza", zone: "Northern Agricultural Plains", contact: "0917-555-0109", population: "2,740", mainLivelihood: "Rice & Seed Production", hallLocation: "Prado Center" },
  { name: "La Paz", captain: "Hon. Ernesto M. Reyes", zone: "Southern Foothills", contact: "0917-555-0110", population: "2,300", mainLivelihood: "Fruit Orchards & Poultry", hallLocation: "La Paz Plaza" },
  { name: "San Manuel", captain: "Hon. Gabriel D. Perez", zone: "Northern Agricultural Plains", contact: "0917-555-0111", population: "2,910", mainLivelihood: "High-Value Crop Cultivation", hallLocation: "San Manuel Proper" },
  { name: "Del Rosario", captain: "Hon. Lilia C. Flores", zone: "Southern Foothills", contact: "0917-555-0112", population: "2,050", mainLivelihood: "Dairy & Livestock", hallLocation: "Del Rosario Road" }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { office: "MDRRMO Rescue 911 Umingan", hotline: "+63 917 123 4567", landline: "(075) 574-9111", address: "MDRRMO Bldg., Municipal Hall Compound", available: "24/7 Active Operations", icon: "ShieldAlert" },
  { office: "PNP Umingan Police Station", hotline: "+63 998 598 5092", landline: "(075) 574-2110", address: "Poblacion West, Umingan", available: "24/7 Police Patrol", icon: "Siren" },
  { office: "BFP Bureau of Fire Protection", hotline: "+63 923 741 8912", landline: "(075) 574-3221", address: "Fire Station, Gov. Forbes St., Umingan", available: "24/7 Fire & Rescue", icon: "Flame" },
  { office: "Umingan Community Medicare Hospital / RHU", hotline: "+63 920 888 7766", landline: "(075) 574-4100", address: "Health Center Road, Poblacion East", available: "24/7 Emergency Room", icon: "HeartPulse" },
  { office: "Municipal Agriculture & Disaster Hotline", hotline: "+63 918 444 3322", address: "Agri Bldg., Municipal Hall", available: "Mon-Fri 8am-5pm", icon: "Sprout" },
  { office: "PANELCO III Electric Cooperative (Umingan Desk)", hotline: "+63 919 333 8811", landline: "(075) 574-0012", address: "Substation, Umingan", available: "24/7 Line Maintenance", icon: "Zap" }
];
