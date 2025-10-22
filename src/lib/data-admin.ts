export interface Vacante {
  id: number;
  slug: string;
  titulo: string;
  ubicacion: string;
  tipo: 'Tiempo Completo' | 'Medio Tiempo' | 'Por Proyecto';
  categoria: string;
  salario: string;
  salarioMin: number;
  salarioMax: number;
  descripcion: string;
  responsabilidades: string[];
  requisitos: string[];
  ofrecemos: string[];
  estado: 'Activa' | 'Pausada' | 'Cerrada';
  fechaPublicacion: string;
  vacantesDisponibles: number;
  postulaciones: number;
  vistas: number;
}

export interface Postulacion {
  id: string;
  candidatoId: string;
  vacanteId: number;
  vacanteTitulo: string;
  candidatoNombre: string;
  candidatoEmail: string;
  candidatoTelefono: string;
  candidatoCiudad: string;
  experiencia: string;
  cvUrl: string;
  estado: 'Nueva' | 'En revisión' | 'Entrevista' | 'Rechazada' | 'Contratado';
  fechaPostulacion: string;
  notas: string[];
  etiquetas: string[];
}

export interface Candidato {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  experiencia: string;
  postulaciones: number;
  ultimaPostulacion: string;
  estado: 'Activo' | 'Contratado' | 'Descartado';
  cvUrl: string;
  habilidades: string[];
}

// Datos mock
export const vacantesAdmin: Vacante[] = [
  {
    id: 1,
    slug: "maestro-panadero",
    titulo: "Maestro Panadero",
    ubicacion: "Sucursal Centro",
    tipo: "Tiempo Completo",
    categoria: "Producción",
    salario: "$15,000 - $20,000 MXN",
    salarioMin: 15000,
    salarioMax: 20000,
    descripcion: "Buscamos un maestro panadero con experiencia en elaboración de pan artesanal y productos de panadería tradicional.",
    responsabilidades: [
      "Elaborar pan artesanal y productos de panadería",
      "Supervisar y controlar la calidad de los productos",
      "Mantener la limpieza del área de producción",
      "Capacitar a ayudantes de panadería"
    ],
    requisitos: [
      "Mínimo 3 años de experiencia como panadero",
      "Conocimiento de técnicas de panificación artesanal",
      "Disponibilidad de horario (madrugada)"
    ],
    ofrecemos: [
      "Salario competitivo",
      "Prestaciones de ley",
      "Capacitación continua",
      "Descuentos en productos"
    ],
    estado: "Activa",
    fechaPublicacion: "2025-10-15",
    vacantesDisponibles: 2,
    postulaciones: 24,
    vistas: 156
  },
  {
    id: 2,
    slug: "cajero-sucursal",
    titulo: "Cajero/a de Sucursal",
    ubicacion: "Varias Sucursales",
    tipo: "Tiempo Completo",
    categoria: "Ventas",
    salario: "$10,000 - $12,000 MXN",
    salarioMin: 10000,
    salarioMax: 12000,
    descripcion: "Buscamos personas con actitud de servicio para atención al cliente y manejo de caja.",
    responsabilidades: [
      "Atender a clientes con amabilidad",
      "Realizar cobros y manejo de efectivo",
      "Mantener el área de caja limpia",
      "Apoyar en exhibición de productos"
    ],
    requisitos: [
      "Educación secundaria o preparatoria",
      "Experiencia mínima de 6 meses en ventas",
      "Habilidad para manejo de efectivo"
    ],
    ofrecemos: [
      "Salario competitivo",
      "Prestaciones de ley",
      "Descuentos en productos",
      "Buen ambiente laboral"
    ],
    estado: "Activa",
    fechaPublicacion: "2025-10-18",
    vacantesDisponibles: 5,
    postulaciones: 42,
    vistas: 203
  },
  {
    id: 3,
    slug: "ayudante-de-pasteleria",
    titulo: "Ayudante de Pastelería",
    ubicacion: "Sucursal Norte",
    tipo: "Tiempo Completo",
    categoria: "Producción",
    salario: "$9,000 - $11,000 MXN",
    salarioMin: 9000,
    salarioMax: 11000,
    descripcion: "Buscamos ayudante para el área de pastelería con ganas de aprender.",
    responsabilidades: [
      "Apoyar en la elaboración de pasteles y postres",
      "Preparar ingredientes y mezclas",
      "Mantener limpia el área de trabajo",
      "Seguir recetas e instrucciones"
    ],
    requisitos: [
      "Educación secundaria mínima",
      "Interés en aprender pastelería",
      "Disponibilidad de horario"
    ],
    ofrecemos: [
      "Capacitación en el puesto",
      "Prestaciones de ley",
      "Oportunidad de crecimiento",
      "Descuentos en productos"
    ],
    estado: "Activa",
    fechaPublicacion: "2025-10-20",
    vacantesDisponibles: 1,
    postulaciones: 15,
    vistas: 89
  },
  {
    id: 4,
    slug: "supervisor-de-produccion",
    titulo: "Supervisor de Producción",
    ubicacion: "Planta Central",
    tipo: "Tiempo Completo",
    categoria: "Gerencial",
    salario: "$18,000 - $25,000 MXN",
    salarioMin: 18000,
    salarioMax: 25000,
    descripcion: "Supervisor con experiencia en producción de alimentos para coordinar equipos.",
    responsabilidades: [
      "Supervisar procesos de producción",
      "Coordinar equipos de trabajo",
      "Asegurar cumplimiento de normas de calidad",
      "Reportar métricas de producción"
    ],
    requisitos: [
      "Experiencia mínima 5 años en producción",
      "Liderazgo de equipos comprobado",
      "Conocimiento de normas de calidad alimentaria"
    ],
    ofrecemos: [
      "Salario competitivo",
      "Prestaciones superiores a la ley",
      "Bonos por desempeño",
      "Seguro de gastos médicos"
    ],
    estado: "Pausada",
    fechaPublicacion: "2025-10-10",
    vacantesDisponibles: 1,
    postulaciones: 8,
    vistas: 67
  }
];

export const postulacionesAdmin: Postulacion[] = [
  {
    id: "POST001",
    candidatoId: "CAND001",
    vacanteId: 1,
    vacanteTitulo: "Maestro Panadero",
    candidatoNombre: "Juan Pérez García",
    candidatoEmail: "juan.perez@email.com",
    candidatoTelefono: "5512345678",
    candidatoCiudad: "Ciudad de México",
    experiencia: "5-10 años",
    cvUrl: "/cv/juan-perez.pdf",
    estado: "En revisión",
    fechaPostulacion: "2025-10-21",
    notas: ["Experiencia relevante en panadería artesanal", "Disponibilidad inmediata"],
    etiquetas: ["Destacado", "Experiencia"]
  },
  {
    id: "POST002",
    candidatoId: "CAND002",
    vacanteId: 2,
    vacanteTitulo: "Cajero/a de Sucursal",
    candidatoNombre: "María López Hernández",
    candidatoEmail: "maria.lopez@email.com",
    candidatoTelefono: "5523456789",
    candidatoCiudad: "Monterrey",
    experiencia: "1-3 años",
    cvUrl: "/cv/maria-lopez.pdf",
    estado: "Entrevista",
    fechaPostulacion: "2025-10-20",
    notas: ["Buena actitud en entrevista inicial", "Referencias positivas"],
    etiquetas: ["Entrevista agendada"]
  },
  {
    id: "POST003",
    candidatoId: "CAND003",
    vacanteId: 1,
    vacanteTitulo: "Maestro Panadero",
    candidatoNombre: "Carlos Ramírez Soto",
    candidatoEmail: "carlos.ramirez@email.com",
    candidatoTelefono: "5534567890",
    candidatoCiudad: "Guadalajara",
    experiencia: "3-5 años",
    cvUrl: "/cv/carlos-ramirez.pdf",
    estado: "Nueva",
    fechaPostulacion: "2025-10-22",
    notas: [],
    etiquetas: []
  },
  {
    id: "POST004",
    candidatoId: "CAND004",
    vacanteId: 2,
    vacanteTitulo: "Cajero/a de Sucursal",
    candidatoNombre: "Ana Martínez Díaz",
    candidatoEmail: "ana.martinez@email.com",
    candidatoTelefono: "5545678901",
    candidatoCiudad: "Ciudad de México",
    experiencia: "Menos de 1 año",
    cvUrl: "/cv/ana-martinez.pdf",
    estado: "Nueva",
    fechaPostulacion: "2025-10-22",
    notas: [],
    etiquetas: []
  },
  {
    id: "POST005",
    candidatoId: "CAND005",
    vacanteId: 3,
    vacanteTitulo: "Ayudante de Pastelería",
    candidatoNombre: "Luis González Ruiz",
    candidatoEmail: "luis.gonzalez@email.com",
    candidatoTelefono: "5556789012",
    candidatoCiudad: "Puebla",
    experiencia: "1-3 años",
    cvUrl: "/cv/luis-gonzalez.pdf",
    estado: "En revisión",
    fechaPostulacion: "2025-10-21",
    notas: ["Interesado en aprender"],
    etiquetas: ["Junior"]
  }
];

export const candidatosAdmin: Candidato[] = [
  {
    id: "CAND001",
    nombre: "Juan Pérez García",
    email: "juan.perez@email.com",
    telefono: "5512345678",
    ciudad: "Ciudad de México",
    experiencia: "5-10 años",
    postulaciones: 3,
    ultimaPostulacion: "2025-10-21",
    estado: "Activo",
    cvUrl: "/cv/juan-perez.pdf",
    habilidades: ["Panificación", "Liderazgo", "Control de calidad"]
  },
  {
    id: "CAND002",
    nombre: "María López Hernández",
    email: "maria.lopez@email.com",
    telefono: "5523456789",
    ciudad: "Monterrey",
    experiencia: "1-3 años",
    postulaciones: 2,
    ultimaPostulacion: "2025-10-20",
    estado: "Activo",
    cvUrl: "/cv/maria-lopez.pdf",
    habilidades: ["Atención al cliente", "Manejo de caja", "Ventas"]
  },
  {
    id: "CAND003",
    nombre: "Carlos Ramírez Soto",
    email: "carlos.ramirez@email.com",
    telefono: "5534567890",
    ciudad: "Guadalajara",
    experiencia: "3-5 años",
    postulaciones: 1,
    ultimaPostulacion: "2025-10-22",
    estado: "Activo",
    cvUrl: "/cv/carlos-ramirez.pdf",
    habilidades: ["Panificación artesanal", "Gestión de tiempo"]
  },
  {
    id: "CAND004",
    nombre: "Ana Martínez Díaz",
    email: "ana.martinez@email.com",
    telefono: "5545678901",
    ciudad: "Ciudad de México",
    experiencia: "Menos de 1 año",
    postulaciones: 1,
    ultimaPostulacion: "2025-10-22",
    estado: "Activo",
    cvUrl: "/cv/ana-martinez.pdf",
    habilidades: ["Comunicación", "Trabajo en equipo"]
  }
];
