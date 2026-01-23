import React from 'react';
import { MOCK_COMPANIES } from '../../constants';
import AnimatedSection from '../../components/ui/AnimatedSection';

// Icons
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;

const DashboardOverviewPage: React.FC = () => {
    // Mock data for the current company (Index 0 for demo)
    const company = MOCK_COMPANIES[0];

    const stats = [
        { title: 'Visualizações do Perfil', value: '1,248', change: '+12%', icon: <EyeIcon />, color: 'bg-blue-500' },
        { title: 'Novas Mensagens', value: '5', change: '+2', icon: <ChatIcon />, color: 'bg-green-500' },
        { title: 'Avaliação Média', value: company.rating.toString(), change: '0%', icon: <StarIcon />, color: 'bg-yellow-500' },
    ];

    const recentActivity = [
        { id: 1, type: 'review', user: 'Ana Silva', content: 'Avaliou sua empresa com 5 estrelas', time: '2 horas atrás' },
        { id: 2, type: 'message', user: 'Carlos Eduardo', content: 'Enviou uma pergunta sobre orçamento', time: '5 horas atrás' },
        { id: 3, type: 'view', user: 'Visitante', content: 'Visualizou seu portfólio', time: 'Hoje, 09:30' },
    ];

    return (
        <div className="space-y-6 p-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Visão Geral</h2>
                <p className="text-gray-500">Bem-vindo de volta, {company.companyName}!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <AnimatedSection key={index} delay={index * 0.1}>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-5 py-3">
                                <div className="text-sm">
                                    <span className="text-green-600 font-bold">{stat.change}</span>
                                    <span className="text-gray-500 ml-2">desde a última semana</span>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <AnimatedSection delay={0.3} className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Atividade Recente</h3>
                    <ul className="divide-y divide-gray-200">
                        {recentActivity.map((activity) => (
                            <li key={activity.id} className="py-4">
                                <div className="flex space-x-3">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium">{activity.user}</h3>
                                            <p className="text-sm text-gray-500">{activity.time}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{activity.content}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">Ver tudo</button>
                    </div>
                </AnimatedSection>

                {/* Quick Tips or Announcements */}
                <AnimatedSection delay={0.4} className="bg-indigo-50 border border-indigo-100 shadow rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-indigo-900 mb-4">Dicas para seu negócio</h3>
                    <ul className="list-disc list-inside text-indigo-800 space-y-2">
                        <li>Complete seu perfil para ganhar +20% de visibilidade.</li>
                        <li>Responda mensagens em até 1 hora para selo "Responde Rápido".</li>
                        <li>Adicione fotos de alta qualidade ao seu portfólio.</li>
                    </ul>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default DashboardOverviewPage;
