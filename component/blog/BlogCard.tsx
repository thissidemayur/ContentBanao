"use client";

import Image from "next/image";

export default function BlogCard() {
  return (
    <article className="mx-2 my-10 max-w-screen-lg rounded-md border border-gray-100 text-gray-700 shadow-md md:mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Image - On top for small screens */}
        <div className="mx-auto flex items-center px-5 md:hidden md:p-8">
          <Image
            className="rounded-md shadow-lg"
            src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
            alt="Shop image"
            width={500}
            height={300}
            fill
          />
        </div>

        {/* Text Content */}
        <div className="p-5 md:w-4/6 md:p-8">
          <span className="rounded-md bg-orange-400 px-2 py-1 text-xs uppercase text-white">
            Tailwind
          </span>
          <p className="mt-2 text-xl font-black md:mt-6 md:text-4xl">
            How to make comment card with tailwind?
          </p>
          <p className="mt-3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            voluptate vero soluta voluptatum error non.
          </p>

          <button className="mt-4 mr-2 flex items-center justify-center rounded-md bg-sky-400 px-8 py-2 text-white duration-150 hover:translate-y-1 hover:bg-sky-500">
            Read More
          </button>
        </div>

        {/* Image - On right for md and above */}
        <div className="mx-auto hidden items-center px-5 md:flex md:p-8">
          <Image
            className="rounded-md shadow-lg"
            src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
            alt="Shop image"
            width={500}
            height={300}
            fill
          />
        </div>
      </div>
    </article>
  );
}
