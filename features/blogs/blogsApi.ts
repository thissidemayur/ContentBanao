import { Blog } from "@/types/blog.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PaginatedResponse {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    posts: responseBlog[];
}

interface imageDetail {

    type: string;
    url: string

}
interface responseBlog {
    _id: string;
    title?: string,
    isPublished?: Boolean,
    summary?: string,
    authorId?: string,
    slug?: string,
    media?: imageDetail[] | [], // for image only
    tags?: string[] | [],
    createdAt?: string,
    updatedAt?: string,
    content?: string,
    likes?: []
}

export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        credentials: 'include'
    }),

    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        // get all blog
        getBlogs: builder.query<PaginatedResponse, { page: number; limit: number }>({
            query: ({ page = 1, limit = 10 }) => `/post?page=${page}&limit=${limit}`,
            providesTags: ["Blog"]

        }),

        // get blog by id
        getBlogByID: builder.query<{ message: string; data: responseBlog }, string>({
            query: (id) => `/post/${id}`,
            providesTags: ["Blog"]
        }),

        // create blog
        createBlog: builder.mutation<responseBlog, Blog>({
            query: (newBlog) => ({
                url: "/post",
                method: "POST",
                body: newBlog,

            }),
            invalidatesTags: ['Blog'],

        }),

        // update blog
        updateBlog: builder.mutation<responseBlog, { id: string, updateBlog: Partial<Blog> }>({
            query: ({ updateBlog, id }) => ({
                url: `/like/${id}`,
                method: "PATCH",
                body: updateBlog
            }),
            invalidatesTags: ['Blog'],
        }),

        // delete blog
        deleteBlog: builder.mutation<void, string>({
            query: (id) => ({
                url: `/post/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Blog'],
        }),

        // like blog
        likeBlog: builder.mutation<{ message: string, totalLikes: number, liked: boolean }, string>({
            query: (slug: string) => ({
                url: `/post/${slug}/like`,
                method: "POST",
            }),
            invalidatesTags: ['Blog']
        })
    })
})


export const {
    useGetBlogsQuery,
    useGetBlogByIDQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useLikeBlogMutation
} = blogsApi