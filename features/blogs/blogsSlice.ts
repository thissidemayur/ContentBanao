import { Blog } from "@/types/blog.types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface BlogState {
    selectedBlog?: Blog | null
}

const initialState: BlogState = {
    selectedBlog: null
}

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setSelectedBlog: (state, action: PayloadAction<Blog | null>) => {
            state.selectedBlog = action.payload
        },
    },
})

export const { setSelectedBlog } = blogsSlice.actions
export default blogsSlice.reducer