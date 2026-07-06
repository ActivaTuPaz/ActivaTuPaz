import { createFileRoute, redirect, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { isAuthenticated, logout } from "@/lib/auth";
import { LayoutDashboard, LogOut, FileText } from "lucide-react";

export const Route = createFileRoute("/admin/_protected")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/admin/login",
      });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen bg-sand flex text-earth overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-cream border-r border-earth/10 flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-earth/10">
          <span className="font-serif text-xl tracking-tight uppercase block text-earth">
            Lorena Admin
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-earth/5 transition-colors [&.active]:bg-sage/15 [&.active]:text-sage"
            activeOptions={{ exact: true }}
          >
            <LayoutDashboard className="size-4" />
            Hero Section
          </Link>
          <Link
            to="/admin/metodologia"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-earth/5 transition-colors [&.active]:bg-sage/15 [&.active]:text-sage"
          >
            <FileText className="size-4" />
            Metodología
          </Link>
          <Link
            to="/admin/sesiones"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-earth/5 transition-colors [&.active]:bg-sage/15 [&.active]:text-sage"
          >
            <FileText className="size-4" />
            Sesiones Indiv.
          </Link>
        </nav>
        <div className="p-4 border-t border-earth/10">
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-rose/15 hover:text-rose transition-colors"
          >
            <LogOut className="size-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header móvil */}
        <header className="md:hidden flex items-center justify-between p-4 bg-cream border-b border-earth/10">
          <span className="font-serif text-lg uppercase text-earth">Lorena Admin</span>
          <button onClick={handleLogout} className="p-2 text-earth/70 hover:text-rose">
            <LogOut className="size-5" />
          </button>
        </header>
        
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
