
import React from 'react';

const ClientMessagesPage: React.FC = () => {
  const conversations = [
      { id: 1, name: 'Adega Vinho Sul', lastMessage: 'Seu pedido de orçamento foi recebido!', unread: true, avatar: 'https://picsum.photos/seed/adega/400/400'},
  ];
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Minhas Mensagens</h1>
        </div>
        <ul>
          {conversations.length > 0 ? conversations.map(conv => (
            <li key={conv.id} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
              <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full mr-4"/>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">{conv.name}</span>
                  {conv.unread && <span className="text-xs text-white bg-primary-500 rounded-full px-2 py-1">Nova</span>}
                </div>
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
              </div>
            </li>
          )) : (
             <li className="p-8 text-center text-gray-500">Nenhuma conversa encontrada.</li>
          )}
        </ul>
       </div>
    </div>
  );
};

export default ClientMessagesPage;
