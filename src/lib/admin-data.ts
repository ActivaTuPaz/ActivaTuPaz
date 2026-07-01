import lorenaReal from "@/assets/lorena-real.jpg";
import todoEsDivino from "@/assets/todo-es-divino.jpg";
import handsCup from "@/assets/hands-cup.jpg";

export type ResourcePDF = {
  id: string;
  category: string;
  title: string;
  description: string;
  fileUrl: string;
};

export type HeroData = {
  title: string;
  subtitle: string;
  mainImage: string;
  secondaryImage: string;
  ctaText: string;
  resources: ResourcePDF[];
};

const HERO_DATA_KEY = "lorena_hero_data";

export const defaultHeroData: HeroData = {
  title: "Eso que tu cuerpo repite tiene *origen*. Y tiene salida.",
  subtitle:
    "Soy Lorena Calcopietro. Acompaño a mujeres y hombres a soltar dolores físicos, patrones que se repiten y cargas heredadas — para volver a habitar el cuerpo, las relaciones y la vida con calma. +10 años de acompañamiento, online en todo el mundo y presencial en La Plata.",
  mainImage: lorenaReal,
  secondaryImage: todoEsDivino,
  ctaText: "Descargá gratis · 2 meditaciones + guía del árbol genealógico",
  resources: [
    {
      id: "1",
      category: "Meditación guiada",
      title: "Conectar con tu Ser",
      description: "Una práctica de 15 minutos para volver al centro de tu pecho y reencontrarte con tu esencia.",
      fileUrl: "/recursos/meditacion-conectar-con-tu-ser.pdf",
    },
    {
      id: "2",
      category: "Meditación guiada",
      title: "Soltar pesos, cortar lealtades",
      description: "Ceremonia íntima para devolver con amor lo que no es tuyo y honrar a tu sistema familiar.",
      fileUrl: "/recursos/meditacion-cortar-lealtades-invisibles.pdf",
    },
    {
      id: "3",
      category: "Guía práctica",
      title: "Tu árbol genealógico",
      description: "Mini-libro paso a paso para armar tu árbol y descubrir las lealtades invisibles que te habitan.",
      fileUrl: "/recursos/guia-arbol-genealogico.pdf",
    },
  ],
};

export function getHeroData(): HeroData {
  if (typeof window === "undefined") return defaultHeroData;
  const stored = localStorage.getItem(HERO_DATA_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as HeroData;
    } catch (e) {
      console.error("Error parsing hero data", e);
    }
  }
  return defaultHeroData;
}

export function saveHeroData(data: HeroData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(HERO_DATA_KEY, JSON.stringify(data));
  }
}

// --- Methodology Section ---

export type MethodologyCard = {
  id: string;
  icon: string; // 'leaf' | 'heart' | etc.
  title: string;
  description: string;
};

export type MethodologyData = {
  title: string;
  description: string;
  image: string;
  cards: MethodologyCard[];
};

const METHODOLOGY_DATA_KEY = "lorena_methodology_data";

export const defaultMethodologyData: MethodologyData = {
  title: "¿Qué es la *biodecodificación*?",
  description: "Es un camino hacia la comprensión de los mensajes ocultos detrás de nuestras dolencias físicas y patrones emocionales repetitivos. Buscamos el origen en tu historia personal y transgeneracional para liberar cargas que ya no te pertenecen.",
  image: handsCup,
  cards: [
    {
      id: "1",
      icon: "leaf",
      title: "Constelaciones familiares",
      description: "Exploramos los hilos invisibles que te unen a tu sistema familiar para ordenar tu lugar en el mundo."
    },
    {
      id: "2",
      icon: "heart",
      title: "Bio-emocional",
      description: "Identificamos la emoción biológica que sustenta el síntoma físico para facilitar la sanación consciente."
    }
  ]
};

export function getMethodologyData(): MethodologyData {
  if (typeof window === "undefined") return defaultMethodologyData;
  const stored = localStorage.getItem(METHODOLOGY_DATA_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as MethodologyData;
    } catch (e) {
      console.error("Error parsing methodology data", e);
    }
  }
  return defaultMethodologyData;
}

export function saveMethodologyData(data: MethodologyData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(METHODOLOGY_DATA_KEY, JSON.stringify(data));
  }
}

// --- Sessions Section ---

export type SessionCard = {
  id: string;
  icon: string; // 'compass' | 'zap' | 'heart' | 'star' | etc.
  eyebrow: string;
  title: string;
  description: string;
  duration: string;
  detail: string;
  price: string;
  hasPromo: boolean;
  oldPrice: string;
  isPopular: boolean; // For "Más elegida" badge
};

export type SessionsData = {
  sectionEyebrow: string;
  sectionTitle: string;
  sectionDescription: string;
  cards: SessionCard[];
};

const SESSIONS_DATA_KEY = "lorena_sessions_data";

export const defaultSessionsData: SessionsData = {
  sectionEyebrow: "Sesiones individuales",
  sectionTitle: "¿Querés empezar con una *sesión puntual*?",
  sectionDescription: "Si todavía no es momento de un programa completo, podemos encontrarnos en un encuentro único para abrir conversación.",
  cards: [
    {
      id: "1",
      icon: "compass",
      eyebrow: "Primer acercamiento",
      title: "Sesión Exploradora",
      description: "Un encuentro para conocernos, escuchar lo que estás transitando y empezar a poner palabras a lo que pide ser visto.",
      duration: "30 minutos",
      detail: "Online o presencial",
      price: "$45.000",
      hasPromo: false,
      oldPrice: "",
      isPopular: false
    },
    {
      id: "2",
      icon: "zap",
      eyebrow: "Inmersión profunda",
      title: "Sesión Súper Power",
      description: "Decodificá un síntoma específico. Entramos al origen biológico y transgeneracional de eso que tu cuerpo está expresando.",
      duration: "120 minutos",
      detail: "Decodificá tu síntoma",
      price: "$99.999",
      hasPromo: true,
      oldPrice: "$120.000",
      isPopular: true
    }
  ]
};

export function getSessionsData(): SessionsData {
  if (typeof window === "undefined") return defaultSessionsData;
  const stored = localStorage.getItem(SESSIONS_DATA_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as SessionsData;
    } catch (e) {
      console.error("Error parsing sessions data", e);
    }
  }
  return defaultSessionsData;
}

export function saveSessionsData(data: SessionsData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSIONS_DATA_KEY, JSON.stringify(data));
  }
}

// Convert a file to base64 so we can save it in localStorage temporarily
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
