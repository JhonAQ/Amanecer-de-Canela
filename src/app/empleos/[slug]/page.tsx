"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  Calendar,
  GraduationCap,
  Target,
  Loader2,
  Eye,
} from "lucide-react";
import { notFound } from "next/navigation";
import { obtenerVacantePorSlug, incrementarVistas } from "@/lib/supabase";
import type { Vacante } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DetalleVacantePage({ params }: PageProps) {
  const [slug, setSlug] = useState<string>("");
  const [vacante, setVacante] = useState<Vacante | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const cargarVacante = async () => {
      try {
        setLoading(true);
        const data = await obtenerVacantePorSlug(slug);

        if (!data) {
          setNotFoundError(true);
          return;
        }

        setVacante(data);

        // Incrementar el contador de vistas
        await incrementarVistas(data.id);
      } catch (error) {
        console.error("Error al cargar vacante:", error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    };

    cargarVacante();
  }, [slug]);

  if (notFoundError) {
    notFound();
  }

  if (loading || !vacante) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-amber-700 text-lg">Cargando vacante...</p>
        </div>
      </div>
    );
  }

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
            href="/empleos"
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a vacantes
          </Link>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-amber-700">
          <Link href="/" className="hover:text-amber-900">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/empleos" className="hover:text-amber-900">
            Vacantes
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-amber-900 font-medium">{vacante.titulo}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-amber-950 mb-3">
                    {vacante.titulo}
                  </h1>
                  <div className="flex flex-wrap gap-3 text-amber-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{vacante.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{vacante.tipo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      <span>{vacante.categoria}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <DollarSign className="w-8 h-8 text-amber-600" />
                <div>
                  <p className="text-sm text-amber-700 font-medium">
                    Salario mensual
                  </p>
                  <p className="text-2xl font-bold text-amber-900">
                    ${vacante.salario_min?.toLocaleString("es-MX")} - $
                    {vacante.salario_max?.toLocaleString("es-MX")} MXN
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100"
            >
              <h2 className="text-2xl font-bold text-amber-950 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-amber-600" />
                Descripción del puesto
              </h2>
              <p className="text-amber-800 leading-relaxed whitespace-pre-line">
                {vacante.descripcion}
              </p>
            </motion.div>

            {/* Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100"
            >
              <h2 className="text-2xl font-bold text-amber-950 mb-6">
                Responsabilidades
              </h2>
              <ul className="space-y-3">
                {vacante.responsabilidades?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-800">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100"
            >
              <h2 className="text-2xl font-bold text-amber-950 mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-amber-600" />
                Requisitos
              </h2>
              <ul className="space-y-3">
                {vacante.requisitos?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-800">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border border-amber-200"
            >
              <h2 className="text-2xl font-bold text-amber-950 mb-6">
                ¿Qué ofrecemos?
              </h2>
              <ul className="space-y-3">
                {vacante.ofrecemos?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-900 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 space-y-6"
            >
              {/* Apply CTA */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-amber-950 mb-4">
                  ¿Te interesa esta vacante?
                </h3>
                <p className="text-amber-700 mb-6 text-sm">
                  Envía tu postulación ahora y sé parte de nuestro equipo
                </p>
                <Link
                  href={`/empleos/${vacante.slug}/postular`}
                  className="block w-full px-6 py-4 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl text-center group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Postularme ahora
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              {/* Job Details */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                <h3 className="text-lg font-bold text-amber-950 mb-4">
                  Detalles del empleo
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-600 font-medium">
                        Tipo de empleo
                      </p>
                      <p className="text-amber-900">{vacante.tipo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-600 font-medium">
                        Vacantes disponibles
                      </p>
                      <p className="text-amber-900">
                        {vacante.vacantes_disponibles} posición
                        {vacante.vacantes_disponibles &&
                        vacante.vacantes_disponibles > 1
                          ? "es"
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-600 font-medium">
                        Publicada
                      </p>
                      <p className="text-amber-900">
                        {new Date(
                          vacante.fecha_publicacion || vacante.created_at || ""
                        ).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-600 font-medium">
                        Vistas
                      </p>
                      <p className="text-amber-900">
                        {vacante.vistas || 0} visualizaciones
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-amber-950 mb-3">
                  Comparte esta vacante
                </h3>
                <p className="text-sm text-amber-700">
                  ¿Conoces a alguien perfecto para este puesto? Comparte esta
                  oportunidad.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
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
