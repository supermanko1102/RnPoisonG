import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './modules/loginSlice'

const store=configureStore({
    reducer:{
        //key :value
       login: loginSlice,
    },
})

export default store