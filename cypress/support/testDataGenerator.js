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

  return {
    firstName: firstName,
    lastName: lastName,
    fullName: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    phone: generatePhoneNumber(),
    company: company,
    jobTitle: generateJobTitle(),
    industry: generateIndustry(),
    address: generateAddress(),
    website: `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`,
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

  return {
    firstName: firstName,
    lastName: lastName,
    fullName: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    phone: generatePhoneNumber(),
    company: company,
    jobTitle: generateJobTitle(),
    industry: generateIndustry(),
    address: generateAddress(),
    website: `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`,
    source: getRandomElement([
      "Website",
      "Referral",
      "Social Media",
      "Cold Call",
      "Trade Show",
      "Advertisement",
    ]),
    status: getRandomElement([
      "New",
      "Contacted",
      "Qualified",
      "Proposal",
      "Negotiation",
      "Closed Won",
      "Closed Lost",
    ]),
    notes: `Test lead created on ${new Date().toISOString()}`,
  };
}

/**
 * Generate a random sale data object
 * @returns {Object} Random sale data
 */
export function generateSaleData() {
  const amount = getRandomInt(1000, 100000);
  const closeDate = new Date();
  closeDate.setDate(closeDate.getDate() + getRandomInt(-30, 30));

  return {
    customerName: generateFullName(),
    company: generateCompanyName(),
    amount: amount,
    currency: getRandomElement(["USD", "EUR", "GBP", "CAD", "AUD"]),
    closeDate: closeDate.toISOString().split("T")[0],
    status: getRandomElement(["Open", "Closed Won", "Closed Lost", "Pending"]),
    stage: getRandomElement([
      "Prospecting",
      "Qualification",
      "Proposal",
      "Negotiation",
      "Closed",
    ]),
    probability: getRandomInt(10, 100),
    notes: `Test sale created on ${new Date().toISOString()}`,
  };
}

/**
 * Generate a random task data object
 * @returns {Object} Random task data
 */
export function generateTaskData() {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + getRandomInt(1, 30));

  return {
    title: `Test Task ${getRandomInt(1, 1000)}`,
    description: `This is a test task created on ${new Date().toISOString()}`,
    dueDate: dueDate.toISOString().split("T")[0],
    priority: getRandomElement(["Low", "Medium", "High", "Urgent"]),
    status: getRandomElement([
      "Not Started",
      "In Progress",
      "Completed",
      "On Hold",
    ]),
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
};
