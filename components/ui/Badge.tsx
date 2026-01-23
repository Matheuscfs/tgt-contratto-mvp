import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'neutral';
    size?: 'sm' | 'md';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = ''
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-sharp';

    const variantClasses = {
        primary: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
        secondary: 'bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20',
        accent: 'bg-brand-accent/20 text-brand-accent-darker border border-brand-accent/30',
        success: 'bg-green-100 text-green-800 border border-green-200',
        warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        neutral: 'bg-gray-100 text-gray-800 border border-gray-200'
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[0.65rem]',
        md: 'px-3 py-1 text-xs'
    };

    return (
        <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
