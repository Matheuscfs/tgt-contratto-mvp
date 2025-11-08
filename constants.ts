
import { Company } from './types';

export const CATEGORIES = [
  "Restaurantes",
  "Vinhos",
  "Tecnologia",
  "Saúde",
  "Educação",
  "Construção",
  "Serviços Automotivos",
  "Beleza e Estética",
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    slug: 'adega-vinho-sul',
    companyName: 'Adega Vinho Sul',
    legalName: 'Adega Vinho Sul Comercio Ltda',
    cnpj: '12.345.678/0001-90',
    logo: 'https://picsum.photos/seed/adega/400/400',
    coverImage: 'https://picsum.photos/seed/adegacover/1200/400',
    category: 'Vinhos',
    rating: 4.8,
    reviewCount: 125,
    description: 'Loja especializada em vinhos finos nacionais e importados. Oferecemos uma vasta seleção dos melhores rótulos para apreciadores e colecionadores. Venha nos visitar e participe de nossas degustações semanais.',
    address: {
      street: 'Av. Brasil',
      number: '1234',
      district: 'Centro',
      city: 'Cascavel',
      state: 'PR',
      cep: '85801-000',
      lat: -24.9555,
      lng: -53.4550,
    },
    phone: '+55 (45) 99999-9999',
    email: 'contato@vinhosul.com',
    website: 'www.vinhosul.com',
    services: [
      { id: 's1', title: 'Degustação Guiada', description: 'Uma experiência sensorial com 5 rótulos selecionados.', price: 150.00, duration: '2 horas' },
      { id: 's2', title: 'Consultoria de Adega', description: 'Ajudamos você a montar a adega dos seus sonhos.', price: 500.00 },
      { id: 's3', title: 'Venda de Vinhos Raros', description: 'Acesso a rótulos exclusivos e de safras antigas.' }
    ],
    portfolio: [
      { id: 'p1', type: 'image', url: 'https://picsum.photos/seed/porto1/800/600', caption: 'Nossa fachada' },
      { id: 'p2', type: 'image', url: 'https://picsum.photos/seed/porto2/800/600', caption: 'Seleção de vinhos tintos' },
      { id: 'p3', type: 'image', url: 'https://picsum.photos/seed/porto3/800/600', caption: 'Evento de degustação' },
      { id: 'p4', type: 'image', url: 'https://picsum.photos/seed/porto4/800/600', caption: 'Interior da loja' },
    ],
    reviews: [
        { id: 'r1', author: 'Carlos Pereira', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', rating: 5, comment: 'Atendimento excelente e vinhos de alta qualidade!', date: '2 dias atrás'},
        { id: 'r2', author: 'Ana Julia', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', rating: 4, comment: 'Ótima variedade, mas os preços são um pouco altos.', date: '1 semana atrás'},
    ]
  },
   {
    id: '2',
    slug: 'tech-solutions',
    companyName: 'Tech Solutions',
    legalName: 'Soluções em Tecnologia Ltda',
    cnpj: '98.765.432/0001-10',
    logo: 'https://picsum.photos/seed/tech/400/400',
    coverImage: 'https://picsum.photos/seed/techcover/1200/400',
    category: 'Tecnologia',
    rating: 4.5,
    reviewCount: 88,
    description: 'Consultoria e desenvolvimento de software sob medida para o seu negócio. Transformamos ideias em soluções digitais inovadoras e eficientes.',
    address: {
      street: 'Rua da Inovação',
      number: '567',
      district: 'Polo Tecnológico',
      city: 'São Paulo',
      state: 'SP',
      cep: '01000-000',
      lat: -23.5505,
      lng: -46.6333,
    },
    phone: '+55 (11) 98888-8888',
    email: 'contato@techsolutions.com',
    website: 'www.techsolutions.com',
    services: [
      { id: 's1', title: 'Desenvolvimento Web', description: 'Criação de sites e sistemas web responsivos.', price: 8000.00 },
      { id: 's2', title: 'Desenvolvimento Mobile', description: 'Aplicativos nativos para iOS e Android.', price: 15000.00 },
    ],
    portfolio: [
       { id: 'p1', type: 'image', url: 'https://picsum.photos/seed/techporto1/800/600', caption: 'Nosso escritório' },
       { id: 'p2', type: 'image', url: 'https://picsum.photos/seed/techporto2/800/600', caption: 'Equipe em ação' },
    ],
     reviews: [
        { id: 'r1', author: 'Mariana Costa', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', rating: 5, comment: 'Projeto entregue no prazo com qualidade impecável. Recomendo!', date: '1 mês atrás'},
    ]
  },
];
