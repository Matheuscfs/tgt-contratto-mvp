import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { useCompany } from '../../../contexts/CompanyContext';
import OptimizedImage from '../../ui/OptimizedImage';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    const { company } = useCompany();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        onClose();
        navigate('/');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-45 md:hidden"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 md:hidden flex flex-col overflow-y-auto"
                    >
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between min-h-[60px]">
                            <span className="text-xl font-bold text-gray-900">Menu</span>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors min-h-[44px] min-w-[44px]"
                                aria-label="Fechar menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 space-y-4 flex-1">
                            {user && (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
                                    <OptimizedImage
                                        src={(user.type === 'company' && company?.logo_url) || user.avatar || `https://i.pravatar.cc/150?u=${user.id}`}
                                        alt={(user.type === 'company' && company?.company_name) || user.name}
                                        className="h-10 w-10 rounded-full bg-white shadow-sm"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-900 truncate">{(user.type === 'company' && company?.company_name) || user.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.type === 'client' ? 'Cliente' : 'Empresa'}</p>
                                    </div>
                                </div>
                            )}

                            <nav className="space-y-1">
                                <Link to="/" onClick={onClose} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors min-h-[44px] flex items-center">
                                    Início
                                </Link>
                                <Link to="/empresas" onClick={onClose} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors min-h-[44px] flex items-center">
                                    Buscar Empresas
                                </Link>
                                <Link to="/para-empresas" onClick={onClose} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors min-h-[44px] flex items-center">
                                    Para Empresas
                                </Link>

                                {/* Info Section */}
                                <div className="pt-2">
                                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Informações</p>
                                    <Link to="/sobre" onClick={onClose} className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                                        Sobre Nós
                                    </Link>
                                    <Link to="/ajuda" onClick={onClose} className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                                        Ajuda
                                    </Link>
                                    <Link to="/contato" onClick={onClose} className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                                        Contato
                                    </Link>
                                </div>
                            </nav>

                            <div className="border-t border-gray-100 my-4 pt-4">
                                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Conta</p>
                                {user ? (
                                    <div className="space-y-1">
                                        {user.type === 'client' ? (
                                            <>
                                                <Link to="/perfil/cliente" onClick={onClose} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                                                    Meu Perfil
                                                </Link>
                                                <Link to="/favoritos" onClick={onClose} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                                                    Favoritos
                                                </Link>
                                                <Link to="/minhas-mensagens" onClick={onClose} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                                                    Mensagens
                                                </Link>
                                                <Link to="/perfil/pedidos" onClick={onClose} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                                                    Meus Pedidos
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link to={user.companySlug ? `/dashboard/empresa/${user.companySlug}` : "/empresa/cadastro"} onClick={onClose} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                                                    Dashboard
                                                </Link>
                                            </>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left block px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg mt-2 min-h-[44px] flex items-center"
                                        >
                                            Sair
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid gap-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link to="/login/cliente" onClick={onClose} className="flex flex-col items-center justify-center px-2 py-3 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 min-h-[80px]">
                                                <span className="text-sm font-bold text-gray-900">Sou Cliente</span>
                                                <span className="text-xs text-gray-500 text-center leading-tight mt-1">Busco serviços</span>
                                            </Link>
                                            <Link to="/login/empresa" onClick={onClose} className="flex flex-col items-center justify-center px-2 py-3 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 min-h-[80px]">
                                                <span className="text-sm font-bold text-gray-900">Sou Profissional</span>
                                                <span className="text-xs text-gray-500 text-center leading-tight mt-1">Ofereço serviços</span>
                                            </Link>
                                        </div>
                                        <Link to="/cadastro/cliente" onClick={onClose} className="flex items-center justify-center w-full px-4 py-3 border border-brand-primary text-brand-primary rounded-xl font-medium hover:bg-brand-primary/5 min-h-[44px]">
                                            Criar Conta Grátis
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
