import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    variant?: 'default' | 'narrow' | 'full';
    background?: 'white' | 'gray' | 'brand-primary' | 'brand-secondary';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    id?: string;
}

const Section: React.FC<SectionProps> = ({
    children,
    variant = 'default',
    background = 'white',
    padding = 'lg',
    className = '',
    id,
    ...props
}) => {
    const bgClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        'brand-primary': 'bg-brand-primary text-white',
        'brand-secondary': 'bg-brand-secondary text-white'
    };

    const paddingClasses = {
        none: 'py-0',
        sm: 'py-8',
        md: 'py-12',
        lg: 'py-16',
        xl: 'py-24'
    };

    const containerClasses = {
        default: 'container mx-auto px-4',
        narrow: 'container mx-auto px-4 max-w-4xl',
        full: 'w-full px-4'
    };

    return (
        <section
            id={id}
            className={`${bgClasses[background]} ${paddingClasses[padding]} ${className}`}
            {...props}
        >
            <div className={containerClasses[variant]}>
                {children}
            </div>
        </section>
    );
};

export default Section;
