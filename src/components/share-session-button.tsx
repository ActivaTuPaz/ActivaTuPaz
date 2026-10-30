import { useState, useRef, useEffect } from "react";
import { Share2, Check, Copy, MessageCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ShareSessionButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
  variant?: "primary" | "secondary" | "subtle";
}

export function ShareSessionButton({
  title,
  text,
  url,
  className = "",
  variant = "secondary",
}: ShareSessionButtonProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const getFullUrl = () => {
    if (typeof window === "undefined") return url || "https://lorena.com";
    if (url && url.startsWith("http")) return url;
    if (url) return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
    return window.location.href;
  };

  const handleNativeShare = async () => {
    const fullUrl = getFullUrl();
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title,
          text: `${text}\n\n${fullUrl}`,
          url: fullUrl,
        });
        toast.success("¡Compartido con éxito!");
        setMenuOpen(false);
        return;
      } catch (err: any) {
        if (err.name !== "AbortError") {
          // If native share fails or was dismissed, fallback to dropdown
          setMenuOpen(true);
        }
      }
    } else {
      setMenuOpen((prev) => !prev);
    }
  };

  const handleCopyLink = async () => {
    const fullUrl = getFullUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = fullUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success("¡Enlace copiado al portapapeles!", {
        description: "Ya podés pegarlo y compartirlo donde quieras.",
      });
      setTimeout(() => setCopied(false), 2500);
      setMenuOpen(false);
    } catch (err) {
      toast.error("No se pudo copiar el enlace.");
    }
  };

  const handleWhatsAppShare = () => {
    const fullUrl = getFullUrl();
    const shareMessage = `${title}\n\n${text}\n\nPodés ver toda la información acá:\n${fullUrl}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setMenuOpen(false);
  };

  // Variant styles
  const baseButtonStyles =
    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer select-none active:scale-95";

  const variantStyles = {
    primary: "bg-earth text-sand hover:bg-earth/90 shadow-soft",
    secondary:
      "border border-earth/20 bg-cream/90 text-earth hover:border-earth/40 hover:bg-white shadow-soft",
    subtle:
      "bg-sand/60 text-earth/80 hover:text-earth hover:bg-sand border border-earth/10",
  }[variant];

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => {
          // If on mobile device with native share, prioritize native share sheet,
          // otherwise toggle menu
          const isMobile = typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);
          if (isMobile && typeof navigator.share === "function") {
            handleNativeShare();
          } else {
            setMenuOpen((prev) => !prev);
          }
        }}
        className={`${baseButtonStyles} ${variantStyles} ${className}`}
        aria-label="Compartir sesión"
      >
        <Share2 className="size-4 text-bloom" />
        <span>Compartir sesión</span>
      </button>

      {/* Menu desplegable */}
      {menuOpen && (
        <div
          role="menu"
          className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-64 bg-cream/98 backdrop-blur-xl border border-earth/15 rounded-2xl p-2 shadow-lift z-50 animate-fade origin-top"
        >
          <div className="px-3 py-2 border-b border-earth/10 mb-1">
            <p className="text-[10px] uppercase tracking-widest text-earth/50 font-semibold">
              Compartir como catálogo
            </p>
            <p className="text-xs text-earth/80 font-serif truncate mt-0.5">{title}</p>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-500/10 text-earth hover:text-emerald-700 transition-colors text-xs font-medium text-left cursor-pointer group"
          >
            <div className="size-7 rounded-lg bg-emerald-500/15 text-emerald-600 grid place-items-center shrink-0 group-hover:scale-105 transition-transform">
              <MessageCircle className="size-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs text-earth">Enviar por WhatsApp</p>
              <p className="text-[11px] text-earth/60">Abre un chat con el enlace</p>
            </div>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-bloom/10 text-earth hover:text-bloom transition-colors text-xs font-medium text-left cursor-pointer group mt-1"
          >
            <div className="size-7 rounded-lg bg-bloom/15 text-bloom grid place-items-center shrink-0 group-hover:scale-105 transition-transform">
              {copied ? <Check className="size-3.5 text-sage" /> : <Copy className="size-3.5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs text-earth">
                {copied ? "¡Copiado!" : "Copiar enlace directo"}
              </p>
              <p className="text-[11px] text-earth/60">Para pegar en mensajes o redes</p>
            </div>
          </button>

          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-earth/5 text-earth/70 hover:text-earth transition-colors text-xs font-medium text-left cursor-pointer mt-1 border-t border-earth/10 pt-2"
            >
              <ExternalLink className="size-3.5 text-earth/50" />
              <span className="text-[11px]">Más opciones de compartir...</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
