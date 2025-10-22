'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vacantes", label: "Vacantes", icon: Briefcase },
  { href: "/admin/postulaciones", label: "Postulaciones", icon: FileText },
  { href: "/admin/candidatos", label: "Candidatos", icon: Users },
  { href: "/admin/ajustes", label: "Ajustes", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem("admin_token");
    if (!token && !pathname.includes("/login")) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  // Si es la página de login, no mostrar el layout
  if (pathname.includes("/login")) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50/30">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-amber-200 pt-5 pb-4 overflow-y-auto shadow-lg">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3 px-6 mb-8">
            <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-950">Amanecer de Canela</h1>
              <p className="text-xs text-amber-600">Panel Admin</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group relative
                    ${isActive 
                      ? 'bg-amber-600 text-white shadow-md' 
                      : 'text-amber-700 hover:bg-amber-50 hover:text-amber-900'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-amber-500 group-hover:text-amber-700'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-amber-600 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="px-3 mt-auto">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-amber-950 truncate">Admin</p>
                  <p className="text-xs text-amber-600 truncate">Reclutador</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-amber-50 text-amber-700 rounded-lg text-sm font-medium transition-colors border border-amber-200"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full pt-5 pb-4">
                {/* Header Mobile */}
                <div className="flex items-center justify-between px-6 mb-8">
                  <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-base font-bold text-amber-950">Amanecer de Canela</h1>
                      <p className="text-xs text-amber-600">Panel Admin</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <X className="w-5 h-5 text-amber-600" />
                  </button>
                </div>

                {/* Navigation Mobile */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                          ${isActive 
                            ? 'bg-amber-600 text-white' 
                            : 'text-amber-700 hover:bg-amber-50'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* User Section Mobile */}
                <div className="px-3 mt-auto">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl font-medium transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-amber-200/50 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-amber-50 transition-colors"
            >
              <Menu className="w-6 h-6 text-amber-600" />
            </button>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <Link href="/admin" className="text-amber-600 hover:text-amber-800 font-medium">
                Admin
              </Link>
              {pathname !== "/admin" && (
                <>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-900 font-semibold capitalize">
                    {pathname.split('/').pop()?.replace('-', ' ')}
                  </span>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button className="p-2 rounded-lg hover:bg-amber-50 transition-colors relative">
                <Search className="w-5 h-5 text-amber-600" />
              </button>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-amber-50 transition-colors relative">
                <Bell className="w-5 h-5 text-amber-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Desktop */}
              <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-amber-200">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AD</span>
                </div>
                <span className="text-sm font-medium text-amber-900">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
