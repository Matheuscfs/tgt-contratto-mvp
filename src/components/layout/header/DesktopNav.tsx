import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNav: React.FC = () => {
    return (
        <nav className="hidden md:flex items-center space-x-8">
            <Link
                to="/empresas"
                className="text-gray-500 hover:text-gray-800 font-bold text-sm transition-colors flex items-center gap-2 group"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-brand-primary transition-colors"></div>
                Buscar Empresas
            </Link>
            <Link
                to="/para-empresas"
                className="text-gray-500 hover:text-gray-800 font-bold text-sm transition-colors flex items-center gap-2 group"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-brand-primary transition-colors"></div>
                Para Empresas
            </Link>
        </nav>
    );
};

export default DesktopNav;
