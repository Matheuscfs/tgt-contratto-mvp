import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CompanyCard from '../components/CompanyCard';
import { MOCK_COMPANIES, CATEGORIES } from '../constants';
import { Company } from '../types';

const CompaniesListPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('cat') || 'all');
  }, [searchParams]);

  const filteredAndSortedCompanies = MOCK_COMPANIES
    .filter(company =>
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.services.some(service => service.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(company =>
      selectedCategory === 'all' || company.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'name') {
        return a.companyName.localeCompare(b.companyName);
      }
      return 0;
    });

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Encontre os Melhores <span className="text-primary-600">Negócios Locais</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore uma seleção curada de empresas e serviços na sua região. Qualidade e confiança ao seu alcance.
          </p>
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-3 lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar por nome ou serviço</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: Adega Vinho Sul"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="all">Todas as Categorias</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Ordenar por</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="rating">Melhor Avaliação</option>
                <option value="name">Nome (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10">
          {filteredAndSortedCompanies.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedCompanies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
           ) : (
            <div className="text-center py-16 px-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">Nenhum resultado encontrado</h3>
                <p className="text-gray-500 mt-2">Tente ajustar seus filtros de busca ou procurar por outro termo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesListPage;
