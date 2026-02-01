import React from 'react';
import { Helmet } from 'react-helmet-async';
import CompanyCard from '../components/CompanyCard';
import { CATEGORIES } from '../constants';
import { useCompanySearch } from '../hooks/useCompanySearch';

const CompaniesListPage: React.FC = () => {
  const itemsPerPage = 8;
  const {
    companies,
    totalCount,
    loading,
    searchTerm,
    setSearchTerm,
    locationTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRangeValue,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
  } = useCompanySearch(itemsPerPage);

  // SEO Helpers
  const getDynamicTitle = () => {
    let title = 'Empresas e Serviços Locais';
    if (searchTerm) title = `${searchTerm}`;
    else if (selectedCategory !== 'all') title = `${selectedCategory}`;
    if (locationTerm) title += ` em ${locationTerm}`;
    return `${title} | TGT Contratto`;
  };

  const getDynamicDescription = () => {
    return searchTerm
      ? `Encontre ${searchTerm} no TGT Contratto. Profissionais avaliados.`
      : 'Encontre as melhores empresas e serviços locais na sua região.';
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>{getDynamicTitle()}</title>
        <meta name="description" content={getDynamicDescription()} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Encontre os Melhores <span className="text-primary-600">Negócios Locais</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore uma seleção curada de empresas e serviços na sua região.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Ex: Pedreiro, Adega..."
                className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todas</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Faixa de Preço</label>
              <select
                id="price"
                value={priceRange}
                onChange={(e) => setPriceRangeValue(e.target.value as 'all' | 'low' | 'mid' | 'high')}
                className="mt-1 block w-full bg-white border-none ring-1 ring-gray-100 rounded-xl shadow-md py-4 pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg transition-all sm:text-sm min-h-[48px]"
              >
                <option value="all">Todos os Preços</option>
                <option value="low">Até R$ 100</option>
                <option value="mid">R$ 100 - R$ 300</option>
                <option value="high">Acima de R$ 300</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Ordenar por</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="rating">Melhor Avaliação</option>
                <option value="name">Nome (A-Z)</option>
                <option value="distance">Mais Próximos</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('rating');
                  setCurrentPage(1);
                  setPriceRangeValue('all');
                }}
                className="w-full py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-8 flex justify-between items-center">
          <p className="text-gray-600">
            Encontrados <strong className="text-brand-primary">{totalCount}</strong> resultados
          </p>
        </div>

        {/* Content */}
        <div className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : companies.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {companies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 text-lg">Nenhum resultado encontrado.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 bg-white"
            >
              Anterior
            </button>
            <span className="text-gray-600 px-4">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 bg-white"
            >
              Próxima
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CompaniesListPage;
