import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FileUpload from '../components/FileUpload';
import { useToast } from '../contexts/ToastContext';
import { validateCNPJ, validateCPF } from '../utils/validators';
import { CATEGORIES } from '../constants';

const CompanyRegistrationPage: React.FC = () => {
  // In a real app, this would be a more robust state management solution
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    legalName: '',
    cnpj: '',
    email: '',
    phone: '',
    website: '',
    category: '',
    description: '',
    street: '',
    number: '',
    district: '',
    city: '',
    state: '',
    cep: '',
    adminName: '',
    adminCpf: '',
    adminEmail: '',
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [cnpjDocument, setCnpjDocument] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>, fieldName: string) => (file: File | null) => {
    setter(file);
    if(file) {
      setErrors(prev => ({...prev, [fieldName]: ''}));
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName) newErrors.companyName = 'Campo obrigatório';
    if (!formData.legalName) newErrors.legalName = 'Campo obrigatório';
    if (!validateCNPJ(formData.cnpj)) newErrors.cnpj = 'CNPJ inválido';
    if (!formData.email) newErrors.email = 'Campo obrigatório';
    if (!formData.category) newErrors.category = 'Campo obrigatório';
    if (!logo) newErrors.logo = 'O logo da empresa é obrigatório.';
    if (!coverImage) newErrors.coverImage = 'A imagem de capa é obrigatória.';
    if (!cnpjDocument) newErrors.cnpjDocument = 'Você precisa anexar o documento do CNPJ para ativar o perfil.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.street) newErrors.street = 'Campo obrigatório';
    if (!formData.city) newErrors.city = 'Campo obrigatório';
    if (!formData.state) newErrors.state = 'Campo obrigatório';
    if (!formData.cep) newErrors.cep = 'Campo obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
     const newErrors: Record<string, string> = {};
    if (!formData.adminName) newErrors.adminName = 'Campo obrigatório';
    if (!validateCPF(formData.adminCpf)) newErrors.adminCpf = 'CPF inválido';
    if (!formData.adminEmail) newErrors.adminEmail = 'Campo obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };
  
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsLoading(true);
    // Simulate API call with multipart/form-data
    setTimeout(() => {
      setIsLoading(false);
      addToast('Cadastro de empresa enviado com sucesso! Aguarde a aprovação.', 'success');
      navigate('/auth/login');
    }, 2000);
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cadastre sua Empresa</h1>
        <p className="text-gray-600 mb-8">Siga os passos para criar o perfil do seu negócio.</p>
        
        {/* Stepper */}
        <div className="mb-8">
            <ol className="flex items-center w-full">
                <li className={`flex w-full items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-500'} after:content-[''] after:w-full after:h-1 after:border-b ${step > 1 ? 'after:border-primary-600' : 'after:border-gray-200'} after:border-4 after:inline-block`}>
                    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">1</span>
                </li>
                <li className={`flex w-full items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-500'} after:content-[''] after:w-full after:h-1 after:border-b ${step > 2 ? 'after:border-primary-600' : 'after:border-gray-200'} after:border-4 after:inline-block`}>
                    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">2</span>
                </li>
                <li className={`flex items-center ${step >= 3 ? 'text-primary-600' : 'text-gray-500'}`}>
                    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">3</span>
                </li>
            </ol>
        </div>


        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">1. Dados da Empresa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Input label="Nome Fantasia" name="companyName" value={formData.companyName} onChange={handleChange} error={errors.companyName} required />
                 <Input label="Razão Social" name="legalName" value={formData.legalName} onChange={handleChange} error={errors.legalName} required />
                 <Input label="CNPJ" name="cnpj" placeholder="CNPJ (somente números ou formatado)" value={formData.cnpj} onChange={handleChange} error={errors.cnpj} required />
                 <Input label="Email de Contato Principal" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
                 <Input label="Telefone (Opcional)" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} />
                 <Input label="Website (Opcional)" name="website" value={formData.website} onChange={handleChange} error={errors.website} />
              </div>
              <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                  <select id="category" name="category" value={formData.category} onChange={handleChange} className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md ${errors.category ? 'border-red-500' : ''}`}>
                      <option value="">Selecione uma categoria</option>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                   {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Logo</label>
                        <FileUpload accept="image/jpeg,image/png" maxSizeMb={5} onFileChange={handleFileChange(setLogo, 'logo')} />
                        {errors.logo && <p className="mt-2 text-sm text-red-600">{errors.logo}</p>}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Imagem de Capa</label>
                        <FileUpload accept="image/jpeg,image/png" maxSizeMb={10} onFileChange={handleFileChange(setCoverImage, 'coverImage')} />
                        {errors.coverImage && <p className="mt-2 text-sm text-red-600">{errors.coverImage}</p>}
                    </div>
                </div>
               <div>
                    <label className="block text-sm font-medium text-gray-700">Comprovante de CNPJ</label>
                    <FileUpload accept="application/pdf,image/jpeg,image/png" maxSizeMb={10} onFileChange={handleFileChange(setCnpjDocument, 'cnpjDocument')} />
                    {errors.cnpjDocument && <p className="mt-2 text-sm text-red-600">{errors.cnpjDocument}</p>}
                </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-6">
               <h2 className="text-xl font-semibold">2. Endereço</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="CEP" name="cep" value={formData.cep} onChange={handleChange} error={errors.cep} required />
                    <Input label="Rua" name="street" value={formData.street} onChange={handleChange} error={errors.street} required />
                    <Input label="Número" name="number" value={formData.number} onChange={handleChange} error={errors.number} />
                    <Input label="Bairro" name="district" value={formData.district} onChange={handleChange} error={errors.district} />
                    <Input label="Cidade" name="city" value={formData.city} onChange={handleChange} error={errors.city} required />
                    <Input label="Estado" name="state" value={formData.state} onChange={handleChange} error={errors.state} required />
                 </div>
            </div>
          )}

          {step === 3 && (
              <div className="space-y-6">
               <h2 className="text-xl font-semibold">3. Administrador Responsável</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Nome do Responsável" name="adminName" value={formData.adminName} onChange={handleChange} error={errors.adminName} required />
                    <Input label="CPF do Responsável" name="adminCpf" value={formData.adminCpf} onChange={handleChange} error={errors.adminCpf} required />
                    <Input label="Email do Responsável" name="adminEmail" type="email" value={formData.adminEmail} onChange={handleChange} error={errors.adminEmail} required />
                 </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && <Button type="button" variant="secondary" onClick={handleBack}>Voltar</Button>}
            <div/>
            {step < 3 && <Button type="button" onClick={handleNext}>Próximo</Button>}
            {step === 3 && <Button type="submit" isLoading={isLoading}>Finalizar Cadastro</Button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationPage;