"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Eye,
  Star,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
import { candidatosAdmin, type Candidato } from "@/lib/data-admin";

export default function CandidatosPage() {
  const [candidatos] = useState<Candidato[]>(candidatosAdmin);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("Todos");
  const [filterExperiencia, setFilterExperiencia] = useState<string>("Todas");
  const [filterCiudad, setFilterCiudad] = useState<string>("Todas");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filtrado
  const candidatosFiltrados = candidatos.filter((candidato) => {
    const matchSearch =
      candidato.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidato.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidato.habilidades.some((h) =>
        h.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchEstado =
      filterEstado === "Todos" || candidato.estado === filterEstado;
    const matchExperiencia =
      filterExperiencia === "Todas" ||
      candidato.experiencia === filterExperiencia;
    const matchCiudad =
      filterCiudad === "Todas" || candidato.ciudad === filterCiudad;

    return matchSearch && matchEstado && matchExperiencia && matchCiudad;
  });

  const estadoColors: Record<string, string> = {
    Activo: "bg-green-100 text-green-700 border-green-200",
    Contratado: "bg-blue-100 text-blue-700 border-blue-200",
    Descartado: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const ciudadesUnicas = Array.from(new Set(candidatos.map((c) => c.ciudad)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-950">
            Directorio de Candidatos
          </h1>
          <p className="text-amber-700 mt-1">
            Base de datos de todos los candidatos que han aplicado
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
          <Download className="w-5 h-5" />
          Exportar Base de Datos
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-amber-600 font-medium">
                Total Candidatos
              </p>
              <p className="text-2xl font-bold text-amber-950">
                {candidatos.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Activos</p>
              <p className="text-2xl font-bold text-green-700">
                {candidatos.filter((c) => c.estado === "Activo").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Contratados</p>
              <p className="text-2xl font-bold text-blue-700">
                {candidatos.filter((c) => c.estado === "Contratado").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-purple-100 p-4 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">
                Postulaciones
              </p>
              <p className="text-2xl font-bold text-purple-700">
                {candidatos.reduce((sum, c) => sum + c.postulaciones, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o habilidades..."
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
            <option>Todos</option>
            <option>Activo</option>
            <option>Contratado</option>
            <option>Descartado</option>
          </select>

          {/* Filter Experiencia */}
          <select
            value={filterExperiencia}
            onChange={(e) => setFilterExperiencia(e.target.value)}
            className="px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option>Todas</option>
            <option>Menos de 1 año</option>
            <option>1-3 años</option>
            <option>3-5 años</option>
            <option>5-10 años</option>
            <option>Más de 10 años</option>
          </select>

          {/* Filter Ciudad */}
          <select
            value={filterCiudad}
            onChange={(e) => setFilterCiudad(e.target.value)}
            className="px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option>Todas</option>
            {ciudadesUnicas.map((ciudad) => (
              <option key={ciudad}>{ciudad}</option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-100">
          <p className="text-sm text-amber-700">
            Mostrando{" "}
            <span className="font-semibold">{candidatosFiltrados.length}</span>{" "}
            de <span className="font-semibold">{candidatos.length}</span>{" "}
            candidatos
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-200"
              }`}
            >
              Tarjetas
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-200"
              }`}
            >
              Lista
            </button>
          </div>
        </div>
      </div>

      {/* Candidatos Grid */}
      {viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidatosFiltrados.map((candidato, index) => (
            <motion.div
              key={candidato.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-amber-100 shadow-md hover:shadow-xl transition-all overflow-hidden group"
            >
              {/* Header con gradiente */}
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {candidato.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      estadoColors[candidato.estado]
                    }`}
                  >
                    {candidato.estado}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {candidato.nombre}
                </h3>
                <p className="text-amber-100 text-sm">
                  {candidato.experiencia} de experiencia
                </p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Mail className="w-4 h-4 text-amber-500" />
                    <span className="truncate">{candidato.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-700">
                    <Phone className="w-4 h-4 text-amber-500" />
                    <span>{candidato.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-700">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>{candidato.ciudad}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-amber-100">
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-amber-600 font-medium mb-1">
                      Postulaciones
                    </p>
                    <p className="text-xl font-bold text-amber-950">
                      {candidato.postulaciones}
                    </p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-amber-600 font-medium mb-1">
                      Última
                    </p>
                    <p className="text-sm font-semibold text-amber-950">
                      {new Date(candidato.ultimaPostulacion).toLocaleDateString(
                        "es-MX",
                        { day: "numeric", month: "short" }
                      )}
                    </p>
                  </div>
                </div>

                {/* Habilidades */}
                <div>
                  <p className="text-xs font-medium text-amber-700 mb-2">
                    Habilidades:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {candidato.habilidades.slice(0, 3).map((habilidad, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium"
                      >
                        {habilidad}
                      </span>
                    ))}
                    {candidato.habilidades.length > 3 && (
                      <span className="px-2 py-1 bg-amber-200 text-amber-800 rounded-lg text-xs font-medium">
                        +{candidato.habilidades.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <button className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    Ver Perfil
                  </button>
                  <button className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg font-medium text-sm transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Lista View */
        <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-amber-50 border-b border-amber-100">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                    Candidato
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                    Experiencia
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                    Ciudad
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-amber-900">
                    Postulaciones
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
                {candidatosFiltrados.map((candidato, index) => (
                  <motion.tr
                    key={candidato.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-amber-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">
                            {candidato.nombre
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-amber-950">
                            {candidato.nombre}
                          </p>
                          <p className="text-xs text-amber-600">
                            {candidato.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-amber-700">
                      {candidato.experiencia}
                    </td>
                    <td className="px-6 py-4 text-sm text-amber-700">
                      {candidato.ciudad}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {candidato.postulaciones}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          estadoColors[candidato.estado]
                        }`}
                      >
                        {candidato.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {candidatosFiltrados.length === 0 && (
        <div className="bg-white rounded-2xl border border-amber-100 p-12 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-amber-950 mb-2">
            No se encontraron candidatos
          </h3>
          <p className="text-amber-700">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
