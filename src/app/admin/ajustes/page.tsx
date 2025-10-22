"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  Users,
  FileText,
  Database,
  Bell,
  Shield,
  Mail,
  Globe,
  Save,
  Upload,
  CheckCircle2,
} from "lucide-react";

export default function AjustesPage() {
  const [activeTab, setActiveTab] = useState<
    "empresa" | "equipo" | "notificaciones" | "sistema"
  >("empresa");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "empresa" as const, label: "Empresa", icon: Building },
    { id: "equipo" as const, label: "Equipo", icon: Users },
    { id: "notificaciones" as const, label: "Notificaciones", icon: Bell },
    { id: "sistema" as const, label: "Sistema", icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-amber-950">Configuración</h1>
        <p className="text-amber-700 mt-1">
          Gestiona la configuración del sistema de reclutamiento
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden">
        <div className="border-b border-amber-100 px-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all relative whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-amber-700"
                      : "text-amber-500 hover:text-amber-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-8">
          {/* Empresa Tab */}
          {activeTab === "empresa" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-amber-950 mb-6">
                  Información de la Empresa
                </h2>

                <div className="space-y-6">
                  {/* Logo */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Logo de la Empresa
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-amber-100 rounded-2xl flex items-center justify-center">
                        <Building className="w-12 h-12 text-amber-600" />
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg font-medium transition-colors">
                        <Upload className="w-4 h-4" />
                        Subir Logo
                      </button>
                    </div>
                  </div>

                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Nombre de la Empresa
                    </label>
                    <input
                      type="text"
                      defaultValue="Amanecer de Canela"
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Descripción
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Panadería artesanal con más de 25 años de experiencia endulzando vidas."
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Email de Contacto
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                        <input
                          type="email"
                          defaultValue="reclutamiento@amanecerdecanela.com"
                          className="w-full pl-11 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Sitio Web
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                        <input
                          type="url"
                          defaultValue="https://amanecerdecanela.com"
                          className="w-full pl-11 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dirección */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Dirección Principal
                    </label>
                    <input
                      type="text"
                      defaultValue="Av. Principal #123, San Miguel, San Roman"
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Equipo Tab */}
          {activeTab === "equipo" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-amber-950">
                  Equipo de Reclutamiento
                </h2>
                <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
                  Agregar Miembro
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    nombre: "Admin Principal",
                    email: "admin@amanecerdecanela.com",
                    rol: "Administrador",
                    activo: true,
                  },
                  {
                    nombre: "María García",
                    email: "maria.garcia@amanecerdecanela.com",
                    rol: "Reclutador",
                    activo: true,
                  },
                  {
                    nombre: "Juan Pérez",
                    email: "juan.perez@amanecerdecanela.com",
                    rol: "Reclutador",
                    activo: false,
                  },
                ].map((miembro, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-amber-100 rounded-xl hover:bg-amber-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {miembro.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-amber-950">
                          {miembro.nombre}
                        </p>
                        <p className="text-sm text-amber-600">
                          {miembro.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        {miembro.rol}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={miembro.activo}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-950 mb-4">
                  Permisos por Rol
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-700">
                      Administrador
                    </span>
                    <span className="text-sm font-medium text-amber-900">
                      Acceso completo
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-700">Reclutador</span>
                    <span className="text-sm font-medium text-amber-900">
                      Ver y editar postulaciones
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-700">Visor</span>
                    <span className="text-sm font-medium text-amber-900">
                      Solo lectura
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notificaciones Tab */}
          {activeTab === "notificaciones" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-amber-950 mb-6">
                Preferencias de Notificaciones
              </h2>

              <div className="space-y-6">
                {[
                  {
                    label: "Nueva postulación recibida",
                    description:
                      "Recibe un email cuando llegue una nueva postulación",
                    defaultChecked: true,
                  },
                  {
                    label: "Postulación actualizada",
                    description:
                      "Notificación cuando cambie el estado de una postulación",
                    defaultChecked: true,
                  },
                  {
                    label: "Recordatorio de entrevistas",
                    description:
                      "Recordatorios 24h antes de entrevistas programadas",
                    defaultChecked: true,
                  },
                  {
                    label: "Resumen semanal",
                    description: "Recibe un resumen de actividad cada lunes",
                    defaultChecked: true,
                  },
                  {
                    label: "Vacante por expirar",
                    description:
                      "Alerta 7 días antes de que expire una vacante",
                    defaultChecked: false,
                  },
                  {
                    label: "Métricas mensuales",
                    description: "Reporte mensual de rendimiento del sistema",
                    defaultChecked: false,
                  },
                ].map((notif, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 border border-amber-100 rounded-xl hover:bg-amber-50/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-amber-950 mb-1">
                        {notif.label}
                      </p>
                      <p className="text-sm text-amber-600">
                        {notif.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        defaultChecked={notif.defaultChecked}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sistema Tab */}
          {activeTab === "sistema" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-amber-950 mb-6">
                Configuración del Sistema
              </h2>

              <div className="space-y-6">
                {/* Plantillas de Email */}
                <div className="p-6 border border-amber-100 rounded-xl">
                  <h3 className="font-semibold text-amber-950 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    Plantillas de Email
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Confirmación de postulación",
                      "Invitación a entrevista",
                      "Rechazo de candidato",
                      "Oferta de empleo",
                    ].map((plantilla, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                      >
                        <span className="text-sm text-amber-900">
                          {plantilla}
                        </span>
                        <button className="text-amber-600 hover:text-amber-800 text-sm font-medium">
                          Editar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Almacenamiento */}
                <div className="p-6 border border-amber-100 rounded-xl">
                  <h3 className="font-semibold text-amber-950 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-amber-600" />
                    Almacenamiento
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-amber-700">
                          CVs almacenados
                        </span>
                        <span className="text-sm font-semibold text-amber-900">
                          245 archivos
                        </span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2">
                        <div
                          className="bg-amber-600 h-2 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-amber-600 mt-1">
                        350 MB de 1 GB utilizados
                      </p>
                    </div>
                    <button className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors">
                      Limpiar archivos antiguos
                    </button>
                  </div>
                </div>

                {/* Seguridad */}
                <div className="p-6 border border-amber-100 rounded-xl">
                  <h3 className="font-semibold text-amber-950 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-600" />
                    Seguridad
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-amber-950">
                          Autenticación de dos factores
                        </p>
                        <p className="text-sm text-amber-600">
                          Requiere código adicional al iniciar sesión
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-amber-950">
                          Cerrar sesión automáticamente
                        </p>
                        <p className="text-sm text-amber-600">
                          Después de 30 minutos de inactividad
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-amber-100">
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-green-600"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Cambios guardados</span>
              </motion.div>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Save className="w-5 h-5" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
