"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
  Filter,
  TrendingUp,
  Users,
  Croissant,
  ChefHat,
  ShoppingBag,
  Wallet,
  Loader2,
  DollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import { obtenerVacantes, type Vacante } from "@/lib/supabase";

export default function EmpleosPage() {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    cargarVacantes();
  }, []);

  async function cargarVacantes() {
    try {
      setLoading(true);
      // Solo obtener vacantes activas para el público
      const data = await obtenerVacantes({ estado: "Activa" });
      setVacantes(data);
    } catch (error) {
      console.error("Error al cargar vacantes:", error);
    } finally {
      setLoading(false);
    }
  }

  const vacantesFiltradas = vacantes.filter((vacante) => {
    const matchSearch =
      vacante.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacante.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacante.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategory === "Todas" || vacante.categoria === selectedCategory;

    return matchSearch && matchCategory;
  });

  const categorias = [
    "Todas",
    "Producción",
    "Ventas",
    "Gerencial",
    "Administrativo",
  ];
  
  const tipos = ["Todos", "Tiempo Completo", "Medio Tiempo", "Por Proyecto"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/50 to-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200/50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="Amanecer de Canela"
              width={50}
              height={50}
              className="rounded-full"
              priority
            />
            <div>
              <h1 className="text-xl font-bold text-amber-900">
                Amanecer de Canela
              </h1>
              <p className="text-xs text-amber-700">Únete a nuestro equipo</p>
            </div>
          </Link>

          <Link
            href="/"
            className="px-6 py-2.5 text-amber-700 hover:text-amber-900 font-medium transition-colors"
          >
            Volver al inicio
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden h-[400px] sm:h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-empleos.jpg"
            alt="Equipo Amanecer de Canela"
            fill
            className="object-cover brightness-50"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full mb-6 text-sm font-medium backdrop-blur-sm border border-white/30">
              <Briefcase className="w-4 h-4" />
              {loading ? "Cargando..." : `${vacantes.length} vacantes disponibles`}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Encuentra tu lugar perfecto
            </h2>
            <p className="text-xl sm:text-2xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
              Descubre oportunidades de crecimiento en nuestra familia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-amber-100"
        >
          <h3 className="text-2xl font-bold text-amber-950 mb-6">
            Busca tu oportunidad ideal
          </h3>

          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por puesto o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={() => {}}
              className="lg:hidden flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-amber-700 text-sm">
            Mostrando {vacantesFiltradas.length} de {vacantes.length} vacantes
          </p>
        </motion.div>
      </section>

      {/* Job Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="bg-white rounded-2xl border border-amber-100 p-12 text-center">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
            <p className="text-amber-700">Cargando vacantes...</p>
          </div>
        ) : vacantesFiltradas.length === 0 ? (
          <div className="bg-white rounded-2xl border border-amber-100 p-12 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-amber-950 mb-2">
              No se encontraron vacantes
            </h3>
            <p className="text-amber-700 mb-6">
              {vacantes.length === 0
                ? "No hay vacantes disponibles en este momento. Vuelve pronto."
                : "Intenta ajustar los filtros de búsqueda"}
            </p>
            {vacantes.length > 0 && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todas");
                }}
                className="px-6 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacantesFiltradas.map((vacante, index) => (
              <motion.div
                key={vacante.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/empleos/${vacante.slug}`}>
                  <div className="group bg-white rounded-xl overflow-hidden border border-amber-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-lg h-full">
                    <div className="h-1.5 bg-gradient-to-r from-amber-400 to-orange-400"></div>

                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-amber-950 group-hover:text-amber-700 transition-colors line-clamp-1">
                          {vacante.titulo}
                        </h4>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-1 text-sm text-amber-700">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{vacante.ubicacion}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-amber-700">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{vacante.tipo}</span>
                        </div>
                      </div>

                      <p className="text-sm text-amber-800 mb-4 line-clamp-2">
                        {vacante.descripcion}
                      </p>

                      <div className="pt-3 border-t border-amber-100">
                        <p className="text-xs text-amber-600 font-medium mb-1">
                          Salario
                        </p>
                        <p className="text-sm font-bold text-amber-900 mb-3">
                          ${vacante.salario_min?.toLocaleString("es-MX")} - ${vacante.salario_max?.toLocaleString("es-MX")}
                        </p>

                        <div className="flex items-center gap-2 text-amber-600 font-medium text-sm group-hover:text-amber-700 transition-colors">
                          Ver detalles
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden h-[350px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/cta-empleos.jpg"
            alt="Únete a nuestro equipo"
            fill
            className="object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Envíanos tu CV y te consideraremos para futuras oportunidades
            </p>
            <a
              href="mailto:reclutamiento@amanecerdecanela.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 rounded-full font-semibold hover:bg-amber-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Enviar CV
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="Amanecer de Canela"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-bold text-lg">Amanecer de Canela</span>
              </div>
              <p className="text-amber-300/80 text-sm">
                Endulzando vidas desde hace más de 25 años
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-amber-300/80 hover:text-amber-200"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/empleos"
                    className="text-amber-300/80 hover:text-amber-200"
                  >
                    Vacantes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <p className="text-amber-300/80 text-sm">
                ¿Preguntas sobre las vacantes?
                <br />
                Escríbenos a: reclutamiento@amanecerdecanela.com
              </p>
            </div>
          </div>

          <div className="border-t border-amber-800 pt-8 text-center text-sm text-amber-300/60">
            <p>© 2025 Amanecer de Canela. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
