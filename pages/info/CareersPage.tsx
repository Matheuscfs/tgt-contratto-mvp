
import React from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import Button from '../../components/ui/Button';

const CareersPage: React.FC = () => {
  return (
    <InfoPageLayout title="Carreiras">
      <p>Faça parte de uma equipe apaixonada por tecnologia e pelo desenvolvimento de comunidades locais. Na TGT, estamos sempre em busca de talentos que queiram fazer a diferença.</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Vagas Abertas</h2>
      <div className="space-y-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold">Engenheiro(a) de Software Pleno (Frontend)</h3>
          <p className="mt-2">Estamos procurando um desenvolvedor React experiente para se juntar à nossa equipe e nos ajudar a construir a melhor plataforma de guia de negócios do mercado.</p>
          <Button className="mt-4">Ver Detalhes</Button>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold">Designer de Produto (UI/UX)</h3>
          <p className="mt-2">Buscamos um designer criativo e focado no usuário para projetar experiências intuitivas e bonitas para nossos clientes e empresas parceiras.</p>
            <Button className="mt-4">Ver Detalhes</Button>
        </div>
      </div>
    </InfoPageLayout>
  );
};
export default CareersPage;
