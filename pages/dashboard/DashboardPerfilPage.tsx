import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import FileUpload from '../../components/FileUpload';
import { MOCK_COMPANIES, CATEGORIES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

const DashboardPerfilPage: React.FC = () => {
  // In a real app, you'd fetch this data based on the logged-in user
  const companyData = MOCK_COMPANIES[0];
  const [formData, setFormData] = useState(companyData);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Handle nested address object
    if (['street', 'number', 'district', 'city', 'state', 'cep'].includes(name)) {
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        console.log("Saving data:", {formData, logoFile, coverFile});
        addToast("Perfil atualizado com sucesso!", "success");
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6 overflow-y-auto">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Perfil</h3>
        <p className="mt-1 text-sm text-gray-500">
          Atualize as informações públicas da sua empresa.
        </p>
      </div>
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <Input label="Nome Fantasia" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange}/>
                </div>
                 <div className="sm:col-span-3">
                    <Input label="Razão Social" id="legalName" name="legalName" value={formData.legalName} onChange={handleChange} />
                </div>
                 <div className="sm:col-span-3">
                    <Input label="CNPJ" id="cnpj" name="cnpj" value={formData.cnpj} disabled />
                </div>
                 <div className="sm:col-span-3">
                    <Input label="Telefone" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="sm:col-span-3">
                    <Input label="Website" id="website" name="website" value={formData.website} onChange={handleChange} />
                </div>
                 <div className="sm:col-span-3">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="sm:col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição da Empresa</label>
                    <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} className="mt-1 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"></textarea>
                </div>
                 <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                    <FileUpload onFileChange={setLogoFile} accept="image/*" maxSizeMb={5}/>
                </div>
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Imagem de Capa</label>
                    <FileUpload onFileChange={setCoverFile} accept="image/*" maxSizeMb={10}/>
                </div>
            </div>
        </div>
         <div className="pt-8 space-y-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Endereço</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                     <Input label="CEP" id="cep" name="cep" value={formData.address.cep} onChange={handleChange} />
                </div>
                <div className="sm:col-span-4">
                    <Input label="Rua" id="street" name="street" value={formData.address.street} onChange={handleChange}/>
                </div>
                 <div className="sm:col-span-2">
                    <Input label="Número" id="number" name="number" value={formData.address.number} onChange={handleChange}/>
                </div>
                 <div className="sm:col-span-2">
                    <Input label="Bairro" id="district" name="district" value={formData.address.district} onChange={handleChange}/>
                </div>
                <div className="sm:col-span-2">
                    <Input label="Cidade" id="city" name="city" value={formData.address.city} onChange={handleChange}/>
                </div>
                <div className="sm:col-span-2">
                    <Input label="Estado" id="state" name="state" value={formData.address.state} onChange={handleChange}/>
                </div>
            </div>
         </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
            <Button type="submit" className="ml-3" isLoading={isLoading}>
              Salvar alterações
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardPerfilPage;