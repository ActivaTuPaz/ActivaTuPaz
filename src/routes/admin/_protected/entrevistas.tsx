import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getEntrevistas, EntrevistaData } from "@/lib/admin-data";
import { Inbox, ChevronDown, ChevronUp, Calendar, User, Mail, Phone, MapPin } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const Route = createFileRoute("/admin/_protected/entrevistas")({
  component: AdminEntrevistasPage,
});

function AdminEntrevistasPage() {
  const [entrevistas, setEntrevistas] = useState<EntrevistaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getEntrevistas().then((data) => {
      setEntrevistas(data);
      setLoading(false);
    });
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4 text-earth/50">
          <Inbox className="size-8" />
          <p className="text-sm">Cargando entrevistas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 animate-fade">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-earth">Entrevistas Previas</h1>
          <p className="text-earth/60 mt-2 text-sm">
            Respuestas recibidas de tus consultantes. Se ordenan de más recientes a más antiguas.
          </p>
        </div>
        <div className="bg-sage/10 text-sage px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <Inbox className="size-4" />
          {entrevistas.length} recibidas
        </div>
      </div>

      {entrevistas.length === 0 ? (
        <div className="text-center py-20 bg-cream ring-1 ring-earth/10 rounded-3xl">
          <Inbox className="size-10 text-earth/30 mx-auto mb-4" />
          <p className="text-earth/50 text-base">Aún no hay entrevistas recibidas.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entrevistas.map((ent) => (
            <div key={ent.id} className="bg-cream ring-1 ring-earth/10 rounded-3xl overflow-hidden transition-all duration-300">
              {/* Header de la tarjeta */}
              <button
                onClick={() => toggleExpand(ent.id)}
                className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-earth/5 transition-colors cursor-pointer"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="font-serif text-xl md:text-2xl text-earth font-medium">
                      {ent.nombre}
                    </h2>
                    {ent.programa_interes && (
                      <span className="bg-sage/20 text-sage px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        {ent.programa_interes}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-earth/60 flex-wrap">
                    <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {format(new Date(ent.timestamp), "dd 'de' MMMM, yyyy", { locale: es })}</span>
                    <span className="flex items-center gap-1.5"><Mail className="size-3.5" /> {ent.email}</span>
                  </div>
                </div>
                <div className="shrink-0 text-earth/40 bg-sand p-2 rounded-full">
                  {expandedId === ent.id ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                </div>
              </button>

              {/* Contenido expandido */}
              {expandedId === ent.id && (
                <div className="p-6 md:p-8 pt-0 border-t border-earth/5 animate-fade space-y-8">
                  {/* Info Personal Básica */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 bg-sand/50 p-6 rounded-2xl ring-1 ring-earth/5">
                    <div>
                      <span className="text-xs text-earth/50 block mb-1 uppercase tracking-wider">Edad</span>
                      <p className="text-earth font-medium">{ent.edad || "-"}</p>
                    </div>
                    <div>
                      <span className="text-xs text-earth/50 block mb-1 uppercase tracking-wider">Teléfono</span>
                      <p className="text-earth font-medium">{ent.telefono || "-"}</p>
                    </div>
                    <div>
                      <span className="text-xs text-earth/50 block mb-1 uppercase tracking-wider">Ubicación</span>
                      <p className="text-earth font-medium">{ent.ciudad || "-"}</p>
                    </div>
                    <div>
                      <span className="text-xs text-earth/50 block mb-1 uppercase tracking-wider">F. Nacimiento</span>
                      <p className="text-earth font-medium">{ent.fecha_nacimiento || "-"}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Columna Izquierda: Motivo y Presente */}
                    <div className="space-y-6">
                      <h3 className="font-serif text-lg text-rose flex items-center gap-2 border-b border-earth/10 pb-2">
                        Motivo y Presente
                      </h3>
                      <DetailBlock label="¿Qué te trae a la consulta?" value={ent.motivo_consulta} />
                      <DetailBlock label="Síntomas físicos" value={ent.sintomas_fisicos} />
                      <DetailBlock label="Emociones recurrentes" value={ent.emociones_recurrentes} />
                      <DetailBlock label="Expectativas" value={ent.expectativas} />
                      <DetailBlock label="Eventos significativos recientes" value={ent.eventos_significativos} />
                      <DetailBlock label="Vínculos de pareja" value={ent.vinculos_pareja} />
                      <DetailBlock label="Trabajo y vocación" value={ent.trabajo_vocacion} />
                    </div>

                    {/* Columna Derecha: Historia Familiar */}
                    <div className="space-y-6">
                      <h3 className="font-serif text-lg text-sage flex items-center gap-2 border-b border-earth/10 pb-2">
                        Historia Familiar
                      </h3>
                      <DetailBlock label="Historia de los padres" value={ent.historia_padres} />
                      <DetailBlock label="Hermanos/as" value={ent.historia_hermanos} />
                      <DetailBlock label="Abuelos/as" value={ent.historia_abuelos} />
                      <DetailBlock label="Hijos, embarazos, pérdidas" value={ent.hijos_embarazos} />
                      <DetailBlock label="Duelos en la familia" value={ent.duelos_perdidas} />
                      <DetailBlock label="Secretos familiares" value={ent.secretos_familiares} />
                    </div>
                  </div>

                  <div className="bg-sand/50 p-6 rounded-2xl ring-1 ring-earth/5 space-y-4">
                    <DetailBlock label="¿Cómo me conoció?" value={ent.como_conocio} />
                    <DetailBlock label="Observaciones adicionales" value={ent.observaciones} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <h4 className="text-[13px] font-medium text-earth/60 uppercase tracking-wide">{label}</h4>
      <p className="text-earth/90 text-sm leading-relaxed whitespace-pre-wrap">{value}</p>
    </div>
  );
}
