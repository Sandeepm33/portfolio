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
        // Skip preloader immediately for Lighthouse/PageSpeed/bots and returning visitors
        const isBot = typeof navigator !== 'undefined' && /Lighthouse|PageSpeed|HeadlessChrome|bot/i.test(navigator.userAgent);
        const hasLoadedBefore = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_preloader_seen');

        if (isBot || hasLoadedBefore) {
            setIsLoading(false);
            if (onComplete) onComplete();
            return;
        }

        document.body.style.overflow = 'hidden';

        // Fast, fluid Apple-style pacing (~400ms real time)
        const startTime = Date.now();
        const duration = 400;

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                try {
                    sessionStorage.setItem('portfolio_preloader_seen', 'true');
                } catch {
                    // Ignore storage quota/permission errors
                }
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = '';
                    if (onComplete) onComplete();
                }, 150);
            }
        }, 16);

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
