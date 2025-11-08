import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ClientLandingPage from './pages/ClientLandingPage';
import CompaniesListPage from './pages/LandingPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPerfilPage from './pages/dashboard/DashboardPerfilPage';
import DashboardServicosPage from './pages/dashboard/DashboardServicosPage';
import DashboardPortfolioPage from './pages/dashboard/DashboardPortfolioPage';
import DashboardMensagensPage from './pages/dashboard/DashboardMensagensPage';
import DashboardConfiguracoesPage from './pages/dashboard/DashboardConfiguracoesPage';
import DashboardAdministradoresPage from './pages/dashboard/DashboardAdministradoresPage';
import DashboardAvaliacoesPage from './pages/dashboard/DashboardAvaliacoesPage';
import ClientProfilePage from './pages/client/ClientProfilePage';
import ClientMessagesPage from './pages/client/ClientMessagesPage';
import FavoritesPage from './pages/client/FavoritesPage';
import { ToastProvider } from './contexts/ToastContext';
import CompanyRegistrationPage from './pages/CompanyRegistrationPage';
import { FavoritesProvider } from './contexts/FavoritesContext';

// Info Pages
import ForCompaniesPage from './pages/info/ForCompaniesPage';
import ForClientsPage from './pages/info/ForClientsPage';
import HelpPage from './pages/info/HelpPage';
import ContactPage from './pages/info/ContactPage';
import AboutPage from './pages/info/AboutPage';
import CareersPage from './pages/info/CareersPage';
import PrivacyPage from './pages/info/PrivacyPage';
import TermsPage from './pages/info/TermsPage';

const App = (): React.ReactElement => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ToastProvider>
          <HashRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<ClientLandingPage />} />
                  <Route path="/empresas" element={<CompaniesListPage />} />
                  <Route path="/empresa/:slug" element={<CompanyProfilePage />} />
                  <Route path="/auth/register" element={<RegisterPage />} />
                  <Route path="/auth/login" element={<LoginPage />} />
                  <Route path="/empresa/cadastro" element={<CompanyRegistrationPage />} />
                  
                  {/* Client Routes */}
                  <Route path="/perfil/cliente" element={<ProtectedRoute userType="client" element={<ClientProfilePage />} />} />
                  <Route path="/minhas-mensagens" element={<ProtectedRoute userType="client" element={<ClientMessagesPage />} />} />
                  <Route path="/favoritos" element={<ProtectedRoute userType="client" element={<FavoritesPage />} />} />
                  
                  {/* Company Dashboard Routes */}
                  <Route path="/dashboard/empresa" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="perfil" replace />} />
                    <Route path="perfil" element={<DashboardPerfilPage />} />
                    <Route path="administradores" element={<DashboardAdministradoresPage />} />
                    <Route path="servicos" element={<DashboardServicosPage />} />
                    <Route path="portfolio" element={<DashboardPortfolioPage />} />
                    <Route path="avaliacoes" element={<DashboardAvaliacoesPage />} />
                    <Route path="mensagens" element={<DashboardMensagensPage />} />
                    <Route path="configuracoes" element={<DashboardConfiguracoesPage />} />
                  </Route>

                  {/* Info Pages Routes */}
                  <Route path="/para-empresas" element={<ForCompaniesPage />} />
                  <Route path="/para-clientes" element={<ForClientsPage />} />
                  <Route path="/ajuda" element={<HelpPage />} />
                  <Route path="/contato" element={<ContactPage />} />
                  <Route path="/sobre" element={<AboutPage />} />
                  <Route path="/carreiras" element={<CareersPage />} />
                  <Route path="/privacidade" element={<PrivacyPage />} />
                  <Route path="/termos" element={<TermsPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </ToastProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

interface ProtectedRouteProps {
  userType: 'client' | 'company';
  element: React.ReactElement;
}

const ProtectedRoute = ({ userType, element }: ProtectedRouteProps): React.ReactElement => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Carregando...</div>;
  }
  if (!user || user.type !== userType) {
    return <Navigate to="/auth/login" replace />;
  }
  return element;
};

export default App;
