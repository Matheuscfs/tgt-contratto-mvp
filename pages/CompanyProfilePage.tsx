
import React from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_COMPANIES } from '../constants';
import ServiceCard from '../components/ServiceCard';
import MapEmbed from '../components/MapEmbed';
import ImageGallery from '../components/ImageGallery';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';

const HeartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const CompanyProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const company = MOCK_COMPANIES.find(c => c.slug === slug);

  if (!company) {
    return <div className="text-center py-20">Empresa não encontrada.</div>;
  }

  const favorited = isFavorite(company.id);

  const handleToggleFavorite = () => {
      if (favorited) {
          removeFavorite(company.id);
      } else {
          addFavorite(company.id);
      }
  };


  return (
    <div className="bg-white">
      {/* Cover Image and Header */}
      <div className="relative h-64 md:h-80 bg-gray-200">
        <img src={company.coverImage} alt={`${company.companyName} cover`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                 <img src={company.logo} alt={`${company.companyName} logo`} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-white shadow-lg" />
                 <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{company.companyName}</h1>
                    <p className="text-lg text-gray-200">{company.category}</p>
                 </div>
            </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About Section */}
            <section id="sobre">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">Sobre a Empresa</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{company.description}</p>
            </section>

            {/* Services Section */}
            <section id="servicos">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">Serviços</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {company.services.map(service => <ServiceCard key={service.id} service={service} />)}
              </div>
            </section>
            
            {/* Portfolio Section */}
            <section id="portfolio">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">Portfólio</h2>
              <ImageGallery items={company.portfolio} />
            </section>

             {/* Reviews Section */}
             <section id="avaliacoes">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">Avaliações</h2>
                <div className="space-y-6">
                    {company.reviews.map(review => (
                        <div key={review.id} className="flex space-x-4">
                            <img className="h-12 w-12 rounded-full" src={review.avatar} alt={review.author} />
                            <div>
                                <div className="flex items-center">
                                    <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                                    <div className="ml-4 flex items-center">
                                         {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="mt-1 text-gray-600">{review.comment}</p>
                                <p className="mt-1 text-xs text-gray-400">{review.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </section>

          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
             <div className="sticky top-24 space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações de Contato</h3>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start"><strong className="w-20 font-medium">Endereço:</strong> <span className="flex-1">{`${company.address.street}, ${company.address.number}, ${company.address.district}`} <br/> {`${company.address.city} - ${company.address.state}, ${company.address.cep}`}</span></li>
                        {company.phone && <li className="flex items-center"><strong className="w-20 font-medium">Telefone:</strong> <a href={`tel:${company.phone}`} className="text-primary-600 hover:underline">{company.phone}</a></li>}
                        <li className="flex items-center"><strong className="w-20 font-medium">Email:</strong> <a href={`mailto:${company.email}`} className="text-primary-600 hover:underline truncate">{company.email}</a></li>
                        {company.website && <li className="flex items-center"><strong className="w-20 font-medium">Website:</strong> <a href={`http://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{company.website}</a></li>}
                    </ul>
                     <div className="mt-6 flex flex-col space-y-3">
                        <Button className="w-full">
                            Enviar Mensagem
                        </Button>
                        {user && user.type === 'client' && (
                            <Button
                                className="w-full"
                                variant={favorited ? 'danger' : 'secondary'}
                                onClick={handleToggleFavorite}
                            >
                                <HeartIcon />
                                {favorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                            </Button>
                        )}
                    </div>
                </div>
                 {company.address.lat && company.address.lng && (
                    <div className="bg-gray-50 p-6 rounded-lg border">
                       <h3 className="text-lg font-semibold text-gray-900 mb-4">Localização</h3>
                        <MapEmbed lat={company.address.lat} lng={company.address.lng} address={`${company.address.street}, ${company.address.city}`} />
                    </div>
                )}
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
