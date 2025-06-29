import { authApi } from '@/features/auth/authApi'
import { blogsApi } from '@/features/blogs/blogsApi'
import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from '@/features/blogs/blogsSlice'
import authReducer from '@/features/auth/authSlice'
export const makeStore = () => {
    return configureStore({
        reducer: {
            // api rqst handling
            [blogsApi.reducerPath]: blogsApi.reducer,
            [authApi.reducerPath]: authApi.reducer,

            // statemanagent
            blogs: blogsReducer,
            auth: authReducer

        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(blogsApi.middleware)
                .concat(authApi.middleware)

    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']