import { supabase } from './supabase';

/**
 * Sube un archivo a Supabase Storage
 * @param file - Archivo a subir
 * @param bucket - Nombre del bucket ('cvs' | 'logos')
 * @param carpeta - Subcarpeta dentro del bucket (opcional)
 * @returns URL pública del archivo subido
 */
export async function subirArchivo(
  file: File,
  bucket: 'cvs' | 'logos' = 'cvs',
  carpeta: string = 'uploads'
): Promise<string> {
  try {
    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const nombreLimpio = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const nombreArchivo = `${timestamp}_${nombreLimpio}`;
    const rutaCompleta = carpeta ? `${carpeta}/${nombreArchivo}` : nombreArchivo;

    // Subir archivo
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(rutaCompleta, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error al subir archivo:', error);
      throw error;
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error en subirArchivo:', error);
    throw error;
  }
}

/**
 * Elimina un archivo de Supabase Storage
 * @param url - URL del archivo a eliminar
 * @param bucket - Nombre del bucket
 */
export async function eliminarArchivo(
  url: string,
  bucket: 'cvs' | 'logos' = 'cvs'
): Promise<void> {
  try {
    // Extraer path del archivo de la URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/${bucket}/`);
    
    if (pathParts.length < 2) {
      throw new Error('URL inválida');
    }

    const filePath = pathParts[1];

    // Eliminar archivo
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Error al eliminar archivo:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error en eliminarArchivo:', error);
    throw error;
  }
}

/**
 * Descarga un archivo de Supabase Storage
 * @param url - URL del archivo a descargar
 * @param bucket - Nombre del bucket
 * @returns Blob del archivo
 */
export async function descargarArchivo(
  url: string,
  bucket: 'cvs' | 'logos' = 'cvs'
): Promise<Blob> {
  try {
    // Extraer path del archivo de la URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/${bucket}/`);
    
    if (pathParts.length < 2) {
      throw new Error('URL inválida');
    }

    const filePath = pathParts[1];

    // Descargar archivo
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(filePath);

    if (error) {
      console.error('Error al descargar archivo:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error en descargarArchivo:', error);
    throw error;
  }
}

/**
 * Valida un archivo antes de subirlo
 * @param file - Archivo a validar
 * @param opciones - Opciones de validación
 * @returns true si es válido, false si no
 */
export function validarArchivo(
  file: File,
  opciones: {
    maxSize?: number; // En MB
    allowedTypes?: string[];
  } = {}
): { valido: boolean; error?: string } {
  const { maxSize = 5, allowedTypes = ['application/pdf'] } = opciones;

  // Validar tamaño
  const maxBytes = maxSize * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valido: false,
      error: `El archivo es muy grande. Máximo ${maxSize}MB permitidos.`,
    };
  }

  // Validar tipo
  if (!allowedTypes.includes(file.type)) {
    return {
      valido: false,
      error: `Tipo de archivo no permitido. Solo se permiten: ${allowedTypes.join(', ')}`,
    };
  }

  return { valido: true };
}

/**
 * Obtiene el tamaño de un bucket
 * @param bucket - Nombre del bucket
 * @returns Tamaño total en bytes
 */
export async function obtenerTamanoBucket(bucket: 'cvs' | 'logos'): Promise<number> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list();

    if (error) throw error;

    const totalBytes = data.reduce((acc, file) => {
      return acc + (file.metadata?.size || 0);
    }, 0);

    return totalBytes;
  } catch (error) {
    console.error('Error al obtener tamaño del bucket:', error);
    return 0;
  }
}

/**
 * Formatea bytes a un formato legible (KB, MB, GB)
 * @param bytes - Cantidad de bytes
 * @returns String formateado (ej: "2.5 MB")
 */
export function formatearBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
