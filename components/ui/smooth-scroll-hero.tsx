"use client";
import * as React from "react";

import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";

interface SmoothScrollHeroProps {
	scrollHeight?: number;
	desktopImage?: string;
	mobileImage?: string;  
	initialClipPercentage?: number;
	finalClipPercentage?: number;
}

interface SmoothScrollHeroBackgroundProps extends SmoothScrollHeroProps {}

const SmoothScrollHeroBackground: React.FC<
	SmoothScrollHeroBackgroundProps
> = ({
	scrollHeight = 1500,
	desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1920&q=80",
	mobileImage = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=768&auto=format&fit=crop",
	initialClipPercentage = 25,
	finalClipPercentage = 75,
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const {scrollYProgress} = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	});

	const clipStart = useTransform(
		scrollYProgress,
		[0, 1],
		[initialClipPercentage, 0],
	);
	const clipEnd = useTransform(
		scrollYProgress,
		[0, 1],
		[finalClipPercentage, 100],
	);

	const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

	const backgroundSize = useTransform(
		scrollYProgress,
		[0, 1],
		["170%", "100%"],
	);

	return (
		<motion.div
			ref={containerRef}
			className="sticky top-0 h-screen w-full bg-black"
			style={{
				clipPath,
				willChange: "transform, opacity",
			}}
		>
			{/* Mobile background */}
			<motion.div
				className="absolute inset-0 md:hidden"
				style={{
					backgroundImage: `url(${mobileImage})`,
					backgroundSize,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			/>
			{/* Desktop background */}
			<motion.div
				className="absolute inset-0 hidden md:block"
				style={{
					backgroundImage: `url(${desktopImage})`,
					backgroundSize,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			/>
		</motion.div>
	);
};

const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1920&q=80",
	mobileImage = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=768&auto=format&fit=crop",
	initialClipPercentage = 25,
	finalClipPercentage = 75,
}) => {
	return (
		<div
			style={{height: `calc(${scrollHeight}px + 100vh)`}}
			className="relative w-full"
		>
			<SmoothScrollHeroBackground
				scrollHeight={scrollHeight}
				desktopImage={desktopImage}
				mobileImage={mobileImage}
				initialClipPercentage={initialClipPercentage}
				finalClipPercentage={finalClipPercentage}
			/>
		</div>
	);
};
export default SmoothScrollHero;