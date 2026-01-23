import React, { useState, useMemo } from 'react';
import Button from '../../components/ui/Button';
import { useMockData } from '../../contexts/MockContext';
import { MOCK_COMPANIES } from '../../constants';

interface Conversation {
    id: string; // Changed to string to match message schema
    name: string;
    email: string; // Added email to identify conversation
    lastMessage: string;
    unread: boolean;
    avatar: string;
    messages: { from: 'user' | 'me', text: string, date: string }[];
}

const DashboardMensagensPage: React.FC = () => {
    // For demo purposes, we assume logged in as the first company
    const currentCompanyId = MOCK_COMPANIES[0].id;
    const { getMessages, sendMessage } = useMockData();
    const rawMessages = getMessages(currentCompanyId);

    const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    // Group messages by sender (simple logic for MVP)
    const conversations = useMemo(() => {
        const groups: { [email: string]: Conversation } = {};

        // Sort messages manually since they might come mixed
        const sorted = [...rawMessages].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        sorted.forEach(msg => {
            const isMe = msg.senderEmail === 'me@tgt.com'; // Hypothetical "me"
            const otherEmail = isMe ? 'unknown' : msg.senderEmail;
            // In a real app, we'd group by thread ID or user ID. 
            // Here, we group by senderEmail for incoming messages.

            // Note: This logic is simplified for the demo where we only receive messages
            // To support replies, we'd need a more complex schema.
            // For this MVP, let's assume all messages in context are INCOMING from clients.

            if (!groups[otherEmail]) {
                groups[otherEmail] = {
                    id: otherEmail, // Use email as ID for grouping
                    name: msg.senderName,
                    email: otherEmail,
                    lastMessage: msg.content,
                    unread: !msg.read,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName)}&background=random`,
                    messages: []
                };
            }

            groups[otherEmail].messages.push({
                from: 'user', // All generic messages are from 'user' in this view
                text: msg.content,
                date: msg.date
            });
            // Update last message
            groups[otherEmail].lastMessage = msg.content;
        });

        return Object.values(groups);
    }, [rawMessages]);

    const selectedConv = conversations.find(c => c.id === selectedConvId);

    const handleSendReply = () => {
        if (!replyText.trim() || !selectedConv) return;

        // In this mock MVP, we don't actually store "replies" in the same way 
        // because the Message type is simple. We'll just alert for now 
        // or simulating adding it to the local UI state if we wanted to be fancy.
        // For the demo:
        alert(`Resposta enviada para ${selectedConv.name} (Simulação)`);
        setReplyText('');
    };

    return (
        <div className="flex flex-1 min-h-[600px] border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b shrink-0 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">Mensagens</h3>
                </div>
                <ul className="overflow-y-auto flex-1 h-full">
                    {conversations.length === 0 && (
                        <li className="p-4 text-center text-gray-500 text-sm">Nenhuma mensagem recebida ainda.</li>
                    )}
                    {conversations.map(conv => (
                        <li key={conv.id}
                            onClick={() => setSelectedConvId(conv.id)}
                            className={`flex items-center p-3 cursor-pointer border-b transition-colors ${selectedConvId === conv.id ? 'bg-primary-50 border-l-4 border-l-primary-500' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                        >
                            <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full mr-3" />
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
                        <div className="p-4 border-b bg-white flex items-center shrink-0 shadow-sm">
                            <img src={selectedConv.avatar} alt={selectedConv.name} className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <h3 className="font-semibold text-gray-900">{selectedConv.name}</h3>
                                <p className="text-xs text-gray-500">{selectedConv.email}</p>
                            </div>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto space-y-4">
                            {selectedConv.messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.from === 'me' ? 'bg-primary-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                                        <p>{msg.text}</p>
                                        <span className={`text-[10px] block mt-1 ${msg.from === 'me' ? 'text-primary-100' : 'text-gray-400'}`}>{msg.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t bg-white shrink-0">
                            <div className="flex space-x-3">
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                                    placeholder="Digite sua resposta..."
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                />
                                <Button onClick={handleSendReply}>Enviar</Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Suas conversas</h3>
                        <p className="mt-1 text-sm text-gray-500">Selecione uma conversa para ver os detalhes.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardMensagensPage;