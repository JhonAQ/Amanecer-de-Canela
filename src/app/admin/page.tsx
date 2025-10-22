'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight,
  Calendar,
  MapPin,
  DollarSign
} from "lucide-react";
import { vacantesAdmin, postulacionesAdmin, candidatosAdmin } from "@/lib/data-admin";

export default function AdminDashboard() {
  // Calcular métricas
  const totalVacantes = vacantesAdmin.length;
  const vacantesActivas = vacantesAdmin.filter(v => v.estado === "Activa").length;
  const totalPostulaciones = postulacionesAdmin.length;
  const postulacionesNuevas = postulacionesAdmin.filter(p => p.estado === "Nueva").length;
  const enRevision = postulacionesAdmin.filter(p => p.estado === "En revisión").length;
  const enEntrevista = postulacionesAdmin.filter(p => p.estado === "Entrevista").length;
  const totalCandidatos = candidatosAdmin.length;
  const totalVistas = vacantesAdmin.reduce((sum, v) => sum + v.vistas, 0);

  const stats = [
    {
      label: "Vacantes Activas",
      value: vacantesActivas,
      total: totalVacantes,
      icon: Briefcase,
      color: "amber",
      change: "+2 esta semana",
      href: "/admin/vacantes"
    },
    {
      label: "Postulaciones Nuevas",
      value: postulacionesNuevas,
      total: totalPostulaciones,
      icon: FileText,
      color: "blue",
      change: "+5 hoy",
      href: "/admin/postulaciones"
    },
    {
      label: "En Revisión",
      value: enRevision,
      total: totalPostulaciones,
      icon: Clock,
      color: "yellow",
      change: "Requiere atención",
      href: "/admin/postulaciones"
    },
    {
      label: "Candidatos Totales",
      value: totalCandidatos,
      total: totalCandidatos,
      icon: Users,
      color: "green",
      change: "+3 este mes",
      href: "/admin/candidatos"
    }
  ];

  const postulacionesRecientes = postulacionesAdmin.slice(0, 5);
  const vacantesDestacadas = vacantesAdmin.filter(v => v.estado === "Activa").slice(0, 4);

  const estadoColors: Record<string, string> = {
    "Nueva": "bg-blue-100 text-blue-700 border-blue-200",
    "En revisión": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Entrevista": "bg-purple-100 text-purple-700 border-purple-200",
    "Rechazada": "bg-red-100 text-red-700 border-red-200",
    "Contratado": "bg-green-100 text-green-700 border-green-200"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-amber-950 mb-2"
        >
          Dashboard de Reclutamiento
        </motion.h1>
        <p className="text-amber-700">
          Resumen de actividad y métricas clave
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            amber: "bg-amber-100 text-amber-600",
            blue: "bg-blue-100 text-blue-600",
            yellow: "bg-yellow-100 text-yellow-600",
            green: "bg-green-100 text-green-600"
          };

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={stat.href}>
                <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-md hover:shadow-xl transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-amber-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-amber-950">
                      {stat.value}
                      {stat.total > stat.value && (
                        <span className="text-lg text-amber-400 font-normal">/{stat.total}</span>
                      )}
                    </p>
                    <p className="text-xs text-amber-500">{stat.change}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Two Columns Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Postulaciones Recientes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden">
            <div className="p-6 border-b border-amber-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-amber-950">Postulaciones Recientes</h2>
                <Link
                  href="/admin/postulaciones"
                  className="text-sm font-medium text-amber-600 hover:text-amber-800 flex items-center gap-1"
                >
                  Ver todas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-amber-100">
              {postulacionesRecientes.map((postulacion, index) => (
                <motion.div
                  key={postulacion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link href={`/admin/postulaciones/${postulacion.id}`}>
                    <div className="p-5 hover:bg-amber-50/50 transition-colors cursor-pointer group">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">
                            {postulacion.candidatoNombre.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-semibold text-amber-950 group-hover:text-amber-700 transition-colors">
                                {postulacion.candidatoNombre}
                              </h3>
                              <p className="text-sm text-amber-600">{postulacion.vacanteTitulo}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${estadoColors[postulacion.estado]}`}>
                              {postulacion.estado}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-amber-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(postulacion.fechaPostulacion).toLocaleDateString('es-MX')}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {postulacion.candidatoCiudad}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {postulacion.experiencia}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar - Vacantes Destacadas y Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Vacantes Destacadas */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden">
            <div className="p-5 border-b border-amber-100">
              <h2 className="text-lg font-bold text-amber-950">Vacantes Activas</h2>
            </div>
            <div className="p-4 space-y-3">
              {vacantesDestacadas.map((vacante, index) => (
                <motion.div
                  key={vacante.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link href={`/admin/vacantes`}>
                    <div className="p-4 rounded-xl border border-amber-100 hover:border-amber-300 hover:bg-amber-50/30 transition-all cursor-pointer">
                      <h3 className="font-semibold text-amber-950 mb-2 text-sm">{vacante.titulo}</h3>
                      <div className="flex items-center justify-between text-xs text-amber-600 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {vacante.ubicacion}
                        </span>
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                          {vacante.vacantesDisponibles} {vacante.vacantesDisponibles === 1 ? 'puesto' : 'puestos'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-amber-500">
                          <FileText className="w-3 h-3" />
                          {vacante.postulaciones} postulaciones
                        </span>
                        <span className="flex items-center gap-1 text-amber-500">
                          <Eye className="w-3 h-3" />
                          {vacante.vistas} vistas
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-4">Rendimiento</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-amber-100 text-sm">Total vistas</span>
                <span className="text-2xl font-bold">{totalVistas}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-100 text-sm">En entrevista</span>
                <span className="text-2xl font-bold">{enEntrevista}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-100 text-sm">Tasa conversión</span>
                <span className="text-2xl font-bold">
                  {totalPostulaciones > 0 ? Math.round((enEntrevista / totalPostulaciones) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-amber-100 shadow-md p-6"
      >
        <h2 className="text-xl font-bold text-amber-950 mb-4">Acciones Rápidas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/vacantes"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-all group"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
              <Briefcase className="w-5 h-5 text-amber-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold text-amber-950 text-sm">Nueva Vacante</p>
              <p className="text-xs text-amber-600">Publicar posición</p>
            </div>
          </Link>

          <Link
            href="/admin/postulaciones"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <FileText className="w-5 h-5 text-blue-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold text-amber-950 text-sm">Ver Postulaciones</p>
              <p className="text-xs text-amber-600">{postulacionesNuevas} nuevas</p>
            </div>
          </Link>

          <Link
            href="/admin/candidatos"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <Users className="w-5 h-5 text-green-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold text-amber-950 text-sm">Candidatos</p>
              <p className="text-xs text-amber-600">Directorio completo</p>
            </div>
          </Link>

          <Link
            href="/admin/ajustes"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all group"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
              <TrendingUp className="w-5 h-5 text-purple-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold text-amber-950 text-sm">Configuración</p>
              <p className="text-xs text-amber-600">Ajustes del sistema</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
