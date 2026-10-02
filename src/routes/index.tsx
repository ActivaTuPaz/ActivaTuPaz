import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, Clock, Compass, Download, FileText, Headphones, Heart, Instagram, Leaf, MessageCircle, Sparkles, Sun, TreeDeciduous, Zap } from "lucide-react";
import lorenaReal from "@/assets/lorena-real.jpg";
import todoEsDivino from "@/assets/todo-es-divino.jpg";
import handsCup from "@/assets/hands-cup.jpg";
import desdeLaRaiz from "@/assets/desde-la-raiz.jpg";
import mujerRenace from "@/assets/mujer-renace.jpg";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/contact";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { getHeroData, defaultHeroData, HeroData, getMethodologyData, defaultMethodologyData, MethodologyData, getSessionsData, defaultSessionsData, SessionsData } from "@/lib/admin-data";
import { MagicBackground } from "@/components/ui/magic-background";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [heroData, methodologyData, sessionsData] = await Promise.all([
      getHeroData(),
      getMethodologyData(),
      getSessionsData()
    ]);
    return { heroData, methodologyData, sessionsData };
  },
  head: () => ({
    meta: [
      { title: "Lorena Calcopietro | Biodecodificación Emocional" },
      { name: "description", content: "Acompañamiento terapéutico en biodecodificación y constelaciones familiares. Sanar desde la raíz para habitar el presente." },
      { name: "keywords", content: "biodecodificación, constelaciones familiares, sanación emocional, terapia bioemocional, La Plata, online" },
      { property: "og:title", content: "Lorena Calcopietro | Biodecodificación Emocional" },
      { property: "og:description", content: "Sanar desde la raíz. Terapia bioemocional y constelaciones familiares." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: lorenaReal },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Lorena Calcopietro — Biodecodificación Emocional",
          description:
            "Acompañamiento terapéutico en biodecodificación y constelaciones familiares. Online y presencial en La Plata, Argentina.",
          image: lorenaReal,
          areaServed: "AR",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "La Plata",
            addressCountry: "AR",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "3",
            bestRating: "5",
          },
          review: [
            {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
              author: { "@type": "Person", name: "Daiana" },
              reviewBody:
                "Gracias Lore por tu entrega, por tu amor, por tu generosidad. Gracias por tu empatía, por tratar mis heridas con tanto respeto, por llenarlas de luz, de conciencia.",
            },
            {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
              author: { "@type": "Person", name: "Daiana" },
              reviewBody:
                "Las sesiones con Lore son realmente mágicas. Hicimos registros, biodecodificación y constelaciones familiares, y cada encuentro fue un antes y un después.",
            },
            {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
              author: { "@type": "Person", name: "Virginia" },
              reviewBody:
                `Llegué a Lore con un dolor físico en la pierna derecha, de hacía meses, por un estiramiento muy profundo que hice, enojada y sumado a mi cambio radical de vida, de ser empleada con horario y sueldo fijo, a ser emprendedora y mamá full time. Lore me dijo: vamos a buscar la emoción detrás de ese dolor. Y así fue como, encuentro tras encuentro, fueron apareciendo emociones reprimidas y heridas del pasado, que inevitablemente tuve que volver a abrir para poder comenzar a sanar "ese dolor físico" que solo se traducía en emociones no vistas, no aceptadas. Y luego de cada encuentro sentía mucho alivio, como si me quitara muchas mochilas de mi espalda. El dolor físico dejó de ocupar espacio en mi mente y comencé a ocuparme de las verdaderas emociones que salían de cada encuentro, el verdadero dolor. El proceso no sólo cambió mi energía, sino la de mi hijos, la de mi familia, mi entorno. Comencé a hacerme cargo de lo que realmente sentía y dejar de buscar responsables afuera, comencé a ocuparme de mi y darme mis tiempos, mis momentos, a mirarme y reconocerme, valorarme, y tanto mas. Este proceso me ayudó a ver desde otra perspectiva el dolor.`,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "¿Las sesiones online funcionan igual que las presenciales?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sí. La energía y la información del sistema familiar viajan más allá del espacio físico. Acompaño a personas de todo el mundo con la misma profundidad.",
              },
            },
            {
              "@type": "Question",
              name: "¿Qué diferencia hay entre una sesión suelta y un programa?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Una sesión abre, da claridad y alivio. Un programa sostiene el proceso en el tiempo, ancla cambios y permite trabajar capas más profundas con continuidad.",
              },
            },
            {
              "@type": "Question",
              name: "¿En cuánto tiempo voy a ver cambios?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Cada proceso es único. Muchas personas notan apertura desde la primera sesión; los cambios profundos suelen anclarse con el acompañamiento sostenido.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const beneficios = [
  { icon: Leaf, title: "Liberar memorias", text: "Soltás cargas familiares y patrones que se repiten sin entender por qué." },
  { icon: Sun, title: "Habitar el cuerpo", text: "Aprendés a escuchar el síntoma como mensajero, no como enemigo." },
  { icon: Heart, title: "Reencontrar tu eje", text: "Volvés a sentir calma, claridad y dirección en tu vida cotidiana." },
  { icon: Sparkles, title: "Vivir con coherencia", text: "Alineás lo que sentís, pensás y hacés desde un lugar más libre." },
];

const testimonios = [
  {
    title: "\"Trató mis heridas con tanto respeto\"",
    quote:
      "Gracias Lore por tu entrega, por tu amor, por tu generosidad. Gracias por tu empatía, por tratar mis heridas con tanto respeto, por llenarlas de luz, de conciencia. Gracias por abrazarme y sostenerme en este proceso, sin dudas no fuiste una elección casual. Te honro y deseo que todo lo que das se multiplique en tu vida.",
    name: "Daiana",
    place: "Chajarí, Entre Ríos",
    proceso: "Biodecodificación + Constelaciones",
    palette: "rose",
  },
  {
    title: "\"Cada encuentro fue un antes y un después\"",
    quote:
      "Vengo haciendo un trabajo interno y las sesiones con Lore son realmente mágicas para mí. Hicimos registros, biodecodificación y constelaciones familiares, y cada encuentro fue un antes y un después. Lore acompaña con una sensibilidad y una amorosidad enormes. Súper agradecida por el proceso y por ella.",
    name: "Daiana",
    place: "Buenos Aires",
    proceso: "Registros + Biodecodificación",
    palette: "sage",
  },
  {
    title: "\"Cambió mi energía y la de mi familia\"",
    quote:
      "Llegué a Lore con un dolor físico en la pierna derecha, de hacía meses, por un estiramiento muy profundo que hice, enojada y sumado a mi cambio radical de vida, de ser empleada con horario y sueldo fijo, a ser emprendedora y mamá full time. Lore me dijo: vamos a buscar la emoción detrás de ese dolor. Y así fue como, encuentro tras encuentro, fueron apareciendo emociones reprimidas y heridas del pasado, que inevitablemente tuve que volver a abrir para poder comenzar a sanar \"ese dolor físico\" que solo se traducía en emociones no vistas, no aceptadas. Y luego de cada encuentro sentía mucho alivio, como si me quitara muchas mochilas de mi espalda. El dolor físico dejó de ocupar espacio en mi mente y comencé a ocuparme de las verdaderas emociones que salían de cada encuentro, el verdadero dolor. El proceso no sólo cambió mi energía, sino la de mi hijos, la de mi familia, mi entorno. Comencé a hacerme cargo de lo que realmente sentía y dejar de buscar responsables afuera, comencé a ocuparme de mi y darme mis tiempos, mis momentos, a mirarme y reconocerme, valorarme, y tanto mas. Este proceso me ayudó a ver desde otra perspectiva el dolor.",
    name: "Virginia",
    place: "Chajarí, Entre Ríos",
    proceso: "Biodecodificación Emocional",
    palette: "peach",
  },
];

const paletteStyles: Record<string, { bg: string; ring: string; chip: string; quote: string }> = {
  rose:  { bg: "bg-gradient-to-br from-rose/20 via-cream to-peach/20", ring: "ring-rose/30", chip: "bg-rose/20 text-earth", quote: "text-rose/60" },
  sage:  { bg: "bg-gradient-to-br from-sage/20 via-cream to-mint/25", ring: "ring-sage/30", chip: "bg-sage/25 text-earth", quote: "text-sage/70" },
  peach: { bg: "bg-gradient-to-br from-peach/25 via-cream to-rose/15", ring: "ring-peach/30", chip: "bg-peach/30 text-earth", quote: "text-clay/70" },
  bloom: { bg: "bg-gradient-to-br from-bloom/20 via-cream to-rose/15", ring: "ring-bloom/30", chip: "bg-bloom/25 text-earth", quote: "text-bloom/70" },
  mint:  { bg: "bg-gradient-to-br from-mint/25 via-cream to-sage/20", ring: "ring-mint/40", chip: "bg-mint/35 text-earth", quote: "text-sage/70" },
};

const recursos = [
  {
    icon: Headphones,
    eyebrow: "Meditación guiada",
    title: "Conectar con tu Ser",
    text: "Una práctica de 15 minutos para volver al centro de tu pecho y reencontrarte con tu esencia.",
    file: "/recursos/meditacion-conectar-con-tu-ser.pdf",
    accent: "sage" as const,
  },
  {
    icon: Heart,
    eyebrow: "Meditación guiada",
    title: "Soltar pesos, cortar lealtades",
    text: "Ceremonia íntima para devolver con amor lo que no es tuyo y honrar a tu sistema familiar.",
    file: "/recursos/meditacion-cortar-lealtades-invisibles.pdf",
    accent: "rose" as const,
  },
  {
    icon: TreeDeciduous,
    eyebrow: "Guía práctica",
    title: "Tu árbol genealógico",
    text: "Mini-libro paso a paso para armar tu árbol y descubrir las lealtades invisibles que te habitan.",
    file: "/recursos/guia-arbol-genealogico.pdf",
    accent: "bloom" as const,
  },
];

function Index() {
  const { heroData, methodologyData, sessionsData } = Route.useLoaderData();

  const renderTitle = (title: string) => {
    // Allows wrapping text in *asterisks* to make it italic and bloom colored
    const parts = title.split(/\*(.*?)\*/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? <span key={i} className="italic text-bloom">{part}</span> : part
    );
  };

  return (
    <div className="bg-sand">
      {/* HERO */}
      <section
        className="relative px-6 pt-12 pb-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 80% at 10% 0%, color-mix(in oklab, var(--mint) 35%, transparent) 0%, transparent 55%), radial-gradient(100% 70% at 100% 20%, color-mix(in oklab, var(--peach) 40%, transparent) 0%, transparent 60%), radial-gradient(90% 60% at 50% 100%, color-mix(in oklab, var(--bloom) 30%, transparent) 0%, transparent 65%), var(--sand)",
        }}
      >
        <MagicBackground />
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="order-2 md:order-1">
            <span className="eyebrow text-sage mb-6 inline-block animate-fade">
              Biodecodificación · Constelaciones · Registros
            </span>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-balance mb-6 animate-reveal" style={{ animationDelay: "120ms" }}>
              {renderTitle(heroData.title)}
            </h1>
            <p className="text-base md:text-lg text-earth/70 leading-relaxed mb-8 text-pretty animate-reveal max-w-lg whitespace-pre-line" style={{ animationDelay: "240ms" }}>
              {heroData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-reveal" style={{ animationDelay: "360ms" }}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-earth/90 transition-all duration-500 active:scale-95 shadow-soft"
              >
                <MessageCircle className="size-4" /> Agendar Sesión 1 a 1
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium tracking-wide border border-earth/15 hover:border-earth/40 transition-colors"
              >
                Ver Programas y Acompañamientos
              </a>
            </div>
            <a
              href="#recursos"
              className="mt-6 inline-flex items-center gap-3 text-xs text-earth/70 hover:text-earth transition-colors group animate-reveal"
              style={{ animationDelay: "480ms" }}
            >
              <span className="size-8 rounded-full bg-mint/30 grid place-items-center group-hover:bg-mint/50 transition-colors">
                <Download className="size-3.5 text-earth" />
              </span>
              <span className="underline underline-offset-4 decoration-earth/20">
                {heroData.ctaText}
              </span>
            </a>
            <div className="mt-6 flex items-center gap-3 text-xs text-earth/60">
              <span className="size-1.5 rounded-full bg-mint" />
              <span>Sesiones presenciales en La Plata y online en todo el mundo</span>
            </div>
          </div>

          <div className="order-1 md:order-2 relative animate-reveal">
            <img
              src={heroData.mainImage}
              alt="Lorena Calcopietro, terapeuta en biodecodificación emocional"
              width={1024}
              height={1280}
              className="w-full max-w-md mx-auto aspect-[4/5] object-cover rounded-[2rem] ring-1 ring-earth/10 shadow-lift"
            />
            <div className="hidden md:block absolute -bottom-6 -left-6 w-44 rotate-[-4deg] rounded-2xl overflow-hidden ring-1 ring-earth/10 shadow-lift aspect-[4/5]">
              <img src={heroData.secondaryImage} alt="Lorena Calcopietro Secundaria" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-10 px-6 bg-beige/30 border-b border-earth/5">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <p className="font-serif text-2xl text-earth">+10 años</p>
            <p className="text-[11px] uppercase tracking-widest text-earth/50">Acompañando procesos</p>
          </div>
          <div className="space-y-1">
            <p className="font-serif text-2xl text-earth">Online</p>
            <p className="text-[11px] uppercase tracking-widest text-earth/50">En todo el mundo</p>
          </div>
          <div className="space-y-1">
            <p className="font-serif text-2xl text-earth">La Plata</p>
            <p className="text-[11px] uppercase tracking-widest text-earth/50">Presencial</p>
          </div>
          <div className="space-y-1">
            <p className="font-serif text-2xl text-earth">3 en 1</p>
            <p className="text-[11px] uppercase tracking-widest text-earth/50">Registros · Bio · Constelaciones</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-beige/40 py-24 px-6 border-y border-earth/5">
        <blockquote className="font-serif text-3xl md:text-5xl text-center italic text-balance leading-tight max-w-3xl mx-auto text-earth">
          “Lo que no se expresa con palabras, se manifiesta en el cuerpo como síntoma.”
        </blockquote>
      </section>

      {/* QUÉ ES */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="eyebrow text-rose">Metodología</span>
            <h2 className="font-serif text-4xl md:text-5xl text-balance leading-tight">
              {renderTitle(methodologyData.title)}
            </h2>
            <p className="text-base text-earth/70 leading-relaxed text-pretty whitespace-pre-line">
              {methodologyData.description}
            </p>
            <div className="grid gap-4 pt-4">
              {methodologyData.cards.map((card, idx) => {
                const Icon = card.icon === "leaf" ? Leaf : card.icon === "heart" ? Heart : card.icon === "sun" ? Sun : Sparkles;
                const accent = idx % 2 === 0 ? "sage" : "rose";
                const iconColor = accent === "sage" ? "text-sage" : "text-rose";
                const iconBg = accent === "sage" ? "bg-sage/15" : "bg-rose/15";
                return (
                  <div key={card.id} className="bg-cream ring-1 ring-earth/5 p-6 rounded-3xl">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`size-10 ${iconBg} rounded-full grid place-items-center`}>
                        <Icon className={`size-4 ${iconColor}`} />
                      </div>
                      <h3 className="font-serif text-xl italic">{card.title}</h3>
                    </div>
                    <p className="text-sm text-earth/60 leading-relaxed whitespace-pre-line">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="order-first md:order-last">
            <img
              src={methodologyData.image}
              alt="Metodología"
              loading="lazy"
              width={1024}
              height={768}
              className="w-full aspect-[4/5] object-cover rounded-3xl ring-1 ring-earth/5 shadow-soft"
            />
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN SERVICIOS */}
      <section id="servicios" className="py-24 px-6 bg-[#E8E2D9] border-t border-earth/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow text-rose">Modalidades</span>
            <h2 className="font-serif text-3xl md:text-5xl text-earth mt-4 mb-6">
              ¿Cómo podemos {renderTitle("*trabajar*")} juntos?
            </h2>
            <p className="text-earth/70 text-lg text-balance">
              Elegí la opción que mejor se adapte a vos. Desde un encuentro puntual para destrabar algo urgente, hasta procesos profundos de transformación de varias semanas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
            {/* Tarjeta A: Sesión 1 a 1 */}
            <div className="bg-sand rounded-[2rem] p-8 md:p-12 shadow-soft flex flex-col h-full border border-earth/10 relative overflow-hidden group hover:border-earth/20 transition-colors duration-500">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-mint/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-mint/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-peach/20 rounded-full blur-2xl -ml-10 -mb-10" />
              
              <div className="relative z-10 flex-1">
                <span className="eyebrow text-sage mb-4 block">Encuentro único</span>
                <h3 className="font-serif text-3xl md:text-4xl text-earth mb-4">Sesión Individual 1 a 1</h3>
                <p className="text-earth/70 mb-8 text-pretty">
                  Un espacio seguro para abordar temas específicos, destrabar emociones y encontrar claridad inmediata mediante la biodecodificación. Ideal si es tu primera vez o necesitas tratar un tema puntual.
                </p>
                
                <ul className="space-y-5 mb-10">
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-mint/20 flex items-center justify-center shrink-0 mt-0.5 text-sage">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <span className="text-earth/80 text-sm md:text-base">Decodificación del origen de un síntoma físico o patrón emocional.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-mint/20 flex items-center justify-center shrink-0 mt-0.5 text-sage">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <span className="text-earth/80 text-sm md:text-base">Análisis de tu árbol genealógico (lealtades y programas invisibles).</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-mint/20 flex items-center justify-center shrink-0 mt-0.5 text-sage">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <span className="text-earth/80 text-sm md:text-base">Herramientas prácticas para integrar la sanación en tu día a día.</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-auto pt-8 border-t border-earth/10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-earth text-sand px-6 py-3.5 rounded-full text-xs font-medium tracking-wide hover:bg-earth/90 transition-all duration-300 active:scale-95 shadow-soft"
                >
                  <MessageCircle className="size-3.5" /> Reservar Sesión Individual
                </a>
                <a
                  href="#sesiones"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-medium tracking-wide border border-earth/20 text-earth hover:border-earth/50 hover:bg-earth/5 transition-all duration-300"
                >
                  Ver opciones y precios
                </a>
              </div>
            </div>

            {/* Tarjeta B: Programas */}
            <div className="bg-earth text-sand rounded-[2rem] p-8 md:p-12 shadow-lift flex flex-col h-full relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose/15 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-rose/25 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-sand/5 rounded-full blur-2xl -ml-10 -mb-10" />
              
              <div className="relative z-10 flex-1">
                <span className="eyebrow text-rose mb-4 block">Procesos profundos</span>
                <h3 className="font-serif text-3xl md:text-4xl mb-4">Programas y Formaciones</h3>
                <p className="text-sand/80 mb-8 text-pretty">
                  Experiencias intensivas (grupales o individuales) de varias semanas para quienes buscan una transformación de raíz, ritualizada y sostenida en el tiempo.
                </p>
                
                <ul className="space-y-5 mb-10">
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-rose/20 flex items-center justify-center shrink-0 mt-0.5 text-rose">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <span className="text-sand/90 text-sm md:text-base">Encuentros semanales recurrentes para anclar e integrar los cambios.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-rose/20 flex items-center justify-center shrink-0 mt-0.5 text-rose">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <span className="text-sand/90 text-sm md:text-base">Grupos exclusivos de mujeres, mentorías y procesos 1 a 1 de meses.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-rose/20 flex items-center justify-center shrink-0 mt-0.5 text-rose">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <span className="text-sand/90 text-sm md:text-base">Material de apoyo exclusivo, ejercicios en casa y soporte continuo.</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-auto pt-8 border-t border-sand/10">
                <a
                  href="#programas"
                  className="inline-flex items-center justify-center gap-2 bg-sand text-earth px-6 py-3.5 rounded-full text-xs font-medium tracking-wide hover:bg-white transition-all duration-300 active:scale-95 shadow-soft"
                >
                  Ver Próximas Fechas y Programas <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS / PROGRAMAS */}
      <section id="programas" className="py-24 px-6 bg-earth text-sand">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <span className="eyebrow text-rose">Programas</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4 text-balance">Espacios de transformación</h2>
            <p className="text-sand/70 text-base max-w-xl">
              Procesos diseñados para tu evolución personal con un enfoque
              integral, humano y profesional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProgramCard
              img={desdeLaRaiz}
              alt="Hojas de salvia en niebla matinal"
              eyebrow="Acompañamiento individual"
              title="Desde la Raíz"
              text="Un viaje profundo hacia tu historia familiar para liberar lealtades invisibles y desatar nudos sistémicos."
              to="/desde-la-raiz"
              accent="sage"
              priceLabel="4 encuentros · 2 meses"
              note="Inversión disponible al entrar al programa"
            />
            <ProgramCard
              img={mujerRenace}
              alt="Forma orgánica en tonos rosa empolvado"
              eyebrow="Experiencia femenina"
              title="Mujer Re-Nace"
              text="Un espacio sagrado para reencontrarte con tu esencia y recuperar tu poder creador."
              to="/mujer-re-nace"
              accent="rose"
              priceLabel="12 encuentros semanales"
              note="Inversión disponible al entrar al programa"
            />
          </div>
        </div>
      </section>

      {/* SESIONES PUNTUALES */}
      <section id="sesiones" className="py-24 px-6 bg-beige/40 border-y border-earth/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow text-rose">{sessionsData.sectionEyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4 text-balance">
              {renderTitle(sessionsData.sectionTitle)}
            </h2>
            <p className="text-earth/70 text-pretty whitespace-pre-line">
              {sessionsData.sectionDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sessionsData.cards.map((card, idx) => {
              // Select icon
              const Icon = card.icon === "compass" ? Compass 
                         : card.icon === "zap" ? Zap 
                         : card.icon === "star" ? Sparkles 
                         : Heart;
              
              // Alternate colors
              const isAccent = idx % 2 === 1; 
              const accentColor = isAccent ? "text-bloom" : "text-sage";
              const accentBg = isAccent ? "bg-peach/40" : "bg-mint/30";
              const priceColor = isAccent ? "text-bloom" : "text-earth";

              return (
                <article key={card.id} className="bg-cream ring-1 ring-earth/5 rounded-3xl p-8 flex flex-col relative overflow-hidden">
                  {card.isPopular && (
                    <span className={`absolute top-6 right-6 eyebrow ${accentColor} bg-bloom/10 px-3 py-1 rounded-full`}>
                      Más elegida
                    </span>
                  )}
                  
                  <div className={`size-12 ${accentBg} rounded-full grid place-items-center mb-6`}>
                    <Icon className={`size-5 ${accentColor}`} />
                  </div>
                  <span className="eyebrow text-earth/50 mb-2">{card.eyebrow}</span>
                  <h3 className="font-serif text-2xl mb-3">{card.title}</h3>
                  <p className="text-sm text-earth/65 leading-relaxed mb-6">
                    {card.description}
                  </p>
                  <ul className="space-y-2 text-sm text-earth/70 mb-8">
                    <li className="flex gap-2 items-center">
                      <Clock className={`size-4 ${accentColor}`} /> {card.duration}
                    </li>
                    <li className="flex gap-2 items-center">
                      <Check className={`size-4 ${accentColor}`} /> {card.detail}
                    </li>
                  </ul>
                  
                  <div className="mt-auto flex items-end justify-between pt-6 border-t border-earth/10">
                    <div>
                      {card.hasPromo && (
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-serif text-xl text-earth/40 line-through">{card.oldPrice}</p>
                          <span className={`eyebrow text-[10px] ${accentColor} bg-bloom/10 px-2 py-0.5 rounded-full`}>
                            solo por hoy
                          </span>
                        </div>
                      )}
                      <p className={`font-serif text-3xl ${priceColor}`}>{card.price}</p>
                      <p className="text-xs text-earth/50">Encuentro único</p>
                    </div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-earth text-sand px-5 py-3 rounded-full text-xs font-medium hover:bg-earth/90 transition-colors"
                    >
                      Reservar <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow text-sage">Beneficios</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">Lo que vas a vivir</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficios.map((b) => (
              <div key={b.title} className="bg-cream ring-1 ring-earth/5 rounded-3xl p-8 hover:shadow-soft transition-shadow duration-500">
                <div className="size-10 bg-sage/15 rounded-full grid place-items-center mb-5">
                  <b.icon className="size-4 text-sage" />
                </div>
                <h3 className="font-serif text-xl italic mb-2">{b.title}</h3>
                <p className="text-sm text-earth/60 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRASE EMOCIONAL */}
      <section className="bg-beige/40 py-24 px-6 border-y border-earth/5">
        <p className="font-serif text-3xl md:text-4xl italic text-center text-balance max-w-3xl mx-auto leading-tight text-earth">
          El cuerpo grita lo que el alma calla. El cambio comienza cuando decidís escuchar.
        </p>
      </section>

      {/* RECURSOS GRATUITOS */}
      <section
        id="recursos"
        className="py-24 px-6 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(80% 60% at 0% 0%, color-mix(in oklab, var(--mint) 25%, transparent) 0%, transparent 60%), radial-gradient(80% 60% at 100% 100%, color-mix(in oklab, var(--peach) 30%, transparent) 0%, transparent 60%), var(--sand)",
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow text-sage">Regalos para vos</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4 text-balance">
              Recursos <span className="italic text-bloom">gratuitos</span> para empezar
            </h2>
            <p className="text-earth/70 text-pretty">
              Descargá estas prácticas y guías que preparé con amor. Son tu primer paso
              para escuchar tu cuerpo, ordenar tu historia y abrirte a algo nuevo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {heroData.resources.map((r, index) => {
              const accent = index % 3 === 0 ? "sage" : index % 3 === 1 ? "rose" : "bloom";
              const accentBg = accent === "sage" ? "bg-sage/15 text-sage"
                : accent === "rose" ? "bg-rose/15 text-rose"
                : "bg-bloom/15 text-bloom";
                
              const catLower = r.category.toLowerCase();
              const Icon = catLower.includes("meditaci") ? Headphones : catLower.includes("gu") ? TreeDeciduous : FileText;

              return (
                <a
                  key={r.id}
                  href={r.fileUrl}
                  download
                  className="group flex flex-col bg-cream ring-1 ring-earth/5 rounded-3xl p-8 hover:shadow-lift hover:-translate-y-1 transition-all duration-500"
                >
                  <div className={`size-12 rounded-full grid place-items-center mb-6 ${accentBg}`}>
                    <Icon className="size-5" />
                  </div>
                  <span className="eyebrow text-earth/50 mb-2">{r.category}</span>
                  <h3 className="font-serif text-2xl mb-3 leading-tight">{r.title}</h3>
                  <p className="text-sm text-earth/65 leading-relaxed mb-6 flex-1">{r.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-earth border-t border-earth/10 pt-4 mt-auto">
                    <Download className="size-4" />
                    Descargar PDF
                    <ArrowRight className="size-4 ml-auto transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              );
            })}
          </div>

          <p className="text-center text-xs text-earth/50 mt-10 flex items-center justify-center gap-2">
            <FileText className="size-3" />
            Descarga inmediata · Sin registro · 100% gratis
          </p>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <TestimoniosCarrusel />

      {/* FAQ */}
      <section className="py-24 px-6 bg-beige/40 border-y border-earth/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow text-sage">Preguntas frecuentes</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">Sacate las dudas</h2>
          </div>
          <div className="bg-cream ring-1 ring-earth/5 rounded-3xl p-6 md:p-10 space-y-2">
            <details className="group">
              <summary className="flex items-center justify-between py-4 text-sm font-medium cursor-pointer list-none border-b border-earth/5">
                <span className="font-medium text-earth">¿Funciona la sesión online?</span>
                <span className="transition-transform group-open:rotate-180 text-xs">▼</span>
              </summary>
              <p className="text-sm text-earth/70 leading-relaxed py-4">Sí. El acompañamiento online es tan profundo y efectivo como el presencial. Muchas personas eligen esta modalidad por comodidad, distancia o disponibilidad de tiempo. Lo importante es la conexión que creamos juntas, y eso no depende del formato.</p>
            </details>
            <details className="group">
              <summary className="flex items-center justify-between py-4 text-sm font-medium cursor-pointer list-none border-b border-earth/5">
                <span className="font-medium text-earth">¿En cuánto tiempo veo resultados?</span>
                <span className="transition-transform group-open:rotate-180 text-xs">▼</span>
              </summary>
              <p className="text-sm text-earth/70 leading-relaxed py-4">Cada proceso es único. Muchas personas sienten un cambio desde la primera sesión: mayor claridad, alivio o una nueva comprensión de lo que les pasa. Los programas de acompañamiento permiten anclar esos cambios para que se sostengan en el tiempo.</p>
            </details>
            <details className="group">
              <summary className="flex items-center justify-between py-4 text-sm font-medium cursor-pointer list-none border-b border-earth/5">
                <span className="font-medium text-earth">¿Qué pasa si no puedo seguir con el programa?</span>
                <span className="transition-transform group-open:rotate-180 text-xs">▼</span>
              </summary>
              <p className="text-sm text-earth/70 leading-relaxed py-4">Podemos conversarlo. Si sentís que no es el momento, podemos ajustar la frecuencia o pausar el proceso. También está la opción de una sesión puntual para sentir si este camino es para vos, sin compromiso de largo plazo.</p>
            </details>
            <details className="group">
              <summary className="flex items-center justify-between py-4 text-sm font-medium cursor-pointer list-none border-b border-earth/5">
                <span className="font-medium text-earth">¿Cuál es la diferencia entre una sesión puntual y un programa?</span>
                <span className="transition-transform group-open:rotate-180 text-xs">▼</span>
              </summary>
              <p className="text-sm text-earth/70 leading-relaxed py-4">Una sesión puntual es un encuentro único donde abrimos conversación sobre un síntoma o situación específica. Los programas (Desde la Raíz y Mujer Re-Nace) son caminos sostenidos donde cada sesión construye sobre la anterior, con acompañamiento entre encuentros y prácticas para integrar lo trabajado.</p>
            </details>
            <details className="group">
              <summary className="flex items-center justify-between py-4 text-sm font-medium cursor-pointer list-none">
                <span className="font-medium text-earth">¿Cómo sé si este proceso es para mí?</span>
                <span className="transition-transform group-open:rotate-180 text-xs">▼</span>
              </summary>
              <p className="text-sm text-earth/70 leading-relaxed py-4">Si sentís que hay algo en tu cuerpo, tus relaciones o tu historia que te pide ser mirado con amor y sin juicio, este espacio es para vos. La Sesión Exploradora de 30 minutos es una puerta perfecta para sentir si resuena con mi forma de acompañar.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6">
        <div className="max-w-screen-md mx-auto text-center bg-earth text-sand rounded-[2.5rem] px-8 py-16 md:py-20">
          <span className="eyebrow text-rose">Próximo paso</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-balance">
            ¿Comenzamos tu proceso?
          </h2>
          <p className="text-sand/70 max-w-md mx-auto mb-10">
            Escribime por WhatsApp o Instagram. Conversemos sobre lo que estás
            atravesando y veamos si este es tu momento.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-sand text-earth px-8 py-4 rounded-full text-sm font-medium hover:bg-rose hover:text-earth transition-colors duration-500"
            >
              <MessageCircle className="size-4" /> Escribir por WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium border border-sand/30 hover:border-sand transition-colors"
            >
              <Instagram className="size-4" /> Seguir en Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgramCard({
  img,
  alt,
  eyebrow,
  title,
  text,
  to,
  accent,
  priceLabel,
  note,
}: {
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
  to: "/desde-la-raiz" | "/mujer-re-nace";
  accent: "sage" | "rose";
  priceLabel: string;
  note: string;
}) {
  const accentColor = accent === "sage" ? "text-sage border-sage/40" : "text-rose border-rose/40";
  return (
    <article className="group flex flex-col gap-6">
      <div className="overflow-hidden rounded-3xl ring-1 ring-sand/10">
        <img
          src={img}
          alt={alt}
          loading="lazy"
          width={1024}
          height={768}
          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div>
        <span className="eyebrow text-sand/50">{eyebrow}</span>
        <h3 className="font-serif text-3xl mt-3 mb-3">{title}</h3>
        <p className="text-sm text-sand/70 mb-6 max-w-md">{text}</p>
        <div className="flex flex-col gap-1 mb-6 pb-6 border-b border-sand/15 max-w-md">
          <p className="eyebrow text-sand/40">{priceLabel}</p>
          <p className="text-xs text-sand/50">{note}</p>
        </div>
        <Link to={to} className={`inline-flex items-center gap-2 text-sm font-medium border-b pb-1 ${accentColor}`}>
          Ver detalles e inversión <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

function TestimonioCard({ t, p }: { t: any, p: any }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 250;
  const isLong = t.quote.length > maxLength;
  
  return (
    <figure
      className={`relative h-full flex flex-col ${p.bg} ring-1 ${p.ring} rounded-[2rem] p-8 md:p-14 shadow-soft`}
    >
      <span
        className={`font-serif text-[8rem] leading-none ${p.quote} absolute top-2 left-6 select-none opacity-40`}
        aria-hidden
      >
        “
      </span>
      <div className="relative flex flex-col h-full flex-1">
        <div className="mb-6">
          <span
            className={`inline-block ${p.chip} eyebrow rounded-full px-3 py-1`}
          >
            {t.proceso}
          </span>
        </div>
        
        <h4 className="font-serif text-2xl md:text-3xl text-earth mb-6 italic">
          {t.title}
        </h4>
        
        <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-earth/90 mb-8 flex-1">
          {expanded || !isLong ? t.quote : `${t.quote.substring(0, maxLength)}...`}
          {isLong && (
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="block mt-4 cursor-pointer text-sm font-sans font-medium text-earth hover:text-rose transition-colors underline underline-offset-4"
            >
              {expanded ? "Leer menos" : "Leer más"}
            </button>
          )}
        </blockquote>
        
        <figcaption className="flex items-center gap-3 mt-auto pt-6 border-t border-earth/10">
          <div className="size-10 rounded-full bg-earth/10 grid place-items-center font-serif text-earth shrink-0">
            {t.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-earth text-sm">{t.name}</p>
            <p className="eyebrow text-earth/50">{t.place}</p>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

function TestimoniosCarrusel() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* fondo cálido */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose/15 via-peach/10 to-sage/15" />
        <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-rose/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sage/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-56 w-56 rounded-full bg-bloom/20 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow text-rose">Experiencias reales</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 italic text-earth">
            Voces que florecieron
          </h2>
          <p className="text-sm text-earth/60 mt-4 max-w-xl mx-auto">
            Historias de quienes se animaron a mirar adentro y abrazar su proceso.
          </p>
        </div>

        <Carousel
          opts={{ align: "center", loop: true }}
          setApi={setApi}
          className="mx-auto"
        >
          <CarouselContent className="items-stretch">
            {testimonios.map((t, i) => {
              const p = paletteStyles[t.palette] ?? paletteStyles.rose;
              return (
                <CarouselItem key={i} className="md:basis-4/5 lg:basis-3/4 h-auto">
                  <TestimonioCard t={t} p={p} />
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="flex items-center justify-center gap-6 mt-12">
            <CarouselPrevious className="static translate-y-0 size-14 border-earth/20 bg-cream hover:bg-white text-earth hover:text-rose transition-colors shadow-soft" />
            <CarouselNext className="static translate-y-0 size-14 border-earth/20 bg-cream hover:bg-white text-earth hover:text-rose transition-colors shadow-soft" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
