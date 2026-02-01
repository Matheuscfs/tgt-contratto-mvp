import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { calculateDistance } from '../utils/geo';
import { Company } from '../types';

export const useCompanySearch = (itemsPerPage: number = 8) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters from URL or State
    // Using initial state from URL only once
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [locationTerm, setLocationTerm] = useState(searchParams.get('loc') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
    const [priceRange, setPriceRangeValue] = useState<'all' | 'low' | 'mid' | 'high'>('all');
    const [sortBy, setSortBy] = useState(searchParams.get('sort') === 'distance' ? 'distance' : 'rating');
    const [currentPage, setCurrentPage] = useState(1);
    const [userCoords, setUserCoords] = useState<{ lat: number, lng: number } | null>(() => {
        const lat = parseFloat(searchParams.get('lat') || '');
        const lng = parseFloat(searchParams.get('lng') || '');
        return (!isNaN(lat) && !isNaN(lng)) ? { lat, lng } : null;
    });

    // Determine if we should include distance in dependencies (only if we have coords)
    // const canSortByDistance = !!userCoords;

    // Sync URL with state
    useEffect(() => {
        const params: Record<string, string> = {};
        if (searchTerm) params.q = searchTerm;
        if (locationTerm) params.loc = locationTerm;
        if (selectedCategory !== 'all') params.cat = selectedCategory;
        if (sortBy === 'distance') params.sort = 'distance';
        if (userCoords) {
            params.lat = userCoords.lat.toString();
            params.lng = userCoords.lng.toString();
        }
        setSearchParams(params, { replace: true });
    }, [searchTerm, locationTerm, selectedCategory, sortBy, userCoords, setSearchParams]);

    // Query Key based on ALL filters
    const queryKey = ['companies', currentPage, searchTerm, locationTerm, selectedCategory, sortBy, priceRange, userCoords];

    const { data, isLoading: loading, error } = useQuery({
        queryKey,
        queryFn: async () => {
            const from = (currentPage - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            // Base query
            let query = supabase
                .from('companies')
                .select(`
                  *,
                  services!inner (*)
                `, { count: 'exact' })
                .eq('status', 'approved');

            // 1. Text Search
            if (searchTerm) {
                query = query.or(`company_name.ilike.%${searchTerm}%,services.title.ilike.%${searchTerm}%`);
            }

            // 2. Location
            if (locationTerm) {
                query = query.or(`city.ilike.%${locationTerm}%,state.ilike.%${locationTerm}%`);
            }

            // 3. Category
            if (selectedCategory !== 'all') {
                query = query.eq('category', selectedCategory);
            }

            // 4. Sorting (Server-side)
            if (sortBy === 'name') {
                query = query.order('company_name', { ascending: true });
            } else if (sortBy === 'rating') {
                query = query.order('created_at', { ascending: false });
            }

            // 5. Pagination
            query = query.range(from, to);

            const { data, count, error } = await query;

            if (error) throw error;

            // Map to UI types
            let mappedCompanies: Company[] = (data || []).map((c) => ({
                id: c.id,
                slug: c.slug,
                companyName: c.company_name,
                legalName: c.legal_name,
                cnpj: c.cnpj,
                logo: c.logo_url || 'https://placehold.co/150',
                coverImage: c.cover_image_url || 'https://placehold.co/1200x400',
                category: c.category,
                rating: 5.0,
                reviewCount: 0,
                description: c.description,
                address: typeof c.address === 'string' ? JSON.parse(c.address) : c.address,
                phone: c.phone,
                email: c.email,
                website: c.website,
                services: c.services || [],
                portfolio: [],
                reviews: []
            }));

            // Price Filtering (Client Side)
            if (priceRange !== 'all') {
                mappedCompanies = mappedCompanies.filter(c => {
                    const minPrice = c.services.length > 0
                        ? Math.min(...c.services.map((s) => (typeof s === 'object' && s && 'price' in s ? Number(s.price) || 0 : 0)))
                        : 0;
                    if (priceRange === 'low') return minPrice < 100;
                    if (priceRange === 'mid') return minPrice >= 100 && minPrice < 300;
                    if (priceRange === 'high') return minPrice >= 300;
                    return true;
                });
            }

            // Calculate Distance
            if (userCoords) {
                mappedCompanies = mappedCompanies.map(c => {
                    if (c.address?.lat && c.address?.lng) {
                        return {
                            ...c,
                            distance: calculateDistance(userCoords.lat, userCoords.lng, c.address.lat, c.address.lng)
                        };
                    }
                    return c;
                });

                if (sortBy === 'distance') {
                    mappedCompanies.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
                }
            }

            return { companies: mappedCompanies, count: count || 0 };
        },
        placeholderData: (previousData) => previousData, // Keep previous data while fetching new (better UX)
    });

    return {
        companies: data?.companies || [],
        totalCount: data?.count || 0,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        locationTerm,
        setLocationTerm,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRangeValue,
        sortBy,
        setSortBy,
        currentPage,
        setCurrentPage,
        userCoords,
        setUserCoords
    };
};
