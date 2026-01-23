import React from 'react';


interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'rectangular' | 'circular' | 'text';
    width?: string | number;
    height?: string | number;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'rectangular',
    width,
    height,
    className,
    ...props
}) => {
    const baseClasses = "animate-pulse bg-gray-200 rounded-sharp";

    const variantClasses = {
        rectangular: "rounded-sharp",
        circular: "rounded-full",
        text: "rounded-sm h-4"
    };

    const style = {
        width: width,
        height: height,
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
            style={style}
            {...props}
        />
    );
};

export default Skeleton;
