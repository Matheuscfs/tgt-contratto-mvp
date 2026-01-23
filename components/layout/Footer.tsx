
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-4 border-brand-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Soluções</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/para-empresas" className="text-base text-gray-500 hover:text-brand-primary">Para Empresas</Link></li>
              <li><Link to="/para-clientes" className="text-base text-gray-500 hover:text-brand-primary">Para Clientes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Suporte</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/ajuda" className="text-base text-gray-500 hover:text-gray-900">Ajuda</Link></li>
              <li><Link to="/contato" className="text-base text-gray-500 hover:text-gray-900">Fale Conosco</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Empresa</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/sobre" className="text-base text-gray-500 hover:text-gray-900">Sobre</Link></li>
              <li><Link to="/carreiras" className="text-base text-gray-500 hover:text-gray-900">Carreiras</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/privacidade" className="text-base text-gray-500 hover:text-gray-900">Privacidade</Link></li>
              <li><Link to="/termos" className="text-base text-gray-500 hover:text-gray-900">Termos</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} TGT Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
