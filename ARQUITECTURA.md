# 🏗️ ARQUITECTURA DEL SISTEMA

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 15)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │  Páginas Públicas │              │   Panel Admin    │         │
│  ├──────────────────┤              ├──────────────────┤         │
│  │ /                │              │ /admin/login     │         │
│  │ /empleos         │              │ /admin           │         │
│  │ /empleos/[slug]  │              │ /admin/vacantes  │         │
│  │ /postular/[slug] │              │ /admin/postul..  │         │
│  │ /confirmacion    │              │ /admin/candidat. │         │
│  └────────┬─────────┘              └──────────┬───────┘         │
│           │                                   │                  │
│           └───────────┬───────────────────────┘                  │
│                       │                                          │
│            ┌──────────▼──────────┐                              │
│            │   Capa de Datos     │                              │
│            ├─────────────────────┤                              │
│            │ src/lib/supabase.ts │◄──── Funciones de BD        │
│            │ src/lib/storage.ts  │◄──── Funciones de Storage   │
│            │ src/hooks/useAuth.ts│◄──── Hooks de Auth          │
│            └──────────┬──────────┘                              │
└───────────────────────┼─────────────────────────────────────────┘
                        │
                        │ HTTPS + JWT
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│                    BACKEND (Supabase)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    PostgreSQL Database                   │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────┐           │   │
│  │  │ vacantes │  │candidatos│  │postulaciones│           │   │
│  │  └────┬─────┘  └────┬─────┘  └──────┬──────┘           │   │
│  │       │             │                │                   │   │
│  │       └─────────────┴────────────────┘                   │   │
│  │                     │                                     │   │
│  │       ┌─────────────┴─────────────┐                     │   │
│  │       │  ┌────────────────────┐   │                     │   │
│  │       │  │ administradores    │   │                     │   │
│  │       │  ├────────────────────┤   │                     │   │
│  │       │  │ configuracion      │   │                     │   │
│  │       │  └────────────────────┘   │                     │   │
│  │       └──────────────────────────┘                      │   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │                    VISTAS                        │   │   │
│  │  ├─────────────────────────────────────────────────┤   │   │
│  │  │ • postulaciones_completas                       │   │   │
│  │  │ • estadisticas_vacantes                         │   │   │
│  │  │ • estadisticas_candidatos                       │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │              FUNCIONES SQL                       │   │   │
│  │  ├─────────────────────────────────────────────────┤   │   │
│  │  │ • incrementar_vistas_vacante()                  │   │   │
│  │  │ • contar_postulaciones_por_estado()             │   │   │
│  │  │ • update_updated_at_column() [trigger]          │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Storage (S3-compatible)                │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  Bucket: cvs/                 Bucket: logos/            │   │
│  │  ├── uploads/                 ├── company/              │   │
│  │  │   ├── 123_cv.pdf           │   └── logo.png          │   │
│  │  │   └── 456_cv.pdf           └─────────────────        │   │
│  │  └──────────────────                                     │   │
│  │                                                           │   │
│  │  Políticas RLS:                                          │   │
│  │  • Public INSERT en cvs/uploads/                        │   │
│  │  • Authenticated SELECT en cvs/*                        │   │
│  │  • Public SELECT en logos/*                             │   │
│  │                                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Row Level Security (RLS)                    │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  Public:                                                 │   │
│  │  • SELECT vacantes WHERE estado='Activa'                │   │
│  │  • INSERT candidatos                                     │   │
│  │  • INSERT postulaciones                                  │   │
│  │                                                           │   │
│  │  Authenticated (Admins):                                │   │
│  │  • ALL vacantes                                          │   │
│  │  • ALL candidatos                                        │   │
│  │  • ALL postulaciones                                     │   │
│  │  • ALL administradores                                   │   │
│  │  • ALL configuracion                                     │   │
│  │                                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos

### 1️⃣ Postulación Pública (Usuario Normal)

```
Usuario en /empleos/[slug]
         │
         │ 1. Llena formulario
         │ 2. Sube CV (PDF)
         │
         ▼
   subirArchivo(file)  ──────► Supabase Storage
         │                           │
         │                           │ Returns: cv_url
         │                           │
         ▼                           ▼
   crearCandidato() ──────► Tabla: candidatos
         │                     (deduplica por email)
         │                           │
         │                           │ Returns: candidato_id
         │                           │
         ▼                           ▼
   crearPostulacion() ─────► Tabla: postulaciones
         │                     (vincula candidato + vacante)
         │
         ▼
   Redirect: /confirmacion
```

### 2️⃣ Dashboard Admin (Panel Administrativo)

```
Admin en /admin
         │
         │ useAuth() → Verifica token
         │
         ▼
   obtenerEstadisticasDashboard()
         │
         │ Ejecuta queries:
         │ • COUNT vacantes WHERE estado='Activa'
         │ • RPC contar_postulaciones_por_estado()
         │ • COUNT candidatos
         │
         ▼
   Renderiza cards con métricas
         │
         ▼
   obtenerPostulacionesRecientes(5)
         │
         │ SELECT FROM postulaciones_completas
         │ ORDER BY created_at DESC
         │ LIMIT 5
         │
         ▼
   Renderiza tabla de postulaciones
```

### 3️⃣ Gestión de Vacantes (Admin)

```
Admin en /admin/vacantes
         │
         │ Click "Nueva Vacante"
         │
         ▼
   Modal con formulario
         │
         │ 1. Llena datos
         │ 2. Agrega responsabilidades (array)
         │ 3. Agrega requisitos (array)
         │ 4. Agrega beneficios (array)
         │
         ▼
   crearVacante(data)
         │
         │ Genera slug automático
         │ Estado por defecto: 'Activa'
         │
         ▼
   INSERT INTO vacantes ─────► PostgreSQL
         │
         │ Returns: nueva vacante
         │
         ▼
   Actualiza lista local (useState)
   Cierra modal
   Muestra notificación success
```

### 4️⃣ Cambio de Estado de Postulación

```
Admin en /admin/postulaciones/[id]
         │
         │ Click "Marcar como En Revisión"
         │
         ▼
   actualizarPostulacion(id, { estado: 'En revisión' })
         │
         │ UPDATE postulaciones
         │ SET estado = 'En revisión',
         │     updated_at = NOW()
         │ WHERE id = ?
         │
         ▼
   Trigger: update_updated_at_column()
         │
         ▼
   Returns: postulación actualizada
         │
         ▼
   Actualiza UI local
   Actualiza timeline visual
   Muestra notificación success
```

### 5️⃣ Sistema de Notas

```
Admin agrega nota
         │
         │ Escribe texto
         │ Click "Agregar"
         │
         ▼
   agregarNotaPostulacion(id, { texto, autor })
         │
         │ 1. SELECT notas FROM postulaciones WHERE id=?
         │ 2. Agrega nueva nota al array:
         │    {
         │      id: crypto.randomUUID(),
         │      texto: "...",
         │      autor: "Admin",
         │      fecha: "2025-10-22T..."
         │    }
         │ 3. UPDATE postulaciones
         │    SET notas = [...notas, nueva]
         │
         ▼
   PostgreSQL almacena como JSONB
         │
         ▼
   Returns: postulación actualizada
         │
         ▼
   Renderiza nota en lista
   Scroll automático al final
```

---

## 🗂️ Relaciones entre Tablas

```
vacantes (1) ─────< (N) postulaciones (N) >───── (1) candidatos
    │                        │
    │                        │
    │                        └── notas (JSONB array)
    │                        └── etiquetas (JSONB array)
    │
    └── responsabilidades (JSONB array)
    └── requisitos (JSONB array)
    └── ofrecemos (JSONB array)

administradores (independiente)
    └── gestiona → vacantes, candidatos, postulaciones

configuracion (independiente)
    └── almacena → preferencias del sistema
```

---

## 🔐 Autenticación Simple

```
Usuario ingresa credenciales en /admin/login
         │
         ▼
   loginAdmin(email, password)
         │
         │ 1. SELECT * FROM administradores
         │    WHERE email = ? AND activo = true
         │
         │ 2. Verifica password (texto plano por ahora)
         │    Producción: usar bcrypt.compare()
         │
         │ 3. Crea token simple:
         │    token = btoa(JSON.stringify({
         │      id, email, nombre, rol,
         │      exp: Date.now() + 24h
         │    }))
         │
         ▼
   localStorage.setItem('admin_token', token)
         │
         ▼
   Redirect: /admin
         │
         ▼
   useAuth() verifica token en cada página
         │
         │ verificarToken(token)
         │ └── Verifica exp < Date.now()
         │
         ▼
   Si válido: permite acceso
   Si inválido: redirect /admin/login
```

---

## 📦 Flujo de Storage

```
Usuario sube CV en formulario
         │
         │ <input type="file" accept=".pdf" />
         │
         ▼
   validarArchivo(file, { maxSize: 5, allowedTypes: ['application/pdf'] })
         │
         │ Verifica:
         │ • file.size <= 5MB
         │ • file.type === 'application/pdf'
         │
         ▼
   subirArchivo(file, 'cvs', 'uploads')
         │
         │ 1. Genera nombre único:
         │    timestamp_nombreArchivo.pdf
         │
         │ 2. supabase.storage.from('cvs')
         │    .upload('uploads/123_cv.pdf', file)
         │
         │ 3. Verifica políticas RLS:
         │    ✓ Public puede INSERT en cvs/
         │
         │ 4. Obtiene URL pública:
         │    getPublicUrl(path)
         │
         ▼
   Returns: https://xxx.supabase.co/storage/v1/object/public/cvs/uploads/123_cv.pdf
         │
         ▼
   Guarda URL en:
   • candidatos.cv_url
   • postulaciones.cv_url
```

---

## 📊 Vistas Optimizadas

### postulaciones_completas

```sql
-- En lugar de hacer 3 queries:
SELECT * FROM postulaciones WHERE id = ?
SELECT * FROM candidatos WHERE id = ?
SELECT * FROM vacantes WHERE id = ?

-- Hacemos 1 query:
SELECT * FROM postulaciones_completas WHERE id = ?
-- Returns: todo junto con JOINs ya hechos
```

### estadisticas_vacantes

```sql
-- En lugar de contar manualmente:
SELECT id FROM postulaciones WHERE vacante_id = ? AND estado = 'Nueva'
SELECT id FROM postulaciones WHERE vacante_id = ? AND estado = 'En revisión'
-- etc...

-- Hacemos 1 query:
SELECT * FROM estadisticas_vacantes WHERE id = ?
-- Returns: todos los conteos calculados
```

---

## 🎯 Puntos Clave de Seguridad

### ✅ Implementado

- RLS activado en todas las tablas
- Políticas para separar público/admin
- Storage con políticas separadas
- Validación de archivos (tamaño, tipo)
- Tokens con expiración (24h)

### ⚠️ Para Producción

- [ ] Hashear passwords con bcrypt
- [ ] JWT en lugar de tokens simples
- [ ] HTTPS obligatorio
- [ ] Rate limiting
- [ ] 2FA para admins
- [ ] Logs de auditoría
- [ ] Sanitización de inputs
- [ ] CORS configurado

---

## 📈 Rendimiento

### Índices Creados

- `idx_vacantes_estado` → Filtros rápidos por estado
- `idx_vacantes_categoria` → Filtros por categoría
- `idx_postulaciones_estado` → Dashboard rápido
- `idx_candidatos_email` → Deduplicación rápida
- Y más...

### Optimizaciones

- Vistas pre-calculadas con JOINs
- Contadores en lugar de COUNT(\*) repetidos
- JSONB para arrays (flexible + indexable)
- Timestamps automáticos con triggers

---

**🎉 ¡Sistema completo y optimizado! Listo para escalar.**
