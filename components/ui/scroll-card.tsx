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
        className={`h-72 w-[30rem] rounded-lg ${card.rotation} p-4 grid place-content-center gap-4 text-black shadow-2xl`}
        style={{ backgroundColor: card.color }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className='text-2xl font-semibold'
        >
          {card.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          className='text-sm leading-relaxed'
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
          className='w-fit bg-black p-3 rounded-md cursor-pointer text-white hover:bg-gray-800 transition-colors'
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
      <main className='bg-black' ref={ref}>
        <div className='wrapper'>
          <section className='text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'
            >
              Scroll-Based Card Stack <br /> Animations 🎯
            </motion.h1>
          </section>
        </div>

        <section className='text-white w-full bg-slate-950'>
          <div className='flex justify-between px-16'>
            <div className='grid gap-2'>
              {articleCardsData.map((card, i) => (
                <AnimatedCard key={i} card={card} index={i} />
              ))}
            </div>
            <div className='sticky top-0 h-screen grid place-content-center'>
              <motion.h1 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className='text-4xl px-8 font-medium text-center tracking-tight leading-[120%]'
              >
                Interactive <br /> Card Stack 🎨
              </motion.h1>
            </div>
          </div>
        </section>

        <footer className='group bg-slate-950 '>
          <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
            scroll-stack
          </h1>
          <div className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full text-white'></div>
        </footer>
      </main>
    </ReactLenis>
  );
});

ScrollCardComponent.displayName = 'ScrollCardComponent';

export default ScrollCardComponent;