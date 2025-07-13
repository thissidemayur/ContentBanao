"use client";
import dynamic from "next/dynamic";

import { Hero } from "@/component/Hero";
import CTA from "@/component/CTA";
import HomeBlog from "@/component/HomeBlog";
import Footer from "@/component/Footer";
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
      "As a student, this blog keeps me inspired beyond textbooks. The reels are a perfect dose of creativity between study breaks.",
    name: "Ansika Pal",
    designation: "Student @ Sunbeam, Varanasi",
    src: "https://ik.imagekit.io/thissidemayur/ansika_RhjFNkNUmj.jpeg",
  },
  {
    quote:
      "As a developer, I appreciate platforms that blend technical insight with storytelling — and this one nails it.",
    name: "Mayur Pal",
    designation: "Developer",
    src: "https://ik.imagekit.io/thissidemayur/mayur_xB9XwXkqAU.jpeg",
  },
  {
    quote:
      "For students like me, this site makes learning feel personal. The stories stick with you, and the reels are addictive.",
    name: "Samiksha Pal",
    designation: "Student @ Sunbeam, Varanasi",
    src: "https://ik.imagekit.io/thissidemayur/samikha_pRqvhWrli.jpeg",
  },
  {
    quote:
      "As a content creator, I love seeing platforms prioritize both quality visuals and meaningful storytelling. This one does both effortlessly.",
    name: "Aman Pal",
    designation: "Content Creator",
    src: "https://ik.imagekit.io/thissidemayur/modak_3kxE1N9l-e.jpeg",
  },
  {
    quote:
      "Between classes and study sessions, this site gives me a refreshing escape with content that actually adds value.",
    name: "Chahat Pal",
    designation: "Student @ APS, Banaras",
    src: "https://ik.imagekit.io/thissidemayur/chachat_VsswUz1sx.jpeg",
  },

  {
    quote:
      "I follow a lot of student-friendly platforms, but this one feels the most authentic — every post feels made for us.",
    name: "Khushi Pal",
    designation: "Student @ APS, Banaras",
    src: "https://ik.imagekit.io/thissidemayur/Screenshot_from_2025-07-13_19-36-53_LSb6RGcGCH.png",
  },
  {
    quote:
      "For content creators like me, it’s inspiring to see platforms where visuals, story, and authenticity come together so well.",
    name: "Vinay Pal",
    designation: "Content Creator",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3540&q=80",
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
      {/* Separator */}
      <div className="w-fit mx-auto mt-16 flex space-x-2">
        <div className="h-0.5 w-2 bg-gray-600"></div>
        <div className="h-0.5 w-32 bg-gray-600"></div>
        <div className="h-0.5 w-2 bg-gray-600"></div>
      </div>

      <Footer />
    </>
  );
}
