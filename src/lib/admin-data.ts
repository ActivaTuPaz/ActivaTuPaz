import lorenaReal from "@/assets/lorena-real.jpg";
import todoEsDivino from "@/assets/todo-es-divino.jpg";
import handsCup from "@/assets/hands-cup.jpg";
import { db, storage } from "./firebase";
import { doc, getDoc, setDoc, addDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

export async function getHeroData(): Promise<HeroData> {
  try {
    const docRef = doc(db, "content", "hero");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as HeroData;
    }
  } catch (error) {
    console.error("Error fetching hero data", error);
  }
  return defaultHeroData;
}

export async function saveHeroData(data: HeroData): Promise<void> {
  try {
    await setDoc(doc(db, "content", "hero"), data);
  } catch (error) {
    console.error("Error saving hero data", error);
    throw error;
  }
}

// --- Methodology Section ---

export type MethodologyCard = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type MethodologyData = {
  title: string;
  description: string;
  image: string;
  cards: MethodologyCard[];
};

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

export async function getMethodologyData(): Promise<MethodologyData> {
  try {
    const docRef = doc(db, "content", "methodology");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as MethodologyData;
    }
  } catch (error) {
    console.error("Error fetching methodology data", error);
  }
  return defaultMethodologyData;
}

export async function saveMethodologyData(data: MethodologyData): Promise<void> {
  try {
    await setDoc(doc(db, "content", "methodology"), data);
  } catch (error) {
    console.error("Error saving methodology data", error);
    throw error;
  }
}

// --- Sessions Section ---

export type SessionCard = {
  id: string;
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
  duration: string;
  detail: string;
  price: string;
  hasPromo: boolean;
  oldPrice: string;
  isPopular: boolean;
};

export type SessionsData = {
  sectionEyebrow: string;
  sectionTitle: string;
  sectionDescription: string;
  cards: SessionCard[];
};

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

export async function getSessionsData(): Promise<SessionsData> {
  try {
    const docRef = doc(db, "content", "sessions");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SessionsData;
    }
  } catch (error) {
    console.error("Error fetching sessions data", error);
  }
  return defaultSessionsData;
}

export async function saveSessionsData(data: SessionsData): Promise<void> {
  try {
    await setDoc(doc(db, "content", "sessions"), data);
  } catch (error) {
    console.error("Error saving sessions data", error);
    throw error;
  }
}

// Upload a file to Firebase Storage and return its public URL
export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
  try {
    const filename = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${filename}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to storage", error);
    throw error;
  }
}

export async function saveEntrevista(data: any): Promise<void> {
  try {
    const payload = {
      ...data,
      timestamp: new Date().toISOString()
    };
    await addDoc(collection(db, "entrevistas"), payload);
  } catch (error) {
    console.error("Error saving entrevista", error);
    throw error;
  }
}

export type EntrevistaData = {
  id: string;
  nombre: string;
  edad: string;
  email: string;
  telefono: string;
  ciudad: string;
  fecha_nacimiento: string;
  como_conocio: string;
  motivo_consulta: string;
  sintomas_fisicos: string;
  emociones_recurrentes: string;
  expectativas: string;
  historia_padres: string;
  historia_hermanos: string;
  historia_abuelos: string;
  hijos_embarazos: string;
  duelos_perdidas: string;
  secretos_familiares: string;
  eventos_significativos: string;
  vinculos_pareja: string;
  trabajo_vocacion: string;
  programa_interes: string;
  observaciones: string;
  consentimiento: boolean;
  timestamp: string;
};

export async function getEntrevistas(): Promise<EntrevistaData[]> {
  try {
    const q = query(collection(db, "entrevistas"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const entrevistas: EntrevistaData[] = [];
    querySnapshot.forEach((docSnap) => {
      entrevistas.push({ id: docSnap.id, ...docSnap.data() } as EntrevistaData);
    });
    return entrevistas;
  } catch (error) {
    console.error("Error fetching entrevistas", error);
    return [];
  }
}

// --- Programs Section ---

export type ProgramFeature = {
  id: string;
  icon: string;
  text: string;
};

export type ProgramData = {
  title: string;
  description: string;
  features: ProgramFeature[];
  price: string;
  note: string;
};

export type ProgramsData = {
  desdeLaRaiz: ProgramData;
  mujerReNace: ProgramData;
  darYRecibir: ProgramData;
  mentoriaMaestras: ProgramData;
};

export const defaultProgramsData: ProgramsData = {
  desdeLaRaiz: {
    title: "Un proceso pensado para transformar.",
    description: "Más que sesiones sueltas: un camino sostenido donde cada encuentro construye sobre el anterior y los cambios se anclan.",
    features: [
      { id: "1", icon: "calendar", text: "4 encuentros" },
      { id: "2", icon: "clock", text: "120 min" },
      { id: "3", icon: "sparkles", text: "2 meses" }
    ],
    price: "$320.000",
    note: "consultá por la opción de abonar en 2 cuotas sin recargo."
  },
  mujerReNace: {
    title: "Una experiencia de alto valor para tu vida.",
    description: "No es un curso más. Es un proceso íntimo, ritualizado y sostenido para que vuelvas a vos con todo lo que sos.",
    features: [
      { id: "1", icon: "calendar", text: "12 encuentros" },
      { id: "2", icon: "clock", text: "60 min" },
      { id: "3", icon: "sparkles", text: "Semanales" }
    ],
    price: "$666.000",
    note: "consultá por la opción de abonar en 2 veces."
  },
  darYRecibir: {
    title: "Un espacio íntimo para *soltar la deuda*.",
    description: "4 encuentros individuales de 60 minutos para ir al origen de la creencia y construir una nueva manera de dar y recibir.",
    features: [
      { id: "1", icon: "calendar", text: "4 encuentros" },
      { id: "2", icon: "clock", text: "60 minutos" }
    ],
    price: "$333.000",
    note: "Inversión total del programa. Escribime por WhatsApp para coordinar la forma de pago que te resulte más cómoda."
  },
  mentoriaMaestras: {
    title: "Tu método. Tu mirada. Tu manera de *acompañar*.",
    description: "No vas a recibir un protocolo para copiar. Vas a construir tu propio mapa para acompañar.",
    features: [
      { id: "1", icon: "calendar", text: "6 encuentros" },
      { id: "2", icon: "clock", text: "60 min" },
      { id: "3", icon: "sparkles", text: "Online o presencial" }
    ],
    price: "$399.000",
    note: "1 pago o 2 pagos de $225.000."
  }
};

export async function getProgramsData(): Promise<ProgramsData> {
  try {
    const docRef = doc(db, "content", "programs");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ProgramsData;
    }
  } catch (error) {
    console.error("Error fetching programs data", error);
  }
  return defaultProgramsData;
}

export async function saveProgramsData(data: ProgramsData): Promise<void> {
  try {
    await setDoc(doc(db, "content", "programs"), data);
  } catch (error) {
    console.error("Error saving programs data", error);
    throw error;
  }
}
