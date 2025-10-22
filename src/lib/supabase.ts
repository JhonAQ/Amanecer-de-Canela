import { createClient } from '@supabase/supabase-js';

// Verificar que las variables de entorno estén configuradas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase. Por favor configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local');
}

// Cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =============================================
// TIPOS TYPESCRIPT
// =============================================

export interface Vacante {
  id: string;
  slug: string;
  titulo: string;
  ubicacion: string;
  tipo: 'Tiempo Completo' | 'Medio Tiempo' | 'Por Proyecto';
  categoria: string;
  salario_min: number;
  salario_max: number;
  descripcion: string;
  responsabilidades: string[];
  requisitos: string[];
  ofrecemos: string[];
  estado: 'Activa' | 'Pausada' | 'Cerrada';
  vacantes_disponibles: number;
  fecha_publicacion: string;
  vistas: number;
  created_at: string;
  updated_at: string;
}

export interface Candidato {
  id: string;
  nombre: string;
  apellidos?: string;
  email: string;
  telefono: string;
  ciudad: string;
  experiencia: string;
  cv_url?: string;
  habilidades: string[];
  estado: 'Activo' | 'Contratado' | 'Descartado';
  created_at: string;
  updated_at: string;
}

export interface Postulacion {
  id: string;
  candidato_id: string;
  vacante_id: string;
  estado: 'Nueva' | 'En revisión' | 'Entrevista' | 'Rechazada' | 'Contratado';
  cv_url?: string;
  notas: Nota[];
  etiquetas: string[];
  created_at: string;
  updated_at: string;
}

export interface Nota {
  id: string;
  texto: string;
  autor: string;
  fecha: string;
}

export interface PostulacionCompleta extends Postulacion {
  candidato_nombre: string;
  candidato_email: string;
  candidato_telefono: string;
  candidato_ciudad: string;
  experiencia: string;
  habilidades: string[];
  vacante_titulo: string;
  vacante_ubicacion: string;
  vacante_slug: string;
  fecha_postulacion: string; // Campo de la vista
}

export interface Administrador {
  id: string;
  email: string;
  nombre: string;
  rol: 'Administrador' | 'Reclutador' | 'Visor';
  activo: boolean;
  created_at: string;
}

// =============================================
// FUNCIONES DE VACANTES
// =============================================

export async function obtenerVacantes(filtros?: {
  estado?: string;
  categoria?: string;
  busqueda?: string;
}) {
  let query = supabase
    .from('vacantes')
    .select('*')
    .order('fecha_publicacion', { ascending: false });

  if (filtros?.estado && filtros.estado !== 'Todas') {
    query = query.eq('estado', filtros.estado);
  }

  if (filtros?.categoria && filtros.categoria !== 'Todas') {
    query = query.eq('categoria', filtros.categoria);
  }

  if (filtros?.busqueda) {
    query = query.or(`titulo.ilike.%${filtros.busqueda}%,descripcion.ilike.%${filtros.busqueda}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener vacantes:', error);
    throw error;
  }

  return data as Vacante[];
}

export async function obtenerVacantePorSlug(slug: string) {
  const { data, error } = await supabase
    .from('vacantes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error al obtener vacante:', error);
    throw error;
  }

  // Incrementar vistas
  await supabase.rpc('incrementar_vistas_vacante', { vacante_slug: slug });

  return data as Vacante;
}

export async function crearVacante(vacante: Omit<Vacante, 'id' | 'created_at' | 'updated_at' | 'vistas'>) {
  const { data, error } = await supabase
    .from('vacantes')
    .insert([vacante])
    .select()
    .single();

  if (error) {
    console.error('Error al crear vacante:', error);
    throw error;
  }

  return data as Vacante;
}

export async function actualizarVacante(id: string, cambios: Partial<Vacante>) {
  const { data, error } = await supabase
    .from('vacantes')
    .update(cambios)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar vacante:', error);
    throw error;
  }

  return data as Vacante;
}

export async function eliminarVacante(id: string) {
  const { error } = await supabase
    .from('vacantes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar vacante:', error);
    throw error;
  }
}

export async function incrementarVistas(id: string) {
  try {
    const { data: vacante } = await supabase
      .from('vacantes')
      .select('vistas')
      .eq('id', id)
      .single();

    if (vacante) {
      await supabase
        .from('vacantes')
        .update({ vistas: (vacante.vistas || 0) + 1 })
        .eq('id', id);
    }
  } catch (error) {
    console.error('Error al incrementar vistas:', error);
    // No lanzamos error para no bloquear la carga de la página
  }
}

// =============================================
// FUNCIONES DE CANDIDATOS
// =============================================

export async function obtenerCandidatos(filtros?: {
  estado?: string;
  experiencia?: string;
  ciudad?: string;
  busqueda?: string;
}) {
  let query = supabase
    .from('candidatos')
    .select('*')
    .order('created_at', { ascending: false });

  if (filtros?.estado && filtros.estado !== 'Todos') {
    query = query.eq('estado', filtros.estado);
  }

  if (filtros?.experiencia && filtros.experiencia !== 'Todas') {
    query = query.eq('experiencia', filtros.experiencia);
  }

  if (filtros?.ciudad && filtros.ciudad !== 'Todas') {
    query = query.eq('ciudad', filtros.ciudad);
  }

  if (filtros?.busqueda) {
    query = query.or(`nombre.ilike.%${filtros.busqueda}%,apellidos.ilike.%${filtros.busqueda}%,email.ilike.%${filtros.busqueda}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener candidatos:', error);
    throw error;
  }

  return data as Candidato[];
}

export async function obtenerCandidatoPorId(id: string) {
  const { data, error } = await supabase
    .from('candidatos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al obtener candidato:', error);
    throw error;
  }

  return data as Candidato;
}

export async function crearCandidato(candidato: Omit<Candidato, 'id' | 'created_at' | 'updated_at' | 'estado'>) {
  // Verificar si el candidato ya existe por email
  const { data: existente } = await supabase
    .from('candidatos')
    .select('id')
    .eq('email', candidato.email)
    .single();

  if (existente) {
    return existente as { id: string };
  }

  const { data, error } = await supabase
    .from('candidatos')
    .insert([{ ...candidato, estado: 'Activo' }])
    .select()
    .single();

  if (error) {
    console.error('Error al crear candidato:', error);
    throw error;
  }

  return data as Candidato;
}

export async function actualizarCandidato(id: string, cambios: Partial<Candidato>) {
  const { data, error } = await supabase
    .from('candidatos')
    .update(cambios)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar candidato:', error);
    throw error;
  }

  return data as Candidato;
}

// =============================================
// FUNCIONES DE POSTULACIONES
// =============================================

export async function obtenerPostulaciones(filtros?: {
  estado?: string;
  vacante_id?: string;
  experiencia?: string;
  busqueda?: string;
}) {
  let query = supabase
    .from('postulaciones_completas')
    .select('*')
    .order('fecha_postulacion', { ascending: false });

  if (filtros?.estado && filtros.estado !== 'Todas') {
    query = query.eq('estado', filtros.estado);
  }

  if (filtros?.vacante_id && filtros.vacante_id !== 'Todas') {
    query = query.eq('vacante_id', filtros.vacante_id);
  }

  if (filtros?.experiencia && filtros.experiencia !== 'Todas') {
    query = query.eq('experiencia', filtros.experiencia);
  }

  if (filtros?.busqueda) {
    query = query.or(`candidato_nombre.ilike.%${filtros.busqueda}%,candidato_email.ilike.%${filtros.busqueda}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener postulaciones:', error);
    throw error;
  }

  return data as PostulacionCompleta[];
}

export async function obtenerPostulacionPorId(id: string) {
  const { data, error } = await supabase
    .from('postulaciones_completas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al obtener postulación:', error);
    throw error;
  }

  return data as PostulacionCompleta;
}

export async function crearPostulacion(postulacion: {
  candidato_id: string;
  vacante_id: string;
  cv_url?: string;
}) {
  const { data, error } = await supabase
    .from('postulaciones')
    .insert([{
      ...postulacion,
      estado: 'Nueva',
      notas: [],
      etiquetas: []
    }])
    .select()
    .single();

  if (error) {
    console.error('Error al crear postulación:', error);
    throw error;
  }

  return data as Postulacion;
}

export async function actualizarPostulacion(id: string, cambios: Partial<Postulacion>) {
  const { data, error } = await supabase
    .from('postulaciones')
    .update(cambios)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar postulación:', error);
    throw error;
  }

  return data as Postulacion;
}

export async function agregarNotaPostulacion(id: string, nota: Omit<Nota, 'id' | 'fecha'>) {
  // Obtener postulación actual
  const { data: postulacion } = await supabase
    .from('postulaciones')
    .select('notas')
    .eq('id', id)
    .single();

  if (!postulacion) throw new Error('Postulación no encontrada');

  const nuevaNota: Nota = {
    id: crypto.randomUUID(),
    ...nota,
    fecha: new Date().toISOString()
  };

  const notasActualizadas = [...(postulacion.notas || []), nuevaNota];

  return actualizarPostulacion(id, { notas: notasActualizadas });
}

export async function eliminarNotaPostulacion(postulacionId: string, notaId: string) {
  const { data: postulacion } = await supabase
    .from('postulaciones')
    .select('notas')
    .eq('id', postulacionId)
    .single();

  if (!postulacion) throw new Error('Postulación no encontrada');

  const notasActualizadas = (postulacion.notas || []).filter((n: Nota) => n.id !== notaId);

  return actualizarPostulacion(postulacionId, { notas: notasActualizadas });
}

export async function agregarEtiquetaPostulacion(id: string, etiqueta: string) {
  const { data: postulacion } = await supabase
    .from('postulaciones')
    .select('etiquetas')
    .eq('id', id)
    .single();

  if (!postulacion) throw new Error('Postulación no encontrada');

  const etiquetasActualizadas = [...new Set([...(postulacion.etiquetas || []), etiqueta])];

  return actualizarPostulacion(id, { etiquetas: etiquetasActualizadas });
}

export async function eliminarEtiquetaPostulacion(id: string, etiqueta: string) {
  const { data: postulacion } = await supabase
    .from('postulaciones')
    .select('etiquetas')
    .eq('id', id)
    .single();

  if (!postulacion) throw new Error('Postulación no encontrada');

  const etiquetasActualizadas = (postulacion.etiquetas || []).filter(e => e !== etiqueta);

  return actualizarPostulacion(id, { etiquetas: etiquetasActualizadas });
}

// =============================================
// FUNCIONES DE ESTADÍSTICAS
// =============================================

export async function obtenerEstadisticasDashboard() {
  // Obtener conteos de vacantes
  const { data: vacantes } = await supabase
    .from('vacantes')
    .select('estado, id');

  const vacantesActivas = vacantes?.filter(v => v.estado === 'Activa').length || 0;

  // Obtener conteos de postulaciones
  const { data: estadosPostulaciones } = await supabase
    .rpc('contar_postulaciones_por_estado');

  const postulacionesNuevas = estadosPostulaciones?.find(e => e.estado === 'Nueva')?.total || 0;
  const enRevision = estadosPostulaciones?.find(e => e.estado === 'En revisión')?.total || 0;
  const enEntrevista = estadosPostulaciones?.find(e => e.estado === 'Entrevista')?.total || 0;

  // Obtener total de candidatos
  const { count: totalCandidatos } = await supabase
    .from('candidatos')
    .select('*', { count: 'exact', head: true });

  return {
    vacantesActivas,
    postulacionesNuevas,
    enRevision,
    enEntrevista,
    totalCandidatos: totalCandidatos || 0
  };
}

export async function obtenerPostulacionesRecientes(limite: number = 5) {
  const { data, error } = await supabase
    .from('postulaciones_completas')
    .select('*')
    .order('fecha_postulacion', { ascending: false })
    .limit(limite);

  if (error) throw error;

  return data as PostulacionCompleta[];
}

// =============================================
// FUNCIONES DE AUTENTICACIÓN ADMIN
// =============================================

export async function loginAdmin(email: string, password: string) {
  const { data: admin, error } = await supabase
    .from('administradores')
    .select('*')
    .eq('email', email)
    .eq('activo', true)
    .single();

  if (error || !admin) {
    throw new Error('Credenciales inválidas');
  }

  // Verificar password (en producción usar bcrypt.compare)
  if (admin.password_hash !== password) {
    throw new Error('Credenciales inválidas');
  }

  // Crear token simple (en producción usar JWT)
  const token = btoa(JSON.stringify({
    id: admin.id,
    email: admin.email,
    nombre: admin.nombre,
    rol: admin.rol,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
  }));

  return {
    admin: {
      id: admin.id,
      email: admin.email,
      nombre: admin.nombre,
      rol: admin.rol
    },
    token
  };
}

export function verificarToken(token: string) {
  try {
    const payload = JSON.parse(atob(token));
    
    if (payload.exp < Date.now()) {
      throw new Error('Token expirado');
    }

    return payload;
  } catch (error) {
    throw new Error('Token inválido');
  }
}

// =============================================
// FUNCIONES DE CONFIGURACIÓN
// =============================================

export async function obtenerConfiguracion(clave: string) {
  const { data, error } = await supabase
    .from('configuracion')
    .select('valor')
    .eq('clave', clave)
    .single();

  if (error) throw error;

  return data?.valor;
}

export async function actualizarConfiguracion(clave: string, valor: any) {
  const { data, error } = await supabase
    .from('configuracion')
    .upsert([{ clave, valor }])
    .select()
    .single();

  if (error) throw error;

  return data;
}
