import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getProgramsData, saveProgramsData, ProgramsData, ProgramData } from "@/lib/admin-data";
import { Save, Plus, Trash2, List, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_protected/programas")({
  component: AdminProgramsPage,
});

function AdminProgramsPage() {
  const [data, setData] = useState<ProgramsData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProgramsData().then(setData);
  }, []);

  const handleSave = async () => {
    if (data) {
      setSaving(true);
      try {
        await saveProgramsData(data);
        toast.success("Cambios guardados con éxito", {
          description: "La sección de Inversión de los programas ha sido actualizada.",
        });
      } catch (err) {
        toast.error("Error al guardar");
      } finally {
        setSaving(false);
      }
    }
  };

  if (!data) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="size-8 animate-spin text-earth/50" />
    </div>
  );

  const renderProgramEditor = (key: keyof ProgramsData, name: string) => {
    const prog = data[key];

    return (
      <section className="bg-cream ring-1 ring-earth/10 rounded-3xl p-6 md:p-8 space-y-8">
        <h2 className="font-serif text-2xl text-earth flex items-center gap-2 border-b border-earth/10 pb-4">
          <List className="size-5 text-sage" /> Inversión: {name}
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="eyebrow text-earth/60 block mb-2">Título Principal</label>
            <input
              type="text"
              value={prog.title}
              onChange={(e) => setData({ ...data, [key]: { ...prog, title: e.target.value } })}
              className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-3 text-lg font-serif focus:outline-none focus:border-sage transition-colors"
            />
          </div>
          <div>
            <label className="eyebrow text-earth/60 block mb-2">Subtítulo / Descripción</label>
            <textarea
              value={prog.description}
              onChange={(e) => setData({ ...data, [key]: { ...prog, description: e.target.value } })}
              rows={2}
              className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage transition-colors resize-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="eyebrow text-earth/60 block">Características (Etiquetas)</label>
            <button
              onClick={() => {
                const newFeatures = [...prog.features, { id: Date.now().toString(), icon: "calendar", text: "Nueva" }];
                setData({ ...data, [key]: { ...prog, features: newFeatures } });
              }}
              className="inline-flex items-center gap-1.5 bg-earth/5 hover:bg-earth/10 text-earth px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            >
              <Plus className="size-3" /> Agregar
            </button>
          </div>
          <div className="grid gap-3">
            {prog.features.map((feat, index) => (
              <div key={feat.id} className="flex items-center gap-3 bg-sand/50 p-3 rounded-xl ring-1 ring-earth/5">
                <select
                  value={feat.icon}
                  onChange={(e) => {
                    const newFeatures = [...prog.features];
                    newFeatures[index].icon = e.target.value;
                    setData({ ...data, [key]: { ...prog, features: newFeatures } });
                  }}
                  className="bg-cream border border-earth/10 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-sage"
                >
                  <option value="calendar">Calendario</option>
                  <option value="clock">Reloj</option>
                  <option value="sparkles">Destellos</option>
                  <option value="leaf">Hoja</option>
                  <option value="heart">Corazón</option>
                </select>
                <input
                  type="text"
                  value={feat.text}
                  onChange={(e) => {
                    const newFeatures = [...prog.features];
                    newFeatures[index].text = e.target.value;
                    setData({ ...data, [key]: { ...prog, features: newFeatures } });
                  }}
                  placeholder="ej: 4 encuentros"
                  className="flex-1 bg-cream border border-earth/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sage"
                />
                <button
                  onClick={() => {
                    const newFeatures = prog.features.filter((f) => f.id !== feat.id);
                    setData({ ...data, [key]: { ...prog, features: newFeatures } });
                  }}
                  className="text-earth/40 hover:text-rose p-2"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            {prog.features.length === 0 && (
              <p className="text-sm text-earth/50 italic py-2">No hay características.</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-earth/10">
          <div>
            <label className="eyebrow text-earth/60 block mb-2">Precio Total</label>
            <input
              type="text"
              value={prog.price}
              onChange={(e) => setData({ ...data, [key]: { ...prog, price: e.target.value } })}
              placeholder="ej: $320.000"
              className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-3 text-lg font-serif focus:outline-none focus:border-sage transition-colors"
            />
          </div>
          <div>
            <label className="eyebrow text-earth/60 block mb-2">Nota de pago (opcional)</label>
            <input
              type="text"
              value={prog.note}
              onChange={(e) => setData({ ...data, [key]: { ...prog, note: e.target.value } })}
              placeholder="ej: consultá por la opción de abonar en 2 cuotas"
              className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage transition-colors"
            />
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-10 pb-20 animate-fade">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-earth">Programas</h1>
          <p className="text-earth/60 mt-2 text-sm">
            Administra la sección de Inversión (precios, detalles y textos) de tus programas principales.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-sage text-sand px-6 py-3 rounded-full text-sm font-medium hover:bg-sage/90 transition-colors shadow-soft cursor-pointer disabled:opacity-50"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {renderProgramEditor("desdeLaRaiz", "Desde la Raíz")}
        {renderProgramEditor("mujerReNace", "Mujer Re-Nace")}
      </div>
    </div>
  );
}
