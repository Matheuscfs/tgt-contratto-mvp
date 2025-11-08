
import React from 'react';

interface InfoPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const InfoPageLayout: React.FC<InfoPageLayoutProps> = ({ title, children }) => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8 border-b pb-4">
          {title}
        </h1>
        <div className="text-gray-700 space-y-6 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoPageLayout;
