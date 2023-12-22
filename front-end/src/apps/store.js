import { configureStore } from "@reduxjs/toolkit"
import userReducer from './userSlice'
import petReducer from './petSlice'
import orderReducer from './orderSlice'
import kritiksaranReducer from './kritiksaranSlice'

export default configureStore({
    reducer : {
        user : userReducer,
        pet : petReducer,
        order : orderReducer,
        kritiksaran : kritiksaranReducer
    }
})