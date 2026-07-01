import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { WHATSAPP_URL, INSTAGRAM_URL, EMAIL } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="bg-sand pt-24 pb-12 px-6 border-t border-earth/10">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 justify-items-center text-center">
          <div className="space-y-6 md:col-span-1 flex flex-col items-center">
            <span className="font-serif text-2xl tracking-tight uppercase block">
              Lorena Calcopietro
            </span>
            <p className="text-sm text-earth/60 max-w-[32ch] leading-relaxed">
              Transformación consciente a través de la biodecodificación
              emocional y las constelaciones familiares.
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <h5 className="eyebrow text-earth/40">Navegar</h5>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li><Link to="/" className="hover:text-rose transition-colors">Inicio</Link></li>
              <li><Link to="/desde-la-raiz" className="hover:text-rose transition-colors">Desde la Raíz</Link></li>
              <li><Link to="/mujer-re-nace" className="hover:text-rose transition-colors">Mujer Re-Nace</Link></li>
              <li><Link to="/sobre-mi" className="hover:text-rose transition-colors">Sobre mí</Link></li>
              <li><Link to="/contacto" className="hover:text-rose transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <h5 className="eyebrow text-earth/40">Contacto</h5>
            <a href={`mailto:${EMAIL}`} className="flex items-center justify-center gap-3 text-sm group">
              <Mail className="size-4 text-sage" />
              <span className="border-b border-earth/10 pb-0.5 group-hover:border-rose transition-colors">{EMAIL}</span>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 text-sm group">
              <Instagram className="size-4 text-sage" />
              <span className="border-b border-earth/10 pb-0.5 group-hover:border-rose transition-colors">Instagram</span>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 text-sm group">
              <MessageCircle className="size-4 text-sage" />
              <span className="border-b border-earth/10 pb-0.5 group-hover:border-rose transition-colors">WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 border-t border-earth/10 pt-10 text-center">
          <p className="text-[10px] text-earth/40 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Lorena Calcopietro — Biodecodificación
          </p>
          <p className="text-[10px] text-earth/40 uppercase tracking-[0.2em] italic font-serif">
            Diseño para el bienestar
          </p>
        </div>
      </div>
    </footer>
  );
}