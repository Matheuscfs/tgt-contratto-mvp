import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                            O Marketplace do Futuro
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8 tracking-tight">
                            A forma mais inteligente de <br />
                            <span className="text-brand-primary">contratar serviços locais.</span>
                        </h1>
                        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Conecte-se com os melhores profissionais da sua região. Segurança, agilidade e a garantia TGT Contratto para o seu negócio ou residência.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/empresas">
                            <Button size="lg" className="rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                Encontrar Prestadores
                            </Button>
                        </Link>
                        <Link to="/empresa/cadastro">
                            <Button variant="outline" size="lg" className="rounded-full px-8 py-4 text-lg border-2 hover:bg-gray-50 bg-white">
                                Cadastrar minha Empresa
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-12 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                            ))}
                        </div>
                        <span>+ 5.000 prestadores verificados</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
