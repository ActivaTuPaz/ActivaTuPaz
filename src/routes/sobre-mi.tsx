import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import lorenaPortrait from "@/assets/lorena-real.jpg";

export const Route = createFileRoute("/sobre-mi")({
  head: () => ({
    meta: [
      { title: "Sobre mí — Lorena Calcopietro | Biodecodificación" },
      { name: "description", content: "Conocé a Lorena Calcopietro, terapeuta en biodecodificación emocional y constelaciones familiares." },
      { property: "og:title", content: "Sobre mí | Lorena Calcopietro" },
      { property: "og:description", content: "Mi historia, mi filosofía y mi forma de acompañar." },
      { property: "og:url", content: "/sobre-mi" },
      { property: "og:image", content: lorenaPortrait },
    ],
    links: [{ rel: "canonical", href: "/sobre-mi" }],
  }),
  component: SobreMi,
});

const credenciales = [
  "Licenciada en Comunicación Social",
  "Formación en Biodecodificación Emocional",
  "Facilitadora de Constelaciones Familiares",
  "Lectura de Registros Akáshicos",
  "Sesiones presenciales en La Plata y online",
  "Fundadora de Activa tu Paz Interior",
];

function SobreMi() {
  return (
    <div className="bg-sand">
      {/* HERO */}
      <section className="px-6 pt-12 pb-20">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-reveal">
            <span className="eyebrow text-rose mb-6 inline-block">Sobre mí</span>
            <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance mb-6">
              Soy <span className="italic">Lorena Calcopietro</span>.
            </h1>
            <p className="text-base md:text-lg text-earth/70 leading-relaxed text-pretty">
              Soy María Lorena Calcopietro, Licenciada en Comunicación Social y
              fundadora de <em>Activa tu Paz Interior</em>, un espacio dedicado a
              la sanación emocional. Acompaño a personas que quieren entender
              el origen de lo que les pasa y se animan a transformarlo, a
              través de la biodecodificación, las constelaciones familiares y
              los Registros Akáshicos.
            </p>
          </div>
          <div className="animate-reveal" style={{ animationDelay: "120ms" }}>
            <img
              src={lorenaPortrait}
              alt="Retrato de Lorena Calcopietro"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full max-w-md mx-auto aspect-[4/5] object-cover rounded-[2.5rem] ring-1 ring-earth/10 shadow-lift"
            />
          </div>
        </div>
      </section>

      {/* FILOSOFÍA */}
      <section className="py-24 px-6 bg-beige/40 border-y border-earth/5">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow text-sage">Mi filosofía</span>
          <p className="font-serif text-3xl md:text-4xl italic text-balance leading-tight mt-6 text-earth">
            “Cada síntoma es una puerta. Cada historia familiar, un mapa.
            Mi rol es acompañarte a leer lo que tu vida te está mostrando.”
          </p>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-8 text-base md:text-lg text-earth/80 leading-relaxed">
          <p>
            Empecé a estudiar biodecodificación cuando entendí que el cuerpo
            no se equivoca: habla. Lo que muchas veces vivimos como un
            problema, es en realidad una invitación a mirar más profundo.
          </p>
          <p>
            En cada sesión sostengo un espacio sin juicios, donde podés
            poner en palabras lo que sentís y mirar de frente lo que estaba
            escondido. Mi forma de trabajar combina la mirada sistémica de
            las constelaciones familiares con la escucha bio-emocional.
          </p>
          <p>
            Creo en la transformación amorosa. En procesos sostenidos,
            honestos y respetuosos de tu tiempo. Y creo, sobre todo, en tu
            capacidad de sanarte.
          </p>
        </div>
      </section>

      {/* CREDENCIALES */}
      <section className="py-24 px-6 bg-earth text-sand">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow text-rose">Formación y experiencia</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">
              Una práctica con respaldo.
            </h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {credenciales.map((c) => (
              <li key={c} className="bg-sand/5 ring-1 ring-sand/10 rounded-2xl p-6 text-sm">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-balance mb-6">
          ¿Querés que conversemos?
        </h2>
        <Link
          to="/contacto"
          className="inline-flex items-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors"
        >
          Reservar una consulta <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}