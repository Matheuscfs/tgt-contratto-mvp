
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ClientProfilePage: React.FC = () => {
  const { user } = useAuth();

  // The ProtectedRoute component that wraps this page already ensures the user is not null.
  // If we reach this component, we can assume 'user' is a valid User object and use the non-null assertion operator (!).

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Meu Perfil</h1>
        <form className="space-y-6">
          <div className="flex items-center space-x-4">
            <img className="h-20 w-20 rounded-full" src={user!.avatar || `https://i.pravatar.cc/150?u=${user!.id}`} alt="User avatar" />
            <Button type="button" variant="secondary">Alterar Foto</Button>
          </div>
          <Input 
            label="Nome Completo" 
            id="name" 
            defaultValue={user!.name} 
          />
          <Input 
            label="Email" 
            id="email" 
            type="email" 
            defaultValue={user!.email} 
          />
           <div className="pt-5">
                <div className="flex justify-end">
                    <Button type="submit">
                        Salvar Alterações
                    </Button>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ClientProfilePage;
