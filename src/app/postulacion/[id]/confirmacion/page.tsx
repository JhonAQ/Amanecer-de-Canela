'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";
import { 
  CheckCircle,
  Mail,
  Clock,
  FileText,
  Home,
  Briefcase,
  ArrowRight,
  Calendar,
  Bell
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ConfirmacionPage({ params }: PageProps) {
  const { id } = use(params);

  // Datos de ejemplo (en producción vendrían de la base de datos)
  const postulacion = {
    id: id,
    vacante: "Maestro Panadero",
    fecha: new Date().toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    hora: new Date().toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  };

  const siguientesPasos = [
    {
      icon: Mail,
      titulo: "Revisa tu email",
      descripcion: "Te hemos enviado un correo de confirmación con los detalles de tu postulación.",
      tiempo: "Inmediato"
    },
    {
      icon: FileText,
      titulo: "Revisión de CV",
      descripcion: "Nuestro equipo de reclutamiento revisará tu perfil y experiencia.",
      tiempo: "1-3 días hábiles"
    },
    {
      icon: Bell,
      titulo: "Contacto inicial",
      descripcion: "Si tu perfil es seleccionado, te contactaremos por teléfono o email.",
      tiempo: "3-5 días hábiles"
    },
    {
      icon: Calendar,
      titulo: "Entrevista",
      descripcion: "Coordinaremos una entrevista para conocerte mejor y hablar sobre la vacante.",
      tiempo: "1-2 semanas"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/50 to-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200/50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Amanecer de Canela"
              width={50}
              height={50}
              className="rounded-full"
              priority
            />
            <div>
              <h1 className="text-xl font-bold text-amber-900">Amanecer de Canela</h1>
              <p className="text-xs text-amber-700">Únete a nuestro equipo</p>
            </div>
          </Link>
          
          <Link 
            href="/"
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute -top-2 -right-2 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-950 mb-4">
            ¡Postulación enviada con éxito!
          </h1>
          <p className="text-lg text-amber-700 mb-6">
            Hemos recibido tu solicitud para la vacante de <span className="font-semibold text-amber-900">{postulacion.vacante}</span>
          </p>
          
          {/* Reference Number */}
          <div className="inline-block bg-white rounded-xl p-4 shadow-md border border-amber-200">
            <p className="text-sm text-amber-600 font-medium mb-1">Número de referencia</p>
            <p className="text-2xl font-bold text-amber-900 font-mono">#{postulacion.id.toUpperCase()}</p>
          </div>
        </motion.div>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-amber-100 mb-8"
        >
          <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            Detalles de tu postulación
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-sm text-amber-600 font-medium mb-1">Fecha de postulación</p>
              <p className="text-lg font-semibold text-amber-900">{postulacion.fecha}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-sm text-amber-600 font-medium mb-1">Hora de registro</p>
              <p className="text-lg font-semibold text-amber-900">{postulacion.hora}</p>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-amber-100 mb-8"
        >
          <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">
            ¿Qué sigue ahora?
          </h2>
          
          <div className="space-y-6">
            {siguientesPasos.map((paso, index) => {
              const Icon = paso.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative"
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-amber-950">
                          {index + 1}. {paso.titulo}
                        </h3>
                        <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-medium whitespace-nowrap ml-2">
                          {paso.tiempo}
                        </span>
                      </div>
                      <p className="text-amber-700">
                        {paso.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < siguientesPasos.length - 1 && (
                    <div className="absolute left-6 top-14 w-0.5 h-8 bg-amber-200"></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Important Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-200 mb-8"
        >
          <h3 className="text-lg font-bold text-amber-950 mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-600" />
            Información importante
          </h3>
          <ul className="space-y-2 text-amber-800">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Revisa tu bandeja de entrada y spam para no perder ninguna comunicación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Mantén tu teléfono disponible durante los próximos días</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Si tienes dudas, contáctanos a reclutamiento@amanecerdecanela.com</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Guarda tu número de referencia para futuras consultas</span>
            </li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/empleos"
            className="flex-1 px-6 py-4 bg-white border-2 border-amber-300 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 transition-all text-center flex items-center justify-center gap-2"
          >
            <Briefcase className="w-5 h-5" />
            Ver más vacantes
          </Link>
          <Link
            href="/"
            className="flex-1 px-6 py-4 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
          >
            Ir al inicio
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-amber-800">
            Gracias por tu interés en formar parte de{' '}
            <span className="font-bold text-amber-900">Amanecer de Canela</span>
          </p>
          <p className="text-amber-700 mt-2">
            ¡Te deseamos mucho éxito en tu proceso! 🥖✨
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100 py-12 mt-20">
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
                <li><Link href="/" className="text-amber-300/80 hover:text-amber-200">Inicio</Link></li>
                <li><Link href="/empleos" className="text-amber-300/80 hover:text-amber-200">Vacantes</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <p className="text-amber-300/80 text-sm">
                ¿Preguntas sobre las vacantes?<br />
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
