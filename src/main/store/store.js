import { configureStore } from '@reduxjs/toolkit'
import userSlice from './users/user-slice'


export default configureStore({
  reducer: {
    user: userSlice
  }
})