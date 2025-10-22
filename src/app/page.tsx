"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Coffee,
  Heart,
  Users,
  TrendingUp,
  Clock,
  Award,
  ChevronRight,
  Cake,
  Croissant,
  MapPin,
} from "lucide-react";

export default function Home() {
  const benefits = [
    {
      icon: Coffee,
      title: "Horarios Flexibles",
      description: "Balance perfecto entre trabajo y vida personal",
    },
    {
      icon: TrendingUp,
      title: "Crecimiento Profesional",
      description: "Desarrolla tu carrera en el mundo de la panadería",
    },
    {
      icon: Heart,
      title: "Ambiente Familiar",
      description: "Únete a un equipo que se siente como familia",
    },
    {
      icon: Award,
      title: "Capacitación Continua",
      description: "Aprende de los mejores maestros panaderos",
    },
  ];

  const stats = [
    { number: "25+", label: "Años de experiencia" },
    { number: "100+", label: "Colaboradores felices" },
    { number: "15", label: "Sucursales" },
    { number: "50k+", label: "Clientes satisfechos" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/50 to-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200/50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/empleos"
              className="px-6 py-2.5 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Ver Vacantes
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                <Croissant className="w-4 h-4" />
                Estamos contratando
              </div>

              <h2 className="text-5xl sm:text-6xl font-bold text-amber-950 mb-6 leading-tight">
                Hornea tu
                <span className="text-amber-600"> futuro </span>
                con nosotros
              </h2>

              <p className="text-lg text-amber-800 mb-8 leading-relaxed">
                En Amanecer de Canela no solo hacemos pan, creamos experiencias
                que endulzan la vida. Únete a nuestra familia y sé parte de una
                tradición que crece cada día.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/empleos"
                  className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Explorar Oportunidades
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#beneficios"
                  className="px-8 py-4 bg-white text-amber-700 border-2 border-amber-200 rounded-full font-semibold hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
                >
                  Conocer Beneficios
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-12 border-t border-amber-200">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-amber-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-amber-700 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-amber-200 via-amber-300 to-yellow-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Image 
                      src="/nuestro-equipo.png"
                      alt="Nuestro equipo"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-amber-100"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-amber-600" />
                  <div>
                    <div className="font-bold text-amber-900">+100</div>
                    <div className="text-xs text-amber-700">Colaboradores</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-amber-100"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-amber-600" />
                  <div>
                    <div className="font-bold text-amber-900">15</div>
                    <div className="text-xs text-amber-700">Sucursales</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl opacity-20"></div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-amber-950 mb-4">
              ¿Por qué trabajar con nosotros?
            </h3>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Ofrecemos más que un trabajo, ofrecemos un lugar donde crecer y
              desarrollarte
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-100 hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-amber-950 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-amber-700">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Clock className="w-16 h-16 text-white/90 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-6">
              ¿Listo para comenzar tu carrera?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Explora nuestras vacantes disponibles y encuentra la posición
              perfecta para ti
            </p>
            <Link
              href="/empleos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 rounded-full font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl group"
            >
              Ver Todas las Vacantes
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100 py-12">
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
                    href="/empleos"
                    className="text-amber-300/80 hover:text-amber-200"
                  >
                    Vacantes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#beneficios"
                    className="text-amber-300/80 hover:text-amber-200"
                  >
                    Beneficios
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
