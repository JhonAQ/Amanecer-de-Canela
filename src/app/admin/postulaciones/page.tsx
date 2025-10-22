"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  FileText,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock as ClockIcon,
  Loader2,
} from "lucide-react";
import { obtenerPostulaciones, actualizarPostulacion } from "@/lib/supabase";
import type { PostulacionCompleta } from "@/lib/supabase";

export default function PostulacionesPage() {
  const [postulaciones, setPostulaciones] = useState<PostulacionCompleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("Todas");
  const [filterVacante, setFilterVacante] = useState<string>("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    cargarPostulaciones();
  }, []);

  const cargarPostulaciones = async () => {
    try {
      setLoading(true);
      const data = await obtenerPostulaciones();
      setPostulaciones(data);
    } catch (error) {
      console.error("Error al cargar postulaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para cambiar estado
  const handleCambiarEstado = async (
    id: string,
    nuevoEstado: PostulacionCompleta["estado"]
  ) => {
    try {
      await actualizarPostulacion(id, { estado: nuevoEstado });
      await cargarPostulaciones(); // Recargar lista
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Error al cambiar el estado");
    }
  };

  // Filtrado
  const postulacionesFiltradas = postulaciones.filter((post) => {
    const candidatoNombre = (post.candidato_nombre || "").toLowerCase();
    const candidatoEmail = (post.candidato_email || "").toLowerCase();
    const vacanteTitulo = (post.vacante_titulo || "").toLowerCase();

    const matchSearch =
      candidatoNombre.includes(searchQuery.toLowerCase()) ||
      candidatoEmail.includes(searchQuery.toLowerCase()) ||
      vacanteTitulo.includes(searchQuery.toLowerCase());
    const matchEstado =
      filterEstado === "Todas" || post.estado === filterEstado;
    const matchVacante =
      filterVacante === "Todas" || post.vacante_titulo === filterVacante;

    return matchSearch && matchEstado && matchVacante;
  });

  // Paginación
  const totalPages = Math.ceil(postulacionesFiltradas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPostulaciones = postulacionesFiltradas.slice(
    startIndex,
    endIndex
  );

  const estadoColors: Record<string, string> = {
    Nueva: "bg-blue-100 text-blue-700 border-blue-200",
    "En revisión": "bg-yellow-100 text-yellow-700 border-yellow-200",
    Entrevista: "bg-purple-100 text-purple-700 border-purple-200",
    Rechazada: "bg-red-100 text-red-700 border-red-200",
    Contratado: "bg-green-100 text-green-700 border-green-200",
  };

  const vacantesUnicas = Array.from(
    new Set(postulaciones.map((p) => p.vacante_titulo).filter(Boolean))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-amber-700">Cargando postulaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-amber-950">Postulaciones</h1>
        <p className="text-amber-700 mt-1">
          Gestiona y revisa todas las postulaciones recibidas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {["Nueva", "En revisión", "Entrevista", "Rechazada", "Contratado"].map(
          (estado) => {
            const count = postulaciones.filter(
              (p) => p.estado === estado
            ).length;
            return (
              <div
                key={estado}
                className={`p-4 rounded-xl border ${estadoColors[estado]} cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => setFilterEstado(estado)}
              >
                <p className="text-2xl font-bold mb-1">{count}</p>
                <p className="text-sm font-medium">{estado}</p>
              </div>
            );
          }
        )}
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o vacante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Filter Estado */}
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option>Todas</option>
            <option>Nueva</option>
            <option>En revisión</option>
            <option>Entrevista</option>
            <option>Rechazada</option>
            <option>Contratado</option>
          </select>

          {/* Filter Vacante */}
          <select
            value={filterVacante}
            onChange={(e) => setFilterVacante(e.target.value)}
            className="px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option>Todas</option>
            {vacantesUnicas.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Secondary Filters */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-amber-100">
          <button
            onClick={() => {
              setSearchQuery("");
              setFilterEstado("Todas");
              setFilterVacante("Todas");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-sm font-medium transition-colors"
          >
            <Filter className="w-4 h-4" />
            Limpiar filtros
          </button>

          <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-amber-50 border-b border-amber-100">
                <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                  <div className="flex items-center gap-2">
                    Candidato
                    <ArrowUpDown className="w-4 h-4 text-amber-400" />
                  </div>
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                  Vacante
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                  Ubicación
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                  <div className="flex items-center gap-2">
                    Fecha
                    <ArrowUpDown className="w-4 h-4 text-amber-400" />
                  </div>
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                  Estado
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {currentPostulaciones.map((post, index) => {
                const candidatoNombre = post.candidato_nombre || "Sin nombre";
                const candidatoInicial =
                  post.candidato_nombre?.substring(0, 2).toUpperCase() || "??";

                return (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-amber-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">
                            {candidatoInicial}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-amber-950 truncate">
                            {candidatoNombre}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-amber-600">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">
                              {post.candidato_email || "Sin email"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-amber-900 font-medium">
                          {post.vacante_titulo || "Sin vacante"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-amber-700">
                        <MapPin className="w-3 h-3" />
                        {post.candidato_ciudad ||
                          post.vacante_ubicacion ||
                          "Sin ubicación"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-amber-700">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.fecha_postulacion).toLocaleDateString(
                          "es-MX"
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                          estadoColors[post.estado]
                        }`}
                      >
                        {post.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {post.cv_url && (
                          <a
                            href={post.cv_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-sm font-medium transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Ver CV
                          </a>
                        )}

                        {/* Dropdown Menu para cambiar estado */}
                        <div className="relative group">
                          <button className="p-1.5 hover:bg-amber-50 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-amber-600" />
                          </button>

                          {/* Dropdown Menu */}
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-amber-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <div className="py-2">
                              <p className="px-3 py-1 text-xs font-medium text-amber-600">
                                Cambiar a:
                              </p>
                              {(
                                [
                                  "Nueva",
                                  "En revisión",
                                  "Entrevista",
                                  "Rechazada",
                                  "Contratado",
                                ] as const
                              )
                                .filter((estado) => estado !== post.estado)
                                .map((estado) => (
                                  <button
                                    key={estado}
                                    onClick={() =>
                                      handleCambiarEstado(post.id, estado)
                                    }
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-amber-50 transition-colors flex items-center gap-2"
                                  >
                                    {estado === "En revisión" && (
                                      <ClockIcon className="w-4 h-4 text-yellow-600" />
                                    )}
                                    {estado === "Entrevista" && (
                                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                                    )}
                                    {estado === "Rechazada" && (
                                      <XCircle className="w-4 h-4 text-red-600" />
                                    )}
                                    {estado === "Contratado" && (
                                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    )}
                                    {estado === "Nueva" && (
                                      <FileText className="w-4 h-4 text-blue-600" />
                                    )}
                                    <span className="text-amber-900">
                                      {estado}
                                    </span>
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-amber-100 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-amber-700">
              Mostrando {startIndex + 1} a{" "}
              {Math.min(endIndex, postulacionesFiltradas.length)} de{" "}
              {postulacionesFiltradas.length} resultados
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-amber-200 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-amber-600" />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-amber-900">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-amber-200 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-amber-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {postulacionesFiltradas.length === 0 && (
        <div className="bg-white rounded-2xl border border-amber-100 p-12 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-amber-950 mb-2">
            No se encontraron postulaciones
          </h3>
          <p className="text-amber-700">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
