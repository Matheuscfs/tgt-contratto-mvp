import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import OptimizedImage from '../ui/OptimizedImage';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { AnimatePresence, motion } from 'framer-motion';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  // Close dropdown on route change
  React.useEffect(() => {
    setIsDropdownOpen(false);
  }, [navigate]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-black text-brand-primary tracking-tighter">
              TGT
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/empresas" className="text-gray-700 hover:text-brand-primary px-3 py-2 rounded-sharp text-sm font-medium transition-colors uppercase tracking-wide">
                Buscar Empresas
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/para-empresas" className="hidden sm:inline-block text-gray-700 hover:bg-brand-primary/10 hover:text-brand-primary px-3 py-2 rounded-sharp text-sm font-medium transition-colors">
              Publicar minha empresa
            </Link>
            {user ? (
              <div className="ml-4 relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                >
                  <span className="sr-only">Abrir menu do usuário</span>
                  <OptimizedImage className="h-8 w-8 rounded-full object-cover" src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`} alt="" />
                  <span className="ml-2 hidden sm:inline font-medium text-gray-700">{user.name}</span>
                  <svg className={`ml-1 h-5 w-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-sharp shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      {user.type === 'client' && (
                        <>
                          <Link to="/perfil/cliente" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Meu Perfil</Link>
                          <Link to="/favoritos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Favoritos</Link>
                        </>
                      )}
                      {user.type === 'company' && (
                        <>
                          <Link to="/dashboard/empresa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</Link>
                          <Link to="/dashboard/empresa/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Meu Perfil</Link>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="ml-4 bg-brand-primary text-white px-4 py-2 rounded-sharp text-sm font-medium hover:bg-brand-primary/90 transition-colors uppercase tracking-wide"
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
