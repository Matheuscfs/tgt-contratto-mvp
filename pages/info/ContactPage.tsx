
import React from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ContactPage: React.FC = () => {
  return (
    <InfoPageLayout title="Fale Conosco">
      <p>Tem alguma dúvida, sugestão ou feedback? Adoraríamos ouvir de você. Preencha o formulário abaixo ou entre em contato através de nossos canais.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Informações de Contato</h3>
          <p><strong>Email:</strong> contato@tgt.com</p>
          <p><strong>Telefone:</strong> +55 (11) 4002-8922</p>
          <p><strong>Endereço:</strong> Rua da Inovação, 567, São Paulo - SP</p>
        </div>
        <form className="space-y-4">
          <Input label="Seu Nome" id="name" required />
          <Input label="Seu Email" id="email" type="email" required />
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Sua Mensagem</label>
            <textarea id="message" name="message" rows={4} className="mt-1 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" required></textarea>
          </div>
          <Button type="submit">Enviar Mensagem</Button>
        </form>
      </div>
    </InfoPageLayout>
  );
};

export default ContactPage;
