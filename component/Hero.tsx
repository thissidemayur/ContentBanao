"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  const images = [
    "/images/blog1.jpeg",
    "/images/blog2.jpeg",
    "/images/blog3.jpeg",
    "/images/blog28.jpeg",
    "/images/blog12.jpeg",
    "/images/blog13.jpeg",
    "/images/blog14.jpeg",
    "/images/blog29.jpeg",
    "/images/blog30.jpeg",
    "/images/blog31.jpeg",
    "/images/blog32.jpeg",
    "/images/blog4.jpeg",
    "/images/blog5.jpeg",
    "/images/blog20.jpeg",
    "/images/blog21.jpeg",
    "/images/blog22.jpeg",
    "/images/blog23.jpeg",
    "/images/blog6.jpeg",
    "/images/blog7.jpeg",
    "/images/blog8.jpeg",
    "/images/blog9.jpeg",
    "/images/blog10.jpeg",
    "/images/blog11.jpeg",

    "/images/blog15.jpeg",
    "/images/blog16.jpeg",
    "/images/blog17.jpeg",
    "/images/blog18.jpeg",
    "/images/blog19.jpeg",

    "/images/blog24.jpeg",
    "/images/blog25.jpeg",
    "/images/blog26.jpeg",
    "/images/blog27.jpeg",
  ];

  return (
    <div className="relative mx-auto my-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
        Share your stories. Inspire through{" "}
        <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
          content
        </span>{" "}
        that matters.
      </h2>

      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        Publish blogs, showcase reels, and engage your audience — all in one
        place.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          onClick={() => router.push("/blog")}
        >
          Explore Blogs
        </button>
        <button
          className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          onClick={() => router.push("/reels")}
        >
          Watch Reels
        </button>
      </div>

      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
