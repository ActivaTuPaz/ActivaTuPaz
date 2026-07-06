import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { login } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // We hide the email from the UI to keep it simple for the user, 
  // they only need to remember their password.
  const email = "admin@lorenacalcopietro.com.ar";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    
    if (success) {
      toast.success("¡Bienvenida de nuevo, Lore!");
      navigate({ to: "/admin" });
    } else {
      toast.error("Contraseña incorrecta o usuario no encontrado");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-rose/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-sage/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <span className="font-serif text-3xl tracking-tight uppercase text-earth block mb-2">
            Lorena Calcopietro
          </span>
          <p className="text-sm text-earth/60 uppercase tracking-[0.2em]">
            Panel de Control
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-cream/80 backdrop-blur-xl ring-1 ring-earth/10 p-8 md:p-10 rounded-[2rem] shadow-soft">
          <div className="mb-8 flex justify-center">
            <div className="size-16 bg-sage/15 rounded-full grid place-items-center">
              <Lock className="size-6 text-sage" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="eyebrow text-earth/60 block mb-3 text-center">
                Ingresa tu contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-sand/50 border border-earth/10 rounded-full px-6 py-4 text-center text-earth focus:outline-none focus:border-sage transition-colors"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-earth text-sand px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-earth/90 transition-all active:scale-95 disabled:opacity-70"
            >
              {isLoading ? "Verificando..." : "Acceder"} 
              {!isLoading && <ArrowRight className="size-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
