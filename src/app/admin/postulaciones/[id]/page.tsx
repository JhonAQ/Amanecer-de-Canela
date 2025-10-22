"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  FileText,
  Download,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Tag,
  User,
  Building,
} from "lucide-react";
import { postulacionesAdmin, type Postulacion } from "@/lib/data-admin";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetallePostulacionPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [postulacion, setPostulacion] = useState<Postulacion | undefined>(
    postulacionesAdmin.find((p) => p.id === id)
  );
  const [notas, setNotas] = useState<string[]>(postulacion?.notas || []);
  const [nuevaNota, setNuevaNota] = useState("");
  const [etiquetas, setEtiquetas] = useState<string[]>(
    postulacion?.etiquetas || []
  );

  if (!postulacion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-950 mb-2">
            Postulación no encontrada
          </h2>
          <Link
            href="/admin/postulaciones"
            className="text-amber-600 hover:text-amber-800"
          >
            Volver a postulaciones
          </Link>
        </div>
      </div>
    );
  }

  const estadoColors: Record<string, string> = {
    Nueva: "bg-blue-100 text-blue-700 border-blue-300",
    "En revisión": "bg-yellow-100 text-yellow-700 border-yellow-300",
    Entrevista: "bg-purple-100 text-purple-700 border-purple-300",
    Rechazada: "bg-red-100 text-red-700 border-red-300",
    Contratado: "bg-green-100 text-green-700 border-green-300",
  };

  const handleCambiarEstado = (nuevoEstado: Postulacion["estado"]) => {
    setPostulacion({ ...postulacion, estado: nuevoEstado });
    // Aquí se haría la llamada a la API
  };

  const handleAgregarNota = () => {
    if (nuevaNota.trim()) {
      const notasActualizadas = [...notas, nuevaNota];
      setNotas(notasActualizadas);
      setPostulacion({ ...postulacion, notas: notasActualizadas });
      setNuevaNota("");
    }
  };

  const handleEliminarNota = (index: number) => {
    const notasActualizadas = notas.filter((_, i) => i !== index);
    setNotas(notasActualizadas);
    setPostulacion({ ...postulacion, notas: notasActualizadas });
  };

  const handleAgregarEtiqueta = (etiqueta: string) => {
    if (!etiquetas.includes(etiqueta)) {
      const etiquetasActualizadas = [...etiquetas, etiqueta];
      setEtiquetas(etiquetasActualizadas);
      setPostulacion({ ...postulacion, etiquetas: etiquetasActualizadas });
    }
  };

  const handleEliminarEtiqueta = (etiqueta: string) => {
    const etiquetasActualizadas = etiquetas.filter((e) => e !== etiqueta);
    setEtiquetas(etiquetasActualizadas);
    setPostulacion({ ...postulacion, etiquetas: etiquetasActualizadas });
  };

  const etiquetasSugeridas = [
    "Destacado",
    "Urgente",
    "Experiencia",
    "Junior",
    "Senior",
    "Entrevista agendada",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/postulaciones"
            className="p-2 rounded-lg hover:bg-amber-50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-amber-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-amber-950">
              Detalle de Postulación
            </h1>
            <p className="text-amber-700 mt-1">ID: {postulacion.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-medium transition-colors">
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información del Candidato */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden">
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">
                    {postulacion.candidatoNombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    {postulacion.candidatoNombre}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-amber-100">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">
                        {postulacion.candidatoEmail}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">
                        {postulacion.candidatoTelefono}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        {postulacion.candidatoCiudad}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-600 mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm font-medium">Vacante</span>
                  </div>
                  <p className="font-semibold text-amber-950">
                    {postulacion.vacanteTitulo}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Experiencia</span>
                  </div>
                  <p className="font-semibold text-amber-950">
                    {postulacion.experiencia}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Fecha de postulación
                    </span>
                  </div>
                  <p className="font-semibold text-amber-950">
                    {new Date(postulacion.fechaPostulacion).toLocaleDateString(
                      "es-MX",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-600 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Curriculum</span>
                  </div>
                  <button className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold transition-colors">
                    <Download className="w-4 h-4" />
                    Descargar CV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden">
            <div className="p-6 border-b border-amber-100">
              <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                Notas y Observaciones
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Agregar nota */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nuevaNota}
                  onChange={(e) => setNuevaNota(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAgregarNota()}
                  placeholder="Escribe una nota sobre el candidato..."
                  className="flex-1 px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  onClick={handleAgregarNota}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Agregar
                </button>
              </div>

              {/* Lista de notas */}
              <div className="space-y-3">
                {notas.length === 0 ? (
                  <p className="text-center text-amber-600 py-8">
                    No hay notas aún. Agrega la primera nota sobre este
                    candidato.
                  </p>
                ) : (
                  notas.map((nota, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <p className="text-amber-900">{nota}</p>
                        <p className="text-xs text-amber-600 mt-2">
                          {new Date().toLocaleDateString("es-MX")} - Admin
                        </p>
                      </div>
                      <button
                        onClick={() => handleEliminarNota(index)}
                        className="p-1 hover:bg-amber-200 rounded-lg transition-colors"
                      >
                        <XCircle className="w-4 h-4 text-amber-600" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Etiquetas */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden">
            <div className="p-6 border-b border-amber-100">
              <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-600" />
                Etiquetas
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Etiquetas aplicadas */}
              <div className="flex flex-wrap gap-2">
                {etiquetas.length === 0 ? (
                  <p className="text-amber-600 text-sm">
                    No hay etiquetas aplicadas
                  </p>
                ) : (
                  etiquetas.map((etiqueta, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white rounded-full text-sm font-medium"
                    >
                      {etiqueta}
                      <button
                        onClick={() => handleEliminarEtiqueta(etiqueta)}
                        className="hover:bg-amber-700 rounded-full p-0.5 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </motion.span>
                  ))
                )}
              </div>

              {/* Etiquetas sugeridas */}
              <div>
                <p className="text-sm font-medium text-amber-700 mb-2">
                  Etiquetas sugeridas:
                </p>
                <div className="flex flex-wrap gap-2">
                  {etiquetasSugeridas
                    .filter((e) => !etiquetas.includes(e))
                    .map((etiqueta) => (
                      <button
                        key={etiqueta}
                        onClick={() => handleAgregarEtiqueta(etiqueta)}
                        className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full text-sm font-medium transition-colors"
                      >
                        + {etiqueta}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Estado Actual */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden sticky top-6">
            <div className="p-6 border-b border-amber-100">
              <h3 className="text-lg font-bold text-amber-950">
                Estado de Postulación
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center">
                <span
                  className={`inline-block px-6 py-3 rounded-xl text-base font-bold border-2 ${
                    estadoColors[postulacion.estado]
                  }`}
                >
                  {postulacion.estado}
                </span>
              </div>

              {/* Cambiar Estado */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-amber-700 mb-3">
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
                ).map(
                  (estado) =>
                    estado !== postulacion.estado && (
                      <button
                        key={estado}
                        onClick={() => handleCambiarEstado(estado)}
                        className={`w-full px-4 py-3 rounded-xl font-medium transition-all border-2 ${estadoColors[estado]} hover:scale-105`}
                      >
                        {estado}
                      </button>
                    )
                )}
              </div>

              {/* Timeline Visual */}
              <div className="pt-6 mt-6 border-t border-amber-100">
                <p className="text-sm font-medium text-amber-700 mb-4">
                  Progreso:
                </p>
                <div className="space-y-3">
                  {[
                    { estado: "Nueva", icon: FileText },
                    { estado: "En revisión", icon: Clock },
                    { estado: "Entrevista", icon: User },
                    { estado: "Contratado", icon: CheckCircle2 },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    const isCompleted =
                      item.estado === "Nueva" ||
                      (item.estado === "En revisión" &&
                        ["En revisión", "Entrevista", "Contratado"].includes(
                          postulacion.estado
                        )) ||
                      (item.estado === "Entrevista" &&
                        ["Entrevista", "Contratado"].includes(
                          postulacion.estado
                        )) ||
                      (item.estado === "Contratado" &&
                        postulacion.estado === "Contratado");

                    const isCurrent = item.estado === postulacion.estado;

                    return (
                      <div
                        key={item.estado}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isCurrent
                              ? "bg-amber-500 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isCompleted || isCurrent
                              ? "text-amber-950"
                              : "text-amber-400"
                          }`}
                        >
                          {item.estado}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden">
            <div className="p-6 border-b border-amber-100">
              <h3 className="text-lg font-bold text-amber-950">Acciones</h3>
            </div>
            <div className="p-4 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 rounded-xl transition-colors text-left">
                <Mail className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-900">Enviar email</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 rounded-xl transition-colors text-left">
                <Phone className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-900">Llamar</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 rounded-xl transition-colors text-left">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-900">
                  Agendar entrevista
                </span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 rounded-xl transition-colors text-left">
                <Download className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-900">Descargar CV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
