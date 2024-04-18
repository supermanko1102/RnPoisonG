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


// const fetchLoginList = () => {
//     return async(dispatch)=>{
//         //1.非同步邏輯
//       const res = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx',{
//         params : {
//         Function: 'Login',
//         ServiceKey: 'V9achV7sd8AK',
//         account: 'G0000001',
//         password: 'cindy701',
//         deviceNumber: 'AAAAAAAA-4444-5555-AAAA-333333333333',
//         deviceType: 'IOS'
//       }
//     });
//     //2.調用dispatch提交action
//     dispatch(setLogin(res.data))
//     }
// }
// get reducer 
const userReducer = loginSlice.reducer
//export action and reducer
export { loginFailure, loginSuccess, logout, setAccount, setDeviceNumber, setUserName };
export default userReducer