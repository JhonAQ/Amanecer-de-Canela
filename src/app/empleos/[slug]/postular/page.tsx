'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useCallback, use } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  ArrowLeft,
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin
} from "lucide-react";

// Schema de validación con Zod
const postulacionSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellidos: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 dígitos").regex(/^[0-9]+$/, "Solo números"),
  ciudad: z.string().min(2, "La ciudad es requerida"),
  experiencia: z.string().min(1, "Selecciona tus años de experiencia"),
  privacidad: z.boolean().refine(val => val === true, {
    message: "Debes aceptar el aviso de privacidad"
  })
});

type PostulacionForm = z.infer<typeof postulacionSchema>;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const vacantesInfo: Record<string, { titulo: string; ubicacion: string }> = {
  "maestro-panadero": { titulo: "Maestro Panadero", ubicacion: "Sucursal Centro" },
  "cajero-sucursal": { titulo: "Cajero/a de Sucursal", ubicacion: "Varias Sucursales" },
  "ayudante-de-pasteleria": { titulo: "Ayudante de Pastelería", ubicacion: "Sucursal Norte" },
  "vendedor-mostrador": { titulo: "Vendedor/a de Mostrador", ubicacion: "Sucursal Sur" },
  "supervisor-de-produccion": { titulo: "Supervisor de Producción", ubicacion: "Planta Central" },
  "repartidor": { titulo: "Repartidor", ubicacion: "Zona Metropolitana" }
};

export default function PostularPage({ params }: PageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const vacante = vacantesInfo[slug];

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<PostulacionForm>({
    resolver: zodResolver(postulacionSchema),
    defaultValues: {
      privacidad: false
    }
  });

  // Dropzone para CV
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError("El archivo no debe superar 5MB");
        return;
      }
      setCvFile(file);
      setSubmitError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false
  });

  const removeFile = () => {
    setCvFile(null);
  };

  const onSubmit = async (data: PostulacionForm) => {
    if (!cvFile) {
      setSubmitError("Debes subir tu CV en formato PDF");
      return;
    }

    setSubmitError(null);
    setUploading(true);

    try {
      // Simular envío a API
      // En producción, aquí harías el POST a tu API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generar ID de postulación (en producción vendría del backend)
      const postulacionId = Math.random().toString(36).substring(7);
      
      // Redirigir a confirmación
      router.push(`/postulacion/${postulacionId}/confirmacion`);
    } catch (error) {
      setSubmitError("Hubo un error al enviar tu postulación. Inténtalo de nuevo.");
      setUploading(false);
    }
  };

  if (!vacante) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-950 mb-4">Vacante no encontrada</h1>
          <Link href="/empleos" className="text-amber-600 hover:text-amber-700">
            Volver a vacantes
          </Link>
        </div>
      </div>
    );
  }

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
            href={`/empleos/${slug}`}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la vacante
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4 text-sm font-medium">
            <Briefcase className="w-4 h-4" />
            Postulación
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-950 mb-3">
            {vacante.titulo}
          </h1>
          <p className="text-lg text-amber-700">
            {vacante.ubicacion}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-amber-100"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Info Section */}
            <div>
              <h2 className="text-xl font-bold text-amber-950 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600" />
                Información Personal
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-amber-900 mb-2">
                    Nombre(s) *
                  </label>
                  <input
                    {...register("nombre")}
                    type="text"
                    id="nombre"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.nombre 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-amber-200 focus:border-amber-500'
                    }`}
                    placeholder="Juan"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                {/* Apellidos */}
                <div>
                  <label htmlFor="apellidos" className="block text-sm font-medium text-amber-900 mb-2">
                    Apellidos *
                  </label>
                  <input
                    {...register("apellidos")}
                    type="text"
                    id="apellidos"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.apellidos 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-amber-200 focus:border-amber-500'
                    }`}
                    placeholder="Pérez García"
                  />
                  {errors.apellidos && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.apellidos.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold text-amber-950 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-600" />
                Información de Contacto
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                    Email *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-amber-200 focus:border-amber-500'
                    }`}
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-amber-900 mb-2">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                    <input
                      {...register("telefono")}
                      type="tel"
                      id="telefono"
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.telefono 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-amber-200 focus:border-amber-500'
                      }`}
                      placeholder="5512345678"
                    />
                  </div>
                  {errors.telefono && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.telefono.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-xl font-bold text-amber-950 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                Información Adicional
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Ciudad */}
                <div>
                  <label htmlFor="ciudad" className="block text-sm font-medium text-amber-900 mb-2">
                    Ciudad de residencia *
                  </label>
                  <input
                    {...register("ciudad")}
                    type="text"
                    id="ciudad"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.ciudad 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-amber-200 focus:border-amber-500'
                    }`}
                    placeholder="Ciudad de México"
                  />
                  {errors.ciudad && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.ciudad.message}
                    </p>
                  )}
                </div>

                {/* Experiencia */}
                <div>
                  <label htmlFor="experiencia" className="block text-sm font-medium text-amber-900 mb-2">
                    Años de experiencia *
                  </label>
                  <select
                    {...register("experiencia")}
                    id="experiencia"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.experiencia 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-amber-200 focus:border-amber-500'
                    }`}
                  >
                    <option value="">Selecciona...</option>
                    <option value="sin-experiencia">Sin experiencia</option>
                    <option value="menos-1">Menos de 1 año</option>
                    <option value="1-2">1-2 años</option>
                    <option value="3-5">3-5 años</option>
                    <option value="5-10">5-10 años</option>
                    <option value="mas-10">Más de 10 años</option>
                  </select>
                  {errors.experiencia && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.experiencia.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <h2 className="text-xl font-bold text-amber-950 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                Currículum Vitae
              </h2>
              
              {!cvFile ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragActive 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-amber-300 hover:border-amber-500 hover:bg-amber-50/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <p className="text-amber-900 font-medium mb-2">
                    {isDragActive ? '¡Suelta tu archivo aquí!' : 'Arrastra tu CV o haz clic para seleccionar'}
                  </p>
                  <p className="text-sm text-amber-700">
                    Solo archivos PDF (máx. 5MB)
                  </p>
                </div>
              ) : (
                <div className="border-2 border-amber-200 rounded-xl p-6 bg-amber-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-amber-950">{cvFile.name}</p>
                        <p className="text-sm text-amber-700">
                          {(cvFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Privacy Consent */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-start gap-3">
                <input
                  {...register("privacidad")}
                  type="checkbox"
                  id="privacidad"
                  className="mt-1 w-5 h-5 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="privacidad" className="text-sm text-amber-900">
                  Acepto el{' '}
                  <Link href="/aviso-privacidad" className="text-amber-600 hover:text-amber-700 underline" target="_blank">
                    Aviso de Privacidad
                  </Link>
                  {' '}y autorizo el uso de mis datos personales para fines de reclutamiento. *
                </label>
              </div>
              {errors.privacidad && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 ml-8">
                  <AlertCircle className="w-4 h-4" />
                  {errors.privacidad.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-800">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/empleos/${slug}`}
                className="flex-1 px-6 py-4 border-2 border-amber-300 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 transition-all text-center"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className="flex-1 px-6 py-4 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting || uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Enviar Postulación
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-amber-700">
            ¿Tienes problemas? Escríbenos a{' '}
            <a href="mailto:reclutamiento@amanecerdecanela.com" className="text-amber-600 hover:text-amber-700 underline">
              reclutamiento@amanecerdecanela.com
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
