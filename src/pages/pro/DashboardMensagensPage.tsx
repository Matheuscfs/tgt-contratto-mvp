import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import Button from '../../components/ui/Button';

interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    created_at: string;
    read_at: string | null;
}

interface Thread {
    partnerId: string;
    partnerName: string;
    partnerAvatar?: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

const DashboardMensagensPage: React.FC = () => {
    const { user } = useAuth();
    const [threads, setThreads] = useState<Thread[]>([]);
    const [activeThread, setActiveThread] = useState<Thread | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        fetchThreads();
    }, [user, fetchThreads]);

    useEffect(() => {
        if (activeThread && user) {
            fetchMessages(activeThread.partnerId);
            setThreads(prev => prev.map(t =>
                t.partnerId === activeThread.partnerId ? { ...t, unreadCount: 0 } : t
            ));

            // Subscribe to new messages
            const subscription = supabase
                .channel(`chat:${user.id}:${activeThread.partnerId}`)
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `sender_id=eq.${activeThread.partnerId}`
                }, (payload) => {
                    const newMsg = payload.new as Message;
                    if (newMsg.receiver_id === user.id) {
                        setMessages(prev => [...prev, newMsg]);
                    }
                })
                .subscribe();

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [activeThread, user, fetchMessages]);

    const fetchThreads = async () => {
        // This is a simplified fetch. In production, use a dedicated view or RPC for performance.
        // Fetching all messages and aggregating client-side for MVP.
        try {
            const { data: sent, error: sentError } = await supabase
                .from('messages')
                .select('*')
                .eq('sender_id', user!.id);

            const { data: received, error: receivedError } = await supabase
                .from('messages')
                .select('*, sender:profiles!sender_id(full_name, avatar_url, email)') // Assuming generic relation
                .eq('receiver_id', user!.id);

            if (sentError || receivedError) throw new Error('Failed to fetch');

            // process threads...
            // Mocking threads for MVP display if backend is empty
            if ((!sent || sent.length === 0) && (!received || received.length === 0)) {
                setThreads([]);
            } else {
                // Logic to aggregate threads would go here
                // For now, let's just use the received messages to build contact list
                const uniqueSenders = new Map<string, Thread>();

                received?.forEach((msg: any) => {
                    if (!uniqueSenders.has(msg.sender_id)) {
                        uniqueSenders.set(msg.sender_id, {
                            partnerId: msg.sender_id,
                            partnerName: msg.sender?.full_name || 'Usuário',
                            partnerAvatar: msg.sender?.avatar_url,
                            lastMessage: msg.content,
                            lastMessageTime: msg.created_at,
                            unreadCount: msg.read_at ? 0 : 1
                        });
                    }
                });
                setThreads(Array.from(uniqueSenders.values()));
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (partnerId: string) => {
        const { data } = await supabase
            .from('messages')
            .select('*')
            .or(`and(sender_id.eq.${user!.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user!.id})`)
            .order('created_at', { ascending: true });

        if (data) setMessages(data);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeThread) return;

        const optimisticMsg: Message = {
            id: 'temp-' + Date.now(),
            sender_id: user!.id,
            receiver_id: activeThread.partnerId,
            content: newMessage,
            created_at: new Date().toISOString(),
            read_at: null
        };

        setMessages(prev => [...prev, optimisticMsg]);
        setNewMessage('');

        const { error } = await supabase.from('messages').insert({
            sender_id: user!.id,
            receiver_id: activeThread.partnerId,
            content: optimisticMsg.content
        });

        if (error) {
            console.error('Error sending:', error);
            // Revert optimistic update ideally
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Mensagens</h2>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            <LoadingSkeleton className="h-16 w-full rounded-lg" />
                            <LoadingSkeleton className="h-16 w-full rounded-lg" />
                            <LoadingSkeleton className="h-16 w-full rounded-lg" />
                        </div>
                    ) : threads.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            Nenhuma conversa iniciada.
                        </div>
                    ) : (
                        threads.map(thread => (
                            <button
                                key={thread.partnerId}
                                onClick={() => setActiveThread(thread)}
                                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${activeThread?.partnerId === thread.partnerId ? 'bg-blue-50 border-r-4 border-brand-primary' : ''}`}
                            >
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 font-bold overflow-hidden">
                                    {thread.partnerAvatar ? (
                                        <img src={thread.partnerAvatar} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        thread.partnerName.charAt(0)
                                    )}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-semibold text-gray-900 truncate">{thread.partnerName}</span>
                                        <span className="text-xs text-gray-400 flex-shrink-0">
                                            {new Date(thread.lastMessageTime).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{thread.lastMessage}</p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="w-2/3 flex flex-col bg-slate-50">
                {activeThread ? (
                    <>
                        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">
                                    {activeThread.partnerName.charAt(0)}
                                </div>
                                <span className="font-bold text-gray-800">{activeThread.partnerName}</span>
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => {
                                const isMe = msg.sender_id === user?.id;
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-sm ${isMe
                                                ? 'bg-brand-primary text-white rounded-br-none'
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                                }`}
                                        >
                                            {msg.content}
                                            <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Digite sua mensagem..."
                                    className="flex-grow p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                />
                                <Button variant="primary" type="submit" disabled={!newMessage.trim()}>
                                    Enviar
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                        <p>Selecione uma conversa para começar</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardMensagensPage;
