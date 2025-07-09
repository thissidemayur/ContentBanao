import { authApi } from '@/features/auth/authApi'
import { blogsApi } from '@/features/blogs/blogsApi'
import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from '@/features/blogs/blogsSlice'
import authReducer from '@/features/auth/authSlice'
import { commentsApi } from '@/features/comments/commentsApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { reelApi } from '@/features/reels/reelsApi'
export const makeStore = () => {
    return configureStore({
        reducer: {
            // api rqst handling
            [blogsApi.reducerPath]: blogsApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            [commentsApi.reducerPath]: commentsApi.reducer,
            [reelApi.reducerPath]: reelApi.reducer,

            // state-managent
            blogs: blogsReducer,
            auth: authReducer

        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(blogsApi.middleware)
                .concat(authApi.middleware)
                .concat(commentsApi.middleware)
                .concat(reelApi.middleware)
    })
}
const store = makeStore()
setupListeners(store.dispatch) //refetchOnFocus / refetchOnReconnect behaviors

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// why we are using HOF for store in ts but not in js why ? whats the secreat of it