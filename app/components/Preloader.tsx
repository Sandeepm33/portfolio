'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PreloaderProps {
    onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        // Deliberate, luxurious Apple-style pacing (~4.5s total)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        document.body.style.overflow = '';
                        if (onComplete) onComplete();
                    }, 600);
                    return 100;
                }
                // Smooth 1% to 2% step increments every 45ms for a total ~4.5 second load time
                const step = Math.random() > 0.4 ? 1 : 2;
                return Math.min(prev + step, 100);
            });
        }, 45);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="apple-preloader"
                    className="apple-preloader-backdrop"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.03,
                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }}
                >
                    {/* Ambient Lighting Glow */}
                    <div className="apple-preloader-glow" />

                    <div className="apple-preloader-container">
                        {/* Custom Animated SVG Illustration - Prominent Large Size */}
                        <motion.div
                            className="apple-preloader-svg-wrap"
                            initial={{ scale: 0.9, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Image
                                src="/images/preloader.svg"
                                alt="Sandeep Bhargav Portfolio Preloader"
                                width={420}
                                height={315}
                                priority
                                unoptimized
                                className="apple-preloader-svg"
                            />
                        </motion.div>

                        {/* Apple Typography Section */}
                        <motion.div
                            initial={{ y: 24, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="apple-preloader-text-group"
                        >
                            <h1 className="apple-preloader-name">
                                Sandeep Bhargav
                            </h1>
                            <div className="apple-preloader-tag">
                                Portfolio
                            </div>
                            <div className="apple-preloader-badge">
                                React Full Stack Developer
                            </div>
                        </motion.div>

                        {/* Progress Bar & Percentage Counter */}
                        <motion.div
                            className="apple-preloader-bottom-group"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                        >
                            <div className="apple-preloader-bar-track">
                                <motion.div
                                    className="apple-preloader-bar-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="apple-preloader-counter">
                                <span>{progress}</span>
                                <span className="percent">%</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
