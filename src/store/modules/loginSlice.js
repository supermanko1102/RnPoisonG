import { createSlice } from "@reduxjs/toolkit";


const loginSlice  = createSlice({
    name:"login",
    //initial data
    initialState:{
    isLogin: false,
    token: null,
    error: null,
    account: '',
    deviceNumber: '',
    userName: ''
    },
    //同步方法
    reducers:{
        loginSuccess: (state, action) => {
            state.isLogin = true;
            state.token = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isLogin = false;
            state.token = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.token = null;
            state.error = null;
        },
        setDeviceNumber(state, action) {
            state.deviceNumber = action.payload;
        },
        setUserName(state, action) {
            state.userName = action.payload;
        },
        setAccount(state, action) {
            state.account = action.payload;
        },
    }
})
//解構出創建action對象的函數  {action creater}
const {loginSuccess, loginFailure,logout,setDeviceNumber,setUserName,setAccount} = loginSlice.actions

// get reducer 
const userReducer = loginSlice.reducer
//export action and reducer
export { loginFailure, loginSuccess, logout, setAccount, setDeviceNumber, setUserName };
export default userReducer