import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

const mainLinks = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/", hash: "recursos", label: "Recursos" },
  { to: "/entrevista-previa", label: "Entrevista" },
  { to: "/contacto", label: "Contacto" },
];

const programLinks = [
  { to: "/desde-la-raiz", label: "Desde la Raíz" },
  { to: "/mujer-re-nace", label: "Mujer Re-Nace" },
  { to: "/mentoria-maestras", label: "Mentoría para Maestras" },
  { to: "/dar-y-recibir", label: "Dar y Recibir" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-sand/90 backdrop-blur-md border-b border-earth/5">
      <div className="px-6 py-4 flex items-center justify-between max-w-screen-xl mx-auto w-full relative gap-4">
        
        {/* Lado Izquierdo: Logo */}
        <div className="flex-1 flex justify-start min-w-0">
          <Link
            to="/"
            className="font-serif text-lg sm:text-xl tracking-tight uppercase text-earth truncate"
          >
            Lorena Calcopietro
          </Link>
        </div>

        {/* Centro: Utilidades / Links (Desktop) */}
        <nav className="hidden xl:flex flex-none justify-center gap-8 text-[11px] uppercase tracking-[0.15em] text-earth/60 font-medium items-center">
          
          <Link
            to={mainLinks[0].to}
            activeProps={{ className: "text-earth" }}
            className="hover:text-rose transition-colors duration-300"
          >
            {mainLinks[0].label}
          </Link>

          {/* Dropdown Programas */}
          <div className="relative group py-4 -my-4">
            <button className="flex items-center gap-1 hover:text-rose transition-colors duration-300 uppercase">
              Programas <ChevronDown className="size-3 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-sand/95 backdrop-blur-xl border border-earth/10 rounded-2xl p-2 flex flex-col min-w-[220px] shadow-soft">
                {programLinks.map(p => (
                  <Link
                    key={p.label}
                    to={p.to}
                    activeProps={{ className: "bg-earth/5 text-earth" }}
                    className="px-4 py-3 rounded-xl hover:bg-earth/5 hover:text-rose transition-colors text-[10px] uppercase tracking-[0.15em] whitespace-nowrap text-left"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {mainLinks.slice(1).map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              activeProps={{ className: "text-earth" }}
              className="hover:text-rose transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Lado Derecho: Botón Reservar y Menú Móvil */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-earth text-sand px-6 py-2.5 rounded-full text-xs font-medium tracking-wide hover:bg-earth/90 transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="size-3.5" /> Reservar
          </a>

          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden size-9 grid place-items-center text-earth shrink-0 bg-earth/5 rounded-full"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {open && (
        <nav className="xl:hidden border-t border-earth/5 bg-sand animate-fade max-h-[calc(100vh-80px)] overflow-y-auto">
          <ul className="flex flex-col px-6 py-8 gap-4">
            <li>
              <Link
                to={mainLinks[0].to}
                activeProps={{ className: "text-earth" }}
                className="block font-serif text-2xl text-earth/80 hover:text-rose transition-colors"
              >
                {mainLinks[0].label}
              </Link>
            </li>
            
            <li className="pt-4 border-t border-earth/5">
              <span className="block font-serif text-2xl text-earth/80 mb-4">Programas</span>
              <ul className="flex flex-col gap-4 pl-4 border-l-2 border-earth/10">
                {programLinks.map((p) => (
                  <li key={p.label}>
                    <Link
                      to={p.to}
                      activeProps={{ className: "text-earth font-semibold" }}
                      className="block text-sm text-earth/70 hover:text-rose transition-colors uppercase tracking-widest"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="pt-4 border-t border-earth/5 flex flex-col gap-4">
              {mainLinks.slice(1).map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={l.hash}
                  activeProps={{ className: "text-earth" }}
                  className="block font-serif text-2xl text-earth/80 hover:text-rose transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}