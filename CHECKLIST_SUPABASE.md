# 🎯 CHECKLIST DE CONFIGURACIÓN SUPABASE

## ✅ PASO 1: Configuración Inicial (5 minutos)

### 1.1 Obtener Credenciales

- [ ] Ir a https://supabase.com/dashboard
- [ ] Seleccionar tu proyecto
- [ ] Ir a **Settings** → **API**
- [ ] Copiar **Project URL**
- [ ] Copiar **anon/public key**

### 1.2 Configurar Variables de Entorno

- [ ] Abrir el archivo `.env.local` en la raíz del proyecto
- [ ] Reemplazar `tu-proyecto-url.supabase.co` con tu Project URL
- [ ] Reemplazar `tu-anon-key-aqui` con tu anon key
- [ ] Guardar el archivo

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ PASO 2: Crear Base de Datos (3 minutos)

### 2.1 Ejecutar Script SQL

- [ ] En Supabase, ir a **SQL Editor**
- [ ] Click en **New Query**
- [ ] Abrir el archivo `supabase-init.sql` de tu proyecto
- [ ] Copiar TODO el contenido
- [ ] Pegar en el editor SQL de Supabase
- [ ] Click en **Run** (o Ctrl+Enter)
- [ ] Esperar que termine (debería decir "Success")

### 2.2 Verificar Tablas Creadas

- [ ] Ir a **Table Editor** en Supabase
- [ ] Verificar que existan estas 5 tablas:
  - `vacantes`
  - `candidatos`
  - `postulaciones`
  - `administradores`
  - `configuracion`

### 2.3 Verificar Admin Creado

- [ ] En **Table Editor**, abrir tabla `administradores`
- [ ] Verificar que exista un registro con email: `admin@amanecerdecanela.com`

---

## ✅ PASO 3: Configurar Storage (5 minutos)

### 3.1 Crear Bucket para CVs

- [ ] En Supabase, ir a **Storage**
- [ ] Click en **New bucket**
- [ ] Configurar:
  - **Name**: `cvs`
  - **Public bucket**: ❌ NO (dejar desmarcado)
  - Click en **Create bucket**

### 3.2 Configurar Políticas de Storage para CVs

- [ ] Click en el bucket `cvs` recién creado
- [ ] Ir a la pestaña **Policies**
- [ ] Click en **New Policy**
- [ ] Seleccionar **For full customization**

**Política 1: Permitir subida pública**

- [ ] Click en **Create a new policy**
- [ ] Configurar:
  - **Policy name**: `Permitir subida pública de CVs`
  - **Allowed operation**: `INSERT`
  - **Target roles**: `public`
  - **Policy definition (USING)**: Dejar vacío
  - **Policy definition (WITH CHECK)**:
    ```sql
    bucket_id = 'cvs'
    ```
- [ ] Click en **Review** y luego **Save policy**

**Política 2: Permitir lectura a usuarios autenticados**

- [ ] Click en **Create a new policy** nuevamente
- [ ] Configurar:
  - **Policy name**: `Admins pueden ver CVs`
  - **Allowed operation**: `SELECT`
  - **Target roles**: `authenticated`
  - **Policy definition (USING)**:
    ```sql
    bucket_id = 'cvs'
    ```
- [ ] Click en **Review** y luego **Save policy**

### 3.3 Crear Bucket para Logos (Opcional)

- [ ] Regresar a **Storage**
- [ ] Click en **New bucket**
- [ ] Configurar:
  - **Name**: `logos`
  - **Public bucket**: ✅ SÍ (marcar como público)
  - Click en **Create bucket**

---

## ✅ PASO 4: Instalar Dependencias (2 minutos)

- [ ] Abrir terminal en el proyecto
- [ ] Ejecutar:
  ```bash
  npm install @supabase/supabase-js
  ```
- [ ] Esperar que termine la instalación

---

## ✅ PASO 5: Probar la Integración (5 minutos)

### 5.1 Reiniciar Servidor

- [ ] En la terminal, detener el servidor (Ctrl+C)
- [ ] Ejecutar:
  ```bash
  npm run dev
  ```
- [ ] Esperar que inicie en http://localhost:3000

### 5.2 Probar Login Admin

- [ ] Abrir http://localhost:3000/admin/login
- [ ] Usar credenciales:
  - **Email**: `admin@amanecerdecanela.com`
  - **Password**: `admin123`
- [ ] Click en **Iniciar Sesión**
- [ ] Deberías ver el Dashboard

### 5.3 Crear Primera Vacante

- [ ] En el panel admin, ir a **Vacantes**
- [ ] Click en **+ Nueva Vacante**
- [ ] Llenar el formulario:
  - **Título**: "Desarrollador Full Stack"
  - **Ubicación**: "Lima, Perú"
  - **Tipo**: "Tiempo Completo"
  - **Categoría**: "Administrativo"
  - **Puestos disponibles**: 2
  - **Salario mín**: 3000
  - **Salario máx**: 5000
  - **Descripción**: "Buscamos desarrollador con experiencia..."
  - **Responsabilidades**: Escribir cada responsabilidad y presionar Enter
  - **Requisitos**: Escribir cada requisito y presionar Enter
  - **Ofrecemos**: Escribir cada beneficio y presionar Enter
  - **Estado**: "Activa"
- [ ] Click en **Guardar**
- [ ] La vacante debería aparecer en la lista

### 5.4 Verificar en Supabase

- [ ] Ir a Supabase → **Table Editor** → tabla `vacantes`
- [ ] Verificar que aparezca la vacante que creaste
- [ ] Debería tener todos los datos que ingresaste

### 5.5 Probar Vista Pública

- [ ] Ir a http://localhost:3000/empleos
- [ ] Deberías ver la vacante que creaste
- [ ] Click en la vacante
- [ ] Deberías ver todos los detalles

---

## ✅ PASO 6: Probar Postulación (10 minutos)

### 6.1 Crear Postulación de Prueba

- [ ] En la página de detalle de la vacante (http://localhost:3000/empleos/[slug])
- [ ] Scroll hasta el formulario
- [ ] Llenar todos los campos:
  - **Nombre completo**: "Juan Pérez"
  - **Email**: "juan@ejemplo.com"
  - **Teléfono**: "987654321"
  - **Ciudad**: "Lima"
  - **Años de experiencia**: "3-5 años"
  - **Habilidades**: Agregar algunas (ej: "JavaScript", "React", "Node.js")
- [ ] Subir un archivo PDF de prueba como CV
- [ ] Click en **Enviar Postulación**
- [ ] Deberías ver mensaje de confirmación

### 6.2 Verificar en el Admin

- [ ] Ir a http://localhost:3000/admin/postulaciones
- [ ] Deberías ver la postulación que acabas de crear
- [ ] Click en la postulación para ver los detalles
- [ ] Verificar que todos los datos estén correctos

### 6.3 Probar Cambio de Estado

- [ ] En la página de detalle de la postulación
- [ ] Click en **Marcar como En Revisión**
- [ ] El estado debería cambiar
- [ ] Ir a Supabase → tabla `postulaciones`
- [ ] Verificar que el estado se actualizó

### 6.4 Probar Sistema de Notas

- [ ] En la postulación, agregar una nota de prueba
- [ ] Click en **Agregar Nota**
- [ ] La nota debería aparecer en la lista
- [ ] Verificar en Supabase que se guardó en la columna `notas` (es un JSON)

### 6.5 Probar Sistema de Etiquetas

- [ ] Agregar una etiqueta sugerida (ej: "Destacado")
- [ ] Agregar una etiqueta personalizada
- [ ] Verificar en Supabase que se guardó en la columna `etiquetas`

---

## ✅ PASO 7: Verificaciones Finales

### 7.1 Verificar Storage

- [ ] Ir a Supabase → **Storage** → bucket `cvs`
- [ ] Deberías ver el CV que subiste
- [ ] El archivo debería estar en la carpeta `uploads/`

### 7.2 Verificar Vistas

- [ ] En Supabase, ir a **Database** → **Views**
- [ ] Verificar que existan:
  - `postulaciones_completas`
  - `estadisticas_vacantes`
  - `estadisticas_candidatos`

### 7.3 Verificar Dashboard

- [ ] Ir a http://localhost:3000/admin
- [ ] Verificar que las estadísticas sean correctas:
  - Vacantes activas debería ser 1 (o el número que hayas creado)
  - Postulaciones nuevas debería mostrar el número correcto
  - El total de candidatos debería ser 1

---

## 🎉 ¡CONFIGURACIÓN COMPLETA!

Si todos los pasos anteriores funcionaron correctamente, tu aplicación está **100% funcional** con Supabase.

### Próximos pasos opcionales:

#### 🔒 Seguridad (Recomendado para Producción)

- [ ] Implementar bcrypt para hashear passwords
- [ ] Configurar JWT para tokens más seguros
- [ ] Configurar CORS en Supabase
- [ ] Revisar políticas RLS más restrictivas

#### 📧 Notificaciones por Email

- [ ] Crear cuenta en Resend.com o SendGrid
- [ ] Configurar API key en `.env.local`
- [ ] Implementar envío de emails en `/src/lib/email.ts`

#### 📊 Analytics

- [ ] Configurar Google Analytics
- [ ] Agregar tracking de eventos
- [ ] Dashboard de métricas

#### 🚀 Deploy

- [ ] Deploy en Vercel
- [ ] Configurar variables de entorno en Vercel
- [ ] Configurar dominio personalizado

---

## 🆘 Troubleshooting

### Error: "Failed to fetch"

✅ **Solución**:

- Verifica que las URLs en `.env.local` sean correctas
- Reinicia el servidor (`npm run dev`)
- Verifica que tu proyecto Supabase esté activo

### Error: "Row Level Security policy violation"

✅ **Solución**:

- Verifica que ejecutaste el script SQL completo
- Ve a Supabase → Authentication → Policies
- Temporalmente puedes desactivar RLS:
  ```sql
  ALTER TABLE vacantes DISABLE ROW LEVEL SECURITY;
  ```

### CVs no se suben

✅ **Solución**:

- Verifica que el bucket `cvs` exista
- Verifica las políticas de Storage
- Verifica el tamaño del archivo (max 5MB)
- Verifica que sea formato PDF

### No aparecen vacantes en la vista pública

✅ **Solución**:

- Ve a Supabase → tabla `vacantes`
- Verifica que el campo `estado` sea "Activa"
- Las políticas RLS solo muestran vacantes activas al público

---

## 📞 Contacto

Si tienes problemas que no se resuelven con el troubleshooting:

1. Revisa los logs en Supabase → **Logs**
2. Revisa la consola del navegador (F12)
3. Revisa la terminal de Next.js

**¡Buena suerte! 🚀**
