import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchComments } from '../../api/api'

export type Comment = {
    id: number
    postId: number
    body: string
    email: string
}

type CommentsState = {
    list: Comment[]
    loading: boolean
    error: string | null
}

const initialState: CommentsState = {
    list: [],
    loading: false,
    error: null
}

export const loadCommentsByUser = createAsyncThunk<Comment[], number, { rejectValue: string }>(
    'comments/loadByUser',
    async (userId, thunkAPI) => {
        try {
            const res = await fetchComments()
            const all = res.data as Comment[]
            return all.filter((c) => c.postId === userId)
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err?.message || 'Failed to load comments')
        }
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments(state) {
            state.list = []
            state.error = null
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCommentsByUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadCommentsByUser.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(loadCommentsByUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Failed to load comments'
            })
    }
})

export const { clearComments } = commentsSlice.actions
export default commentsSlice.reducer
