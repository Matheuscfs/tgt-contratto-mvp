import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    variant?: 'sharp' | 'elevated' | 'flat' | 'outline';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'sharp',
    padding = 'md',
    className = '',
    onClick
}) => {
    const baseClasses = 'bg-white transition-colors duration-300 overflow-hidden';

    const variantClasses = {
        sharp: 'rounded-sharp border border-gray-200 shadow-sm hover:border-brand-primary/30',
        elevated: 'rounded-sharp shadow-lg',
        flat: 'rounded-sharp bg-gray-50 border border-transparent',
        outline: 'rounded-sharp border-2 border-gray-200 bg-transparent hover:border-brand-primary'
    };

    const paddingClasses = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <motion.div
            className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
            onClick={onClick}
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
