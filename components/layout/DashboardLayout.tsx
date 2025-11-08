import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando...</p></div>;
  }

  if (!user || user.type !== 'company') {
    return <Navigate to="/auth/login" replace />;
  }

  const navigation = [
    { name: 'Perfil', href: '/dashboard/empresa/perfil' },
    { name: 'Administradores', href: '/dashboard/empresa/administradores' },
    { name: 'Serviços', href: '/dashboard/empresa/servicos' },
    { name: 'Portfólio', href: '/dashboard/empresa/portfolio' },
    { name: 'Avaliações', href: '/dashboard/empresa/avaliacoes' },
    { name: 'Mensagens', href: '/dashboard/empresa/mensagens' },
    { name: 'Configurações', href: '/dashboard/empresa/configuracoes' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col lg:flex-row gap-5">
      <aside className="lg:w-1/4 xl:w-1/5 shrink-0 mb-8 lg:mb-0">
        <div className="sticky top-20 space-y-1">
          <h3 className="px-3 text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
          <p className="px-3 text-sm text-gray-500 mb-4">Gerencie as informações da sua empresa.</p>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </aside>
      <div className="flex-1 bg-white rounded-lg shadow flex flex-col min-h-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;