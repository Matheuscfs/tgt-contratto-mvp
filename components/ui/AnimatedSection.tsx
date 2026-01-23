import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { fadeInUp, springTransition, staggerContainer } from '../../utils/animations';

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    threshold?: number;
    viewport?: { once?: boolean; margin?: string };
    stagger?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    className = '',
    delay = 0,
    threshold = 0.2,
    viewport = { once: true, margin: '-50px' },
    stagger = false,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: viewport.once, amount: threshold, margin: viewport.margin as any });
    const shouldReduceMotion = useReducedMotion();

    const variants = stagger ? staggerContainer : fadeInUp;

    // If reduced motion is preferred, use a simpler opacity transition
    const finalVariants = shouldReduceMotion ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay } }
    } : variants;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={finalVariants}
            transition={{ ...springTransition, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
