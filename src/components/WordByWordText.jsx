import React from 'react';
import { motion } from 'framer-motion';

/**
 * WordByWordText:
 * Renders text appearing word-by-word with staggered spring animations
 * and tactile micro-interactions on hover for every individual word.
 */
export default function WordByWordText({
  text = '',
  className = '',
  wordClassName = '',
  highlightWords = [],
  highlightClassName = 'text-black underline decoration-black/30 underline-offset-4',
  delay = 0.1,
  stagger = 0.08,
  interactive = true,
  as: Component = 'div',
}) {
  if (!text) return null;

  const words = text.split(/\s+/).filter(Boolean);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140,
      },
    },
  };

  return (
    <Component className={`inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5"
      >
        {words.map((word, index) => {
          const isHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
          );

          return (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariants}
              whileHover={
                interactive
                  ? {
                      y: -3,
                      scale: 1.08,
                      transition: { type: 'spring', stiffness: 450, damping: 14 },
                    }
                  : undefined
              }
              className={`inline-block transition-colors cursor-default select-none ${
                isHighlighted ? highlightClassName : ''
              } ${wordClassName}`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </Component>
  );
}
