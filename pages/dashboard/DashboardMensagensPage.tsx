import React, { useState } from 'react';
import Button from '../../components/ui/Button';

interface Conversation {
    id: number;
    name: string;
    lastMessage: string;
    unread: boolean;
    avatar: string;
    messages: { from: 'user' | 'me', text: string }[];
}

const conversations: Conversation[] = [
    { 
        id: 1, 
        name: 'Carlos Pereira', 
        lastMessage: 'Olá, gostaria de um orçamento para uma degustação para 10 pessoas.', 
        unread: true, 
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        messages: [
            { from: 'user', text: 'Olá, gostaria de um orçamento para uma degustação para 10 pessoas.' },
        ]
    },
    { 
        id: 2, 
        name: 'Ana Julia', 
        lastMessage: 'Ok, obrigado!', 
        unread: false, 
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
        messages: [
            { from: 'user', text: 'Vocês abrem no feriado de amanhã?' },
            { from: 'me', text: 'Olá Ana! Sim, abriremos das 10h às 16h.'},
            { from: 'user', text: 'Ok, obrigado!'}
        ]
    },
];

const DashboardMensagensPage: React.FC = () => {
    const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);

  return (
    <div className="flex flex-1 min-h-0">
        {/* Conversation List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b shrink-0">
                <h3 className="text-lg font-medium text-gray-900">Mensagens</h3>
            </div>
            <ul className="overflow-y-auto flex-1">
                {conversations.map(conv => (
                    <li key={conv.id} 
                        onClick={() => setSelectedConv(conv)}
                        className={`flex items-center p-3 cursor-pointer border-b ${selectedConv?.id === conv.id ? 'bg-primary-50' : 'hover:bg-gray-50'}`}
                    >
                        <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full mr-3"/>
                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-800 truncate">{conv.name}</span>
                                {conv.unread && <span className="w-2.5 h-2.5 bg-primary-500 rounded-full shrink-0 ml-2"></span>}
                            </div>
                            <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Chat Area */}
        <div className="w-2/3 flex flex-col bg-gray-50">
           {selectedConv ? (
            <>
                <div className="p-4 border-b bg-white flex items-center shrink-0">
                    <img src={selectedConv.avatar} alt={selectedConv.name} className="w-10 h-10 rounded-full mr-3"/>
                    <h3 className="font-semibold text-gray-900">{selectedConv.name}</h3>
                </div>
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {selectedConv.messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.from === 'me' ? 'bg-primary-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t bg-white shrink-0">
                    <div className="flex space-x-3">
                        <input type="text" placeholder="Digite sua mensagem..." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                        <Button>Enviar</Button>
                    </div>
                </div>
            </>
           ) : (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Selecione uma conversa</h3>
                    <p className="mt-1 text-sm text-gray-500">Veja o histórico e responda seus clientes.</p>
                </div>
           )}
        </div>
    </div>
  );
};

export default DashboardMensagensPage;