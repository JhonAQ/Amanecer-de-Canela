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
} from "lucide-react";
import { useState } from "react";

// Datos de ejemplo de vacantes (luego vendrán de una API/base de datos)
const vacantes = [
  {
    id: 1,
    slug: "maestro-panadero",
    titulo: "Maestro Panadero",
    ubicacion: "Sucursal Centro",
    tipo: "Tiempo Completo",
    categoria: "Producción",
    salario: "$15,000 - $20,000 MXN",
    descripcion:
      "Buscamos un maestro panadero con experiencia en elaboración de pan artesanal y productos de panadería tradicional.",
    icon: ChefHat,
    color: "from-amber-600 to-amber-700",
    destacada: true,
  },
  {
    id: 2,
    slug: "cajero-sucursal",
    titulo: "Cajero/a de Sucursal",
    ubicacion: "Varias Sucursales",
    tipo: "Tiempo Completo",
    categoria: "Ventas",
    salario: "$10,000 - $12,000 MXN",
    descripcion:
      "Buscamos personas con actitud de servicio para atención al cliente y manejo de caja en nuestras sucursales.",
    icon: Wallet,
    color: "from-stone-600 to-stone-700",
    destacada: false,
  },
  {
    id: 3,
    slug: "ayudante-de-pasteleria",
    titulo: "Ayudante de Pastelería",
    ubicacion: "Sucursal Norte",
    tipo: "Medio Tiempo",
    categoria: "Producción",
    salario: "$8,000 - $10,000 MXN",
    descripcion:
      "Únete a nuestro equipo de pastelería y aprende el arte de crear dulces momentos.",
    icon: Croissant,
    color: "from-yellow-700 to-amber-700",
    destacada: false,
  },
  {
    id: 4,
    slug: "vendedor-mostrador",
    titulo: "Vendedor/a de Mostrador",
    ubicacion: "Sucursal Sur",
    tipo: "Tiempo Completo",
    categoria: "Ventas",
    salario: "$9,000 - $11,000 MXN",
    descripcion:
      "Buscamos personas apasionadas por el servicio al cliente para nuestro equipo de ventas.",
    icon: ShoppingBag,
    color: "from-amber-500 to-yellow-600",
    destacada: false,
  },
  {
    id: 5,
    slug: "supervisor-de-produccion",
    titulo: "Supervisor de Producción",
    ubicacion: "Planta Central",
    tipo: "Tiempo Completo",
    categoria: "Supervisión",
    salario: "$18,000 - $22,000 MXN",
    descripcion:
      "Buscamos líder con experiencia en gestión de equipos de producción en la industria alimentaria.",
    icon: Users,
    color: "from-amber-700 to-yellow-800",
    destacada: true,
  },
  {
    id: 6,
    slug: "repartidor",
    titulo: "Repartidor",
    ubicacion: "Zona Metropolitana",
    tipo: "Tiempo Completo",
    categoria: "Logística",
    salario: "$11,000 - $14,000 MXN",
    descripcion:
      "Únete a nuestro equipo de distribución y lleva la frescura de nuestros productos a cada rincón.",
    icon: TrendingUp,
    color: "from-stone-500 to-amber-600",
    destacada: false,
  },
];

const categorias = [
  "Todas",
  "Producción",
  "Ventas",
  "Supervisión",
  "Logística",
];
const tipos = ["Todos", "Tiempo Completo", "Medio Tiempo"];

export default function EmpleosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Filtrar vacantes
  const vacantesFiltradas = vacantes.filter((vacante) => {
    const coincideBusqueda =
      vacante.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      vacante.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      vacante.categoria === categoriaSeleccionada;
    const coincideTipo =
      tipoSeleccionado === "Todos" || vacante.tipo === tipoSeleccionado;

    return coincideBusqueda && coincideCategoria && coincideTipo;
  });

  const vacantesDestacadas = vacantesFiltradas.filter((v) => v.destacada);
  const vacantesNormales = vacantesFiltradas.filter((v) => !v.destacada);

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
              {vacantes.length} vacantes disponibles
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
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="lg:hidden flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>

          {/* Filters */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ${
              mostrarFiltros ? "block" : "hidden lg:grid"
            }`}
          >
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Categoría
              </label>
              <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Tipo de empleo
              </label>
              <select
                value={tipoSeleccionado}
                onChange={(e) => setTipoSeleccionado(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
              >
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-amber-100">
            <p className="text-sm text-amber-700">
              Mostrando{" "}
              <span className="font-semibold">{vacantesFiltradas.length}</span>{" "}
              {vacantesFiltradas.length === 1 ? "vacante" : "vacantes"}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Job Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Jobs */}
        {vacantesDestacadas.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-amber-950">
                Vacantes Destacadas
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {vacantesDestacadas.map((vacante, index) => {
                const Icon = vacante.icon;
                return (
                  <motion.div
                    key={vacante.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/empleos/${vacante.slug}`}>
                      <div className="group relative bg-white rounded-2xl overflow-hidden border-2 border-amber-200 hover:border-amber-400 transition-all shadow-md hover:shadow-xl">
                        {/* Badge destacado */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                            ⭐ Destacada
                          </span>
                        </div>

                        {/* Gradient header */}
                        <div
                          className={`h-2 bg-gradient-to-r ${vacante.color}`}
                        ></div>

                        <div className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div
                              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${vacante.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                            >
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-amber-950 mb-1 group-hover:text-amber-700 transition-colors">
                                {vacante.titulo}
                              </h4>
                              <div className="flex flex-wrap gap-2 text-sm text-amber-700">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {vacante.ubicacion}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {vacante.tipo}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-amber-800 mb-4 line-clamp-2">
                            {vacante.descripcion}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                            <div>
                              <p className="text-xs text-amber-600 font-medium">
                                Salario
                              </p>
                              <p className="text-sm font-bold text-amber-900">
                                {vacante.salario}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                              Ver detalles
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Jobs */}
        {vacantesNormales.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"></div>
              <h3 className="text-2xl font-bold text-amber-950">
                Todas las Vacantes
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vacantesNormales.map((vacante, index) => {
                const Icon = vacante.icon;
                return (
                  <motion.div
                    key={vacante.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/empleos/${vacante.slug}`}>
                      <div className="group bg-white rounded-xl overflow-hidden border border-amber-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-lg h-full">
                        <div
                          className={`h-1.5 bg-gradient-to-r ${vacante.color}`}
                        ></div>

                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`w-11 h-11 rounded-lg bg-gradient-to-br ${vacante.color} flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-lg font-bold text-amber-950 group-hover:text-amber-700 transition-colors line-clamp-1">
                              {vacante.titulo}
                            </h4>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-1 text-sm text-amber-700">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="line-clamp-1">
                                {vacante.ubicacion}
                              </span>
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
                              {vacante.salario}
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
                );
              })}
            </div>
          </div>
        )}

        {/* No results */}
        {vacantesFiltradas.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-amber-950 mb-2">
              No se encontraron vacantes
            </h3>
            <p className="text-amber-700 mb-6">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <button
              onClick={() => {
                setBusqueda("");
                setCategoriaSeleccionada("Todas");
                setTipoSeleccionado("Todos");
              }}
              className="px-6 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors"
            >
              Limpiar filtros
            </button>
          </motion.div>
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
