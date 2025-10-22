-- =============================================
-- SCRIPT DE INICIALIZACIÓN SUPABASE
-- Sistema de Reclutamiento - Amanecer de Canela
-- =============================================
-- INSTRUCCIONES:
-- 1. Copia TODO este archivo
-- 2. Ve a tu proyecto Supabase > SQL Editor
-- 3. Pega el contenido y presiona Run
-- =============================================

-- LIMPIAR TABLAS EXISTENTES (opcional)
-- DROP TABLE IF EXISTS postulaciones CASCADE;
-- DROP TABLE IF EXISTS candidatos CASCADE;
-- DROP TABLE IF EXISTS vacantes CASCADE;
-- DROP TABLE IF EXISTS administradores CASCADE;
-- DROP TABLE IF EXISTS configuracion CASCADE;

-- =============================================
-- CREAR TABLAS
-- =============================================

-- Tabla: Vacantes
CREATE TABLE IF NOT EXISTS vacantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  ubicacion TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('Tiempo Completo', 'Medio Tiempo', 'Por Proyecto')),
  categoria TEXT NOT NULL,
  salario_min INTEGER NOT NULL,
  salario_max INTEGER NOT NULL,
  descripcion TEXT NOT NULL,
  responsabilidades JSONB DEFAULT '[]'::jsonb,
  requisitos JSONB DEFAULT '[]'::jsonb,
  ofrecemos JSONB DEFAULT '[]'::jsonb,
  estado TEXT NOT NULL DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Pausada', 'Cerrada')),
  vacantes_disponibles INTEGER NOT NULL DEFAULT 1,
  fecha_publicacion TIMESTAMPTZ DEFAULT NOW(),
  vistas INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: Candidatos
CREATE TABLE IF NOT EXISTS candidatos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  apellidos TEXT,
  email TEXT UNIQUE NOT NULL,
  telefono TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  experiencia TEXT NOT NULL,
  cv_url TEXT,
  habilidades JSONB DEFAULT '[]'::jsonb,
  estado TEXT DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Contratado', 'Descartado')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: Postulaciones
CREATE TABLE IF NOT EXISTS postulaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidato_id UUID NOT NULL REFERENCES candidatos(id) ON DELETE CASCADE,
  vacante_id UUID NOT NULL REFERENCES vacantes(id) ON DELETE CASCADE,
  estado TEXT NOT NULL DEFAULT 'Nueva' CHECK (estado IN ('Nueva', 'En revisión', 'Entrevista', 'Rechazada', 'Contratado')),
  cv_url TEXT,
  notas JSONB DEFAULT '[]'::jsonb,
  etiquetas JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(candidato_id, vacante_id)
);

-- Tabla: Administradores
CREATE TABLE IF NOT EXISTS administradores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nombre TEXT NOT NULL,
    rol TEXT DEFAULT 'Reclutador' CHECK (
        rol IN (
            'Administrador',
            'Reclutador',
            'Visor'
        )
    ),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: Configuración
CREATE TABLE IF NOT EXISTS configuracion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    clave TEXT UNIQUE NOT NULL,
    valor JSONB NOT NULL,
    descripcion TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CREAR ÍNDICES
-- =============================================

-- Índices para Vacantes
CREATE INDEX IF NOT EXISTS idx_vacantes_estado ON vacantes (estado);

CREATE INDEX IF NOT EXISTS idx_vacantes_categoria ON vacantes (categoria);

CREATE INDEX IF NOT EXISTS idx_vacantes_fecha ON vacantes (fecha_publicacion DESC);

CREATE INDEX IF NOT EXISTS idx_vacantes_slug ON vacantes (slug);

-- Índices para Candidatos
CREATE INDEX IF NOT EXISTS idx_candidatos_email ON candidatos (email);

CREATE INDEX IF NOT EXISTS idx_candidatos_estado ON candidatos (estado);

CREATE INDEX IF NOT EXISTS idx_candidatos_ciudad ON candidatos (ciudad);

-- Índices para Postulaciones
CREATE INDEX IF NOT EXISTS idx_postulaciones_candidato ON postulaciones (candidato_id);

CREATE INDEX IF NOT EXISTS idx_postulaciones_vacante ON postulaciones (vacante_id);

CREATE INDEX IF NOT EXISTS idx_postulaciones_estado ON postulaciones (estado);

CREATE INDEX IF NOT EXISTS idx_postulaciones_fecha ON postulaciones (created_at DESC);

-- Índices para Administradores
CREATE INDEX IF NOT EXISTS idx_administradores_email ON administradores (email);

-- =============================================
-- TRIGGERS PARA ACTUALIZAR updated_at
-- =============================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar triggers
DROP TRIGGER IF EXISTS update_vacantes_updated_at ON vacantes;

CREATE TRIGGER update_vacantes_updated_at 
  BEFORE UPDATE ON vacantes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_candidatos_updated_at ON candidatos;

CREATE TRIGGER update_candidatos_updated_at 
  BEFORE UPDATE ON candidatos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_postulaciones_updated_at ON postulaciones;

CREATE TRIGGER update_postulaciones_updated_at 
  BEFORE UPDATE ON postulaciones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_administradores_updated_at ON administradores;

CREATE TRIGGER update_administradores_updated_at 
  BEFORE UPDATE ON administradores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- CREAR VISTAS
-- =============================================

-- Vista: Postulaciones con información completa
CREATE OR REPLACE VIEW postulaciones_completas AS
SELECT
    p.id,
    p.estado,
    p.notas,
    p.etiquetas,
    p.cv_url,
    p.created_at as fecha_postulacion,
    p.updated_at,
    c.id as candidato_id,
    CONCAT(
        c.nombre,
        ' ',
        COALESCE(c.apellidos, '')
    ) as candidato_nombre,
    c.email as candidato_email,
    c.telefono as candidato_telefono,
    c.ciudad as candidato_ciudad,
    c.experiencia,
    c.habilidades,
    v.id as vacante_id,
    v.titulo as vacante_titulo,
    v.ubicacion as vacante_ubicacion,
    v.slug as vacante_slug
FROM
    postulaciones p
    JOIN candidatos c ON p.candidato_id = c.id
    JOIN vacantes v ON p.vacante_id = v.id;

-- Vista: Estadísticas de Vacantes
CREATE OR REPLACE VIEW estadisticas_vacantes AS
SELECT
    v.id,
    v.titulo,
    v.estado,
    v.vistas,
    v.vacantes_disponibles,
    COUNT(p.id) as total_postulaciones,
    COUNT(
        CASE
            WHEN p.estado = 'Nueva' THEN 1
        END
    ) as postulaciones_nuevas,
    COUNT(
        CASE
            WHEN p.estado = 'En revisión' THEN 1
        END
    ) as en_revision,
    COUNT(
        CASE
            WHEN p.estado = 'Entrevista' THEN 1
        END
    ) as en_entrevista,
    COUNT(
        CASE
            WHEN p.estado = 'Contratado' THEN 1
        END
    ) as contratados
FROM vacantes v
    LEFT JOIN postulaciones p ON v.id = p.vacante_id
GROUP BY
    v.id;

-- Vista: Estadísticas de Candidatos
CREATE OR REPLACE VIEW estadisticas_candidatos AS
SELECT
    c.id,
    c.nombre,
    c.apellidos,
    c.email,
    c.estado,
    c.experiencia,
    c.ciudad,
    c.habilidades,
    c.created_at,
    COUNT(p.id) as total_postulaciones,
    MAX(p.created_at) as ultima_postulacion
FROM candidatos c
    LEFT JOIN postulaciones p ON c.id = p.candidato_id
GROUP BY
    c.id;

-- =============================================
-- FUNCIONES ÚTILES
-- =============================================

-- Función: Incrementar vistas de vacante
CREATE OR REPLACE FUNCTION incrementar_vistas_vacante(vacante_slug TEXT)
RETURNS void AS $$
BEGIN
    UPDATE vacantes 
    SET vistas = vistas + 1 
    WHERE slug = vacante_slug;
END;
$$ LANGUAGE plpgsql;

-- Función: Obtener conteo de postulaciones por estado
CREATE OR REPLACE FUNCTION contar_postulaciones_por_estado()
RETURNS TABLE(estado TEXT, total BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT p.estado, COUNT(*)::BIGINT
    FROM postulaciones p
    GROUP BY p.estado;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- CONFIGURAR ROW LEVEL SECURITY (RLS)
-- =============================================

-- Habilitar RLS
ALTER TABLE vacantes ENABLE ROW LEVEL SECURITY;

ALTER TABLE candidatos ENABLE ROW LEVEL SECURITY;

ALTER TABLE postulaciones ENABLE ROW LEVEL SECURITY;

ALTER TABLE administradores ENABLE ROW LEVEL SECURITY;

ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

-- Políticas para Vacantes
DROP POLICY IF EXISTS "Vacantes públicas para lectura" ON vacantes;

CREATE POLICY "Vacantes públicas para lectura" ON vacantes FOR
SELECT USING (
        estado = 'Activa'
        OR auth.role () = 'authenticated'
    );

DROP POLICY IF EXISTS "Solo admins pueden modificar vacantes" ON vacantes;

CREATE POLICY "Solo admins pueden modificar vacantes" ON vacantes FOR ALL USING (
    auth.role () = 'authenticated'
);

-- Políticas para Candidatos
DROP POLICY IF EXISTS "Candidatos pueden crear perfil" ON candidatos;

CREATE POLICY "Candidatos pueden crear perfil" ON candidatos FOR
INSERT
WITH
    CHECK (true);

DROP POLICY IF EXISTS "Solo admins pueden ver candidatos" ON candidatos;

CREATE POLICY "Solo admins pueden ver candidatos" ON candidatos FOR
SELECT USING (
        auth.role () = 'authenticated'
        OR email = auth.jwt () ->> 'email'
    );

DROP POLICY IF EXISTS "Solo admins pueden modificar candidatos" ON candidatos;

CREATE POLICY "Solo admins pueden modificar candidatos" ON candidatos FOR
UPDATE USING (
    auth.role () = 'authenticated'
);

-- Políticas para Postulaciones
DROP POLICY IF EXISTS "Cualquiera puede crear postulación" ON postulaciones;

CREATE POLICY "Cualquiera puede crear postulación" ON postulaciones FOR
INSERT
WITH
    CHECK (true);

DROP POLICY IF EXISTS "Solo admins pueden ver postulaciones" ON postulaciones;

CREATE POLICY "Solo admins pueden ver postulaciones" ON postulaciones FOR
SELECT USING (
        auth.role () = 'authenticated'
    );

DROP POLICY IF EXISTS "Solo admins pueden modificar postulaciones" ON postulaciones;

CREATE POLICY "Solo admins pueden modificar postulaciones" ON postulaciones FOR
UPDATE USING (
    auth.role () = 'authenticated'
);

-- Políticas para Administradores
DROP POLICY IF EXISTS "Solo admins pueden ver admins" ON administradores;

CREATE POLICY "Solo admins pueden ver admins" ON administradores FOR
SELECT USING (
        auth.role () = 'authenticated'
    );

DROP POLICY IF EXISTS "Solo admins pueden modificar admins" ON administradores;

CREATE POLICY "Solo admins pueden modificar admins" ON administradores FOR ALL USING (
    auth.role () = 'authenticated'
);

-- Políticas para Configuración
DROP POLICY IF EXISTS "Solo admins pueden ver configuración" ON configuracion;

CREATE POLICY "Solo admins pueden ver configuración" ON configuracion FOR
SELECT USING (
        auth.role () = 'authenticated'
    );

DROP POLICY IF EXISTS "Solo admins pueden modificar configuración" ON configuracion;

CREATE POLICY "Solo admins pueden modificar configuración" ON configuracion FOR ALL USING (
    auth.role () = 'authenticated'
);

-- =============================================
-- INSERTAR DATOS INICIALES
-- =============================================

-- Admin por defecto
INSERT INTO
    administradores (
        email,
        password_hash,
        nombre,
        rol
    )
VALUES (
        'admin@amanecerdecanela.com',
        'admin123',
        'Admin Principal',
        'Administrador'
    ) ON CONFLICT (email) DO NOTHING;

-- Configuración inicial
INSERT INTO
    configuracion (clave, valor, descripcion)
VALUES (
        'empresa_nombre',
        '"Amanecer de Canela"',
        'Nombre de la empresa'
    ),
    (
        'empresa_email',
        '"reclutamiento@amanecerdecanela.com"',
        'Email de contacto'
    ),
    (
        'empresa_website',
        '"https://amanecerdecanela.com"',
        'Sitio web'
    ),
    (
        'empresa_direccion',
        '"Lima, Perú"',
        'Dirección física'
    ),
    (
        'notificaciones_nueva_postulacion',
        'true',
        'Notificar nuevas postulaciones'
    ),
    (
        'notificaciones_resumen_semanal',
        'true',
        'Enviar resumen semanal'
    ),
    (
        'notificaciones_entrevista_programada',
        'true',
        'Notificar entrevistas programadas'
    ),
    (
        'plantilla_email_confirmacion',
        '"Gracias por postularte a {vacante}. Hemos recibido tu solicitud y la revisaremos pronto."',
        'Plantilla de confirmación'
    ),
    (
        'plantilla_email_rechazo',
        '"Gracias por tu interés en {vacante}. Lamentablemente no continuarás en el proceso."',
        'Plantilla de rechazo'
    ),
    (
        'plantilla_email_entrevista',
        '"¡Felicidades! Has sido seleccionado para una entrevista para {vacante}."',
        'Plantilla de invitación a entrevista'
    ),
    (
        'plantilla_email_oferta',
        '"¡Enhorabuena! Nos complace ofrecerte el puesto de {vacante}."',
        'Plantilla de oferta de trabajo'
    ) ON CONFLICT (clave) DO NOTHING;

-- Vacante de ejemplo
INSERT INTO vacantes (
  slug,
  titulo,
  ubicacion,
  tipo,
  categoria,
  salario_min,
  salario_max,
  descripcion,
  responsabilidades,
  requisitos,
  ofrecemos,
  estado,
  vacantes_disponibles
) VALUES (
  'gerente-produccion-lima',
  'Gerente de Producción',
  'Lima, Perú',
  'Tiempo Completo',
  'Gerencial',
  5000,
  7000,
  'Buscamos un Gerente de Producción con experiencia en la industria de alimentos para liderar nuestro equipo de producción.',
  '["Supervisar la producción diaria", "Gestionar el equipo de producción", "Optimizar procesos productivos", "Asegurar calidad del producto"]'::jsonb,
  '["Experiencia mínima de 5 años en producción", "Licenciatura en Ingeniería Industrial", "Conocimientos en ISO 9001", "Liderazgo de equipos"]'::jsonb,
  '["Seguro médico", "Bonos por desempeño", "Capacitaciones", "Ambiente laboral positivo"]'::jsonb,
  'Activa',
  2
)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- VERIFICACIÓN FINAL
-- =============================================

-- Mostrar resumen de lo creado
SELECT 'Tablas creadas:' as mensaje, COUNT(*) as total
FROM information_schema.tables
WHERE
    table_schema = 'public'
    AND table_name IN (
        'vacantes',
        'candidatos',
        'postulaciones',
        'administradores',
        'configuracion'
    )
UNION ALL
SELECT 'Vistas creadas:' as mensaje, COUNT(*) as total
FROM information_schema.views
WHERE
    table_schema = 'public'
    AND table_name IN (
        'postulaciones_completas',
        'estadisticas_vacantes',
        'estadisticas_candidatos'
    )
UNION ALL
SELECT 'Funciones creadas:' as mensaje, COUNT(*) as total
FROM information_schema.routines
WHERE
    routine_schema = 'public'
    AND routine_name IN (
        'incrementar_vistas_vacante',
        'contar_postulaciones_por_estado',
        'update_updated_at_column'
    )
UNION ALL
SELECT 'Admin insertado:' as mensaje, COUNT(*) as total
FROM administradores
WHERE
    email = 'admin@amanecerdecanela.com'
UNION ALL
SELECT 'Configuraciones insertadas:' as mensaje, COUNT(*) as total
FROM configuracion;

-- =============================================
-- ✅ SCRIPT COMPLETADO
-- =============================================
-- Si ves resultados arriba, todo se creó correctamente!
-- Próximo paso: Configurar Storage para CVs
-- =============================================