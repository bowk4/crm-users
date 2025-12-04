import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchUsers } from '../../api/api'

export type User = {
    id: number
    name: string
    email?: string
    username?: string
    website?: string
    address?: {
        city?: string
    }
    company?: { name?: string }
}

type UsersState = {
    list: User[]
    loading: boolean
    error: string | null
}

const initialState: UsersState = {
    list: [],
    loading: false,
    error: null
}

export const loadUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    'users/loadUsers',
    async (_, thunkAPI) => {
        try {
            const res = await fetchUsers()
            return res.data as User[]
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err?.message || 'Failed to load users')
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(loadUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Failed to load users'
            })
    }
})

export default usersSlice.reducer
