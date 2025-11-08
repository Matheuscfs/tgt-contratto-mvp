
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col">
      <h3 className="text-md font-bold text-gray-800">{service.title}</h3>
      <p className="mt-1 text-sm text-gray-600 flex-grow">{service.description}</p>
      <div className="mt-3 flex justify-between items-center text-sm">
        {service.price && (
          <span className="font-semibold text-primary-600">
            R$ {service.price.toFixed(2).replace('.', ',')}
          </span>
        )}
        {service.duration && (
          <span className="text-gray-500">{service.duration}</span>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
