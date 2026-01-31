import React, { useEffect } from 'react';
import { NavLink, Outlet, Navigate, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCompany } from '../../contexts/CompanyContext';
import StoreStatusToggle from '../dashboard/StoreStatusToggle';

const DashboardLayout: React.FC = () => {
  const { user, loading } = useAuth();
  const { company, loading: companyLoading } = useCompany();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  /* console.log('[DashboardLayout Debug]', {
    authLoading: loading, 
    companyLoading, 
    user: user?.email, 
    userType: user?.type,
    companySlug: company?.slug,
    urlSlug: slug 
  }); */

  // Redirect to correct slug if user has company but URL slug doesn't match
  useEffect(() => {
    if (!loading && !companyLoading && user && company && slug !== company.slug) {
      navigate(`/dashboard/empresa/${company.slug}`, { replace: true });
    }
  }, [user, company, slug, loading, companyLoading, navigate]);

  if (loading || companyLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando...</p></div>;
  }

  if (!user || user.type !== 'company') {
    return <Navigate to="/auth/login" replace />;
  }

  if (!company) {
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">Erro ao carregar empresa.</p></div>;
  }

  const navigation = [
    { name: 'Visão Geral', href: `/dashboard/empresa/${company.slug}`, end: true },
    { name: 'Oportunidades', href: `/dashboard/empresa/${company.slug}/oportunidades` }, // [NEW]
    { name: 'Agendamentos', href: `/dashboard/empresa/${company.slug}/agendamentos` },
    { name: 'Agenda', href: `/dashboard/empresa/${company.slug}/agenda` },
    { name: 'Serviços', href: `/dashboard/empresa/${company.slug}/servicos` },
    { name: 'Avaliações', href: `/dashboard/empresa/${company.slug}/avaliacoes` },
    { name: 'Mensagens', href: `/dashboard/empresa/${company.slug}/mensagens` },
    { name: 'Perfil', href: `/dashboard/empresa/${company.slug}/perfil` },
    { name: 'Administradores', href: `/dashboard/empresa/${company.slug}/administradores` },
    { name: 'Portfólio', href: `/dashboard/empresa/${company.slug}/portfolio` },
    { name: 'Configurações', href: `/dashboard/empresa/${company.slug}/configuracoes` },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-64 xl:w-72 shrink-0 mb-8 lg:mb-0">
        <div className="sticky top-24 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 px-1">Painel TGT</h3>
            <p className="text-sm text-gray-500 mb-4 px-1">Gestão Profissional</p>
          </div>

          <StoreStatusToggle />

          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex-1 bg-white rounded-lg shadow flex flex-col min-h-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;