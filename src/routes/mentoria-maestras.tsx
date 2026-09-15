import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Check, Clock, Eye, Globe, GraduationCap, Leaf, MapPin, Sparkles, Users, Loader2, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import mentoriaMaestras from "@/assets/mentoria-maestras.jpg";
import { WHATSAPP_URL } from "@/lib/contact";
import { getProgramsData, ProgramsData } from "@/lib/admin-data";

export const Route = createFileRoute("/mentoria-maestras")({
  head: () => ({
    meta: [
      { title: "Mentoría para Maestras — Armá tu propio método | Lorena Calcopietro" },
      { name: "description", content: "Mentoría para terapeutas y maestras que no se animan a dar sesiones. 2 encuentros de Biodecodificación + 4 de mentoría para estructurar tus sesiones y encontrar tu propio espacio." },
      { property: "og:title", content: "Mentoría para Maestras | Lorena Calcopietro" },
      { property: "og:description", content: "De tener muchas herramientas a contar con una estructura clara para acompañar una consulta de principio a fin." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/mentoria-maestras" },
      { property: "og:image", content: mentoriaMaestras },
    ],
    links: [{ rel: "canonical", href: "/mentoria-maestras" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Mentoría para Maestras — Armá tu propia guía terapéutica",
          description:
            "Programa de 6 encuentros individuales (2 de Biodecodificación + 4 de mentoría) para terapeutas que quieren estructurar sus sesiones y construir su propio método de acompañamiento.",
          provider: {
            "@type": "Person",
            name: "Lorena Calcopietro",
            jobTitle: "Terapeuta en Biodecodificación y Constelaciones Familiares",
          },
          inLanguage: "es-AR",
          offers: {
            "@type": "Offer",
            price: "399000",
            priceCurrency: "ARS",
            availability: "https://schema.org/LimitedAvailability",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: ["online", "onsite"],
            courseWorkload: "PT6H",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: MentoriaMaestras,
});

const faqs = [
  {
    q: "¿Necesito tener formación previa en Biodecodificación?",
    a: "Sí, este programa está pensado para personas que ya tienen formación o conocimientos en Biodecodificación, constelaciones u otras herramientas terapéuticas, y necesitan ordenarlos en una estructura de trabajo propia.",
  },
  {
    q: "¿Y si todavía no atiendo consultantes?",
    a: "Es exactamente para vos. Muchas maestras terminan su formación con muchísimo conocimiento y no se animan a dar sesiones. Los dos encuentros de Biodecodificación trabajan justo ese bloqueo, y los cuatro de mentoría te dan la estructura para empezar con seguridad.",
  },
  {
    q: "¿Me vas a dar un protocolo para seguir?",
    a: "No. No vas a recibir un protocolo para copiar: vas a construir tu propio mapa, con tu mirada y tu estilo. El resultado es una guía terapéutica personalizada que podés seguir ajustando con el tiempo.",
  },
  {
    q: "¿Cómo son los encuentros y con qué frecuencia?",
    a: "Son 6 encuentros individuales de 60 minutos, uno por semana o cada 15 días, según tus tiempos. La modalidad puede ser online (desde cualquier lugar del mundo) o presencial en La Plata.",
  },
  {
    q: "¿Cómo puedo pagar?",
    a: "Podés abonar en un pago o en dos pagos. Al escribirme por WhatsApp coordinamos la forma que te resulte más cómoda antes de empezar.",
  },
];

const trustBadges = [
  { icon: GraduationCap, t: "+10 años acompañando" },
  { icon: Users, t: "Procesos con colegas" },
  { icon: Globe, t: "Online en todo el mundo" },
  { icon: MapPin, t: "Presencial en La Plata" },
];

const recorrido = [
  {
    n: "01",
    t: "Biodecodificación — Tus propios bloqueos",
    d: "Un espacio de Biodecodificación para vos, antes de empezar a construir tu método. Trabajamos lo que te bloquea a la hora de sostener una consulta: miedos, historia personal, creencias heredadas.",
    r: "Llegás a la mentoría con más liviandad para construir tu propio método.",
  },
  {
    n: "02",
    t: "Mentoría — Tu mirada terapéutica",
    d: "¿Desde dónde acompañás? Qué herramientas tenés y cómo integrarlas. Cómo definir tu estilo, diferenciar escuchar, interpretar e intervenir, e identificar tus fortalezas.",
    r: "Comenzás a construir la identidad de tu guía terapéutica.",
  },
  {
    n: "03",
    t: "Mentoría — El mapa de la consulta",
    d: "Cómo recibir y escuchar el motivo de consulta, preguntas que abren información, cómo ordenar la historia del consultante, línea de tiempo y qué observar durante una sesión.",
    r: "Un esquema claro para recorrer una consulta sin perderte entre la información.",
  },
  {
    n: "04",
    t: "Biodecodificación — Profundización",
    d: "Retomamos lo que fue apareciendo en los encuentros de mentoría y trabajamos los bloqueos puntuales que se activan al indagar, devolver e intervenir.",
    r: "Liberás lo que te frena para animarte a intervenir con más seguridad.",
  },
  {
    n: "05",
    t: "Mentoría — Indagar, devolver e intervenir",
    d: "Cómo profundizar sin invadir, formular preguntas terapéuticas, realizar una devolución clara y cuidadosa, e integrar Biodecodificación y mirada sistémica con recursos concretos.",
    r: "Un repertorio de recursos y herramientas para tus sesiones.",
  },
  {
    n: "06",
    t: "Mentoría y cierre — Armá tu guía terapéutica",
    d: "Apertura, motivo de consulta, preguntas de indagación, ejes de observación, recursos de intervención, cierre de sesión y seguimiento del consultante.",
    r: "Terminás el programa con una guía terapéutica personalizada, creada por vos.",
  },
];

const teLlevas = [
  "Una estructura clara para tus sesiones",
  "Tu propia Guía Terapéutica Bio",
  "Un mapa para saber qué preguntar, qué observar y cómo avanzar",
  "Recursos y preguntas para utilizar con tus consultantes",
  "Mayor seguridad para sostener una sesión",
  "Una forma de integrar tus herramientas sin sentir que tenés que usarlas todas",
  "Un método flexible, propio y en constante evolución",
  "Material de trabajo para seguir desarrollando tu práctica",
];

const esParaVos = [
  "Tenés conocimientos de Biodecodificación pero te cuesta ordenarlos en una sesión.",
  "Sentís que tenés muchas herramientas y no sabés cuándo utilizar cada una.",
  "Querés dejar de improvisar tus sesiones.",
  "Querés ganar seguridad al acompañar consultantes.",
  "Querés construir una manera propia de trabajar.",
];

function MentoriaMaestras() {
  const [programsData, setProgramsData] = useState<ProgramsData | null>(null);

  useEffect(() => {
    getProgramsData().then(setProgramsData);
  }, []);

  const data = programsData?.mentoriaMaestras;

  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "clock": return <Clock className={className} />;
      case "sparkles": return <Sparkles className={className} />;
      case "leaf": return <Leaf className={className} />;
      case "heart": return <Heart className={className} />;
      case "calendar":
      default: return <Calendar className={className} />;
    }
  };

  return (
    <div className="bg-sand">
      {/* HERO */}
      <section className="px-6 pt-12 pb-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <span className="eyebrow text-sage mb-6 inline-block animate-fade">Para terapeutas y maestras</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-balance mb-6 animate-reveal">
            Mentoría para <span className="italic">Maestras</span>.
          </h1>
          <p className="text-base md:text-lg text-earth/70 leading-relaxed max-w-2xl mx-auto text-pretty animate-reveal" style={{ animationDelay: "120ms" }}>
            Te acompaño a armar tu propio método para tus sesiones. De tener
            muchas herramientas a contar con una estructura clara para
            acompañar una consulta de principio a fin.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center animate-reveal" style={{ animationDelay: "180ms" }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors duration-500"
            >
              Quiero armar mi método <ArrowRight className="size-4" />
            </a>
            <a
              href="#recorrido"
              className="inline-flex items-center justify-center gap-2 bg-cream text-earth ring-1 ring-earth/10 px-8 py-4 rounded-full text-sm font-medium hover:bg-beige transition-colors"
            >
              Ver el recorrido completo
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.15em] text-earth/50">
            {trustBadges.map((b) => (
              <li key={b.t} className="inline-flex items-center gap-2">
                <b.icon className="size-3.5 text-sage" /> {b.t}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={mentoriaMaestras}
          alt="Cuaderno de notas terapéuticas con té y hojas de salvia"
          loading="lazy"
          width={1024}
          height={1024}
          className="mt-12 w-full max-w-4xl mx-auto aspect-[16/10] object-cover rounded-3xl ring-1 ring-earth/5 shadow-soft animate-reveal"
          style={{ animationDelay: "240ms" }}
        />
      </section>

      {/* INTRO */}
      <section className="py-24 px-6 bg-beige/40 border-y border-earth/5">
        <div className="max-w-screen-md mx-auto text-center">
          <span className="eyebrow text-rose">La propuesta</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-balance">
            No es un protocolo rígido: es tu propia guía terapéutica.
          </h2>
          <p className="text-base text-earth/70 leading-relaxed text-pretty">
            Vamos a trabajar sobre tu manera de escuchar, preguntar, indagar,
            intervenir y cerrar una sesión, respetando tu estilo personal y
            construyendo un mapa que puedas utilizar como apoyo en tus consultas.
          </p>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section id="recorrido" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow text-sage">Cómo trabajamos</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">
              6 encuentros individuales
            </h2>
            <p className="text-earth/70 mt-4 max-w-xl mx-auto text-pretty">
              2 sesiones de Biodecodificación + 4 de mentoría. Un encuentro por
              semana o cada 15 días, de 60 minutos, online o presencial.
            </p>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recorrido.map((p) => (
              <li key={p.n} className="bg-cream ring-1 ring-earth/5 rounded-3xl p-8 flex flex-col">
                <span className="font-serif italic text-rose text-2xl block mb-4">{p.n}</span>
                <h3 className="font-serif text-xl mb-3">{p.t}</h3>
                <p className="text-sm text-earth/70 leading-relaxed mb-4">{p.d}</p>
                <p className="mt-auto text-xs text-sage leading-relaxed border-t border-earth/10 pt-4">
                  <strong>Resultado:</strong> {p.r}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* A QUIÉN ESTÁ DIRIGIDO */}
      <section className="py-24 px-6 bg-beige/40 border-y border-earth/5">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <span className="eyebrow text-sage">Este programa es para vos si…</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance leading-tight">
              Tenés las herramientas. Falta tu <span className="italic">estructura</span>.
            </h2>
          </div>
          <ul className="space-y-4">
            {esParaVos.map((item) => (
              <li key={item} className="flex gap-4 items-start bg-cream ring-1 ring-earth/5 rounded-2xl p-6">
                <Leaf className="size-5 text-sage shrink-0 mt-0.5" />
                <p className="text-base text-earth/80">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INVERSIÓN */}
      <section className="py-24 px-6 bg-earth text-sand">
        {!data ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="size-8 text-sand animate-spin opacity-50" />
          </div>
        ) : (
          <div className="max-w-screen-xl mx-auto animate-fade">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow text-rose">Inversión</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4 text-balance">
              {data.title.includes('*') ? data.title.split('*').map((part, i) => i % 2 === 1 ? <span key={i} className="italic">{part}</span> : part) : data.title}
            </h2>
            <p className="text-sand/70 text-pretty whitespace-pre-wrap">
              {data.description}
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <ul className="md:col-span-3 space-y-3">
              {teLlevas.map((i) => (
                <li key={i} className="flex gap-3 items-start bg-sand/5 ring-1 ring-sand/10 rounded-2xl px-5 py-4">
                  <Check className="size-4 text-rose shrink-0 mt-1" />
                  <span className="text-sm text-sand/80">{i}</span>
                </li>
              ))}
            </ul>

            <aside className="md:col-span-2 bg-sand/5 ring-1 ring-sand/10 rounded-3xl p-8 flex flex-col relative overflow-hidden">
              <span className="absolute -top-12 -right-12 size-40 rounded-full bg-sage/25 blur-3xl" aria-hidden="true" />
              <span className="inline-flex self-start items-center gap-1.5 bg-rose/20 text-rose text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4 relative">
                <Sparkles className="size-3" /> Cupos limitados
              </span>
              <span className="eyebrow text-rose mb-4 relative">Mentoría para Maestras</span>
              <div className="flex flex-wrap gap-4 text-xs text-sand/60 mb-6 relative">
                {data.features.map(f => (
                  <span key={f.id} className="inline-flex items-center gap-1.5">{renderIcon(f.icon, "size-3.5")} {f.text}</span>
                ))}
              </div>
              <div className="relative">
                <PriceReveal price={data.price} note={data.note} />
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 bg-sand text-earth px-6 py-3.5 rounded-full text-sm font-medium hover:bg-rose hover:text-earth transition-colors relative"
              >
                Quiero armar mi método <ArrowRight className="size-4" />
              </a>
            </aside>
          </div>
        </div>
        )}
      </section>

      {/* QUIÉN TE ACOMPAÑA */}
      <section className="py-24 px-6 bg-beige/40 border-b border-earth/5">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow text-sage mb-6 inline-block">Quién te acompaña</span>
          <p className="font-serif text-2xl md:text-3xl italic text-earth/90 leading-relaxed text-pretty">
            "Acompaño procesos propios y de colegas desde hace más de 10 años,
            de forma presencial en La Plata y online en todo el mundo. En esta
            mentoría pongo esa misma escucha al servicio de tu propio método
            de trabajo."
          </p>
          <p className="eyebrow text-earth/50 mt-8">— Lorena Calcopietro</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-sand">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow text-sage">Preguntas frecuentes</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">Sacate las dudas</h2>
          </div>
          <div className="bg-cream ring-1 ring-earth/5 rounded-3xl p-6 md:p-10 space-y-2">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex items-center justify-between gap-4 py-4 text-sm cursor-pointer list-none border-b border-earth/5">
                  <span className="font-medium text-earth">{f.q}</span>
                  <span className="transition-transform group-open:rotate-180 text-xs shrink-0">▼</span>
                </summary>
                <p className="text-sm text-earth/70 leading-relaxed py-4">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-beige/40 border-t border-earth/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-balance mb-6">
            Tu espacio terapéutico te está esperando.
          </h2>
          <p className="text-earth/70 mb-10 text-pretty">
            Escribime y conversemos sobre cómo empezar a construir tu propio
            método de acompañamiento.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors duration-500"
          >
            Reservar mi lugar <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </div>
  );
}

function PriceReveal({ price, note }: { price: string; note: string }) {
  const [shown, setShown] = useState(false);
  if (!shown) {
    return (
      <button
        type="button"
        onClick={() => setShown(true)}
        className="mb-8 inline-flex items-center justify-center gap-2 bg-sand/10 hover:bg-sand/20 text-sand text-sm font-medium px-5 py-3 rounded-2xl ring-1 ring-sand/20 transition-colors"
      >
        <Eye className="size-4" /> Ver inversión
      </button>
    );
  }
  return (
    <div className="animate-fade">
      <p className="font-serif text-5xl mb-1">{price}</p>
      <p className="text-xs text-sand/60 mb-6">Inversión total del programa</p>
      <div className="bg-sand/10 rounded-2xl p-4 mb-8">
        <p className="text-xs text-sand/80 leading-relaxed">
          <strong className="text-sand">Pago flexible:</strong> {note}
        </p>
      </div>
    </div>
  );
}
