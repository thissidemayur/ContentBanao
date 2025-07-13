"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  const images = [
    "https://ik.imagekit.io/thissidemayur/__jXCY3pmEB.jpeg",
    "https://ik.imagekit.io/thissidemayur/___1__Dw86Y6ksH.jpeg",
    // bhairav
    "https://ik.imagekit.io/thissidemayur/___7__IH0uf6tQx.jpeg",

    "https://ik.imagekit.io/thissidemayur/___6__YgKAoXsJBh.jpeg",
    // cosmic

    // buddha
    "https://ik.imagekit.io/thissidemayur/___14__DScqXI_0p.jpeg",
    "https://ik.imagekit.io/thissidemayur/___4__wlIKB8J7N.jpeg",
    "https://ik.imagekit.io/thissidemayur/___3___BLUMeQ6C.jpeg",

    "https://ik.imagekit.io/thissidemayur/___15__Js3DD3__Rn.jpeg",

    // articels
    "https://ik.imagekit.io/thissidemayur/RMS_Titanic_news__These_first_stories_of_the_sinking_disaster_dated_April_15__1912_were_wildly_inaccurate_-_Click_Americana_HznF42i7MN.jpeg",

    "https://ik.imagekit.io/thissidemayur/___2__-v5rbun_k.jpeg",
    "https://ik.imagekit.io/thissidemayur/___3__3ECB4gNEB.jpeg",
    "https://ik.imagekit.io/thissidemayur/___8__un0cQffsa.jpeg",

    "https://ik.imagekit.io/thissidemayur/___16__opwBAl4uOy.jpeg",
    "https://ik.imagekit.io/thissidemayur/7c5fc018-1887-46df-be28-f124e1aa09b3_jaFQ6o2Lsy.jpeg",
    "https://ik.imagekit.io/thissidemayur/Vintage_posters___Iphone_wallpaper_fashion__Fashion_poster__Vintage_posters_CBsUgcUcE.jpeg",
    "https://ik.imagekit.io/thissidemayur/Physics_Life_Pt-gbJATTE.jpeg",
    "https://ik.imagekit.io/thissidemayur/_V_yVDQykZbUu.jpeg",
    "/images/blog11.jpeg",

    // scinece

    // mola
    // free
    "https://ik.imagekit.io/thissidemayur/3bb5ce69-6c2c-4e0c-a5ac-971d36daa97d_EzBY6yg5mw.jpeg",
    "https://ik.imagekit.io/thissidemayur/52654faa-07fd-4164-a96e-9934048b3f19_9Rykg6fM7l.jpeg",
    "https://ik.imagekit.io/thissidemayur/aa7d6a83-9187-4022-9d16-3dcb4cc64e84_zGLfFzWEVx.jpeg",

    "https://ik.imagekit.io/thissidemayur/__Sv32VJ8Eu.jpeg",
    "https://ik.imagekit.io/thissidemayur/___5__v2I-ABiSp.jpeg",
    "https://ik.imagekit.io/thissidemayur/___6__dTQ-jTgLb.jpeg",

    "https://ik.imagekit.io/thissidemayur/___9__nJlNQdn2Yi.jpeg",
    "https://ik.imagekit.io/thissidemayur/___10__xdJAVmtrX.jpeg",
    "https://ik.imagekit.io/thissidemayur/___11__6Xlwzi6MHc.jpeg",

    "https://ik.imagekit.io/thissidemayur/___1__En7MXpaxU.jpeg",
    "https://ik.imagekit.io/thissidemayur/___4__AuElF1Sy-.jpeg",

    "https://ik.imagekit.io/thissidemayur/ab4a8f84-5563-4c6c-a03a-6b1ee0dd96e8_5V25FSd_s.jpeg",
    "https://ik.imagekit.io/thissidemayur/mayur2_YUowPWpIp_uzwWcy5OQd.jpeg",
    "https://ik.imagekit.io/thissidemayur/Under_the_night_sky__underthesky_g5phAXsMR9.jpeg",

    "https://ik.imagekit.io/thissidemayur/___12__lwqnu3EutO.jpeg",
    "https://ik.imagekit.io/thissidemayur/___13__t12zxuxKaP.jpeg",
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
