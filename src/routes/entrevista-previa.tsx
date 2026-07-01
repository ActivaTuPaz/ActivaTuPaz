import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/entrevista-previa")({
  head: () => ({
    meta: [
      { title: "Entrevista previa — Lorena Calcopietro" },
      {
        name: "description",
        content:
          "Completá la entrevista previa antes de tu sesión de biodecodificación, constelaciones familiares y PNL.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EntrevistaPrevia,
});

type FormState = {
  nombre: string;
  edad: string;
  email: string;
  telefono: string;
  ciudad: string;
  fecha_nacimiento: string;
  como_conocio: string;
  motivo_consulta: string;
  sintomas_fisicos: string;
  emociones_recurrentes: string;
  expectativas: string;
  historia_padres: string;
  historia_hermanos: string;
  historia_abuelos: string;
  hijos_embarazos: string;
  duelos_perdidas: string;
  secretos_familiares: string;
  eventos_significativos: string;
  vinculos_pareja: string;
  trabajo_vocacion: string;
  programa_interes: string;
  observaciones: string;
  consentimiento: boolean;
};

const INITIAL: FormState = {
  nombre: "",
  edad: "",
  email: "",
  telefono: "",
  ciudad: "",
  fecha_nacimiento: "",
  como_conocio: "",
  motivo_consulta: "",
  sintomas_fisicos: "",
  emociones_recurrentes: "",
  expectativas: "",
  historia_padres: "",
  historia_hermanos: "",
  historia_abuelos: "",
  hijos_embarazos: "",
  duelos_perdidas: "",
  secretos_familiares: "",
  eventos_significativos: "",
  vinculos_pareja: "",
  trabajo_vocacion: "",
  programa_interes: "",
  observaciones: "",
  consentimiento: false,
};

function EntrevistaPrevia() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consentimiento) {
      toast.error("Necesitamos tu consentimiento para guardar tus respuestas.");
      return;
    }
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);
    
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate({ to: "/" }), 6000);
  };

  if (done) {
    return (
      <div className="bg-sand min-h-[80vh] grid place-items-center px-6 py-20">
        <Toaster />
        <div className="max-w-xl text-center space-y-6">
          <CheckCircle2 className="size-16 mx-auto text-sage" />
          <h1 className="font-serif text-4xl md:text-5xl text-earth">
            Gracias por <span className="italic">abrirte</span>.
          </h1>
          <p className="text-earth/70 leading-relaxed">
            Recibí tus respuestas. Voy a leerlas con atención antes de
            nuestra sesión. Te contacto pronto por WhatsApp para coordinar
            día y horario.
          </p>
          <p className="text-xs text-earth/40">
            Te redirijo al inicio en unos segundos…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sand">
      <Toaster />
      {/* HERO */}
      <section className="px-6 pt-16 pb-10 text-center max-w-3xl mx-auto">
        <span className="eyebrow text-rose mb-6 inline-block">
          Entrevista previa · confidencial
        </span>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-balance mb-6 text-earth">
          Antes de encontrarnos,{" "}
          <span className="italic">contame tu historia</span>.
        </h1>
        <p className="text-base md:text-lg text-earth/70 leading-relaxed text-pretty">
          Tomate el tiempo que necesites. Escribí con tus palabras, sin
          prolijidad. Todo lo que compartas se guarda de forma{" "}
          <strong>privada</strong> y solo lo veo yo, para acompañarte mejor
          desde la mirada de la Biodecodificación, las Constelaciones
          Familiares y la PNL.
        </p>
      </section>

      <form
        onSubmit={onSubmit}
        className="max-w-3xl mx-auto px-6 pb-24 space-y-10"
      >
        {/* Identificación */}
        <Section
          icon={<Heart className="size-4 text-rose" />}
          title="Quién sos"
        >
          <Row>
            <Input
              label="Nombre completo *"
              value={form.nombre}
              onChange={(v) => set("nombre", v)}
              required
            />
            <Input
              label="Edad"
              value={form.edad}
              onChange={(v) => set("edad", v)}
            />
          </Row>
          <Row>
            <Input
              label="Email *"
              type="email"
              value={form.email}
              onChange={(v) => set("email", v)}
              required
            />
            <Input
              label="WhatsApp"
              value={form.telefono}
              onChange={(v) => set("telefono", v)}
            />
          </Row>
          <Row>
            <Input
              label="Ciudad / país"
              value={form.ciudad}
              onChange={(v) => set("ciudad", v)}
            />
            <Input
              label="Fecha de nacimiento"
              value={form.fecha_nacimiento}
              onChange={(v) => set("fecha_nacimiento", v)}
              placeholder="dd/mm/aaaa"
            />
          </Row>
          <Input
            label="¿Cómo me conociste?"
            value={form.como_conocio}
            onChange={(v) => set("como_conocio", v)}
            placeholder="Instagram, recomendación, etc."
          />
        </Section>

        {/* Motivo */}
        <Section
          icon={<Sparkles className="size-4 text-clay" />}
          title="Qué te trae"
        >
          <Textarea
            label="¿Qué te trae a la consulta? Contame con tus palabras lo que estás atravesando. *"
            value={form.motivo_consulta}
            onChange={(v) => set("motivo_consulta", v)}
            required
            rows={5}
          />
          <Textarea
            label="¿Tenés algún síntoma físico actual o recurrente? (dolores, enfermedad, alergia, lo que sea)"
            value={form.sintomas_fisicos}
            onChange={(v) => set("sintomas_fisicos", v)}
            rows={4}
          />
          <Textarea
            label="¿Qué emociones aparecen seguido en tu vida? (miedo, enojo, tristeza, culpa, vacío, etc.)"
            value={form.emociones_recurrentes}
            onChange={(v) => set("emociones_recurrentes", v)}
            rows={4}
          />
          <Textarea
            label="¿Qué esperás de este proceso? ¿Qué te gustaría que cambie?"
            value={form.expectativas}
            onChange={(v) => set("expectativas", v)}
            rows={4}
          />
        </Section>

        {/* Historia familiar */}
        <Section
          icon={<Heart className="size-4 text-sage" />}
          title="Tu historia familiar"
        >
          <p className="text-sm text-earth/60 -mt-2 mb-2 leading-relaxed">
            Lo que vas a contar acá me ayuda a ver el mapa transgeneracional.
            Si no sabés algo, está bien escribir "no sé".
          </p>
          <Textarea
            label="Tus padres: ¿quiénes son? ¿Cómo es / era la relación con cada uno? ¿Viven? Si fallecieron, ¿cuándo y de qué?"
            value={form.historia_padres}
            onChange={(v) => set("historia_padres", v)}
            rows={5}
          />
          <Textarea
            label="Tus hermanos/as: orden de nacimiento, edades, vínculo. ¿Hubo pérdidas, abortos o bebés que no llegaron antes o después de vos?"
            value={form.historia_hermanos}
            onChange={(v) => set("historia_hermanos", v)}
            rows={4}
          />
          <Textarea
            label="Tus abuelos/as (maternos y paternos): lo que sepas de sus vidas, historias fuertes, migraciones, guerras, duelos."
            value={form.historia_abuelos}
            onChange={(v) => set("historia_abuelos", v)}
            rows={4}
          />
          <Textarea
            label="¿Tenés hijos? ¿Embarazos, pérdidas, abortos, tratamientos?"
            value={form.hijos_embarazos}
            onChange={(v) => set("hijos_embarazos", v)}
            rows={3}
          />
          <Textarea
            label="Duelos importantes en tu vida o en la familia (muertes, separaciones, pérdidas materiales)."
            value={form.duelos_perdidas}
            onChange={(v) => set("duelos_perdidas", v)}
            rows={3}
          />
          <Textarea
            label="¿Sabés de algún secreto, no-dicho, tema tabú o vergüenza en tu familia?"
            value={form.secretos_familiares}
            onChange={(v) => set("secretos_familiares", v)}
            rows={3}
          />
        </Section>

        {/* Contexto vital */}
        <Section
          icon={<Sparkles className="size-4 text-bloom" />}
          title="Tu presente"
        >
          <Textarea
            label="Eventos significativos del último año (mudanzas, separaciones, nacimientos, cambios laborales, pérdidas)."
            value={form.eventos_significativos}
            onChange={(v) => set("eventos_significativos", v)}
            rows={4}
          />
          <Textarea
            label="Tu vínculo de pareja actual (o ausencia de él): ¿cómo lo vivís?"
            value={form.vinculos_pareja}
            onChange={(v) => set("vinculos_pareja", v)}
            rows={3}
          />
          <Textarea
            label="Tu trabajo / vocación: ¿te realiza? ¿hay algo que te pese?"
            value={form.trabajo_vocacion}
            onChange={(v) => set("trabajo_vocacion", v)}
            rows={3}
          />
        </Section>

        {/* Programa */}
        <Section title="Lo último">
          <div>
            <label className="eyebrow text-earth/50 block mb-3">
              ¿Hay algún programa o sesión que te interese?
            </label>
            <select
              value={form.programa_interes}
              onChange={(e) => set("programa_interes", e.target.value)}
              className="w-full bg-cream border border-earth/10 rounded-full px-5 py-4 text-base focus:outline-none focus:border-sage transition-colors"
            >
              <option value="">No estoy segura aún</option>
              <option value="Sesión Exploradora">Sesión Exploradora (30 min)</option>
              <option value="Sesión Súper Power">Sesión Súper Power (120 min)</option>
              <option value="Desde la Raíz">Programa Desde la Raíz</option>
              <option value="Mujer Re-Nace">Programa Mujer Re-Nace</option>
            </select>
          </div>
          <Textarea
            label="¿Algo más que quieras que sepa antes de encontrarnos?"
            value={form.observaciones}
            onChange={(v) => set("observaciones", v)}
            rows={3}
          />
        </Section>

        {/* Consentimiento */}
        <div className="bg-cream rounded-3xl p-6 ring-1 ring-earth/5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consentimiento}
              onChange={(e) => set("consentimiento", e.target.checked)}
              className="mt-1 size-5 accent-sage shrink-0"
              required
            />
            <span className="text-sm text-earth/80 leading-relaxed">
              Acepto que Lorena Calcopietro guarde estas respuestas de forma{" "}
              <strong>confidencial</strong> con el único fin de acompañar mi
              proceso terapéutico. No se comparten con terceros.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full inline-flex items-center justify-center gap-2 bg-earth text-sand px-8 py-5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-earth/90 transition-colors duration-500 active:scale-[0.98] disabled:opacity-60"
        >
          {sending ? "Enviando…" : "Enviar mi entrevista"}{" "}
          <Send className="size-4" />
        </button>

        <p className="text-center text-xs text-earth/40">
          ¿Preferís contarme por otro medio?{" "}
          <Link to="/contacto" className="underline hover:text-rose">
            Escribime acá
          </Link>
          .
        </p>
      </form>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-cream/60 rounded-3xl p-6 md:p-8 ring-1 ring-earth/5 space-y-5">
      <h2 className="font-serif text-2xl text-earth flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="eyebrow text-earth/50 block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        maxLength={300}
        className="w-full bg-cream border border-earth/10 rounded-full px-5 py-3.5 text-base focus:outline-none focus:border-sage transition-colors"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow text-earth/50 block mb-2 normal-case tracking-normal text-[13px] text-earth/70">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        required={required}
        maxLength={5000}
        className="w-full bg-cream border border-earth/10 rounded-2xl px-5 py-4 text-base leading-relaxed focus:outline-none focus:border-sage transition-colors resize-none"
      />
    </div>
  );
}