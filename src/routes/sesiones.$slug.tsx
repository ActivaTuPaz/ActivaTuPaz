import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Compass,
  Globe,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Sparkles,
  Sun,
  TreeDeciduous,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { getSessionBySlug, SESSIONS_LIST, SessionDetail } from "@/data/sessions-data";
import { ShareSessionButton } from "@/components/share-session-button";
import { getSessionsData, SessionsData } from "@/lib/admin-data";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/sesiones/$slug")({
  loader: async ({ params }) => {
    const session = getSessionBySlug(params.slug);
    if (!session) {
      throw notFound();
    }
    return { session };
  },
  head: ({ loaderData }) => {
    const session = loaderData?.session;
    const title = session
      ? `${session.title} — Sesión individual | Lorena Calcopietro`
      : "Sesión individual | Lorena Calcopietro";
    const desc = session?.shortDesc || "Acompañamiento terapéutico individual con Lorena Calcopietro.";
    const image = session?.image;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/sesiones/${session?.slug}` },
        ...(image ? [{ property: "og:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: `/sesiones/${session?.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: session?.title,
            serviceType: "Biodecodificación Emocional y Constelaciones Familiares",
            description: session?.shortDesc,
            provider: {
              "@type": "Person",
              name: "Lorena Calcopietro",
              jobTitle: "Terapeuta en Biodecodificación y Constelaciones Familiares",
            },
            areaServed: "AR",
            availableChannel: [
              { "@type": "ServiceChannel", serviceLocation: { "@type": "Place", name: "La Plata, Argentina" } },
              { "@type": "ServiceChannel", name: "Online en todo el mundo" },
            ],
            offers: {
              "@type": "Offer",
              price: session?.price.replace(/[^0-9]/g, ""),
              priceCurrency: "ARS",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: SesionDetailPage,
});

function SesionDetailPage() {
  const { session: staticSession } = Route.useLoaderData();
  const [session, setSession] = useState<SessionDetail>(staticSession);

  // Sync with Firestore if updated in admin
  useEffect(() => {
    getSessionsData().then((data: SessionsData) => {
      if (data?.cards) {
        const cardMatch = data.cards.find(
          (c) =>
            c.id === staticSession.id ||
            c.title.toLowerCase().includes(staticSession.slug.slice(0, 5)) ||
            staticSession.title.toLowerCase().includes(c.title.toLowerCase())
        );
        if (cardMatch) {
          setSession((prev) => ({
            ...prev,
            price: cardMatch.price || prev.price,
            oldPrice: cardMatch.oldPrice || prev.oldPrice,
            hasPromo: typeof cardMatch.hasPromo === "boolean" ? cardMatch.hasPromo : prev.hasPromo,
            duration: cardMatch.duration || prev.duration,
          }));
        }
      }
    });
  }, [staticSession]);

  // Color mapping based on accent
  const accentText =
    session.accent === "sage"
      ? "text-sage"
      : session.accent === "bloom"
      ? "text-bloom"
      : "text-rose";

  const accentBg =
    session.accent === "sage"
      ? "bg-sage/15 text-sage"
      : session.accent === "bloom"
      ? "bg-bloom/15 text-bloom"
      : "bg-rose/15 text-rose";

  const accentBorder =
    session.accent === "sage"
      ? "border-sage/40"
      : session.accent === "bloom"
      ? "border-bloom/40"
      : "border-rose/40";

  // Dynamic icon helper
  const renderIcon = (name: string, className = "size-5") => {
    switch (name) {
      case "compass":
        return <Compass className={className} />;
      case "tree":
        return <TreeDeciduous className={className} />;
      case "zap":
        return <Zap className={className} />;
      case "heart":
        return <Heart className={className} />;
      case "sun":
        return <Sun className={className} />;
      case "leaf":
        return <Leaf className={className} />;
      case "sparkles":
      default:
        return <Sparkles className={className} />;
    }
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(session.whatsappMessage)}`;

  // Find other sessions for the catalog footer
  const otherSessions = SESSIONS_LIST.filter((s) => s.slug !== session.slug);

  return (
    <div className="bg-sand min-h-screen text-earth selection:bg-rose/20">
      <Toaster />

      {/* TOP NAVIGATION / BREADCRUMB */}
      <div className="border-b border-earth/5 bg-sand/80 backdrop-blur-md sticky top-[65px] sm:top-[69px] z-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-earth/60 font-medium whitespace-nowrap min-w-0 flex-1">
            <Link to="/" className="hover:text-earth transition-colors shrink-0">
              Inicio
            </Link>
            <ChevronRight className="size-3 text-earth/30 shrink-0" />
            <Link to="/" hash="sesiones" className="hover:text-earth transition-colors shrink-0">
              <span className="hidden sm:inline">Sesiones individuales</span>
              <span className="sm:hidden">Sesiones</span>
            </Link>
            <ChevronRight className="size-3 text-earth/30 shrink-0" />
            <span className={`${accentText} font-semibold truncate`}>
              {session.title}
            </span>
          </nav>

          <Link
            to="/"
            hash="sesiones"
            className="inline-flex items-center gap-1.5 text-earth/70 hover:text-earth text-xs font-medium transition-colors shrink-0 whitespace-nowrap ml-2"
          >
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Volver a todas las sesiones</span>
            <span className="sm:hidden">Volver</span>
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative px-6 pt-12 pb-20 overflow-hidden">
        {/* Glow orgánico ambiental */}
        <div aria-hidden className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose/10 via-bloom/10 to-sage/15 blur-3xl rounded-full opacity-70" />
        </div>

        <div className="max-w-screen-xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          {/* Columna Texto */}
          <div className="md:col-span-7 order-2 md:order-1 animate-fade">
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className={`eyebrow text-[11px] px-3 py-1 rounded-full ${accentBg} font-semibold`}>
                {session.badge || session.eyebrow}
              </span>
              <span className="text-xs text-earth/50 font-medium flex items-center gap-1">
                <Clock className="size-3.5" /> {session.duration}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-balance mb-6">
              {session.title.replace(session.heroHighlight, "")}
              <span className={`italic ${accentText}`}>{session.heroHighlight}</span>
            </h1>

            <p className="text-lg md:text-xl text-earth/80 font-light leading-relaxed mb-6 text-pretty">
              {session.tagline}
            </p>

            <div className="space-y-4 text-earth/70 text-sm md:text-base leading-relaxed mb-8">
              {session.fullDesc.map((parr, idx) => (
                <p key={idx}>{parr}</p>
              ))}
            </div>

            {/* Badges rápidos de confianza */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 pt-6 border-t border-earth/10">
              <div className="bg-cream/80 backdrop-blur-sm border border-earth/10 rounded-2xl p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-earth/50 font-semibold mb-1">
                  Duración
                </p>
                <p className="font-serif text-lg text-earth flex items-center gap-1.5">
                  <Clock className={`size-4 ${accentText}`} />
                  {session.duration}
                </p>
              </div>

              <div className="bg-cream/80 backdrop-blur-sm border border-earth/10 rounded-2xl p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-earth/50 font-semibold mb-1">
                  Modalidad
                </p>
                <p className="font-serif text-base text-earth flex items-center gap-1.5">
                  <Globe className={`size-4 ${accentText}`} />
                  Online o Presencial
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-cream/80 backdrop-blur-sm border border-earth/10 rounded-2xl p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-earth/50 font-semibold mb-1">
                  Inversión
                </p>
                <div className="flex items-baseline gap-2">
                  <p className={`font-serif text-xl font-bold ${accentText}`}>{session.price}</p>
                  {session.hasPromo && session.oldPrice && (
                    <span className="text-xs text-earth/40 line-through font-serif">
                      {session.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Fila de Acciones: Reservar + Compartir */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-earth/90 transition-all duration-300 shadow-soft hover:shadow-lift active:scale-95 group"
              >
                <MessageCircle className="size-4 group-hover:scale-110 transition-transform" />
                <span>Reservar turno por WhatsApp</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform ml-1" />
              </a>

              {/* Botón de Compartir con popover / WhatsApp / Copiar */}
              <ShareSessionButton
                title={session.shareTitle}
                text={session.shareDescription}
                url={`/sesiones/${session.slug}`}
                variant="secondary"
                className="py-4"
              />
            </div>
          </div>

          {/* Columna Imagen */}
          <div className="md:col-span-5 order-1 md:order-2 animate-reveal">
            <div className="relative max-w-md mx-auto">
              <div
                className="absolute -inset-4 bg-gradient-to-br from-rose/20 via-bloom/15 to-sage/20 rounded-[3rem] blur-2xl -z-10"
                aria-hidden="true"
              />
              <img
                src={session.image}
                alt={session.imageAlt}
                width={800}
                height={1000}
                className="w-full aspect-[4/5] object-cover rounded-[2.5rem] ring-1 ring-earth/10 shadow-lift"
              />

              {/* Tarjeta flotante con microdato */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-cream/95 backdrop-blur-md border border-earth/10 rounded-2xl p-4 shadow-soft max-w-[240px]">
                <div className="flex items-center gap-2.5">
                  <div className={`size-9 rounded-xl ${accentBg} grid place-items-center shrink-0`}>
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-earth">Espacio 100% íntimo</p>
                    <p className="text-[10px] text-earth/60">Encuentro 1 a 1 exclusivo con Lorena</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITA / FRASE INSPIRACIONAL */}
      {session.phrasesQuote && (
        <section className="bg-beige/40 border-y border-earth/5 py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow text-earth/50 mb-4 inline-block">Sentido del encuentro</span>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl italic text-earth leading-relaxed text-balance">
              “{session.phrasesQuote}”
            </p>
          </div>
        </section>
      )}

      {/* ¿ESTA SESIÓN ES PARA VOS SI...? */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`eyebrow ${accentText}`}>Claridad y conexión</span>
            <h2 className="font-serif text-3xl md:text-5xl mt-3 mb-4 text-balance">
              ¿Esta sesión es para vos?
            </h2>
            <p className="text-earth/70 text-base md:text-lg">
              Mirá las situaciones más habituales que nos traen a este encuentro:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {session.paraQuien.map((item, idx) => (
              <div
                key={idx}
                className="bg-cream/95 backdrop-blur-sm border border-earth/10 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-soft hover:border-earth/25 transition-colors"
              >
                <div className={`size-8 rounded-full ${accentBg} grid place-items-center shrink-0 mt-0.5`}>
                  <Check className="size-4" />
                </div>
                <p className="text-sm md:text-base text-earth/80 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS / EJES DE TRANSFORMACIÓN */}
      <section className="py-24 px-6 bg-cream/70 border-y border-earth/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`eyebrow ${accentText}`}>Lo que vas a experimentar</span>
            <h2 className="font-serif text-3xl md:text-5xl mt-3 mb-4 text-balance">
              Qué te llevás de la sesión
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {session.beneficios.map((ben, idx) => (
              <article
                key={idx}
                className="bg-sand/60 border border-earth/10 rounded-3xl p-8 hover:bg-cream transition-all duration-300 shadow-soft flex flex-col"
              >
                <div className={`size-14 rounded-2xl ${accentBg} grid place-items-center mb-6`}>
                  {renderIcon(ben.icon, "size-6")}
                </div>
                <h3 className="font-serif text-2xl mb-3 text-earth">{ben.title}</h3>
                <p className="text-sm text-earth/70 leading-relaxed">{ben.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO ES EL PASO A PASO */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`eyebrow ${accentText}`}>El recorrido</span>
            <h2 className="font-serif text-3xl md:text-5xl mt-3 mb-4 text-balance">
              Cómo trabajamos en la sesión
            </h2>
            <p className="text-earth/70 text-base">
              Un paso a paso transparente y sereno, desde que me escribís hasta la integración.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {session.pasos.map((paso, idx) => (
              <div
                key={idx}
                className="bg-cream/90 border border-earth/10 rounded-3xl p-8 flex flex-col justify-between shadow-soft hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <span className={`font-serif italic text-3xl ${accentText} block mb-4 opacity-75`}>
                    {paso.numero}
                  </span>
                  <h3 className="font-serif text-xl text-earth mb-3 leading-snug">{paso.titulo}</h3>
                  <p className="text-xs sm:text-sm text-earth/70 leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE + INVERSIÓN (TARJETA OSCURA EDITORIAL) */}
      <section className="py-24 px-6 bg-earth text-sand relative overflow-hidden">
        {/* Glow de fondo */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-96 h-96 bg-rose/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow text-rose">Inversión y detalles</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-4 text-balance text-sand">
              Tu encuentro individual
            </h2>
            <p className="text-sand/70 text-base">
              Todo lo que incluye esta propuesta para que vivas una experiencia completa y cuidada.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Lista de qué incluye */}
            <div className="lg:col-span-7 bg-sand/5 border border-sand/10 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl text-sand mb-6">Qué incluye tu sesión:</h3>
                <ul className="space-y-4">
                  {session.queIncluye.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-sand/85">
                      <div className="size-5 rounded-full bg-rose/20 text-rose grid place-items-center shrink-0 mt-0.5">
                        <Check className="size-3" />
                      </div>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-8 border-t border-sand/10 flex items-center gap-3 text-xs text-sand/60">
                <ShieldCheck className="size-4 text-rose shrink-0" />
                <span>Atención personalizada y confidencial · Garantía de calidez profesional</span>
              </div>
            </div>

            {/* Card de Precios y Reserva */}
            <aside className="lg:col-span-5 bg-sand/10 border border-sand/20 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="eyebrow text-rose text-xs font-semibold uppercase tracking-wider">
                    {session.title}
                  </span>
                  {session.hasPromo && (
                    <span className="bg-bloom/20 text-sand border border-bloom/30 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                      Promo exclusiva
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  {session.hasPromo && session.oldPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl text-sand/40 line-through font-serif">
                        {session.oldPrice}
                      </span>
                      <span className="text-xs text-rose font-medium">ahorro especial</span>
                    </div>
                  )}
                  <p className="font-serif text-5xl md:text-6xl text-sand font-bold tracking-tight">
                    {session.price}
                  </p>
                  <p className="text-xs text-sand/60 mt-1">
                    Encuentro único de {session.duration}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-sand/75 mb-8">
                  <p className="flex items-center gap-2">
                    <Check className="size-3.5 text-rose" /> Pago por transferencia (Pesos AR) o PayPal
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="size-3.5 text-rose" /> Modalidad online (Zoom/Meet) o presencial La Plata
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="size-3.5 text-rose" /> Horarios flexibles de lunes a viernes
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-sand/10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-sand text-earth hover:bg-rose hover:text-earth font-medium px-6 py-4 rounded-full text-sm transition-all duration-300 shadow-soft cursor-pointer text-center"
                >
                  <MessageCircle className="size-4" />
                  <span>Reservar mi lugar por WhatsApp</span>
                </a>

                {/* Botón de compartir integrado también en la tarjeta de precios */}
                <div className="text-center pt-2">
                  <ShareSessionButton
                    title={session.shareTitle}
                    text={session.shareDescription}
                    url={`/sesiones/${session.slug}`}
                    variant="subtle"
                    className="w-full text-sand/80 hover:text-sand border-sand/15 hover:bg-sand/10"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="py-24 px-6 bg-sand">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className={`eyebrow ${accentText}`}>Dudas comunes</span>
            <h2 className="font-serif text-3xl md:text-5xl mt-3 mb-4 text-balance">
              Preguntas frecuentes
            </h2>
            <p className="text-earth/70 text-base">
              Si tenés alguna consulta adicional, podés escribirme directamente por WhatsApp.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {session.faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-cream/90 border border-earth/10 rounded-2xl px-6 data-[state=open]:border-earth/30 transition-all shadow-soft"
              >
                <AccordionTrigger className="font-serif text-lg sm:text-xl text-earth py-5 hover:no-underline text-left">
                  {faq.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-earth/70 leading-relaxed pb-6">
                  {faq.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* EXPLORÁ OTRAS SESIONES (CATÁLOGO DIRECTO) */}
      <section className="py-20 px-6 bg-beige/40 border-t border-earth/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="eyebrow text-rose">Catálogo de sesiones</span>
              <h2 className="font-serif text-3xl md:text-4xl mt-2 text-balance">
                Otras opciones para tu momento
              </h2>
            </div>
            <Link
              to="/"
              hash="sesiones"
              className="text-xs font-semibold tracking-wider uppercase text-earth hover:text-rose transition-colors inline-flex items-center gap-1.5"
            >
              Ver todas las sesiones en inicio <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {otherSessions.map((other) => {
              const otherAccentColor =
                other.accent === "sage"
                  ? "text-sage"
                  : other.accent === "bloom"
                  ? "text-bloom"
                  : "text-rose";

              return (
                <article
                  key={other.slug}
                  className="bg-cream border border-earth/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="eyebrow text-[10px] text-earth/60 uppercase">
                        {other.eyebrow}
                      </span>
                      <span className="text-xs text-earth/50">{other.duration}</span>
                    </div>

                    <h3 className="font-serif text-2xl text-earth mb-2">{other.title}</h3>
                    <p className="text-xs sm:text-sm text-earth/70 leading-relaxed mb-6">
                      {other.shortDesc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-earth/10 flex items-center justify-between mt-auto">
                    <div>
                      <p className={`font-serif text-2xl font-bold ${otherAccentColor}`}>
                        {other.price}
                      </p>
                    </div>
                    <Link
                      to="/sesiones/$slug"
                      params={{ slug: other.slug }}
                      className="inline-flex items-center gap-1.5 bg-earth text-sand px-5 py-2.5 rounded-full text-xs font-medium hover:bg-earth/90 transition-colors"
                    >
                      Ver sesión <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BANNER FINAL / CONTACTO DIRECTO */}
      <section className="py-20 px-6 bg-sand border-t border-earth/5 text-center">
        <div className="max-w-xl mx-auto">
          <span className="eyebrow text-sage mb-3 inline-block">Conversación personalizada</span>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4 text-balance">
            ¿Tenés dudas o querés consultar algo antes de agendar?
          </h2>
          <p className="text-sm sm:text-base text-earth/70 mb-8 text-pretty">
            Escribime por WhatsApp y te oriento con gusto para elegir la sesión que mejor se adapte a tu momento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Lorena, tengo una consulta sobre las sesiones individuales.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-earth text-sand px-7 py-3.5 rounded-full text-xs font-medium hover:bg-earth/90 transition-colors shadow-soft"
            >
              <MessageCircle className="size-4" />
              Escribirme por WhatsApp
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 border border-earth/20 text-earth px-7 py-3.5 rounded-full text-xs font-medium hover:border-earth/40 hover:bg-cream transition-colors"
            >
              Ver página de contacto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
