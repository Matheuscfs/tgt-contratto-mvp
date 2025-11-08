
import React from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';

const PrivacyPage: React.FC = () => {
  return (
    <InfoPageLayout title="Política de Privacidade">
      <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Coleta de Informações</h2>
      <p>Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, preenche um formulário ou se comunica conosco. Isso pode incluir seu nome, email, número de telefone e informações da empresa.</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Uso das Informações</h2>
      <p>Usamos as informações coletadas para operar, manter e melhorar nossos serviços, para nos comunicarmos com você, para processar transações e para outros fins de negócios.</p>
       <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Compartilhamento de Informações</h2>
        <p>Não compartilhamos suas informações pessoais com terceiros, exceto conforme descrito nesta Política de Privacidade ou com o seu consentimento.</p>
    </InfoPageLayout>
  );
};
export default PrivacyPage;
