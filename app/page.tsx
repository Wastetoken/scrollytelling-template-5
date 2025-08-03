'use client'

import Image from 'next/image'
import { TiltedScroll } from '@/components/ui/tilted-scroll'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { ScrollVelocity } from '@/components/ui/scroll-velocity'
import { ParallaxComponent } from '@/components/ui/parallax-scrolling'
import {
  ContainerScroll as ProcessContainer,
  ContainerSticky,
  ProcessCard,
  ProcessCardBody,
  ProcessCardTitle
} from '@/components/ui/process-timeline'
import SmoothScrollHero from '@/components/ui/smooth-scroll-hero'
import { Marquee } from '@/components/ui/3d-testimonials'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import ScrollCardComponent from '@/components/ui/scroll-card'
import HorizontalScrollCarousel from '@/components/ui/horizontal-scroll-carousel'
import GsapFrameAnimation from '@/components/ui/gsap-frame-animation'

const processPhases = [
  {
    id: 'process-1',
    title: 'Discovery & Research',
    description:
      'We start by understanding your needs, analyzing your audience, and researching the best approaches to create engaging scroll experiences.'
  },
  {
    id: 'process-2',
    title: 'Design & Prototyping',
    description:
      'Our designers create beautiful, functional prototypes that showcase smooth animations and intuitive user interactions.'
  },
  {
    id: 'process-3',
    title: 'Development & Animation',
    description:
      'We bring designs to life with cutting-edge web technologies, ensuring smooth performance across all devices.'
  },
  {
    id: 'process-4',
    title: 'Testing & Optimization',
    description:
      'Rigorous testing ensures perfect performance, while optimization delivers the smoothest possible user experience.'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    username: '@sarah_ui',
    body: 'These scroll animations are incredible! Smooth and performant.',
    img: 'https://images.unsplash.com/photo-1494790108755-2616b25c2005?w=150&h=150&fit=crop&crop=face',
    country: '🇺🇸 USA'
  },
  {
    name: 'Alex Rivera',
    username: '@alex_dev',
    body: 'Perfect for modern web experiences. Love the variety!',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    country: '🇪🇸 Spain'
  },
  {
    name: 'Emma Johnson',
    username: '@emma_creates',
    body: 'Stunning visual effects that really engage users.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    country: '🇬🇧 UK'
  }
]

function TestimonialCard({ img, name, username, body, country }: typeof testimonials[0]) {
  return (
    <Card className="w-64 mx-2">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-foreground flex items-center gap-1">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-muted-foreground">{username}</p>
          </div>
        </div>
        <blockquote className="text-sm text-foreground/80">{body}</blockquote>
      </CardContent>
    </Card>
  )
}

const ScrollVelocityImages = [
  { title: 'Mountain', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop' },
  { title: 'Ocean', thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop' },
  { title: 'Forest', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop' },
  { title: 'Desert', thumbnail: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=200&fit=crop' },
  { title: 'Valley', thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop' }
]

export default function Home() {
  // Cloudflare R2 frame URLs for GSAP frame animation
  const cloudflareFrames = Array.from({ length: 360 }, (_, i) => `https://pub-5e192f09106f42a9a4f7f0f405390511.r2.dev/sec-${i}.webp`)

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen bg-gradient-to-br from-slate-900 via-black-300 to-slate-200 flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-black-400 via-white-500 to-pink-500 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            I've put together a showcase of just a few of the modern scroll-based animations and interactions that I enjoy using. Discover smooth transitions, parallax effects,
            and engaging user experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#tilted-scroll"
              className="px-8 py-4 bg-gradient-to-r from-white-500 to-black-600 text-white rounded-lg font-semibold hover:from-gray-600 hover:to-white-700 transition-all duration-300 transform hover:scale-105"
            >
              Explore Animations
            </a>
            <a
              href="#horizontal-carousel"
              className="px-8 py-4 border-2 border-white-500 text-white-400 rounded-lg font-semibold hover:bg-purple-black hover:text-white transition-all duration-300"
            >
              View Components
            </a>
          </div>
        </div>
      </section>

      {/* Tilted Scroll Section */}
      <section id="tilted-scroll" className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">Tilted Scroll Animation</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Watch as elements gracefully tilt and scroll with smooth 3D transformations, creating depth and visual interest.
          </p>
          <TiltedScroll />
        </div>
      </section>

      {/* Scroll Expansion Hero */}
      <section id="scroll-expansion" className="min-h-screen">
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop"
          bgImageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop"
          title="Scroll Expansion"
          date="Interactive Media"
          scrollToExpand="Scroll to Expand"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Dynamic Media Expansion</h3>
            <p className="text-lg mb-6 text-muted-foreground">
              Watch as content expands and contracts as you scroll.
            </p>
            <p className="text-lg text-muted-foreground">
              Keep Scrolling
            </p>
          </div>
        </ScrollExpandMedia>
      </section>

      {/* Container Scroll Animation */}
      <section
        id="container-scroll"
        className="min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 py-20"
      >
        <ContainerScroll
          titleComponent={
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">3D Container Scroll</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Watch as content transforms with perspective and depth as you scroll through the page.
              </p>
            </div>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=800&fit=crop"
            alt="Dashboard preview"
            width={1400}
            height={800}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
          />
        </ContainerScroll>
      </section>

      {/* Scroll Velocity Section */}
      <section id="scroll-velocity" className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 py-20">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Velocity-Based Scrolling</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Content that responds to your scroll velocity, creating dynamic and engaging movement patterns.
          </p>
        </div>

        <div className="space-y-8">
          <ScrollVelocity velocity={3}>
            {ScrollVelocityImages.map(({ title, thumbnail }) => (
              <div key={title} className="relative h-32 w-48 md:h-40 md:w-60 xl:h-48 xl:w-72 mx-4">
                <Image src={thumbnail} alt={title} fill className="object-cover rounded-lg" />
              </div>
            ))}
          </ScrollVelocity>

          <ScrollVelocity velocity={-2}>
            {ScrollVelocityImages.map(({ title, thumbnail }) => (
              <div key={`${title}-reverse`} className="relative h-32 w-48 md:h-40 md:w-60 xl:h-48 xl:w-72 mx-4">
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  className="object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </ScrollVelocity>

          <ScrollVelocity velocity={4}>SMOOTH • DYNAMIC • RESPONSIVE • BEAUTIFUL •</ScrollVelocity>
        </div>
      </section>

      {/* Parallax Scrolling */}
      <section id="parallax">
        <ParallaxComponent />
      </section>

      {/* Process Timeline */}
      <section id="process-timeline" className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <ProcessContainer className="container px-6 py-12 h-[300vh]">
          <div className="mb-8 space-y-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Development Process</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-300">
              I love creating engaging scroll experiences that captivate users and drive results.
            </p>
          </div>

          <ContainerSticky className="top-16 flex flex-nowrap">
            {processPhases.map((phase, index) => (
              <ProcessCard
                key={phase.id}
                itemsLength={processPhases.length}
                index={index}
                className="min-w-[70%] max-w-[70%] rounded-xl"
              >
                <ProcessCardTitle className="border-r border-slate-700">
                  <div className="rounded-full size-12 bg-indigo-600 text-white text-lg flex justify-center items-center font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </ProcessCardTitle>
                <ProcessCardBody className="flex flex-col gap-6">
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">{phase.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{phase.description}</p>
                </ProcessCardBody>
              </ProcessCard>
            ))}
          </ContainerSticky>
        </ProcessContainer>
      </section>

      {/* Smooth Scroll Hero */}
      <section id="smooth-scroll-hero">
        <SmoothScrollHero
          scrollHeight={1200}
          desktopImage="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80"
          mobileImage="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=768&q=80"
        />
        <div className="bg-background py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Smooth Scroll Effects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Need to create stunning reveal effects as you scroll? This is perfect for hero sections and feature showcases.
            </p>
          </div>
        </div>
      </section>

      {/* 3D Testimonials */}
      <section id="testimonials" className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 py-20">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">3D Testimonials</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interactive testimonial displays with 3D transformations and smooth marquee animations.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative flex h-96 w-full max-w-4xl flex-row items-center justify-center overflow-hidden rounded-lg border bg-background shadow-xl [perspective:300px]">
            <div
              className="flex flex-row items-center gap-4"
              style={{
                transform:
                  'translateX(-50px) translateY(0px) translateZ(-100px) rotateX(15deg) rotateY(-10deg) rotateZ(10deg)'
              }}
            >
              <Marquee vertical pauseOnHover repeat={3} className="[--duration:25s]">
                {testimonials.map((review) => (
                  <TestimonialCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:25s]">
                {testimonials.map((review) => (
                  <TestimonialCard key={`${review.username}-2`} {...review} />
                ))}
              </Marquee>
              <Marquee vertical pauseOnHover repeat={3} className="[--duration:30s]">
                {testimonials.map((review) => (
                  <TestimonialCard key={`${review.username}-3`} {...review} />
                ))}
              </Marquee>
            </div>

            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>
      </section>

      {/* Scroll Card Stack */}
      <section id="scroll-cards">
        <ScrollCardComponent />
      </section>

      {/* GSAP Frame Animation */}
      <section id="gsap-frame-animation" className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
        <GsapFrameAnimation
          images={cloudflareFrames}
          className="bg-black"
          totalFrames={360}
          startFrame={0}
        />
      </section>

      {/* Horizontal Scroll Carousel */}
      <section id="horizontal-carousel">
        <HorizontalScrollCarousel />
      </section>

      {/* Final CTA Section */}
      <section className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Ready to Scroll?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            You've experienced the power of modern scroll animations. Now it's time to implement them in your own projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-white text-purple-900 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Contact me
            </button>
            <button className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-purple-900 transition-all duration-300">
              Scroll up
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
