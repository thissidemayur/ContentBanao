"use client";

import BlogCard from "@/component/BlogCard";
import BlogPage from "@/component/BlogPage";
import { Hero } from "@/component/Hero";
import RecentPosts from "@/component/BlogRecent";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import Carousel from "@/components/ui/carousel";
import ChromaGrid from "@/components/ui/ChromaGrid";
import CircularGallery from "@/components/ui/CircularGallery";
import SplitText from "@/components/ui/SplitText";

const testimonials: Array<{ quote: string; name: string; designation: string; src: string }> = [
  {
    quote: "This blog is my go-to for creative inspiration. The reels are short, impactful, and always on point.",
    name: "Ananya Sharma",
    designation: "Content Strategist",
    src: "/images/testimonials/ananya.jpg",
  },
  {
    quote: "The mix of insightful writing and visually compelling reels makes this site stand out in the digital space.",
    name: "Ravi Desai",
    designation: "Digital Marketer",
    src: "/images/testimonials/ravi.jpg",
  },
  {
    quote: "I started reading the blog for tips, but stayed for the storytelling. The reels are like a burst of motivation!",
    name: "Sara Fernandes",
    designation: "Lifestyle Influencer",
    src: "/images/testimonials/sara.jpg",
  },
  {
    quote: "A unique blend of education and entertainment — the reels keep getting better, and the blog posts are gold.",
    name: "Arjun Mehta",
    designation: "Video Editor",
    src: "/images/testimonials/arjun.jpg",
  },
  {
    quote: "Whenever I need a quick break or deep dive into a topic, this site delivers. It’s both smart and refreshing.",
    name: "Meera Joshi",
    designation: "UX Designer",
    src: "/images/testimonials/meera.jpg",
  },
];

const circularGalleryItem: Array<{ image: string; text: string }> = []

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const chromaGalleryItem = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  },
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  },
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  }
];

const slideData = [
  {
    title: "Mystic Mountains",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Urban Dreams",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Neon Nights",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Desert Whispers",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Mystic Mountains",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Urban Dreams",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Neon Nights",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Desert Whispers",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

interface Post {
  image: string;
  date: string;
  title: string;
  description: string;
  slug: string;
}

const posts: Post[] = [
  {
    image: "/images/sample.png",
    date: "July 1, 2025",
    title: "Sample Post Title",
    description: "This is a short description.",
    slug: "sample-post"
  },
  {
    image: "/images/sample2.png",
    date: "June 29, 2025",
    title: "Another Post",
    description: "Another description here.",
    slug: "another-post"
  }
]

export default function Home() {
  return (
    <>

      <Hero />

      <RecentPosts posts={posts} />

      <div className="relative  overflow-hidden w-full h-full py-20">
        <SplitText
          text="Trending Reel Video"
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <Carousel slides={slideData} />
      </div>

      <div style={{ height: '600px', position: 'relative' }}>
        <SplitText
          text=" Blog Categories"
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <CircularGallery bend={8} textColor="#111" borderRadius={0.05} items={circularGalleryItem} />
      </div>

      <div style={{ height: '1000px', position: 'relative' }}>

        <SplitText
          text=" Creator Spotlight"
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        <ChromaGrid
          items={chromaGalleryItem}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
      <div></div>
      <AnimatedTestimonials testimonials={testimonials} />

    </>
  );
}
