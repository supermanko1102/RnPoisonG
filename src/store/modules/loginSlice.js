import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    isLogin: false
};

const loginSlice  = createSlice({
    name:"login",
    //initial data
    initialState,
    //同步方法
    reducers:{
        setLoginStatus(state,action){
            state.isLogin = action.payload;
        },
        setLogout(state) {
            state.isLogin = false;
          }
    }
})
//解構出創建action對象的函數  {action creater}
const {setLoginStatus,setLogout } = loginSlice.actions


const fetchLoginList = () => {
    return async(dispatch)=>{
        //1.非同步邏輯
      const res = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx',{
        params : {
        Function: 'Login',
        ServiceKey: 'V9achV7sd8AK',
        account: 'G0000001',
        password: 'cindy701',
        deviceNumber: 'AAAAAAAA-4444-5555-AAAA-333333333333',
        deviceType: 'IOS'
      }
    });
    //2.調用dispatch提交action
    dispatch(setLogin(res.data))
    }
}
// get reducer 
const userReducer = loginSlice.reducer
//export action and reducer
export { fetchLoginList, setLoginStatus, setLogout };
export default userReducer