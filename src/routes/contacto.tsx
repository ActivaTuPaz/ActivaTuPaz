import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Mail, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { WHATSAPP_NUMBER, WHATSAPP_URL, INSTAGRAM_URL, EMAIL } from "@/lib/contact";
import lorenaReal from "@/assets/lorena-real.jpg";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Lorena Calcopietro | Biodecodificación" },
      { name: "description", content: "Escribime por WhatsApp, email o Instagram. Reservá tu primera sesión." },
      { property: "og:title", content: "Contacto | Lorena Calcopietro" },
      { property: "og:description", content: "Conversemos sobre tu proceso." },
      { property: "og:url", content: "/contacto" },
      { property: "og:image", content: lorenaReal },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola Lorena, soy ${form.nombre}.\n\n${form.mensaje}\n\nMi email: ${form.email}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Abriendo WhatsApp para enviar tu mensaje.");
  };

  return (
    <div className="bg-sand">
      <Toaster />
      {/* HERO */}
      <section className="px-6 pt-16 pb-12 text-center">
        <span className="eyebrow text-rose mb-6 inline-block">Contacto</span>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-balance mb-6">
          Hablemos desde el <span className="italic">corazón</span>.
        </h1>
        <p className="text-base md:text-lg text-earth/70 leading-relaxed max-w-2xl mx-auto text-pretty">
          Contame en pocas palabras lo que estás atravesando. Te respondo
          personalmente, sin formularios automáticos.
        </p>
        <div className="mt-8 inline-flex flex-col sm:flex-row gap-3 items-center justify-center">
          <a
            href="/entrevista-previa"
            className="inline-flex items-center gap-2 bg-rose/10 text-rose border border-rose/30 px-6 py-3 rounded-full text-sm hover:bg-rose/20 transition"
          >
            ¿Querés profundizar? Completá la entrevista previa →
          </a>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="px-6 pb-24">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-5 gap-10">
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 bg-cream ring-1 ring-earth/5 rounded-3xl p-8 md:p-10 space-y-6 shadow-soft"
          >
            <Field
              label="Tu nombre"
              value={form.nombre}
              onChange={(v) => setForm({ ...form, nombre: v })}
              required
            />
            <Field
              label="Tu email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />
            <div>
              <label className="eyebrow text-earth/50 block mb-3">Tu mensaje</label>
              <textarea
                required
                rows={5}
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                className="w-full bg-sand/60 border border-earth/10 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-sage transition-colors resize-none"
                placeholder="Contame qué estás buscando..."
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors duration-500 active:scale-95"
            >
              Enviar por WhatsApp <Send className="size-4" />
            </button>
          </form>

          <aside className="lg:col-span-2 space-y-4">
            <ContactCard
              icon={<MessageCircle className="size-5 text-sage" />}
              title="WhatsApp"
              desc="Respuesta más rápida"
              href={WHATSAPP_URL}
              cta="Escribir ahora"
            />
            <ContactCard
              icon={<Instagram className="size-5 text-rose" />}
              title="Instagram"
              desc="Inspiración diaria"
              href={INSTAGRAM_URL}
              cta="@lorena.biodecodificacion"
            />
            <ContactCard
              icon={<Mail className="size-5 text-clay" />}
              title="Email"
              desc="Para consultas más extensas"
              href={`mailto:${EMAIL}`}
              cta={EMAIL}
            />
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow text-earth/50 block mb-3">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-sand/60 border border-earth/10 rounded-full px-5 py-4 text-base focus:outline-none focus:border-sage transition-colors"
      />
    </div>
  );
}

function ContactCard({
  icon,
  title,
  desc,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block bg-cream ring-1 ring-earth/5 rounded-3xl p-6 hover:shadow-soft hover:border-sage/30 transition-all duration-500 group"
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-serif text-xl">{title}</h3>
      </div>
      <p className="text-xs text-earth/50 mb-3">{desc}</p>
      <p className="text-sm text-earth/80 group-hover:text-rose transition-colors">{cta} →</p>
    </a>
  );
}