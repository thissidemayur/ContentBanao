import { IUser } from "@/types/User.types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
    user: IUser | null,
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.isAuthenticated = !!action.payload
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        },

    }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer