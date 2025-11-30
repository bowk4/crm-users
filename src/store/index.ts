import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slice/usersSlice.ts'
import commentsReducer from './slice/commentsSlice.ts'


const store = configureStore({
    reducer: {
        users: usersReducer,
        comments: commentsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
