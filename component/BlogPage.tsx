'use client'

import { Blog } from '@/types/blog.types'
import { useGetBlogByIDQuery } from '@/features/blogs/blogsApi'
import { useRouter } from 'next/router'

interface Props {
    slug: string
}

export default function BlogPage({ slug }: Props) {
    const router = useRouter()
    const decodedSlug = decodeURIComponent(slug)
    const { data: post, error, isLoading } = useGetBlogByIDQuery(decodedSlug)

    if (isLoading) return <p className="text-center text-gray-500 mt-20">Loading...</p>

    if (error) {
        console.error('error: ', error)
        return <p className="text-center text-red-500 mt-20">Something went wrong!</p>
    }

    if (!post) {
        // Client redirect to 404 or show message
        router.push('/404')
        return null
    }

    const blog = post.data

    return (
        <main className="bg-white min-h-screen pt-28 pb-16">

            <article className="mx-auto max-w-4xl px-6">

                {/* Meta */}
                <div className="text-center mb-8">
                    <p className="text-sm text-gray-500">
                        {blog.createdAt ? new Date(blog.createdAt).toDateString() : ''}
                    </p>

                    <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl leading-tight">
                        {blog.title}
                    </h1>

                    <p className="mt-4 text-base text-gray-600 italic">by <span className="font-medium text-gray-800">Mayur Pal</span></p>

                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">{blog.summary}</p>

                    {/* Tags */}
                    {blog.tags && (
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {blog.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200 cursor-pointer transition"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Image */}

                <Image
                    src={blog?.media[0]?.url || "/images/fallback.png"}
                    alt={blog.title || "Blog image"}
                    fill
                    className="mt-10 w-full object-cover rounded-xl shadow-m"
                />



                {/* Content */}
                <div className="mt-12 space-y-6 text-lg leading-loose text-gray-800 font-serif">
                    <p>{blog.content}</p>
                </div>
            </article>

            {/* Separator */}
            <div className="w-fit mx-auto mt-16 flex space-x-2">
                <div className="h-0.5 w-2 bg-gray-600"></div>
                <div className="h-0.5 w-32 bg-gray-600"></div>
                <div className="h-0.5 w-2 bg-gray-600"></div>
            </div>

        </main>
    )
}
