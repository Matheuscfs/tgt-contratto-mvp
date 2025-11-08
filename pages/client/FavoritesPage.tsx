import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { MOCK_COMPANIES } from '../../constants';
import CompanyCard from '../../components/CompanyCard';
import Button from '../../components/ui/Button';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const favoriteCompanies = MOCK_COMPANIES.filter(company => favorites.includes(company.id));

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 border-b pb-4 mb-8">
          Minhas Empresas Favoritas
        </h1>

        {favoriteCompanies.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="mt-2 text-xl font-semibold text-gray-800">Sua lista de favoritos está vazia</h3>
            <p className="text-gray-500 mt-2">Adicione empresas aos seus favoritos para encontrá-las facilmente aqui.</p>
            <div className="mt-6">
                <Link to="/empresas">
                    <Button>Buscar Empresas</Button>
                </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
