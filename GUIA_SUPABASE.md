# 🚀 Guía de Configuración Supabase - Amanecer de Canela

## 📋 Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Creación de Tablas](#creación-de-tablas)
3. [Configuración de Storage](#configuración-de-storage)
4. [Variables de Entorno](#variables-de-entorno)
5. [Testing](#testing)
6. [Próximos Pasos](#próximos-pasos)

---

## 1. Configuración Inicial

### 1.1 Obtener Credenciales de Supabase

1. Ve a tu proyecto en: https://supabase.com/dashboard
2. En el menú lateral, ve a **Settings** > **API**
3. Copia estos valores:
   ```
   Project URL: https://xxxxxxxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (opcional)
   ```

### 1.2 Configurar Variables de Entorno

Abre el archivo `.env.local` y reemplaza con tus valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 2. Creación de Tablas

### 2.1 Ejecutar Script SQL

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Click en **New Query**
3. Copia TODO el contenido del script SQL que te proporcioné arriba
4. Click en **Run** (o presiona Ctrl+Enter)

### 2.2 Verificar Tablas Creadas

Ve a **Table Editor** y verifica que existan estas tablas:

- ✅ `vacantes` (9 columnas)
- ✅ `candidatos` (10 columnas)
- ✅ `postulaciones` (8 columnas)
- ✅ `administradores` (7 columnas)
- ✅ `configuracion` (4 columnas)

### 2.3 Verificar Vistas Creadas

Ve a **Database** > **Views** y verifica:

- ✅ `postulaciones_completas`
- ✅ `estadisticas_vacantes`
- ✅ `estadisticas_candidatos`

---

## 3. Configuración de Storage

### 3.1 Crear Bucket para CVs

1. Ve a **Storage** en el menú lateral
2. Click en **New bucket**
3. Configura:
   - **Name**: `cvs`
   - **Public bucket**: ❌ NO (privado)
   - **Allowed MIME types**: `application/pdf`
   - **Max file size**: `5 MB`
4. Click en **Create bucket**

### 3.2 Configurar Políticas de Storage

En **Storage** > **cvs** > **Policies**, crea estas políticas:

**Política 1: Permitir subida pública de CVs**

```sql
CREATE POLICY "Permitir subida de CVs"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'cvs' AND (storage.foldername(name))[1] = 'uploads');
```

**Política 2: Admins pueden ver todos los CVs**

```sql
CREATE POLICY "Admins pueden ver CVs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'cvs');
```

### 3.3 Crear Bucket para Logos (Opcional)

Repite el proceso para un bucket `logos`:

- **Name**: `logos`
- **Public bucket**: ✅ SÍ (público)
- **Allowed MIME types**: `image/png,image/jpeg,image/svg+xml`
- **Max file size**: `2 MB`

---

## 4. Variables de Entorno

Tu archivo `.env.local` debe quedar así:

```env
# SUPABASE CONFIGURATION
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OPCIONAL: Para operaciones de admin
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ IMPORTANTE**: Nunca subas `.env.local` a Git. Está en `.gitignore`.

---

## 5. Testing

### 5.1 Verificar Conexión

Reinicia el servidor de desarrollo:

```bash
npm run dev
```

Deberías ver en consola:

```
✓ Ready in 2.1s
✓ Local: http://localhost:3000
```

### 5.2 Probar Login Admin

1. Ve a: http://localhost:3000/admin/login
2. Usa las credenciales:
   ```
   Email: admin@amanecerdecanela.com
   Password: admin123
   ```
3. Deberías entrar al dashboard

### 5.3 Crear Primera Vacante

1. En el panel admin, ve a **Vacantes**
2. Click en **+ Nueva Vacante**
3. Llena el formulario
4. Click en **Guardar**
5. Ve a Supabase > Table Editor > vacantes
6. Verifica que se creó el registro

### 5.4 Probar Postulación Pública

1. Ve a: http://localhost:3000/empleos
2. Deberías ver la vacante que creaste
3. Click en la vacante
4. Llena el formulario de postulación
5. Sube un CV (PDF)
6. Envía la postulación
7. Verifica en Supabase que se crearon:
   - Nuevo candidato en `candidatos`
   - Nueva postulación en `postulaciones`
   - Archivo en Storage > cvs

---

## 6. Próximos Pasos

### 6.1 Funcionalidades Completadas ✅

- ✅ Base de datos configurada
- ✅ Autenticación admin (simple)
- ✅ CRUD de vacantes
- ✅ CRUD de candidatos
- ✅ CRUD de postulaciones
- ✅ Sistema de notas
- ✅ Sistema de etiquetas
- ✅ Cambio de estados
- ✅ Estadísticas en dashboard
- ✅ Filtros y búsquedas
- ✅ Storage para CVs

### 6.2 Mejoras Recomendadas 🚀

**Seguridad**:

- [ ] Implementar bcrypt para hashear passwords
- [ ] Usar JWT en lugar de tokens simples
- [ ] Configurar RLS más restrictivo
- [ ] Agregar rate limiting

**Funcionalidades**:

- [ ] Sistema de notificaciones por email (SendGrid/Resend)
- [ ] Calendario para entrevistas
- [ ] Reportes en PDF
- [ ] Chat interno entre reclutadores
- [ ] Integración con Zoom para videollamadas

**UX**:

- [ ] Modo oscuro
- [ ] Notificaciones push
- [ ] Búsqueda avanzada con Algolia
- [ ] Exportar datos a Excel

---

## 🆘 Troubleshooting

### Error: "Failed to fetch"

- Verifica que las URLs en `.env.local` sean correctas
- Reinicia el servidor de desarrollo
- Verifica que Supabase esté activo

### Error: "Row Level Security policy violation"

- Ve a Supabase > Authentication > Policies
- Verifica que las políticas RLS estén configuradas
- Temporalmente puedes desactivar RLS para testing:
  ```sql
  ALTER TABLE vacantes DISABLE ROW LEVEL SECURITY;
  ```

### CVs no se suben

- Verifica que el bucket `cvs` exista
- Verifica las políticas de Storage
- Verifica el tamaño del archivo (max 5MB)
- Verifica que sea PDF

### No aparecen datos en el dashboard

- Verifica que tengas datos en las tablas
- Abre la consola del navegador (F12) y busca errores
- Verifica que las vistas SQL se hayan creado correctamente

---

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Supabase > Logs
2. Verifica la consola del navegador (F12)
3. Revisa la terminal de Next.js
4. Consulta la documentación de Supabase

---

**✅ Todo listo! Ahora tu aplicación está conectada a Supabase y lista para usar en producción.**
