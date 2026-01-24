import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import CompanyCard from '../components/CompanyCard';
import { CATEGORIES } from '../constants';
import { Company } from '../types';
import { supabase } from '../lib/supabase';
import { calculateDistance } from '../utils/geo';

const CompaniesListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [locationTerm, setLocationTerm] = useState(searchParams.get('loc') || '');
  const [userCoords, setUserCoords] = useState<{ lat: number, lng: number } | null>(null);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [loading, setLoading] = useState(true);

  // Initial Fetch from Supabase
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        // Fetch APPROVED companies only
        const { data, error } = await supabase
          .from('companies')
          // .select('*, services(*)') // Ideally join, but for MVP flat fetch + separate logic or basic select
          // Supabase join:
          .select(`
            *,
            services (*)
          `)
          .eq('status', 'approved');

        if (error) throw error;

        // Map to UI types
        const mappedCompanies: Company[] = (data || []).map((c) => ({
          id: c.id,
          slug: c.slug,
          companyName: c.company_name,
          legalName: c.legal_name,
          cnpj: c.cnpj,
          logo: c.logo_url || 'https://via.placeholder.com/150',
          coverImage: c.cover_image_url || 'https://placehold.co/1200x400',
          category: c.category,
          rating: 5.0, // Should be avg from reviews
          reviewCount: 0,
          description: c.description,
          address: c.address,
          phone: c.phone,
          email: c.email,
          website: c.website,
          services: c.services || [],
          portfolio: [],
          reviews: []
        }));

        setCompanies(mappedCompanies);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Update Filters based on URL
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
    setLocationTerm(searchParams.get('loc') || '');
    setSelectedCategory(searchParams.get('cat') || 'all');

    const lat = parseFloat(searchParams.get('lat') || '');
    const lng = parseFloat(searchParams.get('lng') || '');
    if (!isNaN(lat) && !isNaN(lng)) {
      setUserCoords({ lat, lng });
      setSortBy('distance'); // Auto sort by distance if location provided
    }
  }, [searchParams]);

  // Update companies with distance when userCoords changes OR companies load
  useEffect(() => {
    if (userCoords && companies.length > 0) {
      setCompanies(prev => prev.map(company => {
        if (company.address?.lat && company.address?.lng) {
          return {
            ...company,
            distance: calculateDistance(
              userCoords.lat,
              userCoords.lng,
              company.address.lat,
              company.address.lng
            )
          };
        }
        return company;
      }));
    }
  }, [userCoords, companies.length]); // Warning: be careful with dependency loop if strictly setting new objects, but map creates new refs.

  // Client-side Filtering
  const filteredAndSortedCompanies = companies
    .filter(company =>
    (company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.services.some(service => service.title.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .filter(company =>
      !locationTerm || (
        company.address?.city?.toLowerCase().includes(locationTerm.toLowerCase()) ||
        company.address?.district?.toLowerCase().includes(locationTerm.toLowerCase()) ||
        // Also match if distance is small (< 50km) if we used "current location" which cleared the text
        // But here locationTerm is the text input.
        // mixing logic: if we have userCoords and NO locationTerm, we usually show nearby.
        // If locationTerm is present, we filter by text.
        // Let's stick to text filter if provided.
        company.address?.street?.toLowerCase().includes(locationTerm.toLowerCase())
      )
    )
    .filter(company =>
      selectedCategory === 'all' || company.category === selectedCategory
    )
    .filter(company => {
      if (priceRange === 'all') return true;
      const minPrice = company.services.length > 0 && company.services[0].price ? company.services[0].price : 0;
      if (priceRange === 'low') return minPrice < 100;
      if (priceRange === 'mid') return minPrice >= 100 && minPrice < 300;
      if (priceRange === 'high') return minPrice >= 300;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') {
        // Sort by distance (ascending)
        // Items without distance go to bottom
        if (a.distance !== undefined && b.distance !== undefined) return a.distance - b.distance;
        if (a.distance !== undefined) return -1;
        if (b.distance !== undefined) return 1;
        return 0;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'name') {
        return a.companyName.localeCompare(b.companyName);
      }
      return 0;
    });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Empresas e Serviços Locais | TGT - Guia de Negócios</title>
        <meta name="description" content="Encontre as melhores empresas e serviços locais na sua região. Explore negócios verificados, compare preços e conecte-se com profissionais qualificados." />
        <link rel="canonical" href="https://tgt-guia-de-negocios.vercel.app/#/empresas" />

        {/* Schema.org Organization Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "TGT - Guia de Negócios",
            "url": "https://tgt-guia-de-negocios.vercel.app",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://tgt-guia-de-negocios.vercel.app/#/empresas?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar por nome ou serviço</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: Adega Vinho Sul"
                className="mt-1 block w-full bg-white border-none ring-1 ring-gray-100 rounded-xl shadow-md py-4 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg transition-all sm:text-sm placeholder-gray-400 min-h-[48px]"
              />
            </div>

            {/* New Location Filter UI (Optional, consistent with QuickSearch) */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Localização</label>
              <input
                type="text"
                id="location"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                placeholder="Cidade ou Bairro"
                className="mt-1 block w-full bg-white border-none ring-1 ring-gray-100 rounded-xl shadow-md py-4 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg transition-all sm:text-sm placeholder-gray-400 min-h-[48px]"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full bg-white border-none ring-1 ring-gray-100 rounded-xl shadow-md py-4 pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg transition-all sm:text-sm min-h-[48px]"
              >
                <option value="all">Todas as Categorias</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Faixa de Preço</label>
              <select
                id="price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as 'all' | 'low' | 'mid' | 'high')}
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
                className="mt-1 block w-full bg-white border-none ring-1 ring-gray-100 rounded-xl shadow-md py-4 pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg transition-all sm:text-sm min-h-[48px]"
              >
                <option value="rating">Melhor Avaliação</option>
                <option value="distance">Mais Próximos</option>
                <option value="name">Nome (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mt-8 flex justify-between items-center">
          <p className="text-gray-600">
            Mostrando <strong className="text-brand-primary">{filteredAndSortedCompanies.length}</strong> de <strong>{companies.length}</strong> resultados
            {searchTerm && ` para "${searchTerm}"`}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-sm text-brand-primary hover:underline"
            >
              Limpar busca
            </button>
          )}
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 w-1/2 mb-4 animate-pulse"></div>
                    <div className="flex gap-1">
                      <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredAndSortedCompanies.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedCompanies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-lg shadow-md">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Nenhum resultado encontrado</h3>
              <p className="text-gray-500 mt-2 mb-6">Tente ajustar seus filtros de busca ou procurar por outro termo.</p>

              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Categorias Populares:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {CATEGORIES.slice(0, 5).map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setSearchTerm(''); }}
                      className="px-4 py-3 bg-gray-100 hover:bg-brand-primary hover:text-white rounded-md text-sm transition-colors min-h-[44px] flex items-center justify-center"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesListPage;
