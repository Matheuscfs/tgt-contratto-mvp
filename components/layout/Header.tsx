import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              <span className="font-mono">&lt;/&gt;</span> TGT
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/empresas" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Buscar Empresas
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/para-empresas" className="hidden sm:inline-block text-gray-700 hover:bg-primary-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Publicar minha empresa
            </Link>
            {user ? (
              <div className="ml-4 relative group">
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`} alt="" />
                   <span className="ml-2 hidden sm:inline">{user.name}</span>
                   <svg className="ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out invisible group-hover:visible z-50">
                  {user.type === 'client' && (
                    <>
                      <Link to="/perfil/cliente" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meu Perfil</Link>
                      <Link to="/favoritos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Favoritos</Link>
                    </>
                  )}
                  {user.type === 'company' && (
                    <>
                      <Link to="/dashboard/empresa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                      <Link to="/dashboard/empresa/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meu Perfil</Link>
                    </>
                  )}
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="ml-4 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
