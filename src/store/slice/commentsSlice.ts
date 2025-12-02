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
    added: Comment[]
    loading: boolean
    error: string | null
}

const initialState: CommentsState = {
    list: [],
    added: [],
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
        },
        addComment(state, action: PayloadAction<Comment>) {
            state.added = [action.payload, ...state.added]
            state.list = [action.payload, ...state.list]
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
                const fulfilledAction = action as ReturnType<typeof loadCommentsByUser.fulfilled>
                const userId = fulfilledAction.meta.arg

                const localForUser = state.added.filter((c) => c.postId === userId)
                state.list = [...localForUser, ...action.payload]
            })
            .addCase(loadCommentsByUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Failed to load comments'
            })
    }
})

export const { clearComments, addComment } = commentsSlice.actions
export default commentsSlice.reducer
