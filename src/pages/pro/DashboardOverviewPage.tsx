import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useParams } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

// --- Purity UI / TGT Components ---

interface StatCardProps {
    title: string;
    value: string;
    change?: string;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between min-w-[240px]">
        <div>
            <p className="text-gray-400 text-sm font-semibold mb-1">{title}</p>
            <div className="flex items-center gap-2">
                <h3 className="text-gray-800 text-xl font-bold">{value}</h3>
                {change && (
                    <span className={`text-sm font-bold ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {change}
                    </span>
                )}
            </div>
        </div>
        <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-md">
            {icon}
        </div>
    </div>
);

const MiniTable: React.FC<{ data: any[] }> = ({ data }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Meus Serviços Ativos</h3>
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="text-gray-400 text-[10px] font-bold uppercase py-2 border-b border-gray-100">Serviço</th>
                        <th className="text-gray-400 text-[10px] font-bold uppercase py-2 border-b border-gray-100 pl-4">Orçamento</th>
                        <th className="text-gray-400 text-[10px] font-bold uppercase py-2 border-b border-gray-100 pl-4">Status</th>
                        <th className="text-gray-400 text-[10px] font-bold uppercase py-2 border-b border-gray-100 pl-4">Conclusão</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr><td colSpan={4} className="py-4 text-center text-gray-500 text-sm">Nenhum serviço ativo.</td></tr>
                    ) : (
                        data.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 items-center flex gap-3 border-b border-gray-100">
                                    <div className="w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center text-xs font-bold text-brand-secondary">
                                        {item.service_title.charAt(0)}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 truncate max-w-[150px]">{item.service_title}</span>
                                </td>
                                <td className="py-3 border-b border-gray-100 pl-4 text-sm text-gray-600 font-semibold">
                                    R$ {item.agreed_price?.toFixed(2)}
                                </td>
                                <td className="py-3 border-b border-gray-100 pl-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.status === 'in_progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                        {item.status === 'in_progress' ? 'Em Progresso' : item.status}
                                    </span>
                                </td>
                                <td className="py-3 border-b border-gray-100 pl-4 w-32">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-brand-primary">60%</span>
                                        <div className="w-full bg-gray-200 rounded-full h-1">
                                            <div className="bg-brand-primary h-1 rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Icons ---
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>;


const DashboardOverviewPage: React.FC = () => {
    const { user } = useAuth();
    const { slug } = useParams<{ slug: string }>();
    const [isLoading, setIsLoading] = useState(true);

    // --- State for Data ---
    const [stats, setStats] = useState({
        totalEarnings: 'R$ 0,00',
        activeClients: 0,
        newProjects: 0,
        totalSales: 'R$ 0,00'
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [activeServices, setActiveServices] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    // --- Mock Data fallback if DB is empty for UI Demo ---
    const mockSellerStats = {
        total_completed_orders: 125,
        total_orders: 150,
        total_earnings: 45000,
        active_clients: 32,
    };

    const viewsData = [
        { name: 'Seg', views: 400 },
        { name: 'Ter', views: 300 },
        { name: 'Qua', views: 600 },
        { name: 'Qui', views: 800 },
        { name: 'Sex', views: 500 },
        { name: 'Sab', views: 900 },
        { name: 'Dom', views: 700 },
    ];

    const salesData = [
        { name: 'Jan', sales: 2400 },
        { name: 'Fev', sales: 1398 },
        { name: 'Mar', sales: 9800 },
        { name: 'Abr', sales: 3908 },
        { name: 'Mai', sales: 4800 },
        { name: 'Jun', sales: 3800 },
    ];


    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                // 1. Get Company ID
                const { data: companyData, error: companyError } = await supabase
                    .from('companies')
                    .select('id, profile_id')
                    .eq('profile_id', user.id)
                    .single();

                if (companyError || !companyData) {
                    // Fallback to mock data for layout verification if no company found (e.g. dev mode)
                    setStats({
                        totalEarnings: `R$ ${mockSellerStats.total_earnings.toLocaleString('pt-BR')}`,
                        activeClients: mockSellerStats.active_clients,
                        newProjects: 12,
                        totalSales: 'R$ 15.000'
                    });
                    setIsLoading(false);
                    return;
                }

                // 2. Fetch Real Data (Parallel)
                const [ordersRes, sellerStatsRes] = await Promise.all([
                    supabase.from('orders').select('*').eq('seller_id', user.id).limit(5),
                    supabase.from('seller_stats').select('*').eq('seller_id', user.id).single()
                ]);

                // 3. Process Data
                const sellerStats = sellerStatsRes.data || {};

                // Update stats state
                setStats({
                    totalEarnings: `R$ ${(sellerStats.total_earnings || 0).toLocaleString('pt-BR')}`,
                    activeClients: 0, // Need to count unique buyers
                    newProjects: 0,
                    totalSales: `R$ ${(sellerStats.total_earnings || 0).toLocaleString('pt-BR')}`
                });

                setActiveServices(ordersRes.data?.filter((o: any) => o.status === 'in_progress') || []);
                setRecentActivity(ordersRes.data || []);

            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-full">
            {/* ROW 1: Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Money */}
                <StatCard
                    title="Ganhos Totais"
                    value={stats.totalEarnings}
                    change="+15%"
                    icon={<WalletIcon />}
                />
                {/* Clients */}
                <StatCard
                    title="Novos Clientes"
                    value="+3,052"
                    change="-14%"
                    icon={<GlobeIcon />}
                />
                {/* Projects */}
                <StatCard
                    title="Novos Projetos"
                    value="+12"
                    change=""
                    icon={<DocumentIcon />}
                />
                {/* Sales */}
                <StatCard
                    title="Vendas Totais"
                    value="R$ 173,000"
                    change="+8%"
                    icon={<CartIcon />}
                />
            </div>


            {/* ROW 2: Welcome Section (Built by Devs / Rockets) */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Built by developers */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                    <div className="z-10 relative">
                        <p className="text-gray-400 font-bold text-sm mb-1 uppercase">Built by developers</p>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Purity UI Dashboard</h3>
                        <p className="text-gray-500 text-sm mb-8 sm:mb-12 max-w-sm">
                            From colors, cards, typography to complex elements, you will find the full documentation.
                        </p>
                        <Link to="#" className="text-gray-800 font-bold text-sm flex items-center hover:text-brand-primary transition-colors">
                            Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                    {/* Decorative Chakra Logo/Icon Placeholder */}
                    <div className="absolute right-0 top-0 h-full w-2/5 p-4 flex items-center justify-center">
                        <div className="w-full h-full bg-brand-primary rounded-2xl flex items-center justify-center text-white opacity-90 shadow-lg transform rotate-6 translate-x-4">
                            <svg viewBox="0 0 24 24" className="w-16 h-16 sm:w-24 sm:h-24" fill="currentColor"><path d="M12 0L1.75 6v12L12 24l10.25-6V6L12 0zm0 2.25l8 4.65v9.3L12 20.85 4 16.2v-9.3l8-4.65zM11.25 12v-6l-5.25 3v6l5.25-3zm1.5 0l5.25 3v-6l-5.25-3v6z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Work with the Rockets */}
                <div className="lg:col-span-2 rounded-2xl shadow-sm p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="z-10 relative text-white">
                        <h3 className="text-xl font-bold mb-2">Work with the Rockets</h3>
                        <p className="text-white/80 text-sm mb-8 sm:mb-12">
                            Wealth creation is an evolutionarily recent positive-sum game. It is all about who takes the opportunity first.
                        </p>
                        <Link to="#" className="text-white font-bold text-sm flex items-center hover:text-white/80 transition-colors">
                            Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ROW 3: Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart (Revenue) */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Visão Geral de Vendas</h3>
                    <p className="text-sm text-green-500 font-bold mb-6">(+5) mais em 2026</p>

                    <div className="w-full" style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={viewsData}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#004E89" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#004E89" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Area type="monotone" dataKey="views" stroke="#004E89" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Secondary Chart (Users/Activity) */}
                <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C61] rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2">Usuários Ativos</h3>
                        <p className="text-white/80 text-sm mb-6">Desempenho da semana</p>

                        <div className="w-full" style={{ height: 220 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <Bar dataKey="sales" fill="rgba(255,255,255,0.8)" radius={[4, 4, 0, 0]} barSize={8} />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>
            </div>

            {/* ROW 3: Content Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Active Projects Table */}
                <div className="lg:col-span-2 h-full">
                    <MiniTable data={activeServices.length > 0 ? activeServices : [
                        { service_title: 'Redesign UI Contratto', agreed_price: 14000, status: 'in_progress' },
                        { service_title: 'Landing Page TGT', agreed_price: 3000, status: 'canceled' },
                        { service_title: 'Logo Design', agreed_price: 400, status: 'completed' },
                        { service_title: 'API Integration', agreed_price: 2000, status: 'in_progress' }, // Mock for visual
                    ]} />
                </div>

                {/* Orders Overview / Timeline */}
                <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Visão Geral de Pedidos</h3>
                    <p className="text-sm text-green-500 font-bold mb-6">+30% este mês</p>

                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {[
                            { title: 'Novo pedido #1832412', time: '22 DEC 7:20 PM', color: 'text-blue-500', icon: 'bell' },
                            { title: 'Pagamento recebido', time: '21 DEC 11:21 PM', color: 'text-red-500', icon: 'code' },
                            { title: 'Novo cartão adicionado', time: '21 DEC 9:28 PM', color: 'text-blue-300', icon: 'cart' },
                            { title: 'Serviço entregue', time: '20 DEC 2:20 PM', color: 'text-orange-500', icon: 'key' },
                        ].map((item, i) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <div className={`w-2 h-2 rounded-full ${item.color.replace('text', 'bg')}`}></div>
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-100 shadow-sm bg-white">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                                        <time className="font-caveat font-medium text-xs text-slate-500">{item.time}</time>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverviewPage;
