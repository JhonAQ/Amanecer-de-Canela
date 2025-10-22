'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verificarToken } from '@/lib/supabase';

export interface AdminUser {
  id: string;
  email: string;
  nombre: string;
  rol: 'Administrador' | 'Reclutador' | 'Visor';
}

export function useAuth() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      const payload = verificarToken(token);
      setAdmin({
        id: payload.id,
        email: payload.email,
        nombre: payload.nombre,
        rol: payload.rol,
      });
    } catch (error) {
      console.error('Error al verificar token:', error);
      localStorage.removeItem('admin_token');
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setAdmin(null);
    router.push('/admin/login');
  };

  return {
    admin,
    loading,
    isAuthenticated: !!admin,
    logout,
    checkAuth,
  };
}

/**
 * Hook para proteger rutas del admin
 * Redirige a login si no está autenticado
 */
export function useRequireAuth() {
  const { admin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.push('/admin/login');
    }
  }, [admin, loading, router]);

  return { admin, loading };
}

/**
 * Hook para verificar permisos según el rol
 */
export function usePermissions() {
  const { admin } = useAuth();

  const can = (accion: 'crear' | 'editar' | 'eliminar' | 'ver') => {
    if (!admin) return false;

    switch (admin.rol) {
      case 'Administrador':
        return true; // Puede todo
      case 'Reclutador':
        return accion !== 'eliminar'; // No puede eliminar
      case 'Visor':
        return accion === 'ver'; // Solo puede ver
      default:
        return false;
    }
  };

  return {
    canCreate: can('crear'),
    canEdit: can('editar'),
    canDelete: can('eliminar'),
    canView: can('ver'),
    rol: admin?.rol,
  };
}
