import React from 'react';

export type BadgeVariant = 'success' | 'info' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    icon?: React.ReactNode;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'neutral',
    icon,
    className = ''
}) => {
    const variantStyles = {
        success: 'bg-green-500 text-white shadow-lg shadow-green-500/50',
        info: 'bg-blue-500 text-white shadow-lg shadow-blue-500/50',
        warning: 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/50',
        danger: 'bg-red-500 text-white shadow-lg shadow-red-500/50',
        neutral: 'bg-gray-500 text-white shadow-lg shadow-gray-500/50',
    };

    return (
        <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${variantStyles[variant]} ${className}`}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </span>
    );
};

export default Badge;
