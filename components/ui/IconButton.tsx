import React from 'react';
import { motion } from 'framer-motion';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
        primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg hover:shadow-xl focus:ring-brand-primary',
        secondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90 shadow-lg hover:shadow-xl focus:ring-brand-secondary',
        ghost: 'bg-transparent text-gray-500 hover:text-brand-primary hover:bg-brand-primary/10 focus:ring-brand-primary',
        outline: 'bg-transparent border-2 border-current text-gray-700 hover:text-brand-primary hover:border-brand-primary focus:ring-brand-primary'
    };

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    return (
        <motion.button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            {...(props as any)}
        >
            {children}
        </motion.button>
    );
};

export default IconButton;
