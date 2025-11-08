import React from 'react';
import Button from '../../components/ui/Button';

const DashboardPortfolioPage: React.FC = () => {
    const portfolio = [
        {id: 'p1', url: 'https://picsum.photos/seed/porto1/800/600', caption: 'Nossa fachada' },
        {id: 'p2', url: 'https://picsum.photos/seed/porto2/800/600', caption: 'Seleção de vinhos tintos' },
        {id: 'p3', url: 'https://picsum.photos/seed/porto3/800/600', caption: 'Evento de degustação' },
    ]
  return (
    <div className="space-y-6 p-6">
       <div className="sm:flex sm:items-center sm:justify-between">
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Portfólio / Galeria</h3>
                <p className="mt-1 text-sm text-gray-500">Gerencie as imagens e vídeos que aparecem no seu perfil.</p>
            </div>
            <div className="mt-4 sm:mt-0">
                <Button>Adicionar Mídia</Button>
            </div>
       </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolio.map(item => (
                <div key={item.id} className="group relative aspect-square rounded-lg overflow-hidden">
                    <img src={item.url} alt={item.caption} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-white mx-2">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
                        </button>
                         <button className="text-white mx-2">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default DashboardPortfolioPage;