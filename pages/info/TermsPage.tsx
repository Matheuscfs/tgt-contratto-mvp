
import React from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';

const TermsPage: React.FC = () => {
  return (
    <InfoPageLayout title="Termos de Serviço">
        <p>Ao acessar ou usar a plataforma TGT, você concorda em cumprir e estar sujeito a estes Termos de Serviço.</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Uso da Plataforma</h2>
        <p>Você concorda em usar a plataforma apenas para fins legais e de acordo com estes Termos. Você é responsável por todo o conteúdo que postar e por suas interações com outros usuários.</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Contas</h2>
        <p>Ao criar uma conta conosco, você deve nos fornecer informações precisas, completas e atuais em todos os momentos. A falha em fazer isso constitui uma violação dos Termos, o que pode resultar na rescisão imediata de sua conta em nosso serviço.</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Rescisão</h2>
        <p>Podemos rescindir ou suspender sua conta imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos.</p>
    </InfoPageLayout>
  );
};
export default TermsPage;
