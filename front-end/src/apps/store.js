import { configureStore } from "@reduxjs/toolkit"
import userReducer from './userSlice'
import petReducer from './petSlice'
import orderReducer from './orderSlice'
import reviewReducer from './reviewSlice'

export default configureStore({
    reducer : {
        user : userReducer,
        pet : petReducer,
        order : orderReducer,
        review : reviewReducer,
    }
})