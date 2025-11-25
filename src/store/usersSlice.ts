import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { fetchUsers } from '../api/api'

export type User = {
    id: number
    name: string
    email?: string
    company?: { name?: string }
}

export const loadUsers = createAsyncThunk<User[]>('users/loadUsers', async () => {
    const res = await fetchUsers()
    return res.data as User[]
})


const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [] as User[],
        loading: false,
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(loadUsers.rejected, (state, action) => {
                state.loading = false
                state.error = String(action.error)
            })
    }
})

export default usersSlice.reducer
