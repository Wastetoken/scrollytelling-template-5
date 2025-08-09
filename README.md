# Scroll Magic - Modern Scroll Animations Showcase
<img width="1891" height="916" alt="image" src="https://github.com/user-attachments/assets/25f00521-d200-49a0-bbd6-1461138d8676" />

A comprehensive showcase of modern scroll-based animations and interactions built with React, Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎯 Animation Components

1. **Tilted Scroll Animation** - 3D tilted scroll effects with smooth transformations
2. **Scroll Expansion Hero** - Dynamic media expansion based on scroll position
3. **Container Scroll Animation** - 3D perspective container animations
4. **Scroll Velocity** - Velocity-based scroll animations
5. **Parallax Scrolling** - Multi-layer parallax effects with GSAP
6. **Process Timeline** - Horizontal scrolling timeline with cards
7. **Smooth Scroll Hero** - Clippath animations with reveal effects
8. **3D Testimonials** - Marquee testimonials with 3D transformations
9. **Scroll Card Stack** - Sticky card stacking with smooth scrolling
10. **GSAP Frame Animation** - 360° frame-by-frame scroll animations
11. **Horizontal Scroll Carousel** - Image carousel with horizontal scroll

### 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animation Libraries**: 
  - Framer Motion (primary animations)
  - GSAP with ScrollTrigger (parallax effects)
  - Lenis (smooth scrolling)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd scroll-magic

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the animations in action.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main showcase page
├── components/
│   └── ui/                  # Reusable UI components
│       ├── tilted-scroll.tsx
│       ├── scroll-expansion-hero.tsx
│       ├── container-scroll-animation.tsx
│       ├── scroll-velocity.tsx
│       ├── parallax-scrolling.tsx
│       ├── process-timeline.tsx
│       ├── smooth-scroll-hero.tsx
│       ├── 3d-testimonials.tsx
│       ├── scroll-card.tsx
│       ├── gsap-frame-animation.tsx
│       └── horizontal-scroll-carousel.tsx
├── lib/
│   └── utils.ts             # Utility functions
└── tailwind.config.ts       # Tailwind configuration
```

## 🎨 Custom Animations

The project includes custom Tailwind CSS animations:

- `skew-scroll`: 3D skewed scrolling animation
- `marquee`: Horizontal marquee animation
- `marquee-vertical`: Vertical marquee animation

## 📱 Responsive Design

All animations are fully responsive and work seamlessly across:
- Desktop (1024px+)
- Tablet (768px - 1023px) 
- Mobile (< 768px)

## 🔧 Customization

### Adding New Animations

1. Create a new component in `components/ui/`
2. Add any required Tailwind animations to `tailwind.config.ts`
3. Import and use in `app/page.tsx`

### Modifying Existing Animations

Each component is self-contained with its own props and configuration options. Refer to individual component files for customization options.

## 📄 Dependencies

### Core Dependencies
- `framer-motion`: Modern animation library
- `gsap`: Professional animation library
- `lenis`: Smooth scrolling
- `@uidotdev/usehooks`: React hooks utilities
- `class-variance-authority`: Styling utilities

### UI Dependencies
- `@radix-ui/react-*`: Headless UI components
- `lucide-react`: Icon library
- `next-themes`: Theme management

## 🎯 Performance

- All animations are GPU-accelerated where possible
- Optimized for 60fps performance
- Lazy loading for images
- Efficient scroll listeners with passive event handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📜 License

This project is open source and available under the MIT License.

---

Built with ❤️ using modern web technologies
