export const categories = [
  "All",
  "Films",
  "Music Videos",
  "Commercials",
  "Theatre/Audiovisual",
] as const;
export type Category = (typeof categories)[number];
export const projects: {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  image: string;
  note: string;
}[] = [
  {
    slug: "film-placeholder",
    title: "A story, waiting to be told.",
    category: "Films",
    image: "/images/film.svg",
    note: "Film project placeholder",
  },
  {
    slug: "music-video-placeholder",
    title: "Sound into vision.",
    category: "Music Videos",
    image: "/images/music.svg",
    note: "Music video placeholder",
  },
  {
    slug: "commercial-placeholder",
    title: "An idea in motion.",
    category: "Commercials",
    image: "/images/commercial.svg",
    note: "Commercial project placeholder",
  },
  {
    slug: "audiovisual-placeholder",
    title: "Beyond the frame.",
    category: "Theatre/Audiovisual",
    image: "/images/theatre.svg",
    note: "Theatre / audiovisual placeholder",
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
    videos: "Tailored production",
    price: "From €1,000",
    description: "A production plan shaped around your specific brief.",
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
    text: "Short-form video made for digital channels. Monthly production packages and custom projects.",
  },
];
