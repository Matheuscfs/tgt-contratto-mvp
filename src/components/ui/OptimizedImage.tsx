import React, { ImgHTMLAttributes, useState } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    alt: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    fallbackSrc = '/placeholder.png',
    ...props
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError && fallbackSrc) {
            setImgSrc(fallbackSrc);
            setHasError(true);
        }
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
                src={imgSrc}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                onLoad={() => setIsLoaded(true)}
                onError={handleError}
                loading="lazy"
                {...props}
            />
        </div>
    );
};

export default OptimizedImage;
