import { Blog } from "@/types/blog.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
    tagTypes: ['Blog'],
    endpoints: (builder) => ({

        // get all blog
        getBlogs: builder.query<Blog[], void>({
            query: () => '/blogs',
            providesTags: ["Blog"]

        }),

        // get blog by id
        getBlogByID: builder.query<Blog, string>({
            query: (id) => `/blogs/${id}`,
            providesTags: ["Blog"]
        }),

        // create blof
        createBlog: builder.mutation<void, Blog>({
            query: (newBlog) => ({
                url: "/blogs",
                method: "POST",
                body: newBlog
            }),
            invalidatesTags: ['Blog'],

        }),

        // update blog
        updateBlog: builder.mutation<void, { id: string, updateBlog: Partial<Blog> }>({
            query: ({ updateBlog, id }) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                body: updateBlog
            }),
            invalidatesTags: ['Blog'],
        }),

        // delete blog
        deleteBlog: builder.mutation<void, string>({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Blog'],

        })
    })
})


export const {
    useGetBlogsQuery,
    useGetBlogByIDQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogsApi

