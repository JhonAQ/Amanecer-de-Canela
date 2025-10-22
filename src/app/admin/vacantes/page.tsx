'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Users,
  X,
  Check
} from "lucide-react";
import { vacantesAdmin, type Vacante } from "@/lib/data-admin";

export default function VacantesPage() {
  const [vacantes, setVacantes] = useState<Vacante[]>(vacantesAdmin);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("Todas");
  const [filterCategoria, setFilterCategoria] = useState<string>("Todas");
  const [showModal, setShowModal] = useState(false);
  const [selectedVacante, setSelectedVacante] = useState<Vacante | null>(null);

  // Filtrado
  const vacantesFiltradas = vacantes.filter(vacante => {
    const matchSearch = vacante.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       vacante.ubicacion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchEstado = filterEstado === "Todas" || vacante.estado === filterEstado;
    const matchCategoria = filterCategoria === "Todas" || vacante.categoria === filterCategoria;
    
    return matchSearch && matchEstado && matchCategoria;
  });

  const estadoColors: Record<string, string> = {
    "Activa": "bg-green-100 text-green-700 border-green-200",
    "Pausada": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Cerrada": "bg-red-100 text-red-700 border-red-200"
  };

  const handleNewVacante = () => {
    setSelectedVacante(null);
    setShowModal(true);
  };

  const handleEditVacante = (vacante: Vacante) => {
    setSelectedVacante(vacante);
    setShowModal(true);
  };

  const handleDeleteVacante = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta vacante?")) {
      setVacantes(vacantes.filter(v => v.id !== id));
    }
  };

  const handleToggleEstado = (id: number) => {
    setVacantes(vacantes.map(v => 
      v.id === id 
        ? { ...v, estado: v.estado === "Activa" ? "Pausada" : "Activa" as "Activa" | "Pausada" | "Cerrada" }
        : v
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-950">Vacantes</h1>
          <p className="text-amber-700 mt-1">
            Gestiona todas las posiciones abiertas
          </p>
        </div>
        <button
          onClick={handleNewVacante}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Nueva Vacante
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
            <input
              type="text"
              placeholder="Buscar vacantes..."
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
            <option>Activa</option>
            <option>Pausada</option>
            <option>Cerrada</option>
          </select>

          {/* Filter Categoría */}
          <select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
            className="px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option>Todas</option>
            <option>Producción</option>
            <option>Ventas</option>
            <option>Gerencial</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-green-200 p-4">
          <p className="text-sm text-green-600 font-medium mb-1">Activas</p>
          <p className="text-2xl font-bold text-green-700">
            {vacantes.filter(v => v.estado === "Activa").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-yellow-200 p-4">
          <p className="text-sm text-yellow-600 font-medium mb-1">Pausadas</p>
          <p className="text-2xl font-bold text-yellow-700">
            {vacantes.filter(v => v.estado === "Pausada").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-4">
          <p className="text-sm text-amber-600 font-medium mb-1">Total Postulaciones</p>
          <p className="text-2xl font-bold text-amber-700">
            {vacantes.reduce((sum, v) => sum + v.postulaciones, 0)}
          </p>
        </div>
      </div>

      {/* Vacantes Grid */}
      <div className="grid gap-6">
        {vacantesFiltradas.map((vacante, index) => (
          <motion.div
            key={vacante.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-amber-100 shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Left Section */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-amber-950 mb-1">
                        {vacante.titulo}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-amber-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {vacante.ubicacion}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {vacante.salario}
                        </span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                          {vacante.categoria}
                        </span>
                        <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-medium">
                          {vacante.tipo}
                        </span>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${estadoColors[vacante.estado]}`}>
                      {vacante.estado}
                    </span>
                  </div>

                  <p className="text-amber-700 text-sm mb-4 line-clamp-2">
                    {vacante.descripcion}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600">Postulaciones</p>
                        <p className="font-bold text-amber-950">{vacante.postulaciones}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600">Vistas</p>
                        <p className="font-bold text-amber-950">{vacante.vistas}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600">Puestos</p>
                        <p className="font-bold text-amber-950">{vacante.vacantesDisponibles}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600">Publicada</p>
                        <p className="font-bold text-amber-950">
                          {new Date(vacante.fechaPublicacion).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() => handleToggleEstado(vacante.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      vacante.estado === "Activa"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {vacante.estado === "Activa" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {vacante.estado === "Activa" ? "Pausar" : "Activar"}
                  </button>
                  <button
                    onClick={() => handleEditVacante(vacante)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-lg font-medium text-sm transition-all"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteVacante(vacante.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium text-sm transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {vacantesFiltradas.length === 0 && (
          <div className="bg-white rounded-2xl border border-amber-100 p-12 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-amber-950 mb-2">No se encontraron vacantes</h3>
            <p className="text-amber-700">
              Intenta ajustar los filtros o crear una nueva vacante
            </p>
          </div>
        )}
      </div>

      {/* Modal (placeholder for now) */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-amber-100 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-amber-950">
                  {selectedVacante ? "Editar Vacante" : "Nueva Vacante"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <X className="w-6 h-6 text-amber-600" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-amber-700 text-center py-8">
                  Formulario de vacante (implementar con estado y validación)
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
