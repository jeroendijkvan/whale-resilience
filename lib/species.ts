export type SpeciesKind =
  | "sperm"
  | "fin"
  | "right"
  | "humpback"
  | "blue"
  | "orca";

export type DataPoint = {
  year: number;
  best: number;
  low: number;
  high: number;
  observed: boolean;
};

export type Species = {
  id: string;
  name: string;
  latinName: string;
  color: string;
  kind: SpeciesKind;
  iucnStatus: string;
  preWhaling: number;
  populationLow: { year: number; value: number };
  current: number;
  trend: "recovering" | "stable" | "declining";
  narrative: string;
  pts: [number, number, number][];
  obs: boolean[];
};

export const YEARS = [
  1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1986, 1990, 1995, 2000,
  2005, 2010, 2015, 2020, 2024,
];

export const SPECIES: Species[] = [
  {
    id: "sperm",
    name: "Sperm whale",
    latinName: "Physeter macrocephalus",
    color: "#4ecdc4",
    kind: "sperm",
    iucnStatus: "Vulnerable",
    preWhaling: 1_100_000,
    populationLow: { year: 1980, value: 400_000 },
    current: 640_000,
    trend: "recovering",
    narrative:
      "Hunted for the spermaceti oil that lit cities and lubricated the industrial revolution. Their slow recovery is a quiet rebuke to extinction.",
    pts: [
      [1000, 700, 1300],
      [950, 660, 1240],
      [870, 600, 1150],
      [780, 530, 1040],
      [700, 470, 940],
      [620, 415, 840],
      [520, 340, 710],
      [430, 270, 600],
      [400, 300, 510],
      [390, 295, 500],
      [395, 305, 495],
      [420, 330, 515],
      [440, 355, 535],
      [480, 390, 575],
      [520, 425, 620],
      [560, 460, 660],
      [600, 490, 715],
      [640, 530, 760],
    ],
    obs: [
      false, false, false, false, false, false, false, false, true, true, true,
      true, true, true, true, true, true, true,
    ],
  },
  {
    id: "fin",
    name: "Fin whale",
    latinName: "Balaenoptera physalus",
    color: "#a78bfa",
    kind: "fin",
    iucnStatus: "Vulnerable",
    preWhaling: 700_000,
    populationLow: { year: 1980, value: 93_000 },
    current: 114_000,
    trend: "recovering",
    narrative:
      "The greyhound of the sea — second-largest animal ever to exist. Industrial whaling left them at one-eighth of their original number.",
    pts: [
      [700, 350, 1050],
      [640, 310, 980],
      [555, 260, 870],
      [445, 200, 720],
      [340, 150, 570],
      [235, 100, 420],
      [138, 60, 260],
      [98, 50, 180],
      [93, 52, 148],
      [88, 50, 140],
      [90, 52, 140],
      [96, 56, 145],
      [99, 59, 148],
      [101, 61, 150],
      [104, 64, 153],
      [107, 67, 156],
      [110, 70, 158],
      [114, 74, 162],
    ],
    obs: [
      false, false, false, false, false, false, false, false, true, true, true,
      true, true, true, true, true, true, true,
    ],
  },
  {
    id: "right",
    name: "Southern Right whale",
    latinName: "Eubalaena australis",
    color: "#86efac",
    kind: "right",
    iucnStatus: "Least Concern",
    preWhaling: 80_000,
    populationLow: { year: 1970, value: 3_500 },
    current: 48_000,
    trend: "recovering",
    narrative:
      "Named because they were the 'right' whales to kill — slow, fat, and floated when dead. They almost vanished. They are coming back.",
    pts: [
      [80, 40, 120],
      [65, 30, 105],
      [45, 20, 80],
      [24, 10, 48],
      [13, 5, 26],
      [7, 2, 14],
      [4.5, 1.5, 9],
      [3.5, 1, 7],
      [5, 2, 9],
      [6, 2.5, 10],
      [8, 4, 13],
      [12, 7, 18],
      [17, 11, 24],
      [22, 15, 30],
      [28, 21, 36],
      [34, 27, 43],
      [41, 33, 50],
      [48, 40, 58],
    ],
    obs: [
      false, false, false, false, false, false, false, false, true, true, true,
      true, true, true, true, true, true, true,
    ],
  },
  {
    id: "humpback",
    name: "Humpback whale",
    latinName: "Megaptera novaeangliae",
    color: "#fbbf24",
    kind: "humpback",
    iucnStatus: "Least Concern",
    preWhaling: 125_000,
    populationLow: { year: 1970, value: 9_000 },
    current: 83_000,
    trend: "recovering",
    narrative:
      "They sing. They breach. They were down to a few thousand. Today, in a few warm bays, you can watch a mother teach her calf to leap.",
    pts: [
      [125, 80, 165],
      [108, 68, 148],
      [82, 50, 118],
      [52, 30, 80],
      [33, 18, 52],
      [18, 9, 32],
      [11, 5, 19],
      [9, 4, 16],
      [14, 9, 20],
      [16, 11, 22],
      [22, 17, 28],
      [32, 26, 39],
      [44, 37, 52],
      [54, 47, 62],
      [64, 57, 72],
      [71, 64, 79],
      [77, 70, 85],
      [83, 76, 91],
    ],
    obs: [
      false, false, false, false, false, false, false, true, true, true, true,
      true, true, true, true, true, true, true,
    ],
  },
  {
    id: "blue",
    name: "Blue whale",
    latinName: "Balaenoptera musculus",
    color: "#f87171",
    kind: "blue",
    iucnStatus: "Endangered",
    preWhaling: 280_000,
    populationLow: { year: 1970, value: 5_000 },
    current: 15_000,
    trend: "recovering",
    narrative:
      "The largest animal ever known to live. We took them down to 1% of their pre-whaling number. Their recovery is slow, fragile, and miraculous.",
    pts: [
      [280, 150, 420],
      [238, 120, 370],
      [175, 85, 295],
      [105, 50, 195],
      [58, 25, 115],
      [24, 9, 55],
      [8, 3, 18],
      [5, 1.5, 11],
      [5.2, 2, 11],
      [5.8, 2.5, 12],
      [6.5, 3, 13],
      [7.5, 3.5, 14],
      [8.5, 4, 16],
      [9.5, 4.5, 18],
      [10.5, 5, 20],
      [12, 6, 22],
      [13.5, 6.5, 24],
      [15, 7, 27],
    ],
    obs: [
      false, false, false, false, false, false, false, false, true, true, true,
      true, true, true, true, true, true, true,
    ],
  },
  {
    id: "orca",
    name: "Killer whale",
    latinName: "Orcinus orca",
    color: "#e2e8f0",
    kind: "orca",
    iucnStatus: "Data Deficient",
    preWhaling: 58_000,
    populationLow: { year: 1960, value: 50_000 },
    current: 52_000,
    trend: "stable",
    narrative:
      "Largely spared by the whaling industry — they were too smart, too fast, too small to be profitable. Their cultures persist; their pods remember.",
    pts: [
      [58, 35, 80],
      [57, 34, 79],
      [55, 32, 77],
      [54, 31, 76],
      [52, 30, 74],
      [51, 29, 72],
      [50, 28, 71],
      [50, 28, 71],
      [50, 28, 71],
      [50, 28, 71],
      [51, 29, 72],
      [51, 29, 72],
      [51, 29, 72],
      [51, 29, 72],
      [51, 29, 72],
      [51, 30, 73],
      [51, 30, 73],
      [52, 30, 74],
    ],
    obs: [
      false, false, false, false, false, false, false, false, false, true,
      true, true, true, true, true, true, true, true,
    ],
  },
];

export const SPECIES_COLOR: Record<string, string> = {
  "Sperm whale": "#4ecdc4",
  "Fin whale": "#a78bfa",
  "S. Right whale": "#86efac",
  Humpback: "#fbbf24",
  "Blue whale": "#f87171",
  "Killer whale": "#e2e8f0",
};

export const HOTSPOTS = [
  { name: "Azores, Portugal", lat: 38.5, lon: -28.0, species: ["Sperm whale", "Blue whale", "Fin whale"] },
  { name: "Húsavík, Iceland", lat: 66.0, lon: -17.3, species: ["Humpback", "Blue whale", "Fin whale"] },
  { name: "Tromsø, Norway", lat: 69.6, lon: 18.9, species: ["Killer whale", "Humpback", "Fin whale"] },
  { name: "Gulf of Alaska", lat: 58.5, lon: -150.0, species: ["Humpback", "Killer whale", "Blue whale"] },
  { name: "Monterey Bay, USA", lat: 36.8, lon: -122.0, species: ["Blue whale", "Humpback", "Fin whale", "Killer whale"] },
  { name: "Baja California, Mexico", lat: 27.0, lon: -114.0, species: ["Blue whale", "Humpback", "Fin whale", "S. Right whale"] },
  { name: "Dominica, Caribbean", lat: 15.4, lon: -61.4, species: ["Sperm whale", "Humpback"] },
  { name: "Peninsula Valdés, Argentina", lat: -42.5, lon: -63.5, species: ["S. Right whale", "Killer whale"] },
  { name: "Hermanus, South Africa", lat: -34.4, lon: 19.2, species: ["S. Right whale", "Humpback"] },
  { name: "Mirissa, Sri Lanka", lat: 5.9, lon: 80.5, species: ["Blue whale", "Sperm whale"] },
  { name: "Kaikoura, New Zealand", lat: -42.4, lon: 173.7, species: ["Sperm whale", "Humpback", "Killer whale"] },
  { name: "Tonga, Pacific", lat: -21.2, lon: -175.2, species: ["Humpback"] },
  { name: "Antarctica", lat: -65.0, lon: -60.0, species: ["Killer whale", "Humpback", "Blue whale", "Fin whale", "S. Right whale"] },
  { name: "Vancouver Island, Canada", lat: 50.0, lon: -126.0, species: ["Killer whale", "Humpback"] },
  { name: "Newfoundland, Canada", lat: 47.5, lon: -52.5, species: ["Humpback", "Fin whale", "Sperm whale"] },
  { name: "Svalbard, Norway", lat: 78.5, lon: 15.0, species: ["Blue whale", "Humpback", "Fin whale"] },
  { name: "Ogasawara, Japan", lat: 27.1, lon: 142.2, species: ["Sperm whale", "Humpback"] },
  { name: "Andenes, Norway", lat: 69.3, lon: 16.1, species: ["Sperm whale", "Killer whale"] },
] as const;

export const TIMELINE = [
  { year: 1904, title: "First Antarctic whaling station opens", desc: "Industrial whaling crosses into the Southern Ocean — the planet's last refuge for the great whales." },
  { year: 1931, title: "37,000 whales killed in a single season", desc: "Antarctic factory ships reach peak slaughter. Blue whale populations begin a near-vertical collapse." },
  { year: 1946, title: "International Whaling Commission founded", desc: "An attempt to manage what remained — initially a whalers' club, eventually the instrument of their protection." },
  { year: 1966, title: "Blue whale receives international protection", desc: "After being driven to under 1% of its original abundance." },
  { year: 1982, title: "Commercial whaling moratorium agreed", desc: "After decades of advocacy, the IWC votes to halt commercial whaling." },
  { year: 1986, title: "Moratorium takes effect", desc: "The slaughter stops, mostly. Recovery — slow, uneven, stubborn — begins." },
  { year: 1994, title: "Southern Ocean Whale Sanctuary declared", desc: "50 million square kilometres of ocean closed to commercial whaling." },
  { year: "Today", title: "Humpbacks: from Vulnerable to Least Concern", desc: "Most populations are now recovering. Some surge past 80% of pre-whaling abundance." },
] as const;
