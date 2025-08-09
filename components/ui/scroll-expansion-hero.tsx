'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc = "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop",
  posterSrc,
  bgImageSrc = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop",
  title = "Dynamic Showcase",
  date = "Scroll Experience",
  scrollToExpand = "Scroll to Expand",
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number>();
  const lastScrollTime = useRef<number>(0);
  
  // Use Framer Motion for smooth animations
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    damping: 25,
    stiffness: 120,
    mass: 0.8,
  });

  useEffect(() => {
    setShowContent(false);
    setMediaFullyExpanded(false);
    scrollProgress.set(0);
  }, [mediaType, scrollProgress]);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    let isScrolling = false;
    let targetProgress = 0;

    const updateAnimation = () => {
      if (isScrolling) {
        scrollProgress.set(targetProgress);
        animationRef.current = requestAnimationFrame(updateAnimation);
      }
    };

    const handleWheel = (e: Event) => {
      const wheelEvent = e as unknown as WheelEvent;
      const now = Date.now();
      
      if (now - lastScrollTime.current < 16) return; // Limit to 60fps
      lastScrollTime.current = now;

      if (mediaFullyExpanded && wheelEvent.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        wheelEvent.preventDefault();
        return;
      }

      if (!mediaFullyExpanded) {
        wheelEvent.preventDefault();
        
        const scrollDelta = wheelEvent.deltaY * 0.0005; // Much more sensitive
        targetProgress = Math.min(Math.max(targetProgress + scrollDelta, 0), 1);
        
        if (!isScrolling) {
          isScrolling = true;
          animationRef.current = requestAnimationFrame(updateAnimation);
        }

        if (targetProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (targetProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as unknown as TouchEvent;
      // Touch handling will be implemented similarly
    };

    const handleTouchMove = (e: Event) => {
      const touchEvent = e as unknown as TouchEvent;
      if (!touchEvent.touches[0]) return;

      const touchY = touchEvent.touches[0].clientY;
      const deltaY = touchY - (lastScrollTime.current || touchY);
      
      if (mediaFullyExpanded && deltaY > 20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        touchEvent.preventDefault();
        return;
      }

      if (!mediaFullyExpanded) {
        touchEvent.preventDefault();
        
        const scrollDelta = deltaY * 0.001;
        targetProgress = Math.min(Math.max(targetProgress - scrollDelta, 0), 1);
        
        if (!isScrolling) {
          isScrolling = true;
          animationRef.current = requestAnimationFrame(updateAnimation);
        }

        if (targetProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (targetProgress < 0.75) {
          setShowContent(false);
        }

        lastScrollTime.current = touchY;
      }
    };

    const handleTouchEnd = (): void => {
      isScrolling = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    sectionElement.addEventListener('wheel', handleWheel, { passive: false });
    sectionElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    sectionElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    sectionElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      sectionElement.removeEventListener('wheel', handleWheel);
      sectionElement.removeEventListener('touchstart', handleTouchStart);
      sectionElement.removeEventListener('touchmove', handleTouchMove);
      sectionElement.removeEventListener('touchend', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mediaFullyExpanded, scrollProgress]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = useTransform(smoothProgress, [0, 1], [300, 300 + (isMobileState ? 650 : 1250)]);
  const mediaHeight = useTransform(smoothProgress, [0, 1], [400, 400 + (isMobileState ? 200 : 400)]);
  const textTranslateX = useTransform(smoothProgress, [0, 1], [0, isMobileState ? 180 : 150]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            style={{ opacity: useTransform(smoothProgress, [0, 1], [1, 0]) }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {bgImageSrc.endsWith('.mp4') ? (
              <video
                src={bgImageSrc}
                autoPlay
                loop
                muted
                playsInline
                className='w-screen h-screen object-cover'
              />
            ) : (
              <Image
                src={bgImageSrc}
                alt='Background'
                width={1920}
                height={1080}
                className='w-screen h-screen object-cover'
                priority
              />
            )}
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <motion.div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                style={{
                  width: mediaWidth,
                  height: mediaHeight,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <div className='relative w-full h-full'>
                  {mediaType === 'video' ? (
                    <video
                      src={mediaSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='w-full h-full object-cover rounded-xl'
                    />
                  ) : (
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover rounded-xl'
                    />
                  )}

                  <motion.div
                    className='absolute inset-0 bg-black/50 rounded-xl'
                    initial={{ opacity: 0.7 }}
                    style={{ opacity: useTransform(smoothProgress, [0, 1], [0.7, 0.4]) }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                </div>

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <motion.p
                      className='text-2xl text-blue-200'
                      style={{ x: -textTranslateX }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                      {date}
                    </motion.p>
                  )}
                  {scrollToExpand && (
                    <motion.p
                      className='text-blue-200 font-medium text-center'
                      style={{ x: textTranslateX }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                      {scrollToExpand}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200 transition-none'
                  style={{ x: -textTranslateX }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200 transition-none'
                  style={{ x: textTranslateX }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;