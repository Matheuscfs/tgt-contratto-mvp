import React from 'react';

interface StatsGridProps {
    stats: {
        value: string | number;
        label: string;
        icon?: React.ReactNode;
    }[];
    columns?: 2 | 3 | 4;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, columns = 3 }) => {
    const gridCols = {
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-6 text-center`}>
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                    {stat.icon && (
                        <div className="mb-2 text-brand-primary">
                            {stat.icon}
                        </div>
                    )}
                    <p className="text-3xl font-bold text-brand-primary">
                        {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
