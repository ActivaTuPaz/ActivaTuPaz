import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getSessionsData, saveSessionsData, SessionsData } from "@/lib/admin-data";
import { Save, Plus, Trash2, List } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_protected/sesiones")({
  component: AdminSessionsPage,
});

function AdminSessionsPage() {
  const [data, setData] = useState<SessionsData | null>(null);

  useEffect(() => {
    setData(getSessionsData());
  }, []);

  const handleSave = () => {
    if (data) {
      saveSessionsData(data);
      toast.success("Cambios guardados con éxito", {
        description: "La sección Sesiones Individuales ha sido actualizada.",
      });
    }
  };

  if (!data) return null;

  return (
    <div className="space-y-10 pb-20 animate-fade">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-earth">Sesiones Individuales</h1>
          <p className="text-earth/60 mt-2 text-sm">
            Administra los textos de la sección y las tarjetas de sesiones (Sesión Exploradora, etc).
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-sage text-sand px-6 py-3 rounded-full text-sm font-medium hover:bg-sage/90 transition-colors shadow-soft cursor-pointer"
        >
          <Save className="size-4" /> Guardar Cambios
        </button>
      </div>

      <div className="space-y-8">
        {/* Textos de la sección */}
        <section className="bg-cream ring-1 ring-earth/10 rounded-3xl p-6 md:p-8 max-w-4xl">
          <h2 className="font-serif text-2xl text-earth mb-6 flex items-center gap-2">
            <List className="size-5 text-sage" /> Encabezado de Sección
          </h2>
          <div className="grid gap-6">
            <div>
              <label className="eyebrow text-earth/60 block mb-2">Etiqueta Superior (Eyebrow)</label>
              <input
                type="text"
                value={data.sectionEyebrow}
                onChange={(e) => setData({ ...data, sectionEyebrow: e.target.value })}
                className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage transition-colors"
              />
            </div>
            <div>
              <label className="eyebrow text-earth/60 block mb-2">Título Principal</label>
              <input
                type="text"
                value={data.sectionTitle}
                onChange={(e) => setData({ ...data, sectionTitle: e.target.value })}
                className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-3 text-lg font-serif focus:outline-none focus:border-sage transition-colors"
              />
            </div>
            <div>
              <label className="eyebrow text-earth/60 block mb-2">Descripción</label>
              <textarea
                value={data.sectionDescription}
                onChange={(e) => setData({ ...data, sectionDescription: e.target.value })}
                rows={2}
                className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage transition-colors resize-none"
              />
            </div>
          </div>
        </section>

        {/* Tarjetas de Sesiones */}
        <section>
          <div className="flex items-center justify-between mb-6 max-w-4xl">
            <h2 className="font-serif text-2xl text-earth flex items-center gap-2">
              <List className="size-5 text-bloom" /> Tarjetas de Sesiones
            </h2>
            <button
              onClick={() =>
                setData({
                  ...data,
                  cards: [
                    {
                      id: Date.now().toString(),
                      icon: "compass",
                      eyebrow: "Nueva etiqueta",
                      title: "Nueva Sesión",
                      description: "Descripción breve.",
                      duration: "60 minutos",
                      detail: "Online",
                      price: "$10.000",
                      hasPromo: false,
                      oldPrice: "",
                      isPopular: false,
                    },
                    ...data.cards,
                  ],
                })
              }
              className="inline-flex items-center gap-2 bg-earth text-sand px-4 py-2 rounded-full text-xs font-medium hover:bg-earth/90 transition-colors shadow-soft cursor-pointer"
            >
              <Plus className="size-3" /> Agregar Sesión
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl">
            {data.cards.map((card, index) => (
              <div key={card.id} className="bg-cream ring-1 ring-earth/10 rounded-3xl p-6 relative group flex flex-col gap-4">
                <button
                  onClick={() =>
                    setData({
                      ...data,
                      cards: data.cards.filter((c) => c.id !== card.id),
                    })
                  }
                  className="absolute top-6 right-6 text-earth/40 hover:text-rose transition-colors cursor-pointer"
                  title="Eliminar sesión"
                >
                  <Trash2 className="size-5" />
                </button>
                
                <div className="grid sm:grid-cols-2 gap-4 pr-10 items-end">
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
                      <option value="compass">Brújula (Compass)</option>
                      <option value="zap">Rayo (Zap)</option>
                      <option value="star">Estrella (Star)</option>
                      <option value="heart">Corazón (Heart)</option>
                    </select>
                  </div>
                  <div>
                    <label className="eyebrow text-earth/60 block mb-2">Etiqueta (Eyebrow)</label>
                    <input
                      type="text"
                      value={card.eyebrow}
                      placeholder="ej: Primer acercamiento"
                      onChange={(e) => {
                        const newCards = [...data.cards];
                        newCards[index].eyebrow = e.target.value;
                        setData({ ...data, cards: newCards });
                      }}
                      className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="eyebrow text-earth/60 block mb-2">Título de la Sesión</label>
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="eyebrow text-earth/60 block mb-2">Duración</label>
                    <input
                      type="text"
                      value={card.duration}
                      placeholder="ej: 120 minutos"
                      onChange={(e) => {
                        const newCards = [...data.cards];
                        newCards[index].duration = e.target.value;
                        setData({ ...data, cards: newCards });
                      }}
                      className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors"
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-earth/60 block mb-2">Detalle (Modalidad)</label>
                    <input
                      type="text"
                      value={card.detail}
                      placeholder="ej: Online o presencial"
                      onChange={(e) => {
                        const newCards = [...data.cards];
                        newCards[index].detail = e.target.value;
                        setData({ ...data, cards: newCards });
                      }}
                      className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-sand/30 rounded-2xl p-4 ring-1 ring-earth/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`promo-${card.id}`}
                      checked={card.hasPromo}
                      onChange={(e) => {
                        const newCards = [...data.cards];
                        newCards[index].hasPromo = e.target.checked;
                        setData({ ...data, cards: newCards });
                      }}
                      className="size-4 text-sage rounded border-earth/20 cursor-pointer"
                    />
                    <label htmlFor={`promo-${card.id}`} className="text-sm text-earth cursor-pointer select-none">
                      Habilitar promoción (Precio tachado + "solo por hoy")
                    </label>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {card.hasPromo && (
                      <div>
                        <label className="eyebrow text-earth/60 block mb-2">Precio Anterior (Tachado)</label>
                        <input
                          type="text"
                          value={card.oldPrice}
                          placeholder="ej: $120.000"
                          onChange={(e) => {
                            const newCards = [...data.cards];
                            newCards[index].oldPrice = e.target.value;
                            setData({ ...data, cards: newCards });
                          }}
                          className="w-full bg-cream border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors"
                        />
                      </div>
                    )}
                    <div>
                      <label className="eyebrow text-earth/60 block mb-2">Precio Final</label>
                      <input
                        type="text"
                        value={card.price}
                        placeholder="ej: $99.999"
                        onChange={(e) => {
                          const newCards = [...data.cards];
                          newCards[index].price = e.target.value;
                          setData({ ...data, cards: newCards });
                        }}
                        className="w-full bg-cream border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors font-serif font-medium"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    id={`popular-${card.id}`}
                    checked={card.isPopular}
                    onChange={(e) => {
                      const newCards = [...data.cards];
                      newCards[index].isPopular = e.target.checked;
                      setData({ ...data, cards: newCards });
                    }}
                    className="size-4 text-sage rounded border-earth/20 cursor-pointer"
                  />
                  <label htmlFor={`popular-${card.id}`} className="text-sm text-earth cursor-pointer select-none">
                    Mostrar etiqueta de "Más elegida"
                  </label>
                </div>
              </div>
            ))}
            {data.cards.length === 0 && (
              <div className="text-center py-12 bg-cream ring-1 ring-earth/10 rounded-3xl col-span-full">
                <p className="text-earth/50 text-sm">No hay sesiones agregadas.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
