import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Check, Clock, Eye, Heart, Sparkles, Sun } from "lucide-react";
import { useState } from "react";
import mujerRenace from "@/assets/mujer-renace.jpg";
import { WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/mujer-re-nace")({
  head: () => ({
    meta: [
      { title: "Mujer Re-Nace — Experiencia femenina | Lorena Calcopietro" },
      { name: "description", content: "Una experiencia de renacimiento y expansión femenina. Sanar el vínculo materno y recuperar tu poder creador." },
      { property: "og:title", content: "Mujer Re-Nace | Lorena Calcopietro" },
      { property: "og:description", content: "Experiencia femenina de transformación profunda." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/mujer-re-nace" },
      { property: "og:image", content: mujerRenace },
    ],
    links: [{ rel: "canonical", href: "/mujer-re-nace" }],
  }),
  component: MujerRenace,
});

const pilares = [
  { icon: Heart, t: "Sanar el vínculo materno", d: "Volver al origen femenino para liberar dolor heredado y abrir el corazón." },
  { icon: Sun, t: "Recuperar tu cuerpo", d: "Habitarte con amor, sin culpa, escuchando tus ciclos y deseos." },
  { icon: Sparkles, t: "Encender tu poder creador", d: "Tu fuerza creativa, sexual y vital al servicio de la vida que querés." },
];

const incluye = [
  "12 encuentros semanales de 60 minutos",
  "Acompañamiento sostenido durante 3 meses",
  "Trabajo profundo con el linaje femenino",
  "Prácticas, rituales y bitácora personal",
  "Soporte cercano por WhatsApp entre sesiones",
  "Comunidad y acompañamiento entre mujeres",
];

function MujerRenace() {
  return (
    <div className="bg-sand">
      {/* HERO */}
      <section className="relative px-6 pt-12 pb-20 overflow-hidden">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left order-2 md:order-1">
            <span className="eyebrow text-rose mb-6 inline-block animate-fade">Experiencia femenina</span>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-balance mb-6 animate-reveal">
              Mujer <span className="italic">Re-Nace</span>.
            </h1>
            <p className="text-base md:text-lg text-earth/70 leading-relaxed mb-10 text-pretty animate-reveal" style={{ animationDelay: "120ms" }}>
              Un espacio sagrado para reencontrarte con tu esencia, sanar el
              vínculo con lo femenino y volver a florecer desde adentro.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors duration-500"
            >
              Quiero saber más <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="order-1 md:order-2 animate-reveal" style={{ animationDelay: "240ms" }}>
            <div className="relative">
              <div className="absolute -inset-6 bg-rose/15 rounded-[3rem] blur-2xl" aria-hidden="true" />
              <img
                src={mujerRenace}
                alt="Forma orgánica en tonos rosa empolvado"
                loading="lazy"
                width={1024}
                height={768}
                className="relative w-full aspect-square object-cover rounded-[2.5rem] ring-1 ring-earth/5 shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FRASE */}
      <section className="bg-rose/15 py-20 px-6">
        <p className="font-serif text-3xl md:text-5xl italic text-center text-balance leading-tight max-w-3xl mx-auto text-earth">
          Volver a vos. Volver a florecer. Volver a empezar.
        </p>
      </section>

      {/* PILARES */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow text-rose">Tres pilares</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">
              Una experiencia para <span className="italic">re-nacer</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pilares.map((p) => (
              <article key={p.t} className="bg-cream ring-1 ring-earth/5 rounded-3xl p-8 hover:shadow-soft transition-shadow duration-500">
                <div className="size-12 bg-rose/20 rounded-full grid place-items-center mb-6">
                  <p.icon className="size-5 text-rose" />
                </div>
                <h3 className="font-serif text-2xl italic mb-3">{p.t}</h3>
                <p className="text-sm text-earth/60 leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA placeholder */}
      <section className="py-24 px-6 bg-beige/30 border-y border-earth/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow text-sage">Encuentros</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 italic text-balance">
              Espacios para habitar.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              "aspect-[3/4]",
              "aspect-[3/4] mt-8 md:mt-12",
              "aspect-[3/4]",
              "aspect-[3/4] mt-8 md:mt-12",
            ].map((ratio, i) => (
              <div
                key={i}
                className={`${ratio} rounded-3xl bg-gradient-to-br from-rose/25 via-beige to-sage/20 ring-1 ring-earth/5`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-center mt-8 text-xs uppercase tracking-widest text-earth/40">
            Próximamente · Fotografía y reels del encuentro
          </p>
        </div>
      </section>

      {/* CTA */}
      {/* INVERSIÓN */}
      <section className="py-24 px-6 bg-rose/10 border-t border-earth/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow text-rose">Inversión</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4 text-balance">
              Una experiencia de <span className="italic">alto valor</span> para tu vida.
            </h2>
            <p className="text-earth/70 text-pretty">
              No es un curso más. Es un proceso íntimo, ritualizado y
              sostenido para que vuelvas a vos con todo lo que sos.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <ul className="md:col-span-3 space-y-3">
              {incluye.map((i) => (
                <li key={i} className="flex gap-3 items-start bg-cream ring-1 ring-earth/5 rounded-2xl px-5 py-4">
                  <Check className="size-4 text-rose shrink-0 mt-1" />
                  <span className="text-sm text-earth/80">{i}</span>
                </li>
              ))}
            </ul>

            <aside className="md:col-span-2 bg-earth text-sand rounded-3xl p-8 flex flex-col relative overflow-hidden">
              <span className="absolute -top-12 -right-12 size-40 rounded-full bg-rose/30 blur-3xl" aria-hidden="true" />
              <span className="eyebrow text-rose mb-4 relative">Programa Mujer Re-Nace</span>
              <div className="flex flex-wrap gap-4 text-xs text-sand/60 mb-6 relative">
                <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> 12 encuentros</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> 60 min</span>
                <span className="inline-flex items-center gap-1.5"><Sparkles className="size-3.5" /> Semanales</span>
              </div>
              <div className="relative">
                <PriceReveal price="$666.000" note="consultá por la opción de abonar en 2 veces." />
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 bg-sand text-earth px-6 py-3.5 rounded-full text-sm font-medium hover:bg-rose hover:text-earth transition-colors relative"
              >
                Quiero re-nacer <ArrowRight className="size-4" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* TESTIMONIO */}
      <section className="py-24 px-6 bg-beige/40 border-y border-earth/5">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow text-rose mb-6 inline-block">Experiencias</span>
          <blockquote className="font-serif text-2xl md:text-3xl italic text-earth/90 leading-relaxed mb-8 text-pretty">
            "Vengo haciendo un trabajo interno y las sesiones con Lore son realmente mágicas para mí. Hicimos registros, biodecodificación y constelaciones familiares, y cada encuentro fue un antes y un después."
          </blockquote>
          <p className="eyebrow text-earth/50">— Daiana, Buenos Aires</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-balance mb-6">
            Tu renacimiento empieza hoy.
          </h2>
          <p className="text-earth/70 mb-10">
            Escribime y conversemos sobre cómo entrar a la próxima edición de
            Mujer Re-Nace.
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