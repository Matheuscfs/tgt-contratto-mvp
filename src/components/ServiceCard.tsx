import React, { useState } from 'react';
import { Service } from '../types';
import Button from './ui/Button';

interface ServiceCardProps {
  service: Service;
  onRequestQuote?: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onRequestQuote }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
      <p className="mt-2 text-sm text-gray-600 flex-grow leading-relaxed">{service.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-col">
          {service.price && (
            <span className="text-2xl font-bold text-brand-primary">
              R$ {service.price.toFixed(0)}
            </span>
          )}
          {service.duration && (
            <span className="text-xs text-gray-500 mt-1">
              <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {service.duration}
            </span>
          )}
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onRequestQuote?.(service)}
          className={`transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Solicitar
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
