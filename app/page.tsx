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
    image: "https://ik.imagekit.io/thissidemayur/travelDiaries_jtgSInKRp.jpg",
    title: "Travel Diaries",
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/thissidemayur/philoshphiy_QHMefoEy7.jpg",
    title: "Philosophy Talks",
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/thissidemayur/science_z3YL5jTlg.jpg",
    title: "Science Explained",
  },
  {
    id: 4,
    image: "https://ik.imagekit.io/thissidemayur/tech-ai_6InSpo-Ig.jpg",
    title: "Tech & AI Trends",
  },
  {
    id: 5,
    image: "https://ik.imagekit.io/thissidemayur/socialissue_kY9A1LaPf.jpg",
    title: "Social Issue Debates",
  },
  {
    id: 6,
    image: "https://ik.imagekit.io/thissidemayur/humanPhycology_mP3AK-EDz.jpg",
    title: "Human Psychology",
  },
  {
    id: 7,
    image:
      "https://ik.imagekit.io/thissidemayur/journaling_technologies_GUVaVbPtL.jpg",
    title: "Journaling Techniques",
  },
  {
    id: 8,
    image: "https://ik.imagekit.io/thissidemayur/studyHack_XE_JancXO_.jpg",
    title: "Study Hacks & Focus",
  },
  {
    id: 9,
    image: "https://ik.imagekit.io/thissidemayur/breakupStories_240r5MECDE.jpg",
    title: "Breakup Stories",
  },
  {
    id: 10,
    image: "https://ik.imagekit.io/thissidemayur/menWomenRight_kccRjCiDO.jpg",
    title: "Men & Women Rights",
  },
  {
    id: 11,
    image:
      "https://ik.imagekit.io/thissidemayur/modernJournalisam_E7D1tuGEM.jpg",
    title: "Modern Journalism",
  },
  // {
  //   id: 12,
  //   image: "https://picsum.photos/seed/agnosticism/800/600",
  //   title: "Agnosticism Talks",
  // },
  {
    id: 13,
    image:
      "https://ik.imagekit.io/thissidemayur/agnosistictalks_tzzWpuJPsH.jpg",
    title: "Deep Philosophy Debates",
  },
  {
    id: 14,
    image:
      "https://ik.imagekit.io/thissidemayur/nightlifeDiaries_Rt01cVxYJ.jpg",
    title: "Nightlife Diaries",
  },
  {
    id: 15,
    image: "https://ik.imagekit.io/thissidemayur/hustleStories_Yq9rVokLd.jpg",
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
      "As a content creator, I love platforms that celebrate creativity and let ideas shine. ContentBanao makes it effortless to share stories, visuals, and connect with an engaged audience.",
    name: "Sonam Pal",
    designation: "Content Creator",
    src: "https://ik.imagekit.io/thissidemayur/sonam_93olQWpDv.jpeg",
  },

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
    src: "https://ik.imagekit.io/thissidemayur/vinay_m3DC8qlsz.avif",
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
        <EmblaCarousel
          items={categoriesItems}
          title="Discover Topics You’ll Love"
        />{" "}
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
