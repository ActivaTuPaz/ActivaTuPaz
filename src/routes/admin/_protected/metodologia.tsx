import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getMethodologyData, saveMethodologyData, uploadFile, MethodologyData } from "@/lib/admin-data";
import { Save, Plus, Trash2, Image as ImageIcon, Upload, List, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_protected/metodologia")({
  component: AdminMethodologyPage,
});

function AdminMethodologyPage() {
  const [data, setData] = useState<MethodologyData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMethodologyData().then(setData);
  }, []);

  const handleSave = async () => {
    if (data) {
      setSaving(true);
      try {
        await saveMethodologyData(data);
        toast.success("Cambios guardados con éxito", {
          description: "La sección Metodología ha sido actualizada.",
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

  return (
    <div className="space-y-10 pb-20 animate-fade">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-earth">Metodología</h1>
          <p className="text-earth/60 mt-2 text-sm">
            Administra el título, descripción, imagen y las tarjetas de "¿Qué es la biodecodificación?".
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

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Textos Principales */}
          <section className="bg-cream ring-1 ring-earth/10 rounded-3xl p-6 md:p-8">
            <h2 className="font-serif text-2xl text-earth mb-6 flex items-center gap-2">
              <List className="size-5 text-sage" /> Textos Principales
            </h2>
            <div className="space-y-6">
              <div>
                <label className="eyebrow text-earth/60 block mb-2">Título Principal</label>
                <textarea
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  rows={2}
                  className="w-full bg-sand/50 border border-earth/10 rounded-2xl px-4 py-3 text-lg font-serif focus:outline-none focus:border-sage transition-colors resize-none"
                />
              </div>
              <div>
                <label className="eyebrow text-earth/60 block mb-2">Descripción General</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  rows={4}
                  className="w-full bg-sand/50 border border-earth/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-sage transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          {/* Tarjetas */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-earth flex items-center gap-2">
                <List className="size-5 text-bloom" /> Tarjetas (Metodologías)
              </h2>
              <button
                onClick={() =>
                  setData({
                    ...data,
                    cards: [
                      {
                        id: Date.now().toString(),
                        icon: "leaf",
                        title: "Nueva Metodología",
                        description: "Descripción de esta metodología.",
                      },
                      ...data.cards,
                    ],
                  })
                }
                className="inline-flex items-center gap-2 bg-earth text-sand px-4 py-2 rounded-full text-xs font-medium hover:bg-earth/90 transition-colors shadow-soft cursor-pointer"
              >
                <Plus className="size-3" /> Agregar Tarjeta
              </button>
            </div>

            <div className="grid gap-6">
              {data.cards.map((card, index) => (
                <div key={card.id} className="bg-cream ring-1 ring-earth/10 rounded-3xl p-6 relative group">
                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        cards: data.cards.filter((c) => c.id !== card.id),
                      })
                    }
                    className="absolute top-6 right-6 text-earth/40 hover:text-rose transition-colors cursor-pointer"
                    title="Eliminar tarjeta"
                  >
                    <Trash2 className="size-5" />
                  </button>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-4 pr-10 items-end">
                    <div>
                      <label className="eyebrow text-earth/60 block mb-2">Ícono</label>
                      <select
                        value={card.icon}
                        onChange={(e) => {
                          const newCards = [...data.cards];
                          newCards[index].icon = e.target.value;
                          setData({ ...data, cards: newCards });
                        }}
                        className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors cursor-pointer"
                      >
                        <option value="leaf">Hoja (Leaf)</option>
                        <option value="heart">Corazón (Heart)</option>
                        <option value="sun">Sol (Sun)</option>
                        <option value="sparkles">Destellos (Sparkles)</option>
                      </select>
                    </div>
                    <div>
                      <label className="eyebrow text-earth/60 block mb-2">Título</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const newCards = [...data.cards];
                          newCards[index].title = e.target.value;
                          setData({ ...data, cards: newCards });
                        }}
                        className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="eyebrow text-earth/60 block mb-2">Descripción</label>
                    <textarea
                      value={card.description}
                      onChange={(e) => {
                        const newCards = [...data.cards];
                        newCards[index].description = e.target.value;
                        setData({ ...data, cards: newCards });
                      }}
                      rows={2}
                      className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors resize-none"
                    />
                  </div>
                </div>
              ))}
              {data.cards.length === 0 && (
                <div className="text-center py-12 bg-cream ring-1 ring-earth/10 rounded-3xl">
                  <p className="text-earth/50 text-sm">No hay tarjetas agregadas.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Imagen */}
        <div className="space-y-6">
          <section className="bg-cream ring-1 ring-earth/10 rounded-3xl p-6 md:p-8">
            <h2 className="font-serif text-2xl text-earth mb-6 flex items-center gap-2">
              <ImageIcon className="size-5 text-rose" /> Imagen Principal
            </h2>

            <div>
              <label className="eyebrow text-earth/60 block mb-4">Manos con taza (hands-cup)</label>
              <div className="relative group overflow-hidden rounded-2xl ring-1 ring-earth/10 aspect-[4/5] bg-sand">
                {data.image ? (
                  <img src={data.image} alt="Metodologia" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-earth/30">
                    <ImageIcon className="size-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-earth/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-cream text-earth px-4 py-2 rounded-full text-sm font-medium shadow-soft flex items-center gap-2 hover:bg-sand transition-colors">
                    <Upload className="size-4" /> Cambiar
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          toast.loading("Subiendo imagen...", { id: "upload-meth" });
                          try {
                            const url = await uploadFile(file, 'images');
                            setData({ ...data, image: url });
                            toast.success("Imagen subida", { id: "upload-meth" });
                          } catch (err) {
                            toast.error("Error al subir", { id: "upload-meth" });
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
