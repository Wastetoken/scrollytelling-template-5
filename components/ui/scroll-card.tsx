'use client';
import { ReactLenis } from 'lenis/react';
import React, { useRef, forwardRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ArticleCardData {
  title: string;
  description: string;
  link: string;
  color: string;
  rotation: string;
}

const articleCardsData: ArticleCardData[] = [
  {
    title: 'Dynamic Scroll Effects',
    description:
      "Beautiful scroll-triggered animations that create engaging user experiences. Perfect for showcasing content with smooth transitions and interactive elements.",
    link: '#scroll-effects',
    color: '#E0E0E0',
    rotation: 'rotate-6',
  },
  {
    title: 'Smooth Animations',
    description:
      'Butter-smooth animations powered by modern web technologies. Create stunning visual experiences that captivate your users and enhance engagement.',
    link: '#animations',
    color: '#C0C0C0',
    rotation: 'rotate-0',
  },
  {
    title: 'Responsive Design',
    description:
      'Mobile-first approach ensuring perfect functionality across all devices. From desktop to tablet to mobile, your animations will look great everywhere.',
    link: '#responsive',
    color: '#A0A0A0',
    rotation: '-rotate-6',
  },
  {
    title: 'Modern Components',
    description:
      'Built with the latest React and TypeScript best practices. Clean, maintainable code that scales with your project needs.',
    link: '#components',
    color: '#808080',
    rotation: 'rotate-0',
  },
];

const AnimatedCard = ({ card, index }: { card: ArticleCardData; index: number }) => {
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.figure 
      ref={cardRef}
      style={{ y, scale, opacity }}
      className='sticky top-0 h-screen grid place-content-center'
    >
      <motion.article
        initial={{ rotateY: 15 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className={`h-80 md:h-96 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-lg ${card.rotation} p-6 md:p-8 grid place-content-center gap-6 text-black shadow-2xl`}
        style={{ backgroundColor: card.color }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className='text-xl md:text-2xl font-semibold text-center'
        >
          {card.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          className='text-sm md:text-base leading-relaxed text-center'
        >
          {card.description}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: '#1f2937' }}
          whileTap={{ scale: 0.95 }}
          href={card.link}
          className='w-fit bg-black p-3 rounded-md cursor-pointer text-white hover:bg-gray-800 transition-colors text-center'
        >
          Learn More
        </motion.a>
      </motion.article>
    </motion.figure>
  );
};

const ScrollCardComponent = forwardRef<HTMLElement>((props, ref) => {
  return (
    <ReactLenis root>
      <main ref={ref} className="min-h-screen">
        {/* Hero Section */}
        <section className='text-white h-screen w-full grid place-content-center sticky top-0'>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-4xl md:text-6xl lg:text-7xl px-4 font-semibold text-center tracking-tight leading-[120%]'
          >
            Scroll-Based Card Stack <br /> Animations
          </motion.h1>
        </section>

        {/* Cards Section */}
        <section className='text-white w-full min-h-screen'>
          <div className='flex justify-center px-4 lg:px-8'>
            <div className='grid gap-4 lg:gap-6 w-full max-w-4xl'>
              {articleCardsData.map((card, i) => (
                <AnimatedCard key={i} card={card} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='min-h-screen flex items-center justify-center relative'>
          <motion.h1 
            className='text-[8vw] md:text-[10vw] lg:text-[12vw] leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear cursor-pointer relative z-10'
            whileHover={{
              scale: 1.05,
              filter: "brightness(1.2)",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: "200% 200%",
              backgroundImage: "linear-gradient(45deg, #9ca3af, #6b7280, #374151, #6b7280, #9ca3af)",
            }}
          >
            scroll-stack
          </motion.h1>
        </footer>
      </main>
    </ReactLenis>
  );
});

ScrollCardComponent.displayName = 'ScrollCardComponent';

export default ScrollCardComponent;