
import React from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';

const HelpPage: React.FC = () => {
  return (
    <InfoPageLayout title="Central de Ajuda">
      <p>Encontre respostas para as perguntas mais comuns sobre a TGT.</p>

      <div className="space-y-6 mt-8">
        <div>
          <h3 className="text-xl font-semibold">Como faço para cadastrar minha empresa?</h3>
          <p className="mt-2">É simples! Clique no botão "Publicar minha empresa" no topo da página e siga os passos do formulário de cadastro. Você precisará de informações básicas da empresa e do CNPJ.</p>
        </div>
          <div>
          <h3 className="text-xl font-semibold">O serviço é pago?</h3>
          <p className="mt-2">Para clientes, a busca e o contato com empresas são totalmente gratuitos. Para empresas, oferecemos um plano básico gratuito e planos premium com funcionalidades adicionais.</p>
        </div>
          <div>
          <h3 className="text-xl font-semibold">Como posso editar as informações do meu perfil de empresa?</h3>
          <p className="mt-2">Após fazer login como empresa, você terá acesso a um Dashboard completo onde poderá editar todas as informações do seu perfil, como serviços, portfólio, horário e dados de contato.</p>
        </div>
      </div>
    </InfoPageLayout>
  );
};
export default HelpPage;
