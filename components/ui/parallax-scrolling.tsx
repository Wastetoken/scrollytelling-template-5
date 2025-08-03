'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "1", yPercent: 70, opacity: 0.2 },
        { layer: "2", yPercent: 55, opacity: 0.4 },
        { layer: "3", yPercent: 40, opacity: 1 },
        { layer: "4", yPercent: 10, opacity: 0.1 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            opacity: layerObj.opacity,
            ease: "power2.out"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax relative min-h-screen" ref={parallaxRef}>
      <section className="parallax__header relative h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="parallax__visuals absolute inset-0">
          <div data-parallax-layers className="parallax__layers relative h-full">
            <img 
              src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80" 
              loading="eager" 
              width="800" 
              data-parallax-layer="1" 
              alt="Layer 1" 
              className="parallax__layer-img absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" 
            />
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" 
              loading="eager" 
              width="800" 
              data-parallax-layer="2" 
              alt="Layer 2" 
              className="parallax__layer-img absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" 
            />
            <div data-parallax-layer="3" className="parallax__layer-title absolute inset-0 flex items-center justify-center z-10">
              <h2 className="parallax__title text-6xl md:text-8xl font-bold text-white text-center drop-shadow-2xl">Parallax</h2>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" 
              loading="eager" 
              width="800" 
              data-parallax-layer="4" 
              alt="Layer 3" 
              className="parallax__layer-img absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-soft-light" 
            />
          </div>
          <div className="parallax__fade absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </section>
      <section className="parallax__content relative z-20 bg-background min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 160 160" fill="none" className="osmo-icon-svg">
              <path d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z" fill="currentColor"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Smooth Parallax Scrolling</h3>
          <p className="text-muted-foreground max-w-2xl">
            Experience the smooth parallax effect as you scroll through different layers. 
            Each layer moves at a different speed creating depth and visual interest.
          </p>
        </div>
      </section>
    </div>
  );
}