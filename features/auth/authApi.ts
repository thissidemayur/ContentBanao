import { IUser } from "@/types/User.types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; //use react package dealing with these


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['User'],

    endpoints: (builder) => ({
        register: builder.mutation<void, IUser>({
            // query:(id)=>{}
            query: (userDetail) => ({
                url: "auth/register",
                method: "POST",
                body: userDetail
            }),
            invalidatesTags: ['User']
        }),

        // login
        login: builder.mutation<void, IUser>({
            query: (userLogin) => ({
                url: "auth/login",
                method: "POST",
                body: userLogin
            }),
            invalidatesTags: ['User'],

        }),

        //  forget password  
        forgetPassword: builder.mutation<void, string>({
            query: (email) => ({
                url: "auth/forget-password",
                method: "POST",
                body: email
            }),
            invalidatesTags: ['User'],

        }),

        // update-password
        updatePassword: builder.mutation<void, { oldPassword: string, newPassword: string }>({
            query: ({ oldPassword, newPassword }) => ({
                url: "user/update-password",
                method: "PATCH",
                body: { newPassword, oldPassword }
            }),
            invalidatesTags: ['User'],

        }),

        // updateProfile.
        updateProfile: builder.mutation<IUser, { userName: string, firstName: string, lastName: string, email: string, bio: string, avatar: string }>({
            query: ({ userName, firstName, lastName, email, bio, avatar }) => ({
                method: "PATCH",
                url: "user/update-profile",
                body: { userName, firstName, lastName, email, bio, avatar }
            }),
            invalidatesTags: ['User'],

        }),

        //upload Avtar
        uploadAvtar: builder.mutation<void, string>({
            query: (data) => ({
                method: "POST",
                url: "user/upload-avtar",
                body: data
            }),
            invalidatesTags: ['User'],

        }),

        //update Avtar
        updateAvtar: builder.mutation<void, string>({
            query: (data) => ({
                method: "PATCH",
                url: "user/update-avtar",
                body: data
            }),
            invalidatesTags: ['User'],

        }),

        // get user
        getUser: builder.query<IUser, string>({
            query: (id) => `user/${id}`,
            providesTags: ['User'],

        }),

        // delete user
        deleteUser: builder.mutation<void, { password: string }>({
            query: ({ password }) => ({
                method: "DELETE",
                url: `user/delete-account`,
                body: { password }

            })
        })
    })
})
export const {
    useRegisterMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useUpdatePasswordMutation,
    useUpdateProfileMutation,
    useUploadAvtarMutation,
    useUpdateAvtarMutation,
    useGetUserQuery,
    useDeleteUserMutation
} = authApi;
