
import React from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';

const AboutPage: React.FC = () => {
  return (
    <InfoPageLayout title="Sobre Nós">
      <p>Bem-vindo à TGT, sua plataforma definitiva para conectar clientes a negócios locais de confiança.</p>
      <p>Nossa missão é fortalecer a economia local, fornecendo uma vitrine digital poderosa para empresas de todos os portes e, ao mesmo tempo, oferecendo aos consumidores uma maneira fácil e segura de encontrar os melhores serviços e produtos em sua região.</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Nossa História</h2>
      <p>A TGT nasceu da necessidade de criar um ecossistema digital justo e eficiente. Vimos o desafio que muitos negócios locais enfrentam para competir em um mundo cada vez mais online e decidimos criar uma solução que fosse acessível, fácil de usar e que gerasse resultados reais.</p>
    </InfoPageLayout>
  );
};

export default AboutPage;
