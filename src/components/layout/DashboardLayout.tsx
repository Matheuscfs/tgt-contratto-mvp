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

  // Redirect if slug mismatch
  useEffect(() => {
    if (!loading && !companyLoading && user && company && slug !== company.slug) {
      navigate(`/dashboard/empresa/${company.slug}`, { replace: true });
    }
  }, [user, company, slug, loading, companyLoading, navigate]);

  if (loading || companyLoading) {
    return <div className="flex justify-center items-center h-screen text-brand-primary font-bold">Carregando TGT...</div>;
  }

  if (!user || user.type !== 'company') {
    return <Navigate to="/login/company" replace />;
  }

  if (!company) {
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">Erro ao carregar empresa.</p></div>;
  }

  const navigation = [
    { name: 'Dashboard', href: `/dashboard/empresa/${company.slug}`, icon: <HomeIcon /> },
    { name: 'Oportunidades', href: `/dashboard/empresa/${company.slug}/oportunidades`, icon: <CreditCardIcon /> },
    { name: 'Agendamentos', href: `/dashboard/empresa/${company.slug}/agendamentos`, icon: <CalendarIcon /> },
    { name: 'Agenda', href: `/dashboard/empresa/${company.slug}/agenda`, icon: <DocumentIcon /> },
    { name: 'Serviços', href: `/dashboard/empresa/${company.slug}/servicos`, icon: <SupportIcon /> },
    { name: 'Faturamento', href: `/dashboard/empresa/${company.slug}/faturamento`, icon: <WalletIcon /> },
    { name: 'Equipe', href: `/dashboard/empresa/${company.slug}/equipe`, icon: <PersonIcon /> },
  ];

  const accountPages = [
    { name: 'Perfil', href: `/dashboard/empresa/${company.slug}/perfil`, icon: <PersonIcon /> },
    { name: 'Configurações', href: `/dashboard/empresa/${company.slug}/configuracoes`, icon: <SettingsIcon /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar - Purity Style */}
      <aside className="w-full lg:w-64 xl:w-72 bg-gray-50 p-4 lg:fixed lg:h-full lg:overflow-y-auto">
        <div className="mb-6 px-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 002.1 9.763.75.75 0 011.7 8.72c2.787-1.31 5.952-2.3 9.38-2.922 1.341-2.43 3.65-4.436 6.366-5.466z" fillRule="evenodd" clipRule="evenodd" /></svg>
          </div>
          <span className="text-gray-900 font-bold text-sm tracking-wide uppercase">TGT DASHBOARD</span>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.name === 'Dashboard'}
              className={({ isActive }) =>
                `group flex items-center px-4 py-3 text-xs font-bold rounded-xl transition-all ${isActive
                  ? 'bg-white text-gray-800 shadow-md'
                  : 'text-gray-500 hover:text-gray-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-2 rounded-lg mr-3 transition-colors ${isActive ? 'bg-brand-primary text-white shadow-sm' : 'bg-white text-brand-primary shadow-xs'}`}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}

          <div className="mt-6 mb-2 px-4 text-xs font-bold text-gray-900 uppercase">Account Pages</div>

          {accountPages.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-4 py-3 text-xs font-bold rounded-xl transition-all ${isActive
                  ? 'bg-white text-gray-800 shadow-md'
                  : 'text-gray-500 hover:text-gray-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-2 rounded-lg mr-3 transition-colors ${isActive ? 'bg-brand-primary text-white shadow-sm' : 'bg-white text-brand-primary shadow-xs'}`}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 px-4">
          <StoreStatusToggle />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 xl:ml-72 p-4 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};

// Simple Icons
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M11.47 3.84a.75.75 0 011.06 0l8.632 8.632a.75.75 0 01-1.06 1.06l-.353-.353V21.75A.75.75 0 0119 22.5H5a.75.75 0 01-.75-.75V13.18l-.353.353a.75.75 0 01-1.06-1.06l8.632-8.632z" /></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M2.25 8.25a.75.75 0 01.75-.75h18a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75V8.25z" /><path d="M2.25 5.25a.75.75 0 01.75-.75h18a.75.75 0 01.75.75v5.25H2.25V5.25z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5 .75.75 0 000 1.5z" /><path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" /><path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" /></svg>;
const SupportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.765-1.272 5.219 0a.75.75 0 01-.976 1.129zM15 12a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" /></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>;
const PersonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.922-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" /></svg>;

export default DashboardLayout;