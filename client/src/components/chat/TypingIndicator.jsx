import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TypingIndicator = () => {
    const phrases = [
        "Thinking...",
        "Analyzing...",
        "Processing...",
        "Generating response...",
        "Working on it..."
    ];

    const [currentPhrase, setCurrentPhrase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-3 px-4 py-3">
            {/* Animated sparkle icon */}
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <Sparkles className="w-4 h-4 accent-color" />
            </motion.div>

            {/* Rotating text */}
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentPhrase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-secondary font-medium"
                >
                    {phrases[currentPhrase]}
                </motion.span>
            </AnimatePresence>

            {/* Animated dots */}
            <div className="flex items-center gap-1 ml-1">
                <motion.div
                    className="w-1.5 h-1.5 rounded-full accent-bg"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                    className="w-1.5 h-1.5 rounded-full accent-bg"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                    className="w-1.5 h-1.5 rounded-full accent-bg"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
            </div>
        </div>
    );
};

export default TypingIndicator;
