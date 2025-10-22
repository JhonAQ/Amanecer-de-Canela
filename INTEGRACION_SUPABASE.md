# 📦 RESUMEN DE INTEGRACIÓN SUPABASE

## 🎯 Lo que se ha creado

### Archivos de Configuración

1. **`.env.local`** - Variables de entorno (debes completar con tus credenciales)
2. **`.env.example`** - Ejemplo de variables de entorno
3. **`supabase-init.sql`** - Script SQL para crear toda la base de datos

### Archivos de Código

4. **`src/lib/supabase.ts`** - Cliente de Supabase + funciones de BD (510 líneas)
5. **`src/lib/storage.ts`** - Funciones para subir/descargar archivos
6. **`src/hooks/useAuth.ts`** - Hook de autenticación para React

### Documentación

7. **`GUIA_SUPABASE.md`** - Guía completa de configuración
8. **`CHECKLIST_SUPABASE.md`** - Checklist paso a paso

---

## 🗄️ Estructura de Base de Datos

### Tablas Creadas (5)

```
vacantes
├── id (UUID)
├── slug (texto único)
├── titulo
├── ubicacion
├── tipo (Tiempo Completo/Medio Tiempo/Por Proyecto)
├── categoria
├── salario_min, salario_max
├── descripcion
├── responsabilidades (JSONB array)
├── requisitos (JSONB array)
├── ofrecemos (JSONB array)
├── estado (Activa/Pausada/Cerrada)
├── vacantes_disponibles
├── vistas
└── timestamps

candidatos
├── id (UUID)
├── nombre, apellidos
├── email (único)
├── telefono
├── ciudad
├── experiencia
├── cv_url
├── habilidades (JSONB array)
├── estado (Activo/Contratado/Descartado)
└── timestamps

postulaciones
├── id (UUID)
├── candidato_id (FK)
├── vacante_id (FK)
├── estado (Nueva/En revisión/Entrevista/Rechazada/Contratado)
├── cv_url
├── notas (JSONB array)
├── etiquetas (JSONB array)
└── timestamps
└── UNIQUE(candidato_id, vacante_id)

administradores
├── id (UUID)
├── email (único)
├── password_hash
├── nombre
├── rol (Administrador/Reclutador/Visor)
├── activo
└── timestamps

configuracion
├── id (UUID)
├── clave (único)
├── valor (JSONB)
├── descripcion
└── updated_at
```

### Vistas Creadas (3)

- **`postulaciones_completas`** - Postulaciones con JOIN de candidato y vacante
- **`estadisticas_vacantes`** - Vacantes con conteos de postulaciones
- **`estadisticas_candidatos`** - Candidatos con conteos de postulaciones

### Funciones Creadas (3)

- **`incrementar_vistas_vacante(slug)`** - Incrementa contador de vistas
- **`contar_postulaciones_por_estado()`** - Retorna conteos por estado
- **`update_updated_at_column()`** - Trigger para actualizar timestamps

---

## 🔐 Políticas de Seguridad (RLS)

### Vacantes

- ✅ Público puede ver solo vacantes "Activas"
- ✅ Solo admins autenticados pueden crear/editar/eliminar

### Candidatos

- ✅ Cualquiera puede crear su perfil (registro)
- ✅ Solo admins pueden ver todos los candidatos
- ✅ Solo admins pueden modificar candidatos

### Postulaciones

- ✅ Cualquiera puede crear postulación
- ✅ Solo admins pueden ver/modificar postulaciones

### Administradores

- ✅ Solo admins autenticados pueden ver/modificar

---

## 📦 Storage (Buckets)

### Bucket: `cvs`

- **Tipo**: Privado
- **Tamaño máximo**: 5 MB por archivo
- **Formatos**: Solo PDF
- **Carpeta**: `uploads/`

### Bucket: `logos` (Opcional)

- **Tipo**: Público
- **Tamaño máximo**: 2 MB por archivo
- **Formatos**: PNG, JPEG, SVG

---

## 🔧 Funciones Disponibles en `src/lib/supabase.ts`

### Vacantes

```typescript
obtenerVacantes(filtros?)           // GET con filtros opcionales
obtenerVacantePorSlug(slug)         // GET por slug + incrementar vistas
crearVacante(vacante)               // POST
actualizarVacante(id, cambios)      // PATCH
eliminarVacante(id)                 // DELETE
```

### Candidatos

```typescript
obtenerCandidatos(filtros?)         // GET con filtros
obtenerCandidatoPorId(id)           // GET por ID
crearCandidato(candidato)           // POST (verifica duplicados por email)
actualizarCandidato(id, cambios)    // PATCH
```

### Postulaciones

```typescript
obtenerPostulaciones(filtros?)      // GET con filtros
obtenerPostulacionPorId(id)         // GET por ID con JOIN completo
crearPostulacion(postulacion)       // POST
actualizarPostulacion(id, cambios)  // PATCH
agregarNotaPostulacion(id, nota)    // Agregar nota al array
eliminarNotaPostulacion(id, notaId) // Eliminar nota del array
agregarEtiquetaPostulacion(id, tag) // Agregar etiqueta
eliminarEtiquetaPostulacion(id, tag)// Eliminar etiqueta
```

### Estadísticas

```typescript
obtenerEstadisticasDashboard(); // Métricas del dashboard
obtenerPostulacionesRecientes(n); // Últimas N postulaciones
```

### Autenticación

```typescript
loginAdmin(email, password); // Login simple
verificarToken(token); // Validar token
```

### Configuración

```typescript
obtenerConfiguracion(clave); // GET config por clave
actualizarConfiguracion(clave, val); // UPSERT config
```

---

## 📤 Funciones de Storage en `src/lib/storage.ts`

```typescript
subirArchivo(file, bucket, carpeta); // Subir archivo
eliminarArchivo(url, bucket); // Eliminar archivo
descargarArchivo(url, bucket); // Descargar como Blob
validarArchivo(file, opciones); // Validar antes de subir
obtenerTamanoBucket(bucket); // Tamaño total del bucket
formatearBytes(bytes); // Formatear (ej: "2.5 MB")
```

---

## 🎣 Hooks de Autenticación en `src/hooks/useAuth.ts`

```typescript
useAuth()                  // Hook principal de auth
├── admin                  // Usuario autenticado
├── loading                // Estado de carga
├── isAuthenticated        // Boolean
├── logout()               // Cerrar sesión
└── checkAuth()            // Re-verificar token

useRequireAuth()           // Hook que redirige si no está autenticado

usePermissions()           // Hook de permisos por rol
├── canCreate              // Boolean
├── canEdit                // Boolean
├── canDelete              // Boolean
├── canView                // Boolean
└── rol                    // Rol del usuario
```

---

## 🚀 SIGUIENTE PASO: ¡CONFIGURAR!

### Opción A: Checklist Detallado (Recomendado)

Lee y sigue: **`CHECKLIST_SUPABASE.md`**

- Paso a paso con checkboxes
- Instrucciones visuales
- Incluye troubleshooting

### Opción B: Guía Completa

Lee: **`GUIA_SUPABASE.md`**

- Explicaciones detalladas
- Mejores prácticas
- Recursos adicionales

---

## 📝 Resumen de Pasos

1. **Obtener credenciales** de Supabase (URL + anon key)
2. **Completar `.env.local`** con tus credenciales
3. **Ejecutar `supabase-init.sql`** en SQL Editor de Supabase
4. **Crear buckets** de Storage (`cvs` y opcionalmente `logos`)
5. **Configurar políticas** de Storage
6. **Reiniciar servidor** (`npm run dev`)
7. **Probar login** en `/admin/login`
8. **Crear vacante** de prueba
9. **Hacer postulación** de prueba
10. **Verificar** que todo funcione

---

## ✅ Datos Iniciales

El script SQL crea automáticamente:

### Admin por Defecto

- **Email**: `admin@amanecerdecanela.com`
- **Password**: `admin123`
- **Rol**: Administrador

### Vacante de Ejemplo

- **Título**: Gerente de Producción
- **Ubicación**: Lima, Perú
- **Estado**: Activa

### Configuración Inicial

- Nombre de empresa
- Email de contacto
- Website
- 4 plantillas de email
- 3 preferencias de notificaciones

---

## 🔍 Verificación Rápida

Después de configurar, verifica:

✅ Puedes hacer login en `/admin/login`
✅ Dashboard muestra estadísticas correctas
✅ Puedes crear una vacante
✅ La vacante aparece en `/empleos`
✅ Puedes hacer una postulación
✅ La postulación aparece en admin
✅ Puedes cambiar el estado de la postulación
✅ Puedes agregar notas y etiquetas
✅ El CV se sube correctamente a Storage

---

## 🎨 Mejoras Futuras (Opcional)

### Seguridad

- Implementar bcrypt para passwords
- JWT en lugar de tokens simples
- Rate limiting
- 2FA (autenticación de dos factores)

### Funcionalidades

- Sistema de notificaciones por email
- Calendario de entrevistas
- Exportar a PDF/Excel
- Chat interno
- Integración con calendarios (Google Calendar)

### UX/UI

- Modo oscuro
- Notificaciones push
- Búsqueda avanzada con Algolia
- Drag & drop para cambiar estados

---

## 🆘 ¿Necesitas Ayuda?

1. **Consulta primero**: `CHECKLIST_SUPABASE.md` → sección Troubleshooting
2. **Revisa logs**: Supabase Dashboard → Logs
3. **Consola del navegador**: F12 → Console
4. **Terminal de Next.js**: Busca errores en rojo

---

## 📚 Recursos

- [Documentación Supabase](https://supabase.com/docs)
- [Guía RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

**🎉 ¡Todo listo para empezar! Sigue el CHECKLIST_SUPABASE.md y en 20 minutos tendrás todo funcionando.**
