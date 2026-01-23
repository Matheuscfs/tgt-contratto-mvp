import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import Button from './ui/Button';

const QuickSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchTerm.trim()) {
      queryParams.set('q', searchTerm.trim());
    }
    if (category !== 'all') {
      queryParams.set('cat', category);
    }
    navigate(`/empresas?${queryParams.toString()}`);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSearch}
        className="p-2 sm:p-3 bg-white rounded-sharp flex flex-col sm:flex-row items-center gap-2 sm:gap-3"
      >
        <div className="flex-grow w-full">
          <label htmlFor="quick-search-term" className="sr-only">
            Nome da empresa ou serviço
          </label>
          <input
            type="text"
            id="quick-search-term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="O que você procura?"
            className="w-full border-gray-300 rounded-sharp shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm"
          />
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="quick-search-category" className="sr-only">
            Categoria
          </label>
          <select
            id="quick-search-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-full border-gray-300 rounded-sharp shadow-sm py-3 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm"
          >
            <option value="all">Todas as Categorias</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="lg" className="w-full sm:w-auto rounded-sharp bg-brand-primary hover:bg-brand-primary/90 text-white font-bold uppercase tracking-wider">
          Buscar
        </Button>
      </form>
    </div>
  );
};

export default QuickSearch;
