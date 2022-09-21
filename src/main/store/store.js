import { configureStore } from '@reduxjs/toolkit'
import postSlice from './posts/post-slice'
import userSlice from './users/user-slice'


export default configureStore({
  reducer: {
    user: userSlice,
    posts: postSlice
  }
})