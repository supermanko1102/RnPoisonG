import { configureStore } from '@reduxjs/toolkit'
import userSlice from './modules/userSlice'

const store=configureStore({
    reducer:{
        //key :value
       user: userSlice,
    },
})

export default store