import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Booking } from '../../types';

// Extended type for UI
interface BookingWithCompany extends Booking {
    companyName: string;
    serviceName: string;
}

const ClientOrdersPage: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<BookingWithCompany[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            setLoading(true);
            try {
                // Fetch bookings for this client
                const { data: bookingsData, error } = await supabase
                    .from('bookings')
                    .select('*')
                    .eq('client_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                if (bookingsData && bookingsData.length > 0) {
                    // Fetch company names
                    const companyIds = [...new Set(bookingsData.map(b => b.company_id))];
                    const { data: companiesData, error: companiesError } = await supabase
                        .from('companies')
                        .select('id, company_name')
                        .in('id', companyIds);

                    if (companiesError) throw companiesError;

                    const companiesMap = new Map(companiesData?.map(c => [c.id, c.company_name]));

                    const mappedOrders = bookingsData.map(b => ({
                        ...b,
                        companyName: companiesMap.get(b.company_id) || 'Empresa Desconhecida',
                        serviceName: b.service_title,
                        // Fix generic types if needed
                        price: b.service_price || 0,
                        date: b.booking_date,
                        time: b.booking_time
                    }));

                    setOrders(mappedOrders);
                } else {
                    setOrders([]);
                }

            } catch (err) {
                console.error("Error fetching client orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const activeOrders = orders.filter(o => ['pending', 'confirmed', 'in_progress'].includes(o.status));
    const historyOrders = orders.filter(o => ['completed', 'cancelled', 'rejected'].includes(o.status));

    const currentList = activeTab === 'active' ? activeOrders : historyOrders;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Meus Pedidos</h1>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'active' ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Em Andamento
                    {activeTab === 'active' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary rounded-t-full"></span>}
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'history' ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Histórico
                    {activeTab === 'history' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary rounded-t-full"></span>}
                </button>
            </div>

            {/* List */}
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Carregando pedidos...</div>
                ) : currentList.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Nenhum pedido encontrado nesta aba.</p>
                    </div>
                ) : (
                    currentList.map(order => (
                        <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{order.companyName}</h3>
                                    <p className="text-gray-600">{order.serviceName}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {order.status === 'confirmed' ? 'Agendado' :
                                            order.status === 'pending' ? 'Pendente' :
                                                order.status}
                                    </span>
                                    <p className="text-sm font-bold mt-1">R$ {order.price?.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Date Info */}
                            <div className="flex gap-6 text-sm text-gray-500 mb-6">
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {new Date(order.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {order.time === 'morning' ? 'Manhã' : order.time === 'afternoon' ? 'Tarde' : order.time === 'evening' ? 'Noite' : order.time}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                                {activeTab === 'active' ? (
                                    <>
                                        <Button variant="secondary" size="sm">Ajuda</Button>
                                    </>
                                ) : (
                                    <Button size="sm">Pedir de Novo</Button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ClientOrdersPage;
