import React, { useState } from 'react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

// Mock data for appointments
const MOCK_APPOINTMENTS = [
    {
        id: '1',
        clientName: 'Ana Silva',
        clientAvatar: 'https://i.pravatar.cc/150?u=ana',
        service: 'Consultoria de Estilo',
        date: '2026-01-25',
        time: '14:00',
        status: 'pending', // pending, confirmed, completed, cancelled
        price: 350,
    },
    {
        id: '2',
        clientName: 'Carlos Oliveira',
        clientAvatar: 'https://i.pravatar.cc/150?u=carlos',
        service: 'Coloração Pessoal',
        date: '2026-01-26',
        time: '10:00',
        status: 'confirmed',
        price: 400,
    },
    {
        id: '3',
        clientName: 'Mariana Costa',
        clientAvatar: 'https://i.pravatar.cc/150?u=mariana',
        service: 'Workshop de Moda',
        date: '2026-01-22',
        time: '19:00',
        status: 'completed',
        price: 800,
    },
];

const DashboardAgendamentosPage: React.FC = () => {
    const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
    const [filter, setFilter] = useState('all');

    const handleUpdateStatus = (id: string, newStatus: string) => {
        setAppointments(prev => prev.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
    };

    const filteredAppointments = filter === 'all'
        ? appointments
        : appointments.filter(app => app.status === filter);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="warning">Pendente</Badge>;
            case 'confirmed': return <Badge variant="success">Confirmado</Badge>;
            case 'completed': return <Badge variant="info">Concluído</Badge>;
            case 'cancelled': return <Badge variant="danger">Cancelado</Badge>;
            default: return <Badge variant="neutral">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
                <Button variant="primary">Novo Agendamento</Button>
            </header>

            {/* Filters */}
            <div className="flex gap-2 border-b border-gray-200 pb-4 overflow-x-auto">
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === status
                                ? 'bg-brand-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {status === 'all' ? 'Todos' :
                            status === 'pending' ? 'Pendentes' :
                                status === 'confirmed' ? 'Confirmados' :
                                    status === 'completed' ? 'Concluídos' : 'Cancelados'}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                            <li key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <img className="h-12 w-12 rounded-full" src={appointment.clientAvatar} alt={appointment.clientName} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{appointment.clientName}</p>
                                            <p className="text-sm text-gray-500">{appointment.service}</p>
                                            <div className="flex items-center text-xs text-gray-400 mt-1">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                {new Date(appointment.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-end space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-bold text-gray-900">R$ {appointment.price.toFixed(2)}</span>
                                            {getStatusBadge(appointment.status)}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {appointment.time}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {appointment.status === 'pending' && (
                                        <div className="flex space-x-2 md:ml-4">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                                            >
                                                Aceitar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}
                                            >
                                                Recusar
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-12 text-center text-gray-500">
                            Nenhum agendamento encontrado nesta categoria.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DashboardAgendamentosPage;
