
import React from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';

const ForClientsPage: React.FC = () => {
  return (
    <InfoPageLayout title="Para Clientes">
      <p>Encontrar o serviço perfeito nunca foi tão fácil. Com a TGT, você tem acesso a um guia completo de negócios locais, avaliados pela comunidade.</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Vantagens</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Busca Inteligente:</strong> Encontre exatamente o que precisa com nossos filtros avançados.</li>
        <li><strong>Avaliações Reais:</strong> Conte com a opinião de outros clientes para tomar a melhor decisão.</li>
        <li><strong>Portfólios Completos:</strong> Veja fotos, vídeos e descrições detalhadas dos serviços oferecidos.</li>
        <li><strong>Contato Direto:</strong> Envie mensagens diretamente para as empresas para tirar dúvidas e solicitar orçamentos.</li>
        <li><strong>Totalmente Gratuito:</strong> Acessar e buscar na plataforma é 100% gratuito para clientes.</li>
      </ul>
    </InfoPageLayout>
  );
};
export default ForClientsPage;
