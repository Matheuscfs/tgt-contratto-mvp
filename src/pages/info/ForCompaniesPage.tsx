import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

// Placeholder icons (using SVG paths)
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;


const ForCompaniesPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-primary-800 text-white text-center py-20 px-4">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Conecte-se com Milhares de Clientes e Faça seu Negócio Decolar.</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-200">
            A TGT é a vitrine digital que sua empresa precisa para alcançar mais pessoas, gerenciar sua reputação e aumentar suas vendas.
          </p>
          <Link to="/empresa/cadastro" className="mt-8 inline-block">
            <Button className="text-lg px-8 py-3 transform hover:scale-105 transition-transform">
              Comece a Vender Mais Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Por que escolher a TGT?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Ferramentas poderosas para você gerenciar e expandir sua presença online sem complicações.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="bg-primary-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><ProfileIcon /></div>
              <h3 className="text-xl font-semibold mb-2">Perfil Detalhado</h3>
              <p className="text-gray-600">Mostre o melhor do seu negócio com galeria de fotos, serviços, horários e mais.</p>
            </div>
            <div className="p-6">
              <div className="bg-primary-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><StarIcon /></div>
              <h3 className="text-xl font-semibold mb-2">Gestão de Avaliações</h3>
              <p className="text-gray-600">Receba e responda avaliações de clientes para construir uma reputação de confiança.</p>
            </div>
             <div className="p-6">
              <div className="bg-primary-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><ChatIcon /></div>
              <h3 className="text-xl font-semibold mb-2">Canal de Mensagens</h3>
              <p className="text-gray-600">Comunique-se diretamente com seus clientes para tirar dúvidas e fechar negócios.</p>
            </div>
             <div className="p-6">
              <div className="bg-primary-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><ChartIcon /></div>
              <h3 className="text-xl font-semibold mb-2">Dashboard Intuitivo</h3>
              <p className="text-gray-600">Gerencie todas as informações do seu perfil de forma simples e rápida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold mb-2">Planos que se adaptam ao seu negócio</h2>
           <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Comece gratuitamente e evolua conforme seu negócio cresce. Sem contratos de longo prazo.</p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             {/* Plan 1: Básico */}
            <div className="border rounded-lg p-8 bg-white shadow-lg flex flex-col">
              <h3 className="text-2xl font-bold">Básico</h3>
              <p className="text-gray-500 mt-2">Ideal para começar</p>
              <p className="text-4xl font-extrabold my-6">Grátis</p>
              <ul className="space-y-4 text-left text-gray-600 flex-grow">
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Perfil da Empresa</span></li>
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Até 5 fotos na galeria</span></li>
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Receber avaliações</span></li>
              </ul>
              <Link to="/empresa/cadastro" className="mt-8"><Button variant="secondary" className="w-full">Começar Agora</Button></Link>
            </div>
             {/* Plan 2: Profissional */}
            <div className="border-2 border-primary-500 rounded-lg p-8 bg-white shadow-2xl relative flex flex-col transform md:scale-105">
                <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Mais Popular</span>
              <h3 className="text-2xl font-bold text-primary-600">Profissional</h3>
              <p className="text-gray-500 mt-2">Para negócios em crescimento</p>
              <p className="text-4xl font-extrabold my-6">R$ 49<span className="text-lg font-medium text-gray-500">/mês</span></p>
              <ul className="space-y-4 text-left text-gray-600 flex-grow">
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Tudo do Básico</span></li>
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Galeria com até 20 mídias</span></li>
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Responder avaliações</span></li>
                 <li className="flex items-center"><CheckIcon /><span className="ml-2">Perfil destacado na busca</span></li>
                 <li className="flex items-center"><CheckIcon /><span className="ml-2">Suporte prioritário</span></li>
              </ul>
              <Link to="/empresa/cadastro" className="mt-8"><Button className="w-full">Escolher Plano Pro</Button></Link>
            </div>
             {/* Plan 3: Premium */}
             <div className="border rounded-lg p-8 bg-white shadow-lg flex flex-col">
              <h3 className="text-2xl font-bold">Premium</h3>
              <p className="text-gray-500 mt-2">Para máxima performance</p>
              <p className="text-4xl font-extrabold my-6">R$ 99<span className="text-lg font-medium text-gray-500">/mês</span></p>
              <ul className="space-y-4 text-left text-gray-600 flex-grow">
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Tudo do Profissional</span></li>
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Galeria ilimitada</span></li>
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Relatórios de Acesso</span></li>
                <li className="flex items-center"><CheckIcon /><span className="ml-2">Gerente de conta dedicado</span></li>
              </ul>
              <Link to="/empresa/cadastro" className="mt-8"><Button variant="secondary" className="w-full">Fale Conosco</Button></Link>
            </div>
           </div>
        </div>
      </section>

       {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O que nossos parceiros dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-100 p-8 rounded-lg border">
              <p className="text-gray-600 italic">"Desde que cadastramos nossa adega na TGT, vimos um aumento de 30% nas ligações e visitas. A plataforma é intuitiva e o suporte é excelente!"</p>
              <div className="mt-4 flex items-center">
                <img src="https://picsum.photos/seed/adega/100/100" className="w-12 h-12 rounded-full" alt="Adega Vinho Sul" />
                <div className="ml-4">
                  <p className="font-semibold">Roberto Mendes</p>
                  <p className="text-sm text-gray-500">Sócio, Adega Vinho Sul</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg border">
              <p className="text-gray-600 italic">"A TGT nos conectou com clientes que realmente buscavam por desenvolvimento de software de qualidade. É a melhor ferramenta de marketing digital para nosso nicho."</p>
              <div className="mt-4 flex items-center">
                 <img src="https://picsum.photos/seed/tech/100/100" className="w-12 h-12 rounded-full" alt="Tech Solutions" />
                <div className="ml-4">
                  <p className="font-semibold">Carla Dias</p>
                  <p className="text-sm text-gray-500">CEO, Tech Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold">Pronto para dar o próximo passo?</h2>
          <p className="mt-2 text-primary-200 max-w-2xl mx-auto">Junte-se a centenas de empresas que estão crescendo com a TGT. O cadastro é rápido e fácil.</p>
          <Link to="/empresa/cadastro" className="mt-8 inline-block">
            <Button variant="secondary" className="text-lg px-8 py-3 transform hover:scale-105 transition-transform">
              Cadastre sua Empresa Gratuitamente
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ForCompaniesPage;