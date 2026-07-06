import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

const links: { to: "/" | "/desde-la-raiz" | "/mujer-re-nace" | "/sobre-mi" | "/contacto" | "/entrevista-previa"; hash?: string; label: string }[] = [
  { to: "/", label: "Inicio" },
  { to: "/desde-la-raiz", label: "Desde la Raíz" },
  { to: "/mujer-re-nace", label: "Mujer Re-Nace" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/", hash: "recursos", label: "Recursos" },
  { to: "/entrevista-previa", label: "Entrevista" },
  { to: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-sand/85 backdrop-blur-md border-b border-earth/5">
      <div className="px-6 py-4 flex items-center justify-between max-w-screen-xl mx-auto">
        <Link
          to="/"
          className="font-serif text-lg sm:text-xl tracking-tight uppercase text-earth"
        >
          Lorena Calcopietro
        </Link>

        <nav className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] text-earth/60 font-medium">
          {links.map((l) => (
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

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-earth text-sand px-5 py-2.5 rounded-full text-xs font-medium tracking-wide hover:bg-earth/90 transition-colors"
        >
          <MessageCircle className="size-3.5" /> Reservar
        </a>

        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden size-9 grid place-items-center text-earth"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav className="md:hidden border-t border-earth/5 bg-sand animate-fade">
          <ul className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  hash={l.hash}
                  activeProps={{ className: "text-earth" }}
                  className="block py-3 font-serif text-xl text-earth/80 hover:text-rose transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}