import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getHeroData, saveHeroData, fileToBase64, HeroData, ResourcePDF } from "@/lib/admin-data";
import { Save, Plus, Trash2, Image as ImageIcon, Upload, FileText } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_protected/")({
  component: AdminHeroPage,
});

function AdminHeroPage() {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    setData(getHeroData());
  }, []);

  const handleSave = () => {
    if (data) {
      saveHeroData(data);
      toast.success("Cambios guardados con éxito", {
        description: "El Hero Section y los PDFs han sido actualizados.",
      });
    }
  };

  if (!data) return null;

  return (
    <div className="space-y-10 pb-20 animate-fade">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-earth">Hero Section</h1>
          <p className="text-earth/60 mt-2 text-sm">
            Administra el título, texto e imágenes de la pantalla principal, así como los recursos gratuitos descargables.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-sage text-sand px-6 py-3 rounded-full text-sm font-medium hover:bg-sage/90 transition-colors shadow-soft cursor-pointer"
        >
          <Save className="size-4" /> Guardar Cambios
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Textos Principales */}
          <section className="bg-cream ring-1 ring-earth/10 rounded-3xl p-6 md:p-8">
            <h2 className="font-serif text-2xl text-earth mb-6 flex items-center gap-2">
              <FileText className="size-5 text-sage" /> Textos Principales
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
                <label className="eyebrow text-earth/60 block mb-2">Subtítulo / Descripción</label>
                <textarea
                  value={data.subtitle}
                  onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                  rows={4}
                  className="w-full bg-sand/50 border border-earth/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-sage transition-colors resize-none"
                />
              </div>
              <div>
                <label className="eyebrow text-earth/60 block mb-2">Texto del botón de descarga</label>
                <input
                  type="text"
                  value={data.ctaText}
                  onChange={(e) => setData({ ...data, ctaText: e.target.value })}
                  className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Recursos / PDFs */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-earth flex items-center gap-2">
                <FileText className="size-5 text-bloom" /> Recursos Descargables (PDFs)
              </h2>
              <button
                onClick={() =>
                  setData({
                    ...data,
                    resources: [
                      {
                        id: Date.now().toString(),
                        category: "Nueva Categoría",
                        title: "Nuevo Recurso",
                        description: "Descripción del recurso",
                        fileUrl: "",
                      },
                      ...data.resources,
                    ],
                  })
                }
                className="inline-flex items-center gap-2 bg-earth text-sand px-4 py-2 rounded-full text-xs font-medium hover:bg-earth/90 transition-colors shadow-soft cursor-pointer"
              >
                <Plus className="size-3" /> Agregar PDF
              </button>
            </div>

            <div className="grid gap-6">
              {data.resources.map((res, index) => (
                <div key={res.id} className="bg-cream ring-1 ring-earth/10 rounded-3xl p-6 relative group">
                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        resources: data.resources.filter((r) => r.id !== res.id),
                      })
                    }
                    className="absolute top-6 right-6 text-earth/40 hover:text-rose transition-colors cursor-pointer"
                    title="Eliminar recurso"
                  >
                    <Trash2 className="size-5" />
                  </button>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-4 pr-10 items-end">
                    <div>
                      <label className="eyebrow text-earth/60 block mb-2">Categoría</label>
                      <input
                        type="text"
                        value={res.category}
                        placeholder="ej: Meditación guiada"
                        onChange={(e) => {
                          const newResources = [...data.resources];
                          newResources[index].category = e.target.value;
                          setData({ ...data, resources: newResources });
                        }}
                        className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors"
                      />
                    </div>
                    <div>
                      <label className="eyebrow text-earth/60 block mb-2">Título</label>
                      <input
                        type="text"
                        value={res.title}
                        placeholder="ej: Conectar con tu Ser"
                        onChange={(e) => {
                          const newResources = [...data.resources];
                          newResources[index].title = e.target.value;
                          setData({ ...data, resources: newResources });
                        }}
                        className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="eyebrow text-earth/60 block mb-2">Descripción</label>
                    <textarea
                      value={res.description}
                      onChange={(e) => {
                        const newResources = [...data.resources];
                        newResources[index].description = e.target.value;
                        setData({ ...data, resources: newResources });
                      }}
                      rows={2}
                      className="w-full bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="eyebrow text-earth/60 block mb-2">Enlace o Archivo PDF</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={res.fileUrl}
                        onChange={(e) => {
                          const newResources = [...data.resources];
                          newResources[index].fileUrl = e.target.value;
                          setData({ ...data, resources: newResources });
                        }}
                        placeholder="/recursos/archivo.pdf"
                        className="flex-1 bg-sand/50 border border-earth/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sage transition-colors"
                      />
                      {/* Simulación de botón de subida */}
                      <button className="bg-earth/5 text-earth px-4 py-2 rounded-xl text-sm hover:bg-earth/10 transition-colors flex items-center gap-2 cursor-pointer">
                        <Upload className="size-4" /> Subir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {data.resources.length === 0 && (
                <div className="text-center py-12 bg-cream ring-1 ring-earth/10 rounded-3xl">
                  <p className="text-earth/50 text-sm">No hay recursos agregados.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Imágenes */}
        <div className="space-y-6">
          <section className="bg-cream ring-1 ring-earth/10 rounded-3xl p-6 md:p-8">
            <h2 className="font-serif text-2xl text-earth mb-6 flex items-center gap-2">
              <ImageIcon className="size-5 text-rose" /> Imágenes
            </h2>

            <div className="space-y-8">
              {/* Imagen Principal */}
              <div>
                <label className="eyebrow text-earth/60 block mb-4">Imagen Principal (Grande)</label>
                <div className="relative group overflow-hidden rounded-2xl ring-1 ring-earth/10 aspect-[4/5] bg-sand">
                  {data.mainImage ? (
                    <img src={data.mainImage} alt="Main" className="w-full h-full object-cover" />
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
                            const b64 = await fileToBase64(file);
                            setData({ ...data, mainImage: b64 });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Imagen Secundaria */}
              <div>
                <label className="eyebrow text-earth/60 block mb-4">Imagen Secundaria (Pequeña)</label>
                <div className="relative group overflow-hidden rounded-2xl ring-1 ring-earth/10 aspect-video bg-sand">
                  {data.secondaryImage ? (
                    <img src={data.secondaryImage} alt="Secondary" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-earth/30">
                      <ImageIcon className="size-8" />
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
                            const b64 = await fileToBase64(file);
                            setData({ ...data, secondaryImage: b64 });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
