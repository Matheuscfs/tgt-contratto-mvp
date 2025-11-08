import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import CompanyCard from '../components/CompanyCard';
import { MOCK_COMPANIES } from '../constants';
import QuickSearch from '../components/QuickSearch';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const CompareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ConnectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V8z" /></svg>;


const ClientLandingPage: React.FC = () => {
  const featuredCompanies = MOCK_COMPANIES.slice(0, 2);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gray-50 text-center py-20 px-4">
        <div className="relative container mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            O jeito mais fácil de encontrar <span className="text-primary-600">serviços locais</span> de confiança.
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
            Conectamos você aos melhores profissionais e empresas da sua cidade. Busque, compare e contrate com segurança.
          </p>
          <QuickSearch />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Como Funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6">
                <div className="flex items-center justify-center mx-auto mb-4"><SearchIcon /></div>
                <h3 className="text-xl font-semibold mb-2">1. Busque</h3>
                <p className="text-gray-600">Digite o serviço que você precisa e veja uma lista de empresas qualificadas na sua região.</p>
            </div>
            <div className="p-6">
                 <div className="flex items-center justify-center mx-auto mb-4"><CompareIcon /></div>
                <h3 className="text-xl font-semibold mb-2">2. Compare</h3>
                <p className="text-gray-600">Analise perfis completos com fotos, portfólio, serviços e avaliações de outros clientes.</p>
            </div>
             <div className="p-6">
                <div className="flex items-center justify-center mx-auto mb-4"><ConnectIcon /></div>
                <h3 className="text-xl font-semibold mb-2">3. Conecte-se</h3>
                <p className="text-gray-600">Entre em contato diretamente com a empresa para tirar dúvidas e solicitar um orçamento sem compromisso.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Companies Section */}
      <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Empresas em Destaque</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {featuredCompanies.map(company => (
                      <CompanyCard key={company.id} company={company} />
                  ))}
              </div>
          </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-primary-700 text-white">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl font-bold mb-4">Qualidade e Confiança Perto de Você</h2>
                  <p className="text-primary-200 text-lg">
                      Nossa missão é fortalecer o comércio local, facilitando o encontro entre clientes e os melhores prestadores de serviço. Assista ao vídeo e veja como a TGT pode te ajudar a resolver qualquer demanda com praticidade e segurança.
                  </p>
              </div>
              <div className="relative aspect-video bg-black/50 rounded-lg cursor-pointer group flex items-center justify-center">
                  <img src="https://picsum.photos/seed/videobg/800/450" alt="Video placeholder" className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-60" />
                  <div className="relative z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                  </div>
              </div>
          </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-100 p-8 rounded-lg border">
              <p className="text-gray-600 italic">"Usei a TGT para encontrar uma consultoria de vinhos e a experiência foi incrível! Encontrei a Adega Vinho Sul, que prestou um serviço impecável. Recomendo a todos!"</p>
              <div className="mt-4 flex items-center">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-12 h-12 rounded-full" alt="Carlos Pereira" />
                <div className="ml-4">
                  <p className="font-semibold">Carlos Pereira</p>
                  <p className="text-sm text-gray-500">Cliente Satisfeito</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg border">
              <p className="text-gray-600 italic">"Finalmente uma plataforma que facilita encontrar bons fornecedores. Contratei a Tech Solutions para um projeto e a qualidade foi surpreendente. Muito prático!"</p>
              <div className="mt-4 flex items-center">
                 <img src="https://i.pravatar.cc/150?u=a042581f4e29026706d" className="w-12 h-12 rounded-full" alt="Mariana Costa" />
                <div className="ml-4">
                  <p className="font-semibold">Mariana Costa</p>
                  <p className="text-sm text-gray-500">Cliente Satisfeita</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Pronto para encontrar o que precisa?</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Milhares de empresas e serviços locais esperam por você. A busca é rápida, fácil e gratuita.</p>
          <Link to="/empresas" className="mt-8 inline-block">
            <Button className="text-lg px-8 py-3 transform hover:scale-105 transition-transform">
              Começar a buscar agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ClientLandingPage;
