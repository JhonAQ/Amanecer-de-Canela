"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Home, Briefcase, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const postulacionId = searchParams.get("postulacion");

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
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-950 mb-4">
            ¡Postulación Enviada con Éxito!
          </h1>
          <p className="text-lg text-amber-700 mb-8 max-w-2xl mx-auto">
            Hemos recibido tu postulación correctamente. Nuestro equipo de
            recursos humanos revisará tu perfil y nos pondremos en contacto
            contigo en los próximos días.
          </p>

          {postulacionId && (
            <div className="inline-block bg-amber-50 border border-amber-200 rounded-xl px-6 py-3 mb-8">
              <p className="text-sm text-amber-700">
                Número de postulación:{" "}
                <span className="font-mono font-bold text-amber-900">
                  {postulacionId.substring(0, 8)}
                </span>
              </p>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-amber-100"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-amber-950 mb-2">Revisa tu email</h3>
              <p className="text-sm text-amber-700">
                Te hemos enviado una confirmación a tu correo electrónico
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-amber-100"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-amber-950 mb-2">
                Proceso de selección
              </h3>
              <p className="text-sm text-amber-700">
                Revisaremos tu perfil en los próximos 3-5 días hábiles
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-amber-100"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-amber-950 mb-2">
                Te contactaremos
              </h3>
              <p className="text-sm text-amber-700">
                Si tu perfil coincide, nos comunicaremos contigo
              </p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </Link>
            <Link
              href="/empleos"
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-amber-300 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 transition-all"
            >
              <Briefcase className="w-5 h-5" />
              Ver más vacantes
            </Link>
          </div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <p className="text-sm text-amber-700">
              ¿Tienes preguntas? Contáctanos en{" "}
              <a
                href="mailto:reclutamiento@amanecerdecanela.com"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                reclutamiento@amanecerdecanela.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Amanecer de Canela"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-lg">Amanecer de Canela</span>
            </div>
            <p className="text-amber-300/80 text-sm mb-4">
              Endulzando vidas desde hace más de 25 años
            </p>
            <p className="text-amber-300/60 text-xs">
              © 2025 Amanecer de Canela. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-amber-700">Cargando...</p>
          </div>
        </div>
      }
    >
      <ConfirmacionContent />
    </Suspense>
  );
}
