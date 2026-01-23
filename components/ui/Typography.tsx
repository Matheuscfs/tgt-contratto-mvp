import React from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'massive' | 'display';

interface TypographyProps {
    variant?: Variant;
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
    color?: string;
}

const Typography: React.FC<TypographyProps> = ({
    variant = 'body',
    children,
    className = '',
    as,
    color = 'text-gray-900'
}) => {
    const Component = as || MAP_VARIANT_TO_TAG[variant];

    return (
        <Component className={`${MAP_VARIANT_TO_CLASS[variant]} ${color} ${className}`}>
            {children}
        </Component>
    );
};

const MAP_VARIANT_TO_TAG: Record<Variant, React.ElementType> = {
    massive: 'h1',
    display: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    caption: 'span'
};

const MAP_VARIANT_TO_CLASS: Record<Variant, string> = {
    massive: 'text-massive font-black leading-none tracking-tighter',
    display: 'text-6xl md:text-8xl font-black leading-none tracking-tight',
    h1: 'text-4xl md:text-5xl font-bold leading-tight',
    h2: 'text-3xl md:text-4xl font-bold leading-snug',
    h3: 'text-2xl font-bold leading-snug',
    h4: 'text-xl font-bold leading-snug',
    body: 'text-base md:text-lg leading-relaxed text-gray-700',
    caption: 'text-sm font-medium text-gray-500 uppercase tracking-wide'
};

export default Typography;
