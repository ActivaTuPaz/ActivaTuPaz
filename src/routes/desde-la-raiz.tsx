import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Calendar, Leaf, Sparkles, Eye } from "lucide-react";
import { useState } from "react";
import desdeLaRaiz from "@/assets/desde-la-raiz.jpg";
import { WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/desde-la-raiz")({
  head: () => ({
    meta: [
      { title: "Desde la Raíz — Acompañamiento terapéutico | Lorena Calcopietro" },
      { name: "description", content: "Programa de acompañamiento individual en biodecodificación y constelaciones familiares para sanar desde el origen." },
      { property: "og:title", content: "Desde la Raíz | Lorena Calcopietro" },
      { property: "og:description", content: "Acompañamiento individual para sanar desde el origen." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/desde-la-raiz" },
      { property: "og:image", content: desdeLaRaiz },
    ],
    links: [{ rel: "canonical", href: "/desde-la-raiz" }],
  }),
  component: DesdeLaRaiz,
});

const dirigido = [
  "Sentís que arrastrás cargas que no son tuyas.",
  "Repetís patrones de relación o salud que no entendés.",
  "Atravesás un duelo, una crisis o un cambio profundo.",
  "Querés conocerte desde un lugar más amoroso y consciente.",
];

const proceso = [
  { n: "01", t: "Sesión de escucha", d: "Espacio inicial para que pongas en palabras lo que sentís y delineemos juntas tu propósito." },
  { n: "02", t: "Mapa transgeneracional", d: "Exploramos tu árbol familiar y las memorias que se manifiestan en tu presente." },
  { n: "03", t: "Trabajo bio-emocional", d: "Identificamos la emoción biológica detrás del síntoma y abrimos camino a la sanación." },
  { n: "04", t: "Integración", d: "Anclamos los cambios con prácticas concretas para tu vida cotidiana." },
];

const incluye = [
  "4 encuentros individuales de 120 minutos",
  "Acompañamiento sostenido durante 2 meses",
  "Mapa transgeneracional personalizado",
  "Material y prácticas entre sesiones",
  "Soporte por WhatsApp durante el proceso",
  "Modalidad online o presencial en La Plata",
];

function DesdeLaRaiz() {
  return (
    <div className="bg-sand">
      {/* HERO */}
      <section className="px-6 pt-12 pb-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <span className="eyebrow text-sage mb-6 inline-block animate-fade">Acompañamiento individual</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-balance mb-6 animate-reveal">
            Desde la <span className="italic">Raíz</span>.
          </h1>
          <p className="text-base md:text-lg text-earth/70 leading-relaxed max-w-2xl mx-auto text-pretty animate-reveal" style={{ animationDelay: "120ms" }}>
            Un viaje profundo hacia tu historia familiar para liberar lealtades
            invisibles, desatar nudos sistémicos y volver a habitarte.
          </p>
        </div>
        <img
          src={desdeLaRaiz}
          alt="Hojas de salvia en la niebla"
          loading="lazy"
          width={1024}
          height={768}
          className="mt-12 w-full max-w-4xl mx-auto aspect-[16/10] object-cover rounded-3xl ring-1 ring-earth/5 shadow-soft animate-reveal"
          style={{ animationDelay: "240ms" }}
        />
      </section>

      {/* EL PROGRAMA */}
      <section className="py-24 px-6 bg-beige/40 border-y border-earth/5">
        <div className="max-w-screen-md mx-auto text-center">
          <span className="eyebrow text-rose">El programa</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-balance">
            Un proceso íntimo, profundo y sostenido.
          </h2>
          <p className="text-base text-earth/70 leading-relaxed text-pretty">
            Trabajamos en encuentros uno a uno, online o presenciales, donde
            cada sesión es un acto de presencia y revelación. Vamos al origen
            del síntoma para que algo nuevo pueda nacer en vos.
          </p>
        </div>
      </section>

      {/* A QUIÉN ESTÁ DIRIGIDO */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <span className="eyebrow text-sage">A quién acompaño</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance leading-tight">
              Este espacio es para vos si...
            </h2>
          </div>
          <ul className="space-y-4">
            {dirigido.map((item) => (
              <li key={item} className="flex gap-4 items-start bg-cream ring-1 ring-earth/5 rounded-2xl p-6">
                <Leaf className="size-5 text-sage shrink-0 mt-0.5" />
                <p className="text-base text-earth/80">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-24 px-6 bg-earth text-sand">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow text-rose">Proceso</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">Cómo trabajamos juntas</h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proceso.map((p) => (
              <li key={p.n} className="bg-sand/5 ring-1 ring-sand/10 rounded-3xl p-8">
                <span className="font-serif italic text-rose text-2xl block mb-4">{p.n}</span>
                <h3 className="font-serif text-xl mb-3">{p.t}</h3>
                <p className="text-sm text-sand/70 leading-relaxed">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      {/* INVERSIÓN */}
      <section className="py-24 px-6 bg-beige/30 border-t border-earth/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow text-sage">Inversión</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4 text-balance">
              Un proceso pensado para <span className="italic">transformar</span>.
            </h2>
            <p className="text-earth/70 text-pretty">
              Más que sesiones sueltas: un camino sostenido donde cada
              encuentro construye sobre el anterior y los cambios se anclan.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <ul className="md:col-span-3 space-y-3">
              {incluye.map((i) => (
                <li key={i} className="flex gap-3 items-start bg-cream ring-1 ring-earth/5 rounded-2xl px-5 py-4">
                  <Check className="size-4 text-sage shrink-0 mt-1" />
                  <span className="text-sm text-earth/80">{i}</span>
                </li>
              ))}
            </ul>

            <aside className="md:col-span-2 bg-earth text-sand rounded-3xl p-8 flex flex-col">
              <span className="eyebrow text-rose mb-4">Programa Desde la Raíz</span>
              <div className="flex flex-wrap gap-4 text-xs text-sand/60 mb-6">
                <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> 4 encuentros</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> 120 min</span>
                <span className="inline-flex items-center gap-1.5"><Sparkles className="size-3.5" /> 2 meses</span>
              </div>
              <PriceReveal price="$320.000" note="consultá por la opción de abonar en 2 cuotas sin recargo." />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 bg-sand text-earth px-6 py-3.5 rounded-full text-sm font-medium hover:bg-rose hover:text-earth transition-colors"
              >
                Quiero esta inversión <ArrowRight className="size-4" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 px-6 bg-beige/40 border-y border-earth/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="eyebrow text-sage mb-6 inline-block">Experiencias</span>
            <h2 className="font-serif text-3xl md:text-4xl italic text-earth text-balance">Voces del proceso</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <figure className="bg-cream ring-1 ring-earth/5 rounded-[2rem] p-8 md:p-10">
              <blockquote className="font-serif text-lg md:text-xl italic text-earth/90 leading-relaxed mb-6 text-pretty">
                "Gracias Lore por tu entrega, por tu amor, por tu generosidad. Gracias por tu empatía, por tratar mis heridas con tanto respeto, por llenarlas de luz, de conciencia."
              </blockquote>
              <figcaption className="eyebrow text-earth/50">— Daiana, Chajarí, Entre Ríos</figcaption>
            </figure>
            <figure className="bg-cream ring-1 ring-earth/5 rounded-[2rem] p-8 md:p-10">
              <blockquote className="font-serif text-lg md:text-xl italic text-earth/90 leading-relaxed mb-6 text-pretty">
                "Llegué a Lore con un dolor físico en la pierna derecha, de hacía meses. Lore me dijo: vamos a buscar la emoción detrás de ese dolor. Y así fue como, encuentro tras encuentro, fueron apareciendo emociones reprimidas y heridas del pasado. El dolor físico dejó de ocupar espacio en mi mente y comencé a ocuparme de las verdaderas emociones que salían de cada encuentro."
              </blockquote>
              <figcaption className="eyebrow text-earth/50">— Virginia, Chajarí, Entre Ríos</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-balance mb-6">
            Tu raíz te espera.
          </h2>
          <p className="text-earth/70 mb-10 text-pretty">
            Reservá tu primera sesión y empezá a transitar tu proceso con un
            acompañamiento profesional, cálido y sostenido.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors duration-500"
          >
            Reservar mi sesión <ArrowRight className="size-4" />
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