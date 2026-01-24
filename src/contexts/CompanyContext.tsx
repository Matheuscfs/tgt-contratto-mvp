import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface Address {
    street: string;
    number?: string;
    district?: string;
    city: string;
    state: string;
    cep: string;
}

interface CompanyData {
    id: string;
    slug: string;
    company_name: string;
    legal_name: string;
    cnpj: string;
    logo_url: string | null;
    cover_image_url: string | null;
    category: string | null;
    description: string | null;
    address: Address;
    phone: string | null;
    email: string | null;
    website: string | null;
    status: string;
    profile_id: string;
}

interface CompanyContextType {
    company: CompanyData | null;
    loading: boolean;
    refreshCompany: () => Promise<void>;
    updateCompany: (data: Partial<CompanyData>) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [company, setCompany] = useState<CompanyData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCompany = async () => {
        if (!user || user.type !== 'company') {
            setCompany(null);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('companies')
                .select('*')
                .eq('profile_id', user.id)
                .single();

            if (error) {
                console.error('Error fetching company:', error);
                setCompany(null);
            } else {
                setCompany(data);
            }
        } catch (err) {
            console.error('Error in fetchCompany:', err);
            setCompany(null);
        } finally {
            setLoading(false);
        }
    };

    const refreshCompany = async () => {
        setLoading(true);
        await fetchCompany();
    };

    const updateCompany = async (data: Partial<CompanyData>) => {
        if (!company) return;

        try {
            const { error } = await supabase
                .from('companies')
                .update(data)
                .eq('id', company.id);

            if (error) {
                console.error('Error updating company:', error);
                throw error;
            }

            // Refresh company data after update
            await refreshCompany();
        } catch (err) {
            console.error('Error in updateCompany:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchCompany();

        // Set up real-time subscription for company changes
        if (user && user.type === 'company') {
            const subscription = supabase
                .channel('company-changes')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'companies',
                        filter: `profile_id=eq.${user.id}`,
                    },
                    (payload) => {
                        console.log('Company data changed:', payload);
                        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
                            setCompany(payload.new as CompanyData);
                        }
                    }
                )
                .subscribe();

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [user]);

    return (
        <CompanyContext.Provider value={{ company, loading, refreshCompany, updateCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (context === undefined) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};
