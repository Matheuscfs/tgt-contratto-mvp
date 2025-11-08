import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';
import { MOCK_COMPANIES } from '../../constants';
import { Service } from '../../types';

const ServiceModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (service: Service) => void;
    service: Service | null;
}> = ({ isOpen, onClose, onSave, service }) => {
    const [title, setTitle] = useState(service?.title || '');
    const [description, setDescription] = useState(service?.description || '');
    const [price, setPrice] = useState(service?.price || 0);
    const [duration, setDuration] = useState(service?.duration || '');

    React.useEffect(() => {
        setTitle(service?.title || '');
        setDescription(service?.description || '');
        setPrice(service?.price || 0);
        setDuration(service?.duration || '');
    }, [service]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: service?.id || `s${Date.now()}`,
            title,
            description,
            price: Number(price),
            duration
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{service ? 'Editar Serviço' : 'Adicionar Serviço'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Título do Serviço" value={title} onChange={e => setTitle(e.target.value)} required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Preço (R$)" type="number" value={price.toString()} onChange={e => setPrice(Number(e.target.value))} />
                        <Input label="Duração (ex: 2 horas)" value={duration} onChange={e => setDuration(e.target.value)} />
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const DashboardServicosPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>(MOCK_COMPANIES[0].services);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const { addToast } = useToast();

    const openModalToAdd = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const openModalToEdit = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };
    
    const handleDelete = (serviceId: string) => {
        if(window.confirm("Tem certeza que deseja excluir este serviço?")) {
            setServices(prev => prev.filter(s => s.id !== serviceId));
            addToast("Serviço excluído.", 'info');
        }
    };
    
    const handleSave = (service: Service) => {
        if(editingService) {
            // Update
            setServices(prev => prev.map(s => s.id === service.id ? service : s));
            addToast("Serviço atualizado com sucesso!", 'success');
        } else {
            // Add
            setServices(prev => [...prev, service]);
             addToast("Serviço adicionado com sucesso!", 'success');
        }
        setIsModalOpen(false);
    };


  return (
    <>
    <div className="space-y-6 p-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Serviços</h3>
          <p className="mt-1 text-sm text-gray-500">
            Adicione, edite ou remova os serviços oferecidos.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={openModalToAdd}>Adicionar Serviço</Button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map(service => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.price ? `R$ ${service.price.toFixed(2).replace('.',',')}` : '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => openModalToEdit(service)} className="text-primary-600 hover:text-primary-900">Editar</button>
                        <button onClick={() => handleDelete(service.id)} className="ml-4 text-red-600 hover:text-red-900">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        service={editingService}
    />
    </>
  );
};

export default DashboardServicosPage;