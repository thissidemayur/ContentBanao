"use client";
import dynamic from "next/dynamic";

import { Hero } from "@/component/Hero";
import CTA from "@/component/CTA";
import RecentPosts from "@/component/blog/BlogRecent";
import AboutMayur from "@/component/About";
import HomeBlog from "@/component/HomeBlog";
const AnimatedTestimonials = dynamic(
  () => import("@/components/ui/animated-testimonials"),
  { ssr: false }
);

const EmblaCarousel = dynamic(() => import("@/component/Carousel"));

const categoriesItems = [
  {
    id: 1,
    image: "https://picsum.photos/seed/travel/800/600",
    title: "Travel Diaries",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/philosophy/800/600",
    title: "Philosophy Talks",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/science/800/600",
    title: "Science Explained",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/technology/800/600",
    title: "Tech & AI Trends",
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/socialissues/800/600",
    title: "Social Issue Debates",
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/psychology/800/600",
    title: "Human Psychology",
  },
  {
    id: 7,
    image: "https://picsum.photos/seed/journaling/800/600",
    title: "Journaling Techniques",
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/studyhacks/800/600",
    title: "Study Hacks & Focus",
  },
  {
    id: 9,
    image: "https://picsum.photos/seed/breakups/800/600",
    title: "Breakup Stories",
  },
  {
    id: 10,
    image: "https://picsum.photos/seed/menwomenrights/800/600",
    title: "Men & Women Rights",
  },
  {
    id: 11,
    image: "https://picsum.photos/seed/journalism/800/600",
    title: "Modern Journalism",
  },
  {
    id: 12,
    image: "https://picsum.photos/seed/agnosticism/800/600",
    title: "Agnosticism Talks",
  },
  {
    id: 13,
    image: "https://picsum.photos/seed/philosophydebates/800/600",
    title: "Deep Philosophy Debates",
  },
  {
    id: 14,
    image: "https://picsum.photos/seed/nightlife/800/600",
    title: "Nightlife Diaries",
  },
  {
    id: 15,
    image: "https://picsum.photos/seed/hustle/800/600",
    title: "Hustle Stories",
  },
];

const testimonials: Array<{
  quote: string;
  name: string;
  designation: string;
  src: string;
}> = [
  {
    quote:
      "This blog is my go-to for creative inspiration. The reels are short, impactful, and always on point.",
    name: "Ananya Sharma",
    designation: "Content Strategist",
    src: "/images/testimonials/ananya.jpg",
  },
  {
    quote:
      "The mix of insightful writing and visually compelling reels makes this site stand out in the digital space.",
    name: "Ravi Desai",
    designation: "Digital Marketer",
    src: "/images/testimonials/ravi.jpg",
  },
  {
    quote:
      "I started reading the blog for tips, but stayed for the storytelling. The reels are like a burst of motivation!",
    name: "Sara Fernandes",
    designation: "Lifestyle Influencer",
    src: "/images/testimonials/sara.jpg",
  },
  {
    quote:
      "A unique blend of education and entertainment — the reels keep getting better, and the blog posts are gold.",
    name: "Arjun Mehta",
    designation: "Video Editor",
    src: "/images/testimonials/arjun.jpg",
  },
  {
    quote:
      "Whenever I need a quick break or deep dive into a topic, this site delivers. It’s both smart and refreshing.",
    name: "Meera Joshi",
    designation: "UX Designer",
    src: "/images/testimonials/meera.jpg",
  },
];

const circularGalleryItem: Array<{ image: string; text: string }> = [];

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const chromaGalleryItem = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen",
  },
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen",
  },
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen",
  },
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

export default function Home() {
  return (
    <>
      <Hero />

      <HomeBlog />

      {/* CTA */}
      <CTA />

      {/* Blog categories:  */}
      <div>
        <EmblaCarousel items={categoriesItems} title="Blog Categories" />{" "}
      </div>

      {/* Testimonial */}
      <AnimatedTestimonials testimonials={testimonials} />

      <AboutMayur />
    </>
  );
}
