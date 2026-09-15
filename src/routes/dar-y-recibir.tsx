import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Globe, Heart, Leaf, MapPin, Sparkles, Sun, TreeDeciduous, Users, Loader2, Clock, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import darYRecibir from "@/assets/dar-y-recibir.jpg";
import { WHATSAPP_URL } from "@/lib/contact";
import { getProgramsData, ProgramsData } from "@/lib/admin-data";

export const Route = createFileRoute("/dar-y-recibir")({
  head: () => ({
    meta: [
      { title: "Dar y Recibir — Programa exclusivo para mujeres | Lorena Calcopietro" },
      { name: "description", content: "Un programa exclusivo para mujeres que quieren romper las creencias limitantes sobre dar y recibir: merecer amor, cuidado y abundancia sin sentirse en deuda." },
      { property: "og:title", content: "Dar y Recibir | Lorena Calcopietro" },
      { property: "og:description", content: "Romper las creencias limitantes sobre dar y recibir. Exclusivo para mujeres." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/dar-y-recibir" },
      { property: "og:image", content: darYRecibir },
    ],
    links: [{ rel: "canonical", href: "/dar-y-recibir" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Dar y Recibir — Programa para mujeres",
          serviceType: "Biodecodificación y constelaciones familiares",
          description:
            "Programa individual exclusivo para mujeres que quieren liberar las creencias limitantes sobre dar y recibir: merecer amor, cuidado y abundancia sin sentirse en deuda.",
          provider: {
            "@type": "Person",
            name: "Lorena Calcopietro",
            jobTitle: "Terapeuta en Biodecodificación y Constelaciones Familiares",
          },
          areaServed: "AR",
          availableChannel: [
            { "@type": "ServiceChannel", serviceLocation: { "@type": "Place", name: "La Plata, Argentina" } },
            { "@type": "ServiceChannel", name: "Online" },
          ],
          audience: { "@type": "Audience", audienceType: "Mujeres" },
          inLanguage: "es-AR",
          offers: {
            "@type": "Offer",
            price: "333000",
            priceCurrency: "ARS",
            availability: "https://schema.org/LimitedAvailability",
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
  component: DarYRecibir,
});

const faqs = [
  {
    q: "¿Este programa es solo para mujeres?",
    a: "Sí. Es un espacio exclusivo para mujeres, porque trabajamos mandatos y creencias que se transmiten específicamente por el linaje femenino: el sacrificio, la entrega sin límite y la culpa al recibir.",
  },
  {
    q: "¿Tengo que estar en pareja para hacerlo?",
    a: "No. Estas creencias aparecen tanto en pareja como estando sola, y muchas veces son justamente las que impiden que llegue un vínculo donde puedas ser cuidada. Se trabaja igual estés o no en pareja.",
  },
  {
    q: "¿Cómo se trabaja: es teoría o es un proceso terapéutico?",
    a: "Es un proceso terapéutico real, uno a uno. Usamos Biodecodificación y constelaciones familiares para ir al origen de la creencia en tu historia y en tu árbol, no a explicártela desde la teoría.",
  },
  {
    q: "¿Cuántos encuentros son?",
    a: "Son 4 encuentros individuales de 60 minutos. Un espacio íntimo y sostenido para ir al origen de la creencia y construir una nueva manera de dar y recibir.",
  },
  {
    q: "¿Cuál es la inversión?",
    a: "La inversión total del programa es de $333.000. Podés abonarlo y coordinamos la forma de pago que te resulte más cómoda antes de empezar.",
  },
  {
    q: "¿Es online o presencial?",
    a: "Las dos modalidades. Atiendo online a mujeres de todo el mundo y presencialmente en La Plata, Argentina, con la misma profundidad.",
  },
];

const trustBadges = [
  { icon: Users, t: "Exclusivo para mujeres" },
  { icon: TreeDeciduous, t: "Trabajo con el árbol" },
  { icon: Globe, t: "Online en todo el mundo" },
  { icon: MapPin, t: "Presencial en La Plata" },
];

const fases = [
  {
    n: "01",
    t: "Reconocer la creencia",
    d: "Ponemos en palabras cómo se manifiesta hoy: en tu pareja, en tu trabajo, con tu familia, con el dinero. Qué te pasa en el cuerpo cuando alguien te da algo.",
  },
  {
    n: "02",
    t: "Buscar el origen",
    d: "Vamos a tu historia y a tu árbol familiar: qué mujeres antes de vos dieron todo, quién quedó en deuda, qué se pagó con sacrificio, amor o silencio.",
  },
  {
    n: "03",
    t: "Liberar la lealtad",
    d: "Con constelaciones familiares y Biodecodificación devolvemos a su lugar lo que no te pertenece, para que puedas dejar de pagar una cuenta que no era tuya.",
  },
  {
    n: "04",
    t: "Sostener lo nuevo",
    d: "Prácticas concretas para recibir sin culpa en tu vida cotidiana: pedir, aceptar ayuda, poner límites al dar y permitir que te cuiden.",
  },
];

const creencias = [
  "Sentís que si un hombre te cuida o te da amor, quedás en deuda.",
  "Te cuesta recibir sin sentir que tenés que devolver el doble.",
  "Creés que tenés que ganarte el amor con esfuerzo y entrega.",
  "Das hasta agotarte, pero recibir te genera culpa o incomodidad.",
  "Sentís que pedir ayuda o permitirte ser cuidada te hace débil.",
];

const trabajamos = [
  {
    icon: Heart,
    t: "Merecimiento",
    d: "Exploramos de dónde viene la idea de que el amor hay que ganarlo, y abrimos la posibilidad de recibir por el solo hecho de ser.",
  },
  {
    icon: Sun,
    t: "Dar sin agotarse",
    d: "Revisamos tu manera de dar: cuándo es un acto de amor y cuándo una estrategia para ser aceptada o no quedar en deuda.",
  },
  {
    icon: Sparkles,
    t: "Recibir sin culpa",
    d: "Trabajamos la apertura a recibir cuidado, amor y abundancia sin sentir que tenés que pagar un precio por ello.",
  },
];

const incluye = [
  "Encuentros individuales de Biodecodificación y constelaciones familiares",
  "Trabajo con el linaje femenino y las lealtades invisibles",
  "Reprogramación de creencias sobre el merecimiento",
  "Prácticas concretas para integrar en tu vida cotidiana",
  "Soporte por WhatsApp durante todo el proceso",
  "Modalidad online o presencial en La Plata",
];

function DarYRecibir() {
  const [programsData, setProgramsData] = useState<ProgramsData | null>(null);

  useEffect(() => {
    getProgramsData().then(setProgramsData);
  }, []);

  const data = programsData?.darYRecibir;

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
      <section className="relative px-6 pt-12 pb-20 overflow-hidden">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left order-2 md:order-1">
            <span className="eyebrow text-rose mb-6 inline-block animate-fade">Exclusivo para mujeres</span>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-balance mb-6 animate-reveal">
              Dar y <span className="italic">Recibir</span>.
            </h1>
            <p className="text-base md:text-lg text-earth/70 leading-relaxed mb-10 text-pretty animate-reveal" style={{ animationDelay: "120ms" }}>
              Un programa para romper las creencias limitantes sobre dar y
              recibir: merecer amor, cuidado y abundancia sin sentirte en
              deuda con nadie.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors duration-500"
            >
              Quiero saber más <ArrowRight className="size-4" />
            </a>
            <ul className="mt-10 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.15em] text-earth/50">
              {trustBadges.map((b) => (
                <li key={b.t} className="inline-flex items-center gap-2">
                  <b.icon className="size-3.5 text-rose" /> {b.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 animate-reveal" style={{ animationDelay: "240ms" }}>
            <div className="relative">
              <div className="absolute -inset-6 bg-peach/30 rounded-[3rem] blur-2xl" aria-hidden="true" />
              <img
                src={darYRecibir}
                alt="Flor silvestre iluminada por luz dorada sobre fondo rosa y naranja"
                loading="lazy"
                width={1024}
                height={1024}
                className="relative w-full aspect-square object-cover rounded-[2.5rem] ring-1 ring-earth/5 shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FRASE */}
      <section className="bg-rose/15 py-20 px-6">
        <p className="font-serif text-3xl md:text-5xl italic text-center text-balance leading-tight max-w-3xl mx-auto text-earth">
          Recibir no te pone en deuda. Te pone en tu lugar.
        </p>
      </section>

      {/* CREENCIAS */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <span className="eyebrow text-rose">¿Te reconocés?</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance leading-tight">
              Este espacio es para vos si...
            </h2>
            <p className="text-earth/70 mt-6 text-pretty">
              Muchas mujeres cargamos con mandatos invisibles sobre lo que
              "corresponde" dar y lo que "está bien" recibir. Este programa
              va al origen de esas creencias para liberarlas.
            </p>
          </div>
          <ul className="space-y-4">
            {creencias.map((item) => (
              <li key={item} className="flex gap-4 items-start bg-cream ring-1 ring-earth/5 rounded-2xl p-6">
                <Leaf className="size-5 text-rose shrink-0 mt-0.5" />
                <p className="text-base text-earth/80">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* QUÉ TRABAJAMOS */}
      <section className="py-24 px-6 bg-beige/40 border-y border-earth/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow text-rose">El trabajo</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">
              Tres ejes para <span className="italic">re-equilibrar</span> tu balanza.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trabajamos.map((p) => (
              <article key={p.t} className="bg-cream ring-1 ring-earth/5 rounded-3xl p-8 hover:shadow-soft transition-shadow duration-500">
                <div className="size-12 bg-peach/40 rounded-full grid place-items-center mb-6">
                  <p.icon className="size-5 text-rose" />
                </div>
                <h3 className="font-serif text-2xl italic mb-3">{p.t}</h3>
                <p className="text-sm text-earth/60 leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow text-rose">El recorrido</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">
              Cómo trabajamos juntas
            </h2>
            <p className="text-earth/70 mt-4 max-w-xl mx-auto text-pretty">
              Cuatro fases que se van desplegando a tu ritmo, con
              Biodecodificación y constelaciones familiares.
            </p>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fases.map((f) => (
              <li key={f.n} className="bg-cream ring-1 ring-earth/5 rounded-3xl p-8">
                <span className="font-serif italic text-rose text-2xl block mb-4">{f.n}</span>
                <h3 className="font-serif text-xl mb-3">{f.t}</h3>
                <p className="text-sm text-earth/70 leading-relaxed">{f.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INVERSIÓN / QUÉ INCLUYE */}
      <section className="py-24 px-6 bg-earth text-sand">
        {!data ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="size-8 text-sand animate-spin opacity-50" />
          </div>
        ) : (
          <div className="max-w-screen-xl mx-auto animate-fade">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow text-rose">El programa</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4 text-balance">
              {data.title.includes('*') ? data.title.split('*').map((part, i) => i % 2 === 1 ? <span key={i} className="italic">{part}</span> : part) : data.title}
            </h2>
            <p className="text-sand/70 text-pretty whitespace-pre-wrap">
              {data.description}
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <ul className="md:col-span-3 space-y-3">
              {incluye.map((i) => (
                <li key={i} className="flex gap-3 items-start bg-sand/5 ring-1 ring-sand/10 rounded-2xl px-5 py-4">
                  <Check className="size-4 text-rose shrink-0 mt-1" />
                  <span className="text-sm text-sand/80">{i}</span>
                </li>
              ))}
            </ul>

            <aside className="md:col-span-2 bg-sand/5 ring-1 ring-sand/10 rounded-3xl p-8 flex flex-col relative overflow-hidden">
              <span className="absolute -top-12 -right-12 size-40 rounded-full bg-rose/30 blur-3xl" aria-hidden="true" />
              <span className="eyebrow text-rose mb-4 relative">Programa Dar y Recibir</span>
              <div className="flex flex-wrap gap-4 text-xs text-sand/60 mb-6 relative">
                {data.features.map(f => (
                  <span key={f.id} className="inline-flex items-center gap-1.5">{renderIcon(f.icon, "size-3.5")} {f.text}</span>
                ))}
              </div>
              <div className="relative mb-6">
                <p className="font-serif text-5xl text-sand">{data.price}</p>
              </div>
              <p className="text-sm text-sand/70 leading-relaxed mb-8 relative whitespace-pre-wrap">
                {data.note}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 bg-sand text-earth px-6 py-3.5 rounded-full text-sm font-medium hover:bg-rose hover:text-earth transition-colors relative"
              >
                Reservar mi lugar <ArrowRight className="size-4" />
              </a>
            </aside>
          </div>
        </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-balance mb-6">
            Ya diste suficiente. Ahora te toca recibir.
          </h2>
          <p className="text-earth/70 mb-10 text-pretty">
            Escribime y conversemos sobre cómo empezar tu proceso de dar y
            recibir desde otro lugar.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors"
          >
            Reservar mi lugar <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
