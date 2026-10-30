import handsCup from "@/assets/hands-cup.jpg";
import desdeLaRaiz from "@/assets/desde-la-raiz.jpg";
import lorenaReal from "@/assets/lorena-real.jpg";

export type SessionDetail = {
  id: string;
  slug: string;
  title: string;
  heroHighlight: string;
  eyebrow: string;
  badge?: string;
  tagline: string;
  image: string;
  imageAlt: string;
  accent: "sage" | "bloom" | "rose";
  duration: string;
  durationMinutes: number;
  modality: string;
  price: string;
  oldPrice?: string;
  hasPromo?: boolean;
  shortDesc: string;
  fullDesc: string[];
  phrasesQuote?: string;
  paraQuien: string[];
  beneficios: {
    title: string;
    description: string;
    icon: "compass" | "zap" | "tree" | "heart" | "sun" | "sparkles" | "leaf";
  }[];
  queIncluye: string[];
  pasos: {
    numero: string;
    titulo: string;
    descripcion: string;
  }[];
  faqs: {
    pregunta: string;
    respuesta: string;
  }[];
  whatsappMessage: string;
  shareTitle: string;
  shareDescription: string;
};

export const SESSIONS_DETAIL: Record<string, SessionDetail> = {
  exploradora: {
    id: "1",
    slug: "exploradora",
    title: "Sesión Exploradora",
    heroHighlight: "Exploradora",
    eyebrow: "Primer acercamiento · 30 minutos",
    badge: "Ideal para comenzar",
    tagline: "Un espacio íntimo y accesible para poner en palabras lo que estás viviendo y dar tu primer paso con calma y claridad.",
    image: handsCup,
    imageAlt: "Manos sosteniendo una taza caliente en un ambiente cálido y de paz",
    accent: "sage",
    duration: "30 minutos",
    durationMinutes: 30,
    modality: "Online (videollamada) o Presencial en La Plata",
    price: "$45.000",
    hasPromo: false,
    shortDesc: "Un encuentro para conocernos, escuchar lo que estás transitando y empezar a poner palabras a lo que pide ser visto.",
    fullDesc: [
      "A veces sabemos que algo nos duele, nos incomoda o se repite en nuestras vidas, pero no sabemos con exactitud por dónde empezar a mirarlo o qué tipo de ayuda buscar.",
      "La Sesión Exploradora es un puente de confianza y escucha: 30 minutos dedicados exclusivamente a vos, para bajar el ritmo, ordenar el caos inicial y sentir si mi mirada terapéutica resuena con lo que estás necesitando hoy.",
      "Sin presiones ni compromisos a largo plazo, te llevás una primera devolución consciente y una orientación clara sobre tu próximo paso."
    ],
    phrasesQuote: "Poner en palabras lo que te pasa es el primer movimiento hacia la calma.",
    paraQuien: [
      "Sentís dudas, curiosidad o incertidumbre y querés conocer mi forma de trabajar antes de elegir un proceso más extenso.",
      "Estás atravesando un momento de saturación, angustia o cambio y necesitás una primera escucha profesional y amorosa.",
      "Querés saber si tu síntoma físico, malestar emocional o bloqueo vincular se puede abordar con biodecodificación o constelaciones.",
      "Buscás claridad para definir si tu momento actual pide una sesión puntual o un programa de acompañamiento sostenido."
    ],
    beneficios: [
      {
        icon: "heart",
        title: "Escucha sin juicios",
        description: "Un espacio cuidado y totalmente confidencial donde poder hablar con franqueza y sentirte sostenida."
      },
      {
        icon: "compass",
        title: "Claridad inmediata",
        description: "Desarmar la confusión inicial y nombrar con precisión aquello que pide ser mirado en tu historia."
      },
      {
        icon: "sparkles",
        title: "Hoja de ruta clara",
        description: "Te vas con una devolución terapéutica sincera y recomendación del abordaje más adecuado para vos."
      }
    ],
    queIncluye: [
      "30 minutos de encuentro individual y exclusivo con Lorena Calcopietro",
      "Modalidad flexible: videollamada online a todo el mundo o presencial en La Plata",
      "Escucha activa y diagnóstico preliminar bioemocional",
      "Devolución orientativa y mapa de opciones para continuar tu proceso",
      "Contacto directo por WhatsApp para coordinar día y horario a tu medida"
    ],
    pasos: [
      {
        numero: "01",
        titulo: "Coordinamos el turno",
        descripcion: "Me escribís por WhatsApp con el botón de reserva y elegimos día y horario que te resulte cómodo."
      },
      {
        numero: "02",
        titulo: "El encuentro",
        descripcion: "Nos conectamos por videollamada o nos encontramos en consultorio para una escucha presente y atenta de 30 minutos."
      },
      {
        numero: "03",
        titulo: "Tu mapa de salida",
        descripcion: "Te brindo mi devolución con las claves de lo conversado y el camino más propicio para avanzar."
      }
    ],
    faqs: [
      {
        pregunta: "¿Es necesario tener experiencia previa en terapia o biodecodificación?",
        respuesta: "No, en absoluto. Esta sesión está pensada justamente para quienes se acercan por primera vez y quieren un espacio accesible para conocer la metodología."
      },
      {
        pregunta: "¿Cómo se abona la sesión?",
        respuesta: "Podés abonar por transferencia bancaria en pesos si estás en Argentina, o mediante PayPal si te encontrás en el exterior. Los datos te los envío al coordinar el turno."
      },
      {
        pregunta: "¿Puedo pasar después a una sesión profunda o a un programa?",
        respuesta: "¡Sí, totalmente! Muchas personas inician con la Sesión Exploradora y luego eligen continuar con Constelaciones, Súper Power o uno de los programas de acompañamiento."
      },
      {
        pregunta: "¿Las sesiones online funcionan igual que las presenciales?",
        respuesta: "Sí. La presencia, la empatía y la conexión emocional se transmiten con la misma intensidad a través de videollamada. Acompaño a consultantes de diversos países del mundo con total calidez."
      }
    ],
    whatsappMessage: "Hola Lorena, quiero reservar una Sesión Exploradora de 30 minutos.",
    shareTitle: "Sesión Exploradora — Lorena Calcopietro",
    shareDescription: "Conocé la Sesión Exploradora de 30 minutos con Lorena Calcopietro: un espacio íntimo para poner en palabras lo que vivís y ordenar tu camino."
  },

  constelaciones: {
    id: "3",
    slug: "constelaciones",
    title: "Constelaciones Familiares",
    heroHighlight: "Familiares",
    eyebrow: "Mirada sistémica · 90 minutos",
    badge: "Transformación sistémica",
    tagline: "Un encuentro individual intensivo para mirar los hilos invisibles de tu árbol genealógico, ordenar tu lugar y desatar nudos o lealtades inconscientes.",
    image: desdeLaRaiz,
    imageAlt: "Hojas y raíces verdes conectadas con la tierra y la naturaleza",
    accent: "bloom",
    duration: "90 minutos",
    durationMinutes: 90,
    modality: "Online en todo el mundo o Presencial en La Plata",
    price: "$85.000",
    hasPromo: false,
    shortDesc: "Un encuentro individual para mirar los hilos invisibles de tu árbol genealógico, ordenar tu lugar y desatar lealtades familiares.",
    fullDesc: [
      "Nadie camina solo en la vida: somos la continuidad de un sistema familiar con sus amores, sus duelos no resueltos, sus exclusiones y sus secretos.",
      "Muchas veces cargamos con tristezas, bloqueos económicos, mandatos de sacrificio o dificultades en la pareja que no nos pertenecen, sino que responden a lealtades invisibles con nuestros ancestros.",
      "En esta sesión individual de Constelaciones Familiares, configuramos tu árbol con elementos simbólicos para mirar con infinito respeto lo que fue, devolver con amor lo que no es tuyo y recuperar la fuerza de tu propio lugar en la vida."
    ],
    phrasesQuote: "Cuando cada uno ocupa su verdadero lugar en el sistema, el amor y la fuerza vuelven a fluir.",
    paraQuien: [
      "Sentís que repetís historias, bloqueos económicos, afectivos o de salud que ya vivieron tus padres o abuelos.",
      "Hay tensiones, distancias dolorosas o dinámicas difíciles en tus vínculos familiares primarios o de pareja.",
      "Cargas con culpas, tristezas o responsabilidades pesadas que intuís que no te corresponden pero no podés soltar.",
      "Querés honrar tu origen y tomar la fuerza de tu clan para avanzar en tus propios proyectos sin culpa ni ataduras."
    ],
    beneficios: [
      {
        icon: "tree",
        title: "Desatar lealtades invisibles",
        description: "Reconocer y soltar con amor los mandatos y destinos ajenos que estabas repitiendo por amor ciego al clan."
      },
      {
        icon: "sparkles",
        title: "Orden en los vínculos",
        description: "Restablecer el orden sistémico para que cada integrante ocupe su lugar correcto y cese el conflicto interno."
      },
      {
        icon: "leaf",
        title: "Alivio y liviandad corporal",
        description: "Sentir física y emocionalmente que te liberás de una mochila ancestral pesada para caminar tu propia vida."
      }
    ],
    queIncluye: [
      "90 minutos de trabajo individual profundo y personalizado 1 a 1",
      "Configuración guiada de tu genograma o árbol familiar con elementos sistémicos",
      "Identificación precisa de exclusiones, desórdenes y lealtades inconscientes",
      "Frases sanadoras y movimientos sistémicos de reconciliación y liberación",
      "Práctica o ejercicio de anclaje para los días posteriores al encuentro",
      "Soporte y seguimiento breve por WhatsApp para asimilar la experiencia"
    ],
    pasos: [
      {
        numero: "01",
        titulo: "El foco del encuentro",
        descripcion: "Definimos con precisión el conflicto vincular, síntoma o patrón que querés constelar."
      },
      {
        numero: "02",
        titulo: "Configuración del campo",
        descripcion: "Proyectamos el mapa de tu sistema familiar a través de figuras o anclajes simbólicos en el espacio."
      },
      {
        numero: "03",
        titulo: "El movimiento sanador",
        descripcion: "Trabajamos con frases reparadoras hasta encontrar la imagen de orden y alivio que libera el bloqueo."
      },
      {
        numero: "04",
        titulo: "Integración",
        descripcion: "Dejamos que el movimiento actúe en tu alma con pautas concretas para asentar la nueva mirada en tu vida cotidiana."
      }
    ],
    faqs: [
      {
        pregunta: "¿Cómo se realiza una constelación de forma individual sin un grupo de personas?",
        respuesta: "En la modalidad individual utilizamos figuras simbólicas, plantillas o anclajes espaciales. Este método tiene exactamente la misma profundidad y efectividad que un taller grupal, con la ventaja de brindarte un espacio 100% íntimo, cuidado y personalizado."
      },
      {
        pregunta: "¿Tengo que conocer fechas y datos exactos de todos mis ancestros?",
        respuesta: "No es indispensable contar con fechas exactas. La memoria del sistema familiar se expresa a través de los hechos que conocés, las emociones que vivís y la información que emerge naturalmente durante el trabajo de campo."
      },
      {
        pregunta: "¿Es igualmente efectiva de manera online?",
        respuesta: "Sí, absolutamente. El campo morfogenético y la información del sistema no reconocen fronteras físicas. Trabajo de forma online con consultantes de todo el mundo con la misma claridad y potencia."
      },
      {
        pregunta: "¿Con qué frecuencia se puede constelar?",
        respuesta: "Una constelación produce un movimiento muy profundo que requiere semanas o meses para madurar e integrarse en tu vida. Generalmente una sola sesión basta para el tema consultado."
      }
    ],
    whatsappMessage: "Hola Lorena, quiero reservar una sesión individual de Constelaciones familiares.",
    shareTitle: "Constelaciones Familiares Individuales — Lorena Calcopietro",
    shareDescription: "Sesión individual de Constelaciones Familiares con Lorena Calcopietro: 90 minutos para ordenar tu árbol genealógico y desatar nudos sistémicos."
  },

  "super-power": {
    id: "2",
    slug: "super-power",
    title: "Sesión Súper Power",
    heroHighlight: "Súper Power",
    eyebrow: "Inmersión intensiva 1 a 1 · 120 minutos",
    badge: "Más elegida · Promo exclusiva",
    tagline: "El encuentro más potente y transformador: 2 horas intensivas de biodecodificación emocional para desentrañar la raíz biológica de tu síntoma.",
    image: lorenaReal,
    imageAlt: "Lorena Calcopietro, terapeuta en biodecodificación y constelaciones familiares",
    accent: "rose",
    duration: "120 minutos",
    durationMinutes: 120,
    modality: "Online en todo el mundo o Presencial en La Plata",
    price: "$99.999",
    oldPrice: "$120.000",
    hasPromo: true,
    shortDesc: "Decodificá un síntoma específico. Entramos al origen biológico y transgeneracional de eso que tu cuerpo está expresando.",
    fullDesc: [
      "El cuerpo no se equivoca jamás: cada síntoma físico recurrente, dolor crónico o emoción desbordante es una respuesta biológica con sentido, nacida para protegerte ante un conflicto que viviste en soledad y sin resolver.",
      "La Sesión Súper Power es un espacio intensivo y completo de 120 minutos ininterrumpidos. Tiempo suficiente para ir sin prisas a la raíz: rastreamos el evento desencadenante en tu historia, la memoria heredada de tu clan y desactivamos el programa biológico que sostenía el malestar.",
      "Una experiencia diseñada para quienes buscan un antes y un después significativo en una sola cita terapéutica individual."
    ],
    phrasesQuote: "El síntoma no es tu enemigo. Es el mapa que te muestra exactamente dónde quedó atrapada tu herida.",
    paraQuien: [
      "Tenés un síntoma físico, molestia o diagnóstico médico recurrente y querés comprender qué mensaje biológico te está dando.",
      "Atravesás una crisis aguda (separación, quiebre laboral, duelo) y necesitás contención profunda y claridad inmediata.",
      "Querés una sesión profunda y completa de principio a fin, sin quedarte con la sensación de tiempo insuficiente.",
      "Buscás combinar biodecodificación biológica + mirada sistémica + Registros Akáshicos en un solo encuentro de máxima potencia."
    ],
    beneficios: [
      {
        icon: "zap",
        title: "Comprensión biológica exacta",
        description: "Entender con precisión científica y emocional para qué apareció tu síntoma y qué conflicto vino a resolver."
      },
      {
        icon: "sun",
        title: "Desactivación del estrés biológico",
        description: "Liberar la emoción visceral reprimida que mantiene al órgano o tejido en fase de reparación o sufrimiento."
      },
      {
        icon: "sparkles",
        title: "Salto de conciencia en un día",
        description: "120 minutos dedicados a transformar radicalmente tu percepción, tu energía y tu vínculo con tu cuerpo."
      }
    ],
    queIncluye: [
      "120 minutos (2 horas completas) de sesión terapéutica intensiva 1 a 1",
      "Decodificación bioemocional basada en las leyes biológicas de la salud",
      "Rastreo del conflicto programante en tu biografía y origen transgeneracional",
      "Protocolo guiado de reprogramación y corte de lealtades biológicas",
      "Guía de ejercicios y recomendaciones concretas para acompañar la sanación",
      "Seguimiento y soporte por WhatsApp durante los 7 días posteriores"
    ],
    pasos: [
      {
        numero: "01",
        titulo: "La historia del síntoma",
        descripcion: "Analizamos la cronología exacta: cuándo comenzó, cómo se manifiesta y qué vivías en ese momento."
      },
      {
        numero: "02",
        titulo: "El biosock o conflicto raíz",
        descripcion: "Rastreamos el instante específico en que viviste un impacto emocional dramático y sin salida mental."
      },
      {
        numero: "03",
        titulo: "Desprogramación consciente",
        descripcion: "Aportamos los recursos y la comprensión que tu biología necesitaba para desactivar el circuito de alerta."
      },
      {
        numero: "04",
        titulo: "Anclaje y nuevo camino",
        descripcion: "Diseñamos un plan de coherencia emocional para que el cuerpo vuelva naturalmente a su estado de calma."
      }
    ],
    faqs: [
      {
        pregunta: "¿La biodecodificación reemplaza mi tratamiento o consulta médica?",
        respuesta: "No, de ninguna manera. La biodecodificación es un acompañamiento complementario y consciente que aborda el origen emocional del malestar. Nunca debés discontinuar tus controles ni prescripciones médicas."
      },
      {
        pregunta: "¿Por qué la sesión dura 120 minutos?",
        respuesta: "Dos horas completas permiten desplegar el método sin apuros: abrir tu historia, escuchar el síntoma, llegar al origen profundo, realizar la intervención bioemocional y cerrar con una sólida integración."
      },
      {
        pregunta: "¿Qué tengo que preparar antes de conectarme?",
        respuesta: "Te sugiero tener a mano diagnósticos médicos si los tenés, un vaso de agua, anotador y estar en un espacio totalmente privado y cómodo donde puedas expresarte con tranquilidad durante las 2 horas."
      },
      {
        pregunta: "¿Se puede realizar online o presencial?",
        respuesta: "Ambas modalidades. Presencialmente en consultorio en La Plata o de forma online por videollamada para cualquier lugar del mundo."
      }
    ],
    whatsappMessage: "Hola Lorena, quiero reservar la Sesión Súper Power de 120 minutos.",
    shareTitle: "Sesión Súper Power (120 min) — Lorena Calcopietro",
    shareDescription: "Descubrí la Sesión Súper Power de Lorena Calcopietro: 2 horas intensivas de biodecodificación para ir a la raíz biológica de tu síntoma."
  }
};

export const SESSIONS_LIST: SessionDetail[] = [
  SESSIONS_DETAIL.exploradora,
  SESSIONS_DETAIL.constelaciones,
  SESSIONS_DETAIL["super-power"]
];

export function getSessionBySlug(slug: string): SessionDetail | undefined {
  const normalized = slug.toLowerCase().trim();
  if (normalized.includes("explora")) return SESSIONS_DETAIL.exploradora;
  if (normalized.includes("constela")) return SESSIONS_DETAIL.constelaciones;
  if (normalized.includes("power") || normalized.includes("super")) return SESSIONS_DETAIL["super-power"];
  return SESSIONS_DETAIL[normalized];
}
