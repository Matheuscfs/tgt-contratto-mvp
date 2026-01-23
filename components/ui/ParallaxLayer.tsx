import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxLayerProps {
    children: React.ReactNode;
    offset?: number;
    className?: string;
    horizontal?: boolean;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
    children,
    offset = 50,
    className = '',
    horizontal = false
}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const range = horizontal ? [0, 1] : [0, 1];
    const outputRange = horizontal ? [-offset, offset] : [-offset, offset];

    const value = useTransform(scrollYProgress, range, outputRange);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div style={horizontal ? { x: value } : { y: value }}>
                {children}
            </motion.div>
        </div>
    );
};

export default ParallaxLayer;
