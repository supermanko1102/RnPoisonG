import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    profile:{
        account:"",
        password:"",
        isLogin:"false"
    }
};

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setLogin(state,action){
            //拿到資料後解構
            console.log(action.payload)
            const {account,password} =  action.payload
            state.profile={
                account,
                password,
                isLogin:true

            };
        },
        setLogout(state){
            state= initialState.profile;
            console.log(state)
        }
    }
})
export const {setLogin,setLogout}= userSlice.actions
export default userSlice.reducer