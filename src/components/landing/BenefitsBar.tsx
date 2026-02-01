import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Zap, Award } from 'lucide-react';

const benefits = [
    {
        icon: Search,
        title: "Busca Inteligente",
        description: "Encontre exatamente o que precisa com nossos filtros avançados."
    },
    {
        icon: ShieldCheck,
        title: "Profissionais Verificados",
        description: "Todos os prestadores passam por uma rigorosa análise de documentos."
    },
    {
        icon: Zap,
        title: "Contratação Rápida",
        description: "Entre em contato direto pelo WhatsApp ou chat da plataforma."
    },
    {
        icon: Award,
        title: "Garantia de Qualidade",
        description: "Avalie e veja recomendações reais de outros clientes."
    }
];

const BenefitsBar: React.FC = () => {
    return (
        <section className="py-20 bg-white border-b border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center p-6 rounded-[24px] hover:bg-slate-50 transition-colors duration-300 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <item.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsBar;
