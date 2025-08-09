'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');
    const svgElement = svgRef.current?.querySelector('.osmo-icon-svg');

    if (triggerElement) {
      // Slide "Parallax" to the left
      gsap.to(triggerElement.querySelector('[data-parallax-left]'), {
        xPercent: -100,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Slide subtitle to the right
      gsap.to(triggerElement.querySelector('[data-parallax-right]'), {
        xPercent: 100,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    // SVG morph animation
    if (svgElement) {
      // Set initial state immediately
      gsap.set(svgElement, {
        scale: 0,
        opacity: 1
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top center",
          end: "+=300%",
          pin: true,
          scrub: 1
        }
      });

      // Phase 1: Grow SVG to cover screen
      tl.to(svgElement, {
        scale: 500,
        duration: 1,
        ease: "power2.inOut"
      })
      // Phase 2: Change color to black
      .to(svgElement, {
        fill: "#000000",
        duration: 0.5,
        ease: "power2.inOut"
      }, "-=0.5")
      // Phase 3: Fade out to reveal next section
      .to(svgElement, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
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
      if (svgElement) {
        gsap.killTweensOf(svgElement);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax relative min-h-screen" ref={parallaxRef}>
      <section className="parallax__header relative h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="parallax__visuals absolute inset-0">
          <div data-parallax-layers className="parallax__layers relative h-full">
            {/* Background video */}
            <video 
              src="https://pub-7e222c0b5c674a2283e50e5ceac3de9b.r2.dev/7710243-uhd_2560_1440_30fps.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60" 
            />
            
            {/* Text content with parallax */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 
                  data-parallax-left
                  className="parallax__title text-6xl md:text-8xl font-bold text-white text-center drop-shadow-2xl mb-4"
                >
                  Parallax
                </h2>
                <p 
                  data-parallax-right
                  className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
                >
                  Experience true depth with layered parallax scrolling
                </p>
              </div>
            </div>
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        </div>
      </section>
      
      <section ref={svgRef} className="parallax__content relative z-20 bg-background min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="w-32 h-32 mx-auto mb-8 text-primary">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="100%" 
              viewBox="0 0 160 160" 
              fill="none" 
              className="osmo-icon-svg"
            >
              <path d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}