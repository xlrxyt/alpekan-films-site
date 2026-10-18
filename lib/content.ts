export const categories = [
  "All",
  "Films",
  "Music Videos",
  "Commercials",
  "Theatre/Audiovisual",
] as const;
export type Category = (typeof categories)[number];
export type Project = {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  year: number;
  duration?: string;
  videoId: string;
  format: string;
  description: string;
  roles: string[];
  creditName: string;
  production?: string;
  postProduction?: string;
};
export const projects: Project[] = [
  {
    slug: "chronicles-of-sonatine",
    title: "Chronicles of Sonatine or: Shadows of the Broken Memories",
    category: "Films",
    year: 2025,
    duration: "39 minutes",
    videoId: "Uhpz6Jbs9zE",
    format: "Graduation film",
    creditName: "Alper Zilgir",
    roles: ["Director", "Screenwriter", "Producer", "Editor"],
    description:
      "A graduation film screened at the closing of the UPward International Student Film Festival in Prishtina in 2025.",
  },
  {
    slug: "fortress-mp4",
    title: "Fortress.mp4",
    category: "Films",
    year: 2024,
    duration: "4 minutes",
    videoId: "IvD9FJ4sjuw",
    format: "Documentary",
    creditName: "Alper Zilgir",
    roles: ["Director", "Director of photography", "Editor", "Co-screenwriter"],
    description:
      "A documentary made during “Stories We Tell – Camp 3” at DokuFest.",
  },
  {
    slug: "moonshine",
    title: "Moonshine",
    category: "Films",
    year: 2022,
    duration: "16 minutes",
    videoId: "JfQ4jzuNwiE",
    format: "Student film",
    creditName: "Alper Zilgir",
    roles: ["Director", "Screenwriter", "Director of photography", "Editor"],
    description:
      "A third-year student film screened at East Koenji Film Festival in Tokyo, Japan, on 15 June 2024.",
  },
  {
    slug: "isekai",
    title: "Isekai",
    category: "Films",
    year: 2021,
    duration: "13 minutes",
    videoId: "4iaGSJeEDdg",
    format: "Student film",
    creditName: "Alper Zilgir",
    roles: ["Director", "Screenwriter", "Editor"],
    description: "A film made during the second year of studies.",
  },
  {
    slug: "goditja",
    title: "Goditja",
    category: "Films",
    year: 2020,
    duration: "6 minutes",
    videoId: "-Cm3vjTCNvk",
    format: "Student film",
    creditName: "Alper Zilgir",
    roles: ["Director", "Screenwriter", "Editor"],
    description: "A film made during the first year of studies.",
  },
  {
    slug: "abdullah-gerguri",
    title: "Dokumentar Portret: Abdullah Gerguri",
    category: "Films",
    year: 2022,
    duration: "15 minutes",
    videoId: "Knf3F2iNDPE",
    format: "Documentary portrait",
    creditName: "Alper Zilgir",
    roles: ["Director", "Screenwriter", "Director of photography", "Editor"],
    description:
      "Made for the Documentary Directing course during the second year of studies at the University of Prishtina.",
  },
  {
    slug: "fiona-abdullahu-dardha-tbuta",
    title: "Fiona Abdullahu: Dardha t’Buta",
    category: "Music Videos",
    year: 2026,
    videoId: "hUmk85wkCS4",
    format: "Music video",
    creditName: "Alper Zilgir",
    roles: ["Director", "Director of photography", "Editor"],
    description:
      "A music video for Fiona Abdullahu’s “Dardha t’Buta”. Production and post-production by Alpekan Films.",
    production: "Alpekan Films",
    postProduction: "Alpekan Films",
  },
];
export const packages = [
  {
    name: "Essential",
    videos: "4 videos / month",
    price: "€280",
    description: "A focused starting point for a consistent visual presence.",
  },
  {
    name: "Growth",
    videos: "8 videos / month",
    price: "€600",
    description: "More room for stories, formats and regular releases.",
  },
  {
    name: "Premium",
    videos: "12 videos / month",
    price: "€970",
    description: "A fuller production rhythm for an ongoing visual story.",
  },
  {
    name: "Custom",
    videos: "Tailored social media content",
    price: "From €1,000",
    description:
      "A social media production plan shaped around your specific brief.",
  },
] as const;
export const services = [
  {
    number: "01",
    name: "Film production",
    text: "From an early idea to the final frame. Development, production and post-production for independent film.",
  },
  {
    number: "02",
    name: "Music videos",
    text: "Visual worlds built around music. Concept-led films that bring an artist’s sound into focus.",
  },
  {
    number: "03",
    name: "Commercials",
    text: "Purposeful moving images for brands. Creative development, production and delivery around a clear brief.",
  },
  {
    number: "04",
    name: "Theatre & audiovisual",
    text: "Moving images beyond the screen. Audiovisual production for theatre, performance and interdisciplinary work.",
  },
  {
    number: "05",
    name: "Social media production",
    text: "Video and photography for social media posts. Monthly video packages and custom social content scoped around your needs.",
  },
];
