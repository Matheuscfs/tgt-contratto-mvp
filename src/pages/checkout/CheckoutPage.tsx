import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Service, ServicePackage } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const CheckoutPage = () => {
    const { serviceId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToast } = useToast();

    const tier = (searchParams.get('tier') || 'basic') as 'basic' | 'standard' | 'premium';

    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [company, setCompany] = useState<any>(null);

    useEffect(() => {
        const fetchService = async () => {
            if (!serviceId) return;
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*, company:companies(*)')
                    .eq('id', serviceId)
                    .single();

                if (error) throw error;
                setService(data);
                setCompany(data.company);
            } catch (error) {
                console.error("Error loading service", error);
                addToast("Erro ao carregar serviço.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [serviceId]);

    const handleConfirmPayment = async () => {
        if (!user || !service) return;

        setProcessing(true);
        try {
            // Secure Payment Flow via Edge Function
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: {
                    service_id: service.id,
                    package_tier: tier,
                    user_id: user.id
                }
            });

            if (error) throw error;

            if (data?.paymentUrl) {
                addToast("Sessão criada! Redirecionando para pagamento...", "success");
                // In a real app, this goes to Stripe/Gateway. 
                // For MVP, our mock function returns a URL. 
                // If it's a mock URL, we might want to simulate the webhook trigger or just go there.
                // Our mock URL: https://mock-payment-provider.com/pay...
                // Since it's a mock, we can't actually "pay". 
                // BUT, for the flow to work "end-to-end", we need the Order to be created.
                // The Webhook creates the order.
                // So the "Mock Payment Provider" should probably call the webhook?
                // OR, for this test, we can simulate the webhook call manually or via a "Success Page" that triggers it.
                // Given the requirement "Redirect to the URL", I will implement the redirect.
                // *Self-correction*: If the URL is external/mock, the user leaves the app.
                // Ideally, the Edge Function returns a URL that works.

                window.location.href = data.paymentUrl;
            } else {
                throw new Error("URL de pagamento não recebida.");
            }

        } catch (error: any) {
            console.error("Payment error:", error);
            addToast("Erro ao iniciar pagamento: " + error.message, "error");
            setProcessing(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    if (!service) return <div className="h-screen flex items-center justify-center">Serviço não encontrado.</div>;

    const selectedPackage = service.packages?.[tier];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout Seguro</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left: Payment Method (Mock) */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>

                            {/* Mock Credit Card Form */}
                            <div className="space-y-4 opacity-75 pointer-events-none"> {/* Mocked visual */}
                                <div className="border p-4 rounded-lg flex items-center bg-gray-50">
                                    <div className="w-4 h-4 rounded-full border-2 border-brand-primary mr-3 bg-brand-primary"></div>
                                    <span className="font-medium">Cartão de Crédito</span>
                                    <div className="ml-auto flex space-x-2">
                                        <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                        <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-10 bg-gray-100 rounded"></div>
                                    <div className="h-10 bg-gray-100 rounded"></div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 text-center">Ambiente de Teste: Nenhuma cobrança real será feita.</p>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                            <h2 className="text-xl font-semibold mb-6">Resumo do Pedido</h2>

                            <div className="flex items-start mb-4 pb-4 border-b border-gray-100">
                                <img
                                    src={service.gallery?.[0] || 'https://via.placeholder.com/150'}
                                    alt={service.title}
                                    className="w-16 h-10 object-cover rounded mr-3"
                                />
                                <p className="text-sm font-medium text-gray-800 line-clamp-2">{service.title}</p>
                            </div>

                            <div className="space-y-3 text-sm text-gray-600 mb-6">
                                <div className="flex justify-between font-medium">
                                    <span>Pacote <span className="capitalize text-brand-primary">({tier})</span></span>
                                    <span>R$ {selectedPackage?.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxa de Serviço</span>
                                    <span>R$ 0,00</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-100 mb-6">
                                <span>Total</span>
                                <span>R$ {selectedPackage?.price}</span>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full py-3 text-lg"
                                onClick={handleConfirmPayment}
                                isLoading={processing}
                            >
                                Confirmar e Pagar
                            </Button>

                            <p className="text-xs text-gray-400 mt-4 text-center">
                                Ao continuar, você concorda com nossos Termos de Serviço.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
