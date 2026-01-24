import React, { useState } from 'react';
import Button from './ui/Button';
import { useMockData } from '../contexts/MockContext';
import { useToast } from '../contexts/ToastContext';

interface MessageModalProps {
    companyId: string;
    companyName: string;
    isOpen: boolean;
    onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ companyId, companyName, isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { sendMessage } = useMockData();
    const { addToast } = useToast();

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        // Simulate network delay
        setTimeout(() => {
            sendMessage(companyId, {
                senderName: name,
                senderEmail: email,
                content: message,
                companyId: companyId
            });

            addToast(`Mensagem enviada para ${companyName}!`, 'success');
            setIsSending(false);
            // Reset form
            setName('');
            setEmail('');
            setMessage('');
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                {/* Background overlay */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

                {/* Modal panel */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Enviar mensagem para {companyName}
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Seu Nome</label>
                                            <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Seu Email</label>
                                            <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
                                            <textarea id="message" rows={3} required value={message} onChange={e => setMessage(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <Button type="submit" isLoading={isSending} className="w-full sm:w-auto sm:ml-3">
                                Enviar Mensagem
                            </Button>
                            <Button type="button" variant="secondary" onClick={onClose} className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto">
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;
