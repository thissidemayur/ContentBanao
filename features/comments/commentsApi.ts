import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const commentsApi = createApi({
    reducerPath: "commentsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api", credentials: "include" }),
    tagTypes: ['comment'],


    endpoints: (build) => ({
        addComment: build.mutation({
            query: ({ blogId, content }) => ({
                method: "POST",
                url: "/comments",
                body: { blogId, content }
            }),
            invalidatesTags: ["comment"]
        }),

        getComment: build.query({
            query: (blogId) => ({
                method: "GET",
                url: `/comments?blogId=${blogId}`
            }),
            providesTags: ["comment"]
        }),

        deleteComment: build.mutation({
            query: (commentId) => ({
                method: "DELETE",
                url: `/comments/${commentId}`
            }),
            invalidatesTags: ["comment"]
        }),


    })
})


export const {
    useAddCommentMutation,
    useDeleteCommentMutation,
    useGetCommentQuery
} = commentsApi

