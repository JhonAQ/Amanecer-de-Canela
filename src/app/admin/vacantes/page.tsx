"use client";

import { useState, useEffect } from "react";
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
  Check,
  Loader2,
} from "lucide-react";
import { 
  obtenerVacantes, 
  crearVacante, 
  actualizarVacante, 
  eliminarVacante,
  type Vacante 
} from "@/lib/supabase";

export default function VacantesPage() {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("Todas");
  const [filterCategoria, setFilterCategoria] = useState<string>("Todas");
  const [showModal, setShowModal] = useState(false);
  const [selectedVacante, setSelectedVacante] = useState<Vacante | null>(null);
  const [saving, setSaving] = useState(false);

  // Cargar vacantes de Supabase al montar
  useEffect(() => {
    cargarVacantes();
  }, []);

  async function cargarVacantes() {
    try {
      setLoading(true);
      const data = await obtenerVacantes();
      setVacantes(data);
    } catch (error) {
      console.error("Error al cargar vacantes:", error);
      alert("Error al cargar vacantes. Verifica la conexión con Supabase.");
    } finally {
      setLoading(false);
    }
  }

  // Filtrado
  const vacantesFiltradas = vacantes.filter((vacante) => {
    const matchSearch =
      vacante.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacante.ubicacion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchEstado =
      filterEstado === "Todas" || vacante.estado === filterEstado;
    const matchCategoria =
      filterCategoria === "Todas" || vacante.categoria === filterCategoria;

    return matchSearch && matchEstado && matchCategoria;
  });

  const estadoColors: Record<string, string> = {
    Activa: "bg-green-100 text-green-700 border-green-200",
    Pausada: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Cerrada: "bg-red-100 text-red-700 border-red-200",
  };

  const handleNewVacante = () => {
    setSelectedVacante(null);
    setShowModal(true);
  };

  const handleEditVacante = (vacante: Vacante) => {
    setSelectedVacante(vacante);
    setShowModal(true);
  };

  const handleDeleteVacante = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta vacante?")) {
      try {
        await eliminarVacante(id);
        await cargarVacantes(); // Recargar lista
        alert("Vacante eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar la vacante");
      }
    }
  };

  const handleToggleEstado = async (id: string, estadoActual: string) => {
    try {
      const nuevoEstado = estadoActual === "Activa" ? "Pausada" : "Activa";
      await actualizarVacante(id, { estado: nuevoEstado as any });
      await cargarVacantes(); // Recargar lista
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Error al cambiar el estado");
    }
  };

  const handleSaveVacante = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Generar slug desde el título
      const titulo = formData.get("titulo") as string;
      const slug = titulo
        .toLowerCase()
        .replace(/[áàäâ]/g, 'a')
        .replace(/[éèëê]/g, 'e')
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöô]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Procesar arrays (responsabilidades, requisitos, ofrecemos)
      const responsabilidadesText = formData.get("responsabilidades") as string;
      const requisitosText = formData.get("requisitos") as string;
      const ofrecemosText = formData.get("ofrecemos") as string;

      const responsabilidades = responsabilidadesText
        .split("\n")
        .map(r => r.trim())
        .filter(r => r.length > 0);
      
      const requisitos = requisitosText
        .split("\n")
        .map(r => r.trim())
        .filter(r => r.length > 0);
      
      const ofrecemos = ofrecemosText
        .split("\n")
        .map(r => r.trim())
        .filter(r => r.length > 0);

      const vacanteData = {
        slug,
        titulo,
        ubicacion: formData.get("ubicacion") as string,
        tipo: formData.get("tipo") as any,
        categoria: formData.get("categoria") as string,
        salario_min: parseInt(formData.get("salario_min") as string),
        salario_max: parseInt(formData.get("salario_max") as string),
        descripcion: formData.get("descripcion") as string,
        responsabilidades,
        requisitos,
        ofrecemos,
        estado: formData.get("estado") as any,
        vacantes_disponibles: parseInt(formData.get("vacantes_disponibles") as string),
        fecha_publicacion: new Date().toISOString(),
        vistas: 0,
      };

      if (selectedVacante) {
        // Actualizar vacante existente
        await actualizarVacante(selectedVacante.id, vacanteData);
        alert("Vacante actualizada correctamente");
      } else {
        // Crear nueva vacante
        await crearVacante(vacanteData as any);
        alert("Vacante creada correctamente");
      }

      setShowModal(false);
      await cargarVacantes(); // Recargar lista
    } catch (error) {
      console.error("Error al guardar vacante:", error);
      alert("Error al guardar la vacante. Verifica los datos e intenta de nuevo.");
    } finally {
      setSaving(false);
    }
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
            {vacantes.filter((v) => v.estado === "Activa").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-yellow-200 p-4">
          <p className="text-sm text-yellow-600 font-medium mb-1">Pausadas</p>
          <p className="text-2xl font-bold text-yellow-700">
            {vacantes.filter((v) => v.estado === "Pausada").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-4">
          <p className="text-sm text-amber-600 font-medium mb-1">
            Total Vistas
          </p>
          <p className="text-2xl font-bold text-amber-700">
            {vacantes.reduce((sum, v) => sum + (v.vistas || 0), 0)}
          </p>
        </div>
      </div>

      {/* Vacantes Grid */}
      <div className="grid gap-6">
        {loading ? (
          // Loading state
          <div className="bg-white rounded-2xl border border-amber-100 p-12 text-center">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
            <p className="text-amber-700">Cargando vacantes...</p>
          </div>
        ) : vacantesFiltradas.length === 0 ? (
          // Empty state
          <div className="bg-white rounded-2xl border border-amber-100 p-12 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-amber-950 mb-2">
              No se encontraron vacantes
            </h3>
            <p className="text-amber-700">
              {vacantes.length === 0
                ? "Crea tu primera vacante para comenzar"
                : "Intenta ajustar los filtros"}
            </p>
          </div>
        ) : (
          // Vacantes list
          vacantesFiltradas.map((vacante, index) => (
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
                          ${vacante.salario_min.toLocaleString()} - ${vacante.salario_max.toLocaleString()}
                        </span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                          {vacante.categoria}
                        </span>
                        <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-medium">
                          {vacante.tipo}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                        estadoColors[vacante.estado]
                      }`}
                    >
                      {vacante.estado}
                    </span>
                  </div>

                  <p className="text-amber-700 text-sm mb-4 line-clamp-2">
                    {vacante.descripcion}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600">Vistas</p>
                        <p className="font-bold text-amber-950">
                          {vacante.vistas || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600">Puestos</p>
                        <p className="font-bold text-amber-950">
                          {vacante.vacantes_disponibles}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600">Publicada</p>
                        <p className="font-bold text-amber-950">
                          {new Date(
                            vacante.fecha_publicacion
                          ).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() => handleToggleEstado(vacante.id, vacante.estado)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      vacante.estado === "Activa"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {vacante.estado === "Activa" ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
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
          ))
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
                <form className="space-y-6" onSubmit={handleSaveVacante}>
                  {/* Título y Ubicación */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Título de la Vacante *
                      </label>
                      <input
                        type="text"
                        name="titulo"
                        defaultValue={selectedVacante?.titulo}
                        placeholder="Ej: Maestro Panadero"
                        required
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Ubicación *
                      </label>
                      <input
                        type="text"
                        name="ubicacion"
                        defaultValue={selectedVacante?.ubicacion}
                        placeholder="Ej: Sucursal Centro"
                        required
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Tipo, Categoría y Puestos */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Tipo de Contrato *
                      </label>
                      <select
                        name="tipo"
                        defaultValue={selectedVacante?.tipo}
                        required
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="Tiempo Completo">Tiempo Completo</option>
                        <option value="Medio Tiempo">Medio Tiempo</option>
                        <option value="Por Proyecto">Por Proyecto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Categoría *
                      </label>
                      <select
                        name="categoria"
                        defaultValue={selectedVacante?.categoria}
                        required
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="Producción">Producción</option>
                        <option value="Ventas">Ventas</option>
                        <option value="Gerencial">Gerencial</option>
                        <option value="Administrativo">Administrativo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Puestos Disponibles *
                      </label>
                      <input
                        type="number"
                        name="vacantes_disponibles"
                        defaultValue={selectedVacante?.vacantes_disponibles || 1}
                        min="1"
                        required
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Salario */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Salario Mínimo (MXN) *
                      </label>
                      <input
                        type="number"
                        name="salario_min"
                        defaultValue={selectedVacante?.salario_min}
                        placeholder="15000"
                        required
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Salario Máximo (MXN) *
                      </label>
                      <input
                        type="number"
                        name="salario_max"
                        defaultValue={selectedVacante?.salario_max}
                        placeholder="20000"
                        required
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Descripción de la Vacante *
                    </label>
                    <textarea
                      name="descripcion"
                      defaultValue={selectedVacante?.descripcion}
                      rows={4}
                      required
                      placeholder="Describe la vacante, el perfil ideal y qué buscas..."
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Responsabilidades */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Responsabilidades (una por línea)
                    </label>
                    <textarea
                      name="responsabilidades"
                      defaultValue={selectedVacante?.responsabilidades.join(
                        "\n"
                      )}
                      rows={5}
                      placeholder="Elaborar pan artesanal&#10;Supervisar y controlar la calidad&#10;Mantener la limpieza del área"
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Requisitos */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Requisitos (una por línea)
                    </label>
                    <textarea
                      name="requisitos"
                      defaultValue={selectedVacante?.requisitos.join("\n")}
                      rows={5}
                      placeholder="Mínimo 3 años de experiencia&#10;Conocimiento de técnicas de panificación&#10;Disponibilidad de horario"
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Ofrecemos */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      ¿Qué Ofrecemos? (una por línea)
                    </label>
                    <textarea
                      name="ofrecemos"
                      defaultValue={selectedVacante?.ofrecemos.join("\n")}
                      rows={4}
                      placeholder="Salario competitivo&#10;Prestaciones de ley&#10;Capacitación continua"
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Estado de la Vacante
                    </label>
                    <select
                      name="estado"
                      defaultValue={selectedVacante?.estado || "Activa"}
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="Activa">Activa</option>
                      <option value="Pausada">Pausada</option>
                      <option value="Cerrada">Cerrada</option>
                    </select>
                  </div>

                  {/* Botones */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-amber-100">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      disabled={saving}
                      className="px-6 py-3 border border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl font-semibold transition-colors disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          {selectedVacante ? "Actualizar Vacante" : "Crear Vacante"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
