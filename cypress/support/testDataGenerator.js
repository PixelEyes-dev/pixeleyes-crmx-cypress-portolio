/**
 * Test Data Generator Utility
 * Provides functions to generate random test data for e2e tests
 */

// Sample data arrays for generating realistic test data
const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Christopher",
  "Karen",
  "Charles",
  "Nancy",
  "Daniel",
  "Lisa",
  "Matthew",
  "Betty",
  "Anthony",
  "Helen",
  "Mark",
  "Sandra",
  "Donald",
  "Donna",
  "Steven",
  "Carol",
  "Paul",
  "Ruth",
  "Andrew",
  "Sharon",
  "Joshua",
  "Michelle",
  "Kenneth",
  "Laura",
  "Kevin",
  "Emily",
  "Brian",
  "Kimberly",
  "George",
  "Deborah",
  "Edward",
  "Dorothy",
  "Ronald",
  "Timothy",
  "Jason",
  "Jeffrey",
  "Ryan",
  "Jacob",
  "Gary",
  "Nicholas",
  "Eric",
  "Jonathan",
  "Stephen",
  "Larry",
  "Justin",
  "Scott",
  "Brandon",
  "Benjamin",
  "Samuel",
  "Frank",
  "Gregory",
  "Raymond",
  "Alexander",
  "Patrick",
  "Jack",
  "Dennis",
  "Jerry",
  "Tyler",
  "Aaron",
  "Jose",
  "Adam",
  "Nathan",
  "Henry",
  "Douglas",
  "Zachary",
  "Peter",
  "Kyle",
  "Walter",
  "Ethan",
  "Jeremy",
  "Harold",
  "Carl",
  "Keith",
  "Roger",
  "Gerald",
  "Eugene",
  "Arthur",
  "Terry",
  "Sean",
  "Christian",
  "Lawrence",
  "Bruce",
  "Albert",
  "Willie",
  "Gabriel",
  "Alan",
  "Juan",
  "Wayne",
  "Roy",
  "Dylan",
  "Ralph",
  "Randy",
  "Vincent",
  "Russell",
  "Elijah",
  "Louis",
  "Bobby",
  "Philip",
  "Johnny",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
  "Gomez",
  "Phillips",
  "Evans",
  "Turner",
  "Diaz",
  "Parker",
  "Cruz",
  "Edwards",
  "Collins",
  "Reyes",
  "Stewart",
  "Morris",
  "Morales",
  "Murphy",
  "Cook",
  "Rogers",
  "Gutierrez",
  "Ortiz",
  "Morgan",
  "Cooper",
  "Peterson",
  "Bailey",
  "Reed",
  "Kelly",
  "Howard",
  "Ramos",
  "Kim",
  "Cox",
  "Ward",
  "Richardson",
  "Watson",
  "Brooks",
  "Chavez",
  "Wood",
  "James",
  "Bennett",
  "Gray",
  "Mendoza",
  "Ruiz",
  "Hughes",
  "Price",
  "Alvarez",
  "Castillo",
  "Sanders",
  "Patel",
  "Myers",
  "Long",
  "Ross",
  "Foster",
  "Jimenez",
  "Powell",
  "Jenkins",
  "Perry",
  "Russell",
  "Sullivan",
  "Bell",
  "Coleman",
  "Butler",
  "Henderson",
  "Barnes",
  "Gonzales",
  "Fisher",
  "Vasquez",
  "Simmons",
  "Romero",
  "Jordan",
  "Patterson",
  "Alexander",
  "Hamilton",
  "Graham",
  "Reynolds",
  "Griffin",
  "Wallace",
  "Moreno",
  "West",
  "Cole",
  "Hayes",
  "Bryant",
  "Hererra",
  "Gibson",
  "Ellis",
  "Tran",
  "Medina",
  "Aguilar",
  "Stevens",
  "Murray",
  "Ford",
  "Castro",
  "Marshall",
  "Owens",
  "Harrison",
  "Fernandez",
  "Mcdonald",
  "Woods",
  "Washington",
  "Kennedy",
  "Wells",
  "Vargas",
  "Henry",
  "Chen",
  "Freeman",
  "Webb",
  "Tucker",
  "Guzman",
  "Burns",
  "Crawford",
  "Olson",
  "Simpson",
  "Porter",
  "Hunter",
  "Gordon",
  "Mendez",
  "Silva",
  "Shaw",
  "Snyder",
  "Mason",
  "Dixon",
  "Muñoz",
  "Hunt",
  "Hicks",
  "Holmes",
  "Palmer",
  "Wagner",
  "Black",
  "Robertson",
  "Boyd",
  "Rose",
  "Stone",
  "Salazar",
  "Fox",
  "Warren",
  "Mills",
  "Meyer",
  "Rice",
  "Schmidt",
  "Garza",
  "Daniels",
  "Ferguson",
  "Nichols",
  "Stephens",
  "Soto",
  "Weaver",
  "Ryan",
  "Gardner",
  "Payne",
  "Grant",
  "Dunn",
  "Kelley",
  "Spencer",
  "Hawkins",
  "Arnold",
  "Pierce",
  "Vazquez",
  "Hansen",
  "Peters",
  "Santos",
  "Hart",
  "Bradley",
  "Knight",
  "Elliott",
  "Cunningham",
  "Duncan",
  "Armstrong",
  "Hudson",
  "Carroll",
  "Lane",
  "Riley",
  "Andrews",
  "Alvarado",
  "Ray",
  "Delgado",
  "Berry",
  "Perkins",
  "Hoffman",
  "Johnston",
  "Matthews",
  "Pena",
  "Richards",
  "Contreras",
  "Willis",
  "Carpenter",
  "Lawrence",
  "Sandoval",
  "Guerrero",
  "George",
  "Chapman",
  "Rios",
  "Estrada",
  "Ortega",
  "Watkins",
  "Greene",
  "Nunez",
  "Wheeler",
  "Valdez",
  "Harper",
  "Burke",
  "Larson",
  "Santiago",
  "Maldonado",
  "Morrison",
  "Franklin",
  "Carlson",
  "Austin",
  "Dominguez",
  "Carr",
  "Lawson",
  "Jacobs",
  "Obrien",
  "Lynch",
  "Singh",
  "Vega",
  "Bishop",
  "Montgomery",
  "Oliver",
  "Jensen",
  "Harvey",
  "Williamson",
  "Gilbert",
  "Dean",
  "Sims",
  "Espinoza",
  "Howell",
  "Li",
  "Wong",
  "Reid",
  "Hanson",
  "Le",
  "Mccoy",
  "Garrett",
  "Burton",
  "Fuller",
  "Wang",
  "Weber",
  "Welch",
  "Rojas",
  "Lucas",
  "Marquez",
  "Fields",
  "Park",
  "Yang",
  "Little",
  "Banks",
  "Padilla",
  "Day",
  "Walsh",
  "Bowman",
  "Schultz",
  "Luna",
  "Fowler",
  "Mejia",
  "Davidson",
  "Brewer",
  "May",
  "Holland",
  "Juarez",
  "Newman",
  "Pearson",
  "Curtis",
  "Cortez",
  "Douglas",
  "Schneider",
  "Joseph",
  "Barrett",
  "Navarro",
  "Figueroa",
  "Keller",
  "Avila",
  "Wade",
  "Molina",
  "Stanley",
  "Hopkins",
  "Campos",
  "Barnett",
  "Bates",
  "Chambers",
  "Caldwell",
  "Beck",
  "Lambert",
  "Miranda",
  "Byrd",
  "Preston",
  "Morton",
  "Wilcox",
  "Anthony",
  "Buckner",
  "Kaufman",
  "Parks",
  "Mcbride",
  "Cobb",
  "Davenport",
  "Gates",
  "Clay",
  "Ayala",
  "Sawyer",
  "Roman",
  "Dickerson",
  "Hodge",
  "Acosta",
  "Flynn",
];

const companySuffixes = [
  "Inc",
  "Corp",
  "LLC",
  "Ltd",
  "Company",
  "Enterprises",
  "Solutions",
  "Systems",
  "Technologies",
  "Industries",
  "Group",
  "Partners",
  "Associates",
  "Consulting",
  "Services",
  "International",
  "Global",
  "Digital",
  "Innovation",
  "Creative",
  "Marketing",
  "Media",
  "Design",
  "Development",
  "Software",
  "Hardware",
  "Network",
  "Security",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Construction",
  "Real Estate",
  "Transportation",
  "Energy",
  "Food",
  "Fashion",
  "Entertainment",
  "Sports",
  "Fitness",
  "Wellness",
  "Beauty",
  "Automotive",
  "Electronics",
  "Pharmaceuticals",
  "Biotechnology",
  "Research",
  "Laboratory",
];

const companyPrefixes = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "Omicron",
  "Pi",
  "Rho",
  "Sigma",
  "Tau",
  "Upsilon",
  "Phi",
  "Chi",
  "Psi",
  "Omega",
  "Nova",
  "Stellar",
  "Cosmic",
  "Galactic",
  "Quantum",
  "Neural",
  "Cyber",
  "Digital",
  "Virtual",
  "Cloud",
  "Data",
  "Info",
  "Tech",
  "Net",
  "Web",
  "Mobile",
  "Smart",
  "Future",
  "Next",
  "Prime",
  "Elite",
  "Premium",
  "Advanced",
  "Innovative",
  "Creative",
  "Dynamic",
  "Strategic",
  "Global",
  "International",
  "Universal",
  "Worldwide",
  "Enterprise",
  "Professional",
  "Expert",
  "Master",
  "Leading",
  "Top",
  "Best",
  "First",
  "New",
  "Modern",
  "Contemporary",
  "Progressive",
  "Forward",
  "Vision",
  "Mission",
  "Goal",
  "Target",
  "Focus",
  "Core",
  "Central",
  "Main",
  "Primary",
  "Essential",
  "Vital",
  "Key",
  "Critical",
];

const domains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "mail.com",
  "live.com",
  "msn.com",
  "comcast.net",
  "verizon.net",
  "att.net",
  "charter.net",
  "cox.net",
  "earthlink.net",
  "juno.com",
  "netzero.net",
  "rocketmail.com",
  "ymail.com",
  "fastmail.com",
  "tutanota.com",
  "zoho.com",
  "yandex.com",
  "mail.ru",
  "gmx.com",
  "web.de",
  "t-online.de",
  "freenet.de",
  "arcor.de",
  "gmx.de",
  "webmail.co.za",
  "mweb.co.za",
  "vodamail.co.za",
];

const phoneFormats = [
  "(###) ###-####",
  "###-###-####",
  "###.###.####",
  "##########",
  "+1-###-###-####",
  "1-###-###-####",
];

const streetNames = [
  "Main",
  "Oak",
  "Pine",
  "Elm",
  "Cedar",
  "Maple",
  "Washington",
  "Lake",
  "Hill",
  "Park",
  "Spring",
  "North",
  "South",
  "East",
  "West",
  "River",
  "Forest",
  "Meadow",
  "Valley",
  "Ridge",
  "Creek",
  "Brook",
  "Drive",
  "Avenue",
  "Boulevard",
  "Street",
  "Road",
  "Lane",
  "Court",
  "Place",
  "Way",
  "Circle",
  "Terrace",
  "Heights",
  "Gardens",
  "Plaza",
  "Square",
  "Center",
  "Village",
  "Town",
  "City",
  "County",
  "State",
  "National",
  "International",
  "Global",
  "World",
  "Universe",
  "Galaxy",
];

const streetSuffixes = [
  "Street",
  "Avenue",
  "Boulevard",
  "Drive",
  "Lane",
  "Road",
  "Court",
  "Place",
  "Way",
  "Circle",
  "Terrace",
  "Heights",
  "Gardens",
  "Plaza",
  "Square",
  "Center",
  "Village",
  "Town",
  "City",
  "County",
  "State",
  "National",
  "International",
  "Global",
  "World",
  "Universe",
  "Galaxy",
  "St",
  "Ave",
  "Blvd",
  "Dr",
  "Ln",
  "Rd",
  "Ct",
  "Pl",
  "Way",
  "Cir",
  "Ter",
  "Hts",
  "Gdns",
  "Plz",
  "Sq",
  "Ctr",
  "Vlg",
  "Tn",
  "City",
  "Cty",
  "St",
  "Intl",
  "Glbl",
  "Wrld",
  "Univ",
  "Gal",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
  "Boston",
  "El Paso",
  "Nashville",
  "Detroit",
  "Oklahoma City",
  "Portland",
  "Las Vegas",
  "Memphis",
  "Louisville",
  "Baltimore",
  "Milwaukee",
  "Albuquerque",
  "Tucson",
  "Fresno",
  "Sacramento",
  "Mesa",
  "Kansas City",
  "Atlanta",
  "Long Beach",
  "Colorado Springs",
  "Raleigh",
  "Miami",
  "Virginia Beach",
  "Omaha",
  "Oakland",
  "Minneapolis",
  "Tulsa",
  "Arlington",
  "Tampa",
  "New Orleans",
  "Wichita",
  "Cleveland",
  "Bakersfield",
  "Aurora",
  "Anaheim",
  "Honolulu",
  "Santa Ana",
  "Corpus Christi",
  "Riverside",
  "Lexington",
  "Stockton",
  "Henderson",
  "Saint Paul",
  "St. Louis",
  "Fort Wayne",
  "Jersey City",
  "Chula Vista",
  "Orlando",
  "Chandler",
  "Laredo",
  "Madison",
  "Winston-Salem",
  "Lubbock",
  "Baton Rouge",
  "Durham",
  "Garland",
  "Glendale",
  "Reno",
  "Hialeah",
  "Chesapeake",
  "Scottsdale",
  "North Las Vegas",
  "Irving",
  "Fremont",
  "Irvine",
  "Birmingham",
  "Rochester",
  "San Bernardino",
  "Spokane",
  "Gilbert",
  "Arlington",
  "Montgomery",
  "Boise",
  "Richmond",
  "Des Moines",
];

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const jobTitles = [
  "Software Engineer",
  "Product Manager",
  "Data Analyst",
  "Marketing Specialist",
  "Sales Representative",
  "Customer Success Manager",
  "Business Analyst",
  "Designer",
  "Project Manager",
  "Operations Manager",
  "Human Resources Manager",
  "Accountant",
  "Financial Analyst",
  "Content Writer",
  "Social Media Manager",
  "SEO Specialist",
  "UX Designer",
  "UI Designer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "QA Engineer",
  "System Administrator",
  "Network Engineer",
  "Security Analyst",
  "Business Development Manager",
  "Sales Manager",
  "Marketing Manager",
  "Product Owner",
  "Scrum Master",
  "Technical Lead",
  "Architect",
  "Consultant",
  "Advisor",
  "Director",
  "Vice President",
  "Chief Executive Officer",
  "Chief Technology Officer",
  "Chief Financial Officer",
  "Chief Marketing Officer",
  "Chief Operating Officer",
  "Executive Assistant",
  "Administrative Assistant",
  "Receptionist",
  "Office Manager",
  "Facilities Manager",
  "Legal Assistant",
  "Paralegal",
  "Attorney",
  "Lawyer",
  "Doctor",
  "Nurse",
  "Teacher",
  "Professor",
  "Researcher",
  "Scientist",
  "Engineer",
  "Architect",
  "Consultant",
  "Analyst",
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Transportation",
  "Energy",
  "Food & Beverage",
  "Fashion",
  "Entertainment",
  "Sports",
  "Fitness",
  "Wellness",
  "Beauty",
  "Automotive",
  "Electronics",
  "Pharmaceuticals",
  "Biotechnology",
  "Research",
  "Consulting",
  "Marketing",
  "Advertising",
  "Media",
  "Publishing",
  "Telecommunications",
  "Insurance",
  "Banking",
  "Investment",
  "Legal",
  "Government",
  "Non-profit",
  "Hospitality",
  "Tourism",
  "Construction",
  "Agriculture",
  "Mining",
  "Utilities",
  "Aerospace",
  "Defense",
  "Chemical",
  "Plastics",
  "Textiles",
  "Paper",
  "Forestry",
  "Fishing",
  "Mining",
  "Oil & Gas",
  "Renewable Energy",
  "Waste Management",
  "Environmental Services",
  "Security",
  "Logistics",
  "Supply Chain",
  "E-commerce",
  "SaaS",
  "Mobile Apps",
  "Gaming",
  "Social Media",
  "Cloud Computing",
  "AI/ML",
  "Blockchain",
  "Cybersecurity",
  "IoT",
  "Robotics",
  "3D Printing",
  "Virtual Reality",
];

// New data arrays for enhanced functionality
const positions = [
  "CEO",
  "CTO",
  "CFO",
  "COO",
  "VP of Sales",
  "VP of Marketing",
  "VP of Engineering",
  "VP of Operations",
  "Director of Sales",
  "Director of Marketing",
  "Director of Engineering",
  "Director of Operations",
  "Manager",
  "Senior Manager",
  "Team Lead",
  "Senior Developer",
  "Developer",
  "Junior Developer",
  "Product Manager",
  "Project Manager",
  "Business Analyst",
  "Data Analyst",
  "Marketing Specialist",
  "Sales Representative",
  "Customer Success Manager",
  "Account Executive",
  "Sales Manager",
  "Marketing Manager",
  "Operations Manager",
  "Human Resources Manager",
  "Finance Manager",
  "Legal Counsel",
  "Administrative Assistant",
  "Executive Assistant",
  "Receptionist",
  "Consultant",
  "Advisor",
  "Specialist",
  "Coordinator",
  "Supervisor",
  "Lead",
  "Principal",
  "Architect",
  "Engineer",
  "Designer",
  "Analyst",
  "Coordinator",
  "Assistant",
  "Intern",
  "Trainee",
];

const sources = ["website", "referral", "marketing", "social", "other"];

const leadStatuses = ["New", "Contacted", "Qualified", "Unqualified"];

const countries = ["Mexico", "United States", "Canada", "Brazil"];

const statesByCountry = {
  Mexico: [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Coahuila",
    "Colima",
    "Ciudad de México",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Estado de México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ],
  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ],
  Brazil: [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ],
};

const citiesByState = {
  // Mexico cities
  Aguascalientes: [
    "Aguascalientes",
    "Calvillo",
    "Jesús María",
    "Rincón de Romos",
  ],
  "Baja California": ["Tijuana", "Mexicali", "Ensenada", "La Paz"],
  "Baja California Sur": ["La Paz", "Los Cabos", "Loreto", "Comondú"],
  Campeche: ["Campeche", "Ciudad del Carmen", "Champotón", "Escárcega"],
  Chiapas: [
    "Tuxtla Gutiérrez",
    "San Cristóbal de las Casas",
    "Tapachula",
    "Comitán",
  ],
  Chihuahua: ["Chihuahua", "Ciudad Juárez", "Delicias", "Cuauhtémoc"],
  Coahuila: ["Saltillo", "Torreón", "Monclova", "Piedras Negras"],
  Colima: ["Colima", "Manzanillo", "Villa de Álvarez", "Comala"],
  "Ciudad de México": [
    "Ciudad de México",
    "Coyoacán",
    "Iztapalapa",
    "Gustavo A. Madero",
  ],
  Durango: ["Durango", "Gómez Palacio", "El Oro"],
  Guanajuato: ["León", "Irapuato", "Celaya", "Salamanca"],
  Guerrero: ["Acapulco", "Chilpancingo", "Iguala", "Taxco"],
  Hidalgo: ["Pachuca", "Tula", "Tizayuca", "Ixmiquilpan"],
  Jalisco: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá"],
  México: ["Ecatepec", "Nezahualcóyotl", "Naucalpan", "Toluca"],
  Michoacán: ["Morelia", "Uruapan", "Zamora", "Lázaro Cárdenas"],
  Morelos: ["Cuernavaca", "Jiutepec", "Ayala", "Emiliano Zapata"],
  Nayarit: ["Tepic", "Bahía de Banderas", "Ixtlán del Río", "Xalisco"],
  "Nuevo León": [
    "Monterrey",
    "Guadalupe",
    "San Nicolás de los Garza",
    "Santa Catarina",
  ],
  Oaxaca: [
    "Oaxaca de Juárez",
    "Tuxtepec",
    "Salina Cruz",
    "Santa Cruz Xoxocotlán",
  ],
  Puebla: ["Puebla", "Amozoc", "San Pedro Cholula", "San Andrés Cholula"],
  Querétaro: ["Querétaro", "San Juan del Río", "Corregidora", "El Marqués"],
  "Quintana Roo": ["Cancún", "Chetumal", "Playa del Carmen", "Cozumel"],
  "San Luis Potosí": [
    "San Luis Potosí",
    "Soledad de Graciano Sánchez",
    "Ciudad Valles",
    "Matehuala",
  ],
  Sinaloa: ["Culiacán", "Mazatlán", "Los Mochis", "Guasave"],
  Sonora: ["Hermosillo", "Ciudad Obregón", "Nogales", "San Luis Río Colorado"],
  Tabasco: ["Villahermosa", "Cárdenas", "Comalcalco", "Huimanguillo"],
  Tamaulipas: ["Reynosa", "Matamoros", "Nuevo Laredo", "Victoria"],
  Tlaxcala: ["Tlaxcala", "San Pablo del Monte", "Calpulalpan", "Apizaco"],
  Veracruz: ["Veracruz", "Xalapa", "Coatzacoalcos", "Córdoba"],
  Yucatán: ["Mérida", "Valladolid", "Progreso", "Izamal"],
  Zacatecas: ["Zacatecas", "Fresnillo", "Sombrerete"],

  // US cities (major cities for each state)
  Alabama: ["Birmingham", "Montgomery", "Huntsville", "Mobile"],
  Alaska: ["Anchorage", "Fairbanks", "Juneau", "Sitka"],
  Arizona: ["Phoenix", "Tucson", "Mesa", "Chandler"],
  Arkansas: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale"],
  California: ["Los Angeles", "San Francisco", "San Diego", "San Jose"],
  Colorado: ["Denver", "Colorado Springs", "Aurora", "Fort Collins"],
  Connecticut: ["Bridgeport", "New Haven", "Stamford", "Hartford"],
  Delaware: ["Wilmington", "Dover", "Newark", "Middletown"],
  Florida: ["Jacksonville", "Miami", "Tampa", "Orlando"],
  Georgia: ["Atlanta", "Augusta", "Columbus", "Macon"],
  Hawaii: ["Honolulu", "Hilo", "Kailua", "Kapolei"],
  Idaho: ["Boise", "Meridian", "Nampa", "Idaho Falls"],
  Illinois: ["Chicago", "Aurora", "Rockford", "Joliet"],
  Indiana: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"],
  Iowa: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"],
  Kansas: ["Wichita", "Overland Park", "Kansas City", "Topeka"],
  Kentucky: ["Louisville", "Lexington", "Bowling Green", "Owensboro"],
  Louisiana: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"],
  Maine: ["Portland", "Lewiston", "Bangor", "Auburn"],
  Maryland: ["Baltimore", "Frederick", "Rockville", "Gaithersburg"],
  Massachusetts: ["Boston", "Worcester", "Springfield", "Lowell"],
  Michigan: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights"],
  Minnesota: ["Minneapolis", "Saint Paul", "Rochester", "Duluth"],
  Mississippi: ["Jackson", "Gulfport", "Southaven", "Hattiesburg"],
  Missouri: ["Kansas City", "St. Louis", "Springfield", "Columbia"],
  Montana: ["Billings", "Missoula", "Great Falls", "Bozeman"],
  Nebraska: ["Omaha", "Lincoln", "Bellevue", "Grand Island"],
  Nevada: ["Las Vegas", "Henderson", "Reno", "Carson City"],
  "New Hampshire": ["Manchester", "Nashua", "Concord", "Dover"],
  "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth"],
  "New Mexico": ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe"],
  "New York": ["New York City", "Buffalo", "Rochester", "Yonkers"],
  "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham"],
  "North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
  Oklahoma: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow"],
  Oregon: ["Portland", "Salem", "Eugene", "Gresham"],
  Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Erie"],
  "Rhode Island": ["Providence", "Warwick", "Cranston", "Pawtucket"],
  "South Carolina": [
    "Columbia",
    "Charleston",
    "North Charleston",
    "Mount Pleasant",
  ],
  "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings"],
  Tennessee: ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
  Texas: ["Houston", "San Antonio", "Dallas", "Austin"],
  Utah: ["Salt Lake City", "West Valley City", "Provo", "West Jordan"],
  Vermont: ["Burlington", "South Burlington", "Rutland", "Barre"],
  Virginia: ["Virginia Beach", "Norfolk", "Arlington", "Richmond"],
  Washington: ["Seattle", "Spokane", "Tacoma", "Vancouver"],
  "West Virginia": ["Charleston", "Huntington", "Parkersburg", "Morgantown"],
  Wisconsin: ["Milwaukee", "Madison", "Green Bay", "Kenosha"],
  Wyoming: ["Cheyenne", "Casper", "Laramie", "Gillette"],

  // Canada cities
  Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
  "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond"],
  Manitoba: ["Winnipeg", "Brandon", "Steinbach", "Thompson"],
  "New Brunswick": ["Saint John", "Moncton", "Fredericton", "Dieppe"],
  "Newfoundland and Labrador": [
    "St. John's",
    "Mount Pearl",
    "Corner Brook",
    "Grand Falls-Windsor",
  ],
  "Northwest Territories": ["Yellowknife", "Hay River", "Inuvik", "Fort Smith"],
  "Nova Scotia": ["Halifax", "Sydney", "Dartmouth", "Truro"],
  Nunavut: ["Iqaluit", "Rankin Inlet", "Arviat", "Baker Lake"],
  Ontario: ["Toronto", "Ottawa", "Mississauga", "Brampton"],
  "Prince Edward Island": [
    "Charlottetown",
    "Summerside",
    "Stratford",
    "Cornwall",
  ],
  Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],
  Saskatchewan: ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw"],
  Yukon: ["Whitehorse", "Dawson City", "Watson Lake", "Haines Junction"],

  // Brazil cities
  Acre: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá"],
  Alagoas: ["Maceió", "Arapiraca", "Palmeira dos Índios", "Penedo"],
  Amapá: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque"],
  Amazonas: ["Manaus", "Parintins", "Itacoatiara", "Manacapuru"],
  Bahia: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari"],
  Ceará: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú"],
  "Distrito Federal": ["Brasília", "Ceilândia", "Taguatinga", "Samambaia"],
  "Espírito Santo": ["Vitória", "Vila Velha", "Serra", "Linhares"],
  Goiás: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde"],
  Maranhão: ["São Luís", "Imperatriz", "Timon", "Codó"],
  "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop"],
  "Mato Grosso do Sul": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá"],
  "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"],
  Pará: ["Belém", "Ananindeua", "Santarém", "Castanhal"],
  Paraíba: ["João Pessoa", "Campina Grande", "Santa Rita", "Patos"],
  Paraná: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa"],
  Pernambuco: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru"],
  Piauí: ["Teresina", "Parnaíba", "Picos", "Piripiri"],
  "Rio de Janeiro": [
    "Rio de Janeiro",
    "São Gonçalo",
    "Duque de Caxias",
    "Nova Iguaçu",
  ],
  "Rio Grande do Norte": ["Natal", "Mossoró", "Parnamirim", "Ceará-Mirim"],
  "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas"],
  Rondônia: ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena"],
  Roraima: ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre"],
  "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau", "São José"],
  "São Paulo": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo"],
  Sergipe: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana"],
  Tocantins: ["Palmas", "Araguaína", "Gurupi", "Porto Nacional"],
};

const paymentStatuses = ["Paid", "Pending", "Overdue"];

const paymentMethods = [
  "Credit Card",
  "Bank Transfer",
  "Cash",
  "Paypal",
  "Other",
];

const taskTitles = [
  "Call Lead/Customer",
  "Send Email",
  "Send Follow-up Email",
  "Visit Lead/Customer",
  "Request Legal Agreement",
  "Meeting",
  "Generate Quote",
];

const taskTypes = [
  "Call",
  "Email",
  "Visit",
  "Quote",
  "Follow-up",
  "Virtual Meeting",
  "Meeting",
];

const taskStatuses = ["Pending", "In Progress", "Completed", "Canceled"];

const taskPriorities = ["Low", "Medium", "High", "Urgent"];

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random decimal number between min and max with specified decimal places
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} decimals - Number of decimal places
 * @returns {number} Random decimal number
 */
function getRandomDecimal(min, max, decimals = 1) {
  const randomNum = Math.random() * (max - min) + min;
  return parseFloat(randomNum.toFixed(decimals));
}

/**
 * Generate a random social media handle
 * @param {string} platform - Platform name (X, Instagram, Facebook, TikTok)
 * @param {string} firstName - First name (optional)
 * @param {string} lastName - Last name (optional)
 * @returns {string} Random social media handle
 */
function generateSocialMediaHandle(
  platform,
  firstName = null,
  lastName = null
) {
  const fName = (firstName || generateFirstName()).toLowerCase();
  const lName = (lastName || generateLastName()).toLowerCase();
  const randomNum = getRandomInt(1, 999);
  const separators = ["", ".", "_", ""];
  const separator = getRandomElement(separators);

  switch (platform.toLowerCase()) {
    case "x":
    case "twitter":
      return `@${fName}${separator}${lName}${randomNum}`;
    case "instagram":
      return `@${fName}${separator}${lName}${randomNum}`;
    case "facebook":
      return `${fName}${separator}${lName}${randomNum}`;
    case "tiktok":
      return `@${fName}${separator}${lName}${randomNum}`;
    default:
      return `@${fName}${separator}${lName}${randomNum}`;
  }
}

/**
 * Generate a random paragraph of text
 * @param {number} sentences - Number of sentences to generate
 * @returns {string} Random paragraph
 */
export function generateRandomParagraph(sentences = 3) {
  const sentenceTemplates = [
    "This company specializes in innovative solutions for modern businesses.",
    "We provide cutting-edge technology services to help organizations grow.",
    "Our team of experts delivers exceptional results through strategic planning.",
    "With years of experience, we understand the unique challenges of the industry.",
    "We focus on creating sustainable and scalable solutions for our clients.",
    "Our commitment to excellence drives everything we do.",
    "We leverage the latest technologies to deliver outstanding performance.",
    "Our comprehensive approach ensures long-term success for our partners.",
    "We pride ourselves on delivering high-quality services and products.",
    "Our innovative solutions help businesses achieve their goals efficiently.",
    "We work closely with clients to understand their specific needs.",
    "Our proven track record speaks to our reliability and expertise.",
    "We offer customized solutions tailored to each client's requirements.",
    "Our dedicated team ensures timely delivery and exceptional service.",
    "We maintain the highest standards of quality in all our offerings.",
  ];

  const selectedSentences = [];
  for (let i = 0; i < sentences; i++) {
    selectedSentences.push(getRandomElement(sentenceTemplates));
  }

  return selectedSentences.join(" ");
}

/**
 * Generate a random address based on country
 * @param {string} country - Country name
 * @returns {Object} Random address object
 */
function generateAddressByCountry(country) {
  const countryStates = statesByCountry[country] || [];
  const state = getRandomElement(countryStates);
  const stateCities = citiesByState[state] || [];
  const city = getRandomElement(stateCities);

  const streetNumber = getRandomInt(1, 9999);
  const streetName = getRandomElement(streetNames);
  const streetSuffix = getRandomElement(streetSuffixes);

  let zipCode;
  switch (country) {
    case "Mexico":
      zipCode = getRandomInt(10000, 99999).toString();
      break;
    case "United States":
      zipCode = getRandomInt(10000, 99999).toString();
      break;
    case "Canada":
      zipCode = `${getRandomElement([
        "A",
        "B",
        "C",
        "E",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "R",
        "S",
        "T",
        "V",
        "X",
        "Y",
      ])}${getRandomInt(0, 9)}${getRandomElement([
        "A",
        "B",
        "C",
        "E",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "R",
        "S",
        "T",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ])} ${getRandomInt(0, 9)}${getRandomElement([
        "A",
        "B",
        "C",
        "E",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "R",
        "S",
        "T",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ])}${getRandomInt(0, 9)}`;
      break;
    case "Brazil":
      zipCode = `${getRandomInt(10000, 99999)}-${getRandomInt(100, 999)}`;
      break;
    default:
      zipCode = getRandomInt(10000, 99999).toString();
  }

  return {
    street: `${streetNumber} ${streetName} ${streetSuffix}`,
    city: city,
    state: state,
    country: country,
    zipCode: zipCode,
    fullAddress: `${streetNumber} ${streetName} ${streetSuffix}, ${city}, ${state}, ${country} ${zipCode}`,
  };
}

/**
 * Generate a random invoice number
 * @returns {string} Random invoice number
 */
function generateInvoiceNumber() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letter1 = letters[getRandomInt(0, letters.length - 1)];
  const letter2 = letters[getRandomInt(0, letters.length - 1)];
  const letter3 = letters[getRandomInt(0, letters.length - 1)];
  const numbers = getRandomInt(10000, 99999);
  return `${letter1}${letter2}${letter3}-${numbers}`;
}

/**
 * Generate a random date in the future
 * @param {number} minDays - Minimum days from now
 * @param {number} maxDays - Maximum days from now
 * @returns {string} Date in mm/dd/yyyy format
 */
function generateFutureDate(minDays = 1, maxDays = 30) {
  const date = new Date();
  date.setDate(date.getDate() + getRandomInt(minDays, maxDays));
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

/**
 * Get a random element from an array
 * @param {Array} array - Array to select from
 * @returns {*} Random element from array
 */
function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

/**
 * Generate a random first name
 * @returns {string} Random first name
 */
export function generateFirstName() {
  return getRandomElement(firstNames);
}

/**
 * Generate a random last name
 * @returns {string} Random last name
 */
export function generateLastName() {
  return getRandomElement(lastNames);
}

/**
 * Generate a random full name
 * @returns {string} Random full name
 */
export function generateFullName() {
  return `${generateFirstName()} ${generateLastName()}`;
}

/**
 * Generate a random email address
 * @param {string} firstName - First name (optional)
 * @param {string} lastName - Last name (optional)
 * @returns {string} Random email address
 */
export function generateEmail(firstName = null, lastName = null) {
  const fName = (firstName || generateFirstName()).toLowerCase();
  const lName = (lastName || generateLastName()).toLowerCase();
  const domain = getRandomElement(domains);
  const randomNum = getRandomInt(1, 9999);
  const separators = ["", ".", "_", "-"];
  const separator = getRandomElement(separators);

  return `${fName}${separator}${lName}${randomNum}@${domain}`;
}

/**
 * Generate a random company name
 * @returns {string} Random company name
 */
export function generateCompanyName() {
  const prefix = getRandomElement(companyPrefixes);
  const suffix = getRandomElement(companySuffixes);
  return `${prefix} ${suffix}`;
}

/**
 * Generate a random phone number
 * @returns {string} Random 10-digit phone number
 */
export function generatePhoneNumber() {
  const digits = [];
  for (let i = 0; i < 10; i++) {
    digits.push(getRandomInt(0, 9));
  }
  return digits.join("");
}

/**
 * Generate a random mobile number
 * @returns {string} Random 10-digit mobile number
 */
export function generateMobileNumber() {
  const digits = [];
  for (let i = 0; i < 10; i++) {
    digits.push(getRandomInt(0, 9));
  }
  return digits.join("");
}

/**
 * Generate a random address
 * @returns {Object} Random address object
 */
export function generateAddress() {
  const streetNumber = getRandomInt(1, 9999);
  const streetName = getRandomElement(streetNames);
  const streetSuffix = getRandomElement(streetSuffixes);
  const city = getRandomElement(cities);
  const state = getRandomElement(states);
  const zipCode = getRandomInt(10000, 99999);

  return {
    street: `${streetNumber} ${streetName} ${streetSuffix}`,
    city: city,
    state: state,
    zipCode: zipCode.toString(),
    fullAddress: `${streetNumber} ${streetName} ${streetSuffix}, ${city}, ${state} ${zipCode}`,
  };
}

/**
 * Generate a random job title
 * @returns {string} Random job title
 */
export function generateJobTitle() {
  return getRandomElement(jobTitles);
}

/**
 * Generate a random industry
 * @returns {string} Random industry
 */
export function generateIndustry() {
  return getRandomElement(industries);
}

/**
 * Generate a random customer data object
 * @returns {Object} Random customer data
 */
export function generateCustomerData() {
  const firstName = generateFirstName();
  const lastName = generateLastName();
  const company = generateCompanyName();
  const country = getRandomElement(countries);
  const address = generateAddressByCountry(country);

  return {
    firstName: firstName,
    lastName: lastName,
    fullName: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    phone: generatePhoneNumber(),
    company: company,
    position: getRandomElement(positions),
    secondaryEmail: generateEmail(firstName, lastName),
    website: `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`,
    socialMediaX: generateSocialMediaHandle("X", firstName, lastName),
    socialMediaInstagram: generateSocialMediaHandle(
      "Instagram",
      firstName,
      lastName
    ),
    socialMediaFacebook: generateSocialMediaHandle(
      "Facebook",
      firstName,
      lastName
    ),
    socialMediaTiktok: generateSocialMediaHandle("TikTok", firstName, lastName),
    skypeId: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomInt(
      1,
      999
    )}`,
    jobTitle: generateJobTitle(),
    industry: generateIndustry(),
    description: generateRandomParagraph(4),
    street: address.street,
    country: address.country,
    state: address.state,
    city: address.city,
    postalCode: address.zipCode,
    notes: `Test customer created on ${new Date().toISOString()}`,
  };
}

/**
 * Generate a random lead data object
 * @returns {Object} Random lead data
 */
export function generateLeadData() {
  const firstName = generateFirstName();
  const lastName = generateLastName();
  const company = generateCompanyName();
  const country = getRandomElement(countries);
  const address = generateAddressByCountry(country);

  // Generate different countries for phone and mobile (can be different from address country)
  // Exclude United States and Canada from phone/mobile country selection
  const phoneMobileCountries = countries.filter(
    (country) => country !== "United States" && country !== "Canada"
  );
  const phoneCountry = getRandomElement(phoneMobileCountries);
  const mobileCountry = getRandomElement(phoneMobileCountries);

  // Map countries to country codes
  const countryCodeMap = {
    Mexico: "+52",
    Brazil: "+55",
    Argentina: "+54",
    Chile: "+56",
    France: "+33",
    Germany: "+49",
    Spain: "+34",
  };

  return {
    firstName: firstName,
    lastName: lastName,
    fullName: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    phone: generatePhoneNumber(),
    company: company,
    position: getRandomElement(positions),
    secondaryEmail: generateEmail(firstName, lastName),
    website: `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`,
    socialMediaX: generateSocialMediaHandle("X", firstName, lastName),
    socialMediaInstagram: generateSocialMediaHandle(
      "Instagram",
      firstName,
      lastName
    ),
    socialMediaFacebook: generateSocialMediaHandle(
      "Facebook",
      firstName,
      lastName
    ),
    socialMediaTiktok: generateSocialMediaHandle("TikTok", firstName, lastName),
    skypeId: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomInt(
      1,
      999
    )}`,
    source: getRandomElement(sources),
    sector: generateIndustry(),
    status: getRandomElement(leadStatuses),
    qualification: getRandomDecimal(1, 10, 1),
    annualRevenue: getRandomInt(1000, 10000000),
    employeesCount: getRandomInt(1, 5000),
    description: generateRandomParagraph(4),
    street: address.street,
    country: address.country,
    state: address.state,
    city: address.city,
    postalCode: address.zipCode,
    phoneCountryCode: countryCodeMap[phoneCountry],
    mobileCountryCode: countryCodeMap[mobileCountry],
    notes: `Test lead created on ${new Date().toISOString()}`,
  };
}

/**
 * Generate a random sale data object
 * @returns {Object} Random sale data
 */
export function generateSaleData() {
  const amount = getRandomInt(100, 10000);
  const saleDate = new Date();
  saleDate.setDate(saleDate.getDate() + getRandomInt(-30, 30));

  return {
    customerName: generateFullName(),
    company: generateCompanyName(),
    amount: amount,
    currency: getRandomElement(["USD", "EUR", "GBP", "CAD", "AUD"]),
    saleDate: saleDate.toISOString().split("T")[0],
    invoiceNumber: generateInvoiceNumber(),
    paymentStatus: getRandomElement(paymentStatuses),
    paymentMethod: getRandomElement(paymentMethods),
    description: generateRandomParagraph(3),
    notes: `Test sale created on ${new Date().toISOString()}`,
  };
}

/**
 * Generate a random task data object
 * @returns {Object} Random task data
 */
export function generateTaskData() {
  const scheduledDate = generateFutureDate(1, 30);
  const executionDate = generateFutureDate(1, 30);

  return {
    title: getRandomElement(taskTitles),
    type: getRandomElement(taskTypes),
    status: getRandomElement(taskStatuses),
    priority: getRandomElement(taskPriorities),
    scheduledDate: scheduledDate,
    executionDate: executionDate,
    description: generateRandomParagraph(3),
    assignedTo: generateFullName(),
    relatedTo: getRandomElement(["Customer", "Lead", "Sale", "General"]),
    notes: `Test task notes created on ${new Date().toISOString()}`,
  };
}

/**
 * Generate a random organization data object
 * @returns {Object} Random organization data
 */
export function generateOrganizationData() {
  const company = generateCompanyName();

  return {
    name: company,
    email: generateEmail(),
    phone: generatePhoneNumber(),
    website: `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`,
    address: generateAddress(),
    industry: generateIndustry(),
    size: getRandomElement([
      "1-10",
      "11-50",
      "51-200",
      "201-500",
      "501-1000",
      "1000+",
    ]),
    description: `Test organization created on ${new Date().toISOString()}`,
  };
}

/**
 * Generate a random user data object
 * @returns {Object} Random user data
 */
export function generateUserData() {
  const firstName = generateFirstName();
  const lastName = generateLastName();

  return {
    firstName: firstName,
    lastName: lastName,
    fullName: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    password: `Password${getRandomInt(100, 999)}!`,
    jobTitle: generateJobTitle(),
    phone: generatePhoneNumber(),
    organization: generateCompanyName(),
  };
}

/**
 * Generate a random note data object
 * @returns {Object} Random note data
 */
export function generateNoteData() {
  const noteTypes = [
    "General",
    "Meeting",
    "Call",
    "Email",
    "Follow-up",
    "Proposal",
    "Contract",
  ];

  return {
    title: `Test Note ${getRandomInt(1, 1000)}`,
    content: `This is a test note created on ${new Date().toISOString()}. It contains some sample content for testing purposes.`,
    type: getRandomElement(noteTypes),
    relatedTo: getRandomElement([
      "Customer",
      "Lead",
      "Sale",
      "Task",
      "General",
    ]),
    isPrivate: Math.random() > 0.7,
  };
}

/**
 * Generate multiple random records of a specific type
 * @param {string} type - Type of data to generate ('customer', 'lead', 'sale', 'task', 'user', 'organization', 'note')
 * @param {number} count - Number of records to generate
 * @returns {Array} Array of random data objects
 */
export function generateMultipleRecords(type, count = 5) {
  const generators = {
    customer: generateCustomerData,
    lead: generateLeadData,
    sale: generateSaleData,
    task: generateTaskData,
    user: generateUserData,
    organization: generateOrganizationData,
    note: generateNoteData,
  };

  const generator = generators[type.toLowerCase()];
  if (!generator) {
    throw new Error(
      `Unknown data type: ${type}. Available types: ${Object.keys(
        generators
      ).join(", ")}`
    );
  }

  return Array.from({ length: count }, () => generator());
}

/**
 * Generate a unique identifier
 * @param {string} prefix - Prefix for the identifier
 * @returns {string} Unique identifier
 */
export function generateUniqueId(prefix = "TEST") {
  const timestamp = Date.now();
  const random = getRandomInt(1000, 9999);
  return `${prefix}_${timestamp}_${random}`;
}

// Export all functions as default object for convenience
export default {
  generateFirstName,
  generateLastName,
  generateFullName,
  generateEmail,
  generateCompanyName,
  generatePhoneNumber,
  generateMobileNumber,
  generateAddress,
  generateJobTitle,
  generateIndustry,
  generateCustomerData,
  generateLeadData,
  generateSaleData,
  generateTaskData,
  generateOrganizationData,
  generateUserData,
  generateNoteData,
  generateMultipleRecords,
  generateUniqueId,
  generateRandomParagraph,
};
