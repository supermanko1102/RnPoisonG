import { CheckBox } from '@rneui/themed';
import axios from 'axios';
import * as Location from "expo-location";
import React, { useRef, useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from 'react-redux';
import { Captcha } from 'rn-agmcaptchalite';
import { GPSTrackLocation } from '../GetLocation/GetLocation';
import { setAccount, setDeviceNumber, setUserName } from '../store/modules/loginSlice';
export default function LoginScreen({navigation}){
    //如果需要從元件中去改變store裡面的數據需要 dispatch
    // 1. 導入action對象的方法 -> 2.使用dispatch() -> 3. 調用dispatch提交action
    const dispatch =useDispatch()

    const [account, setAccountLocal] = useState('G0000001');
    const [deviceNumber,setDeviceNumberLocal] = useState('ABC-001')
    const [password, setPassword] = useState('cindy701');
    const [rememberUser,setRememberUser]= useState(false)
    // const [userName,SetUserNameLocal]= useState('')

    //begin::驗證碼 
    const captchaRef = useRef(null);
    const captchaHandle = async () => {
      const captchaResult = captchaRef.current.captchaChecking();
    //   console.log(captchaResult,typeof(captchaResult))
      return(captchaResult)
      // If the user enters the correct captcha, captchaResult is true; otherwise, false
    };
    //end::驗證碼
    //begin::登入邏輯
    const handleLogin = async() => {
        //測試
        let { status } = await Location.getBackgroundPermissionsAsync();
        if(status=="granted"){
            GPSTrackLocation().StartLocationTracking()
        } //測試
        //等待拿到captchaResult
        const isCaptchaCorrect = await captchaHandle();
        dispatch(setDeviceNumber(deviceNumber));
        //begin::處理登入API
      const fetchLogApi = async()=>{
        try{
            const response = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
                params: {
                  Function: 'Login',
                  ServiceKey: 'V9achV7sd8AK',
                  account: account,
                  password:password,

                }
              })
            // console.log('登入名稱',response.data.LoginName)
            // if(captcha !==randomCode){
            //     Alert.alert('驗證碼錯誤')
            //     return
            //   }
            // console.log('isCaptchaCorrect',isCaptchaCorrect)
            if(!isCaptchaCorrect){
                Alert.alert('驗證碼錯誤')
                return
            }
            if(response.data.IsProcessOK){
                navigation.navigate("MainIndex");
                // SetUserNameLocal(response.data.LoginName)
                // console.log('',userName)
                dispatch(setUserName(response.data.LoginName));
                dispatch(setAccount(account))
            }else{
                Alert.alert('登入失敗',response.data.Message)
            }
        } catch(error){
            Alert.alert('登入失敗','網路錯誤,請稍後再試')
            dispatch(loginFailure('Network error'));
            
        }
      }; 
      //end:: API  

      fetchLogApi();
    }
    //end:: 登入邏輯

    //begin::記憶帳號
    const handleRememberUser = ()=>{
        setRememberUser(!rememberUser)
        
    }
    //end::記憶帳號



    return (
        <ScrollView className="">
            <ImageBackground
            source={require('../../Img/LoginPage.png')}
            className="h-screen "   
            >
            {/* begin::主要的content畫面 */}
            <View className=''>
                <View className=" flex-row ">
                    <Image
                    source={require('../../Img/Enlogo.png')}
                    resizeMode="contain"
                    className="self-center">
                    </Image>
                </View>

                <View className="py-12">
                    <Text
                    className="text-3xl text-green-800 self-center">
                        毒性及關注化學物質
                    </Text>
                    <Text
                    className="text-3xl text-green-800 self-center">
                        小量運送軌跡紀錄系統
                    </Text>
                </View>
                {/* <View className="items-center py-2">
                    <Text
                    className='text-xl' >
                    版本:3.1.1
                    </Text>
                </View> */}

                <View className="flex flex-row justify-start py-2 pl-4">
                    <Image
                    source={require('../../Img/LoginAccount.png')}
                    resizeMode="contain"
                    style={styles.logo}
                    
                    ></Image>
                    <TextInput
                        value={account}
                        onChangeText={(text) => setAccountLocal(text)}
                        placeholder={'帳 號'}
                        className="w-64 px-3 py-2 border-b border-blue-300  ml-4"
                    />
                    <CheckBox/>
                    <Text className="pt-3 pl-5">記住帳號</Text>
                </View>
                <View className="flex flex-row justify-start py-2 pl-4">
                    <Image
                    source={require('../../Img/LoginPassword.png')}
                    resizeMode="contain"
                    style={styles.logo}
                    ></Image>
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder={'密碼'}
                        secureTextEntry={true}

                        className="w-64 px-3 py-2 border-b border-blue-300  ml-4"
                    />
                </View>
                <View className="flex flex-row justify-start py-2 pl-4">
                    <Image
                    source={require('../../Img/LoginPlate.png')}
                    resizeMode="contain"
                    style={styles.logo}
                    className="flex-none "
                    ></Image>
                    <TextInput
                        value={deviceNumber}
                        onChangeText={(text) => setDeviceNumberLocal(text)}
                        placeholder={'車輛號碼'}

                        className="w-64 px-3 py-2 border-b border-blue-300  ml-4"
                    />
                </View>
                
                

                {/* 尚未開發驗證碼 */}
                {/* <View className="flex flex-row justify-center py-2"> */}
                <View className='flex-row mt-2 ml-4'>
                    {/* <Image
                    source={require('../../Img/驗證碼.png')}
                    resizeMode="contain"
                    style={styles.logo}

                    ></Image> */}
                    <Captcha
                    ref={captchaRef}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.containerStyle}
                    captchaContainerStyle={styles.captchaContainerStyle}
                    refreshButtonStyle={styles.refreshButtonStyle}
                    addSpecialCharacter={false}
                    captchaLength={4}
                    refreshIcon={<Text className='text-xl'>重取驗證碼</Text>}
                    />
                    {/* <View 
                    className="flex-row w-64  py-2 h-[46] ml-4 pr-0">
                    <TextInput
                    value={captcha}
                    onChangeText={(text) => SetCaptcha(text)}
                    placeholder={'驗證碼'}
                    className="flex-initial w-32 px-3 py-2 border border-blue-300 rounded-md bg-blue-50 h-[46] mr-5 "
                    />
                    </View> */}
                </View>
                {/* <View className="flex-row justify-center">
                    <Text className="pt-3 pl-5">記憶帳號</Text>
                    <Switch 
                    value={rememberUser}
                     onValueChange={handleRememberUser}
                     />
                </View> */}
                <View
                className='flex-row mt-4 ml-4'
                >
                <TouchableOpacity
                style={styles.loginBack} 
                onPress={()=>{
                    handleLogin()
                }}>

                    <Text className="text-white text-3xl px-10 py-2 ">登入</Text>
                </TouchableOpacity>
                </View>
            </View>
            {/* end::主要的content畫面 */}   
            <View
            className="bg-gray-600 absolute bottom-0 " 
            >
                <Text
                className="text-white self-center"
                >客服電話:(02)2239-3250 客服信箱:toxicgps@mail.pstcom.tw</Text>
            </View>
            </ImageBackground>
        </ScrollView>
    )
    
}
const styles = StyleSheet.create({
    
    logo: {
      width: 57,
      height: 57,
    },
    inputStyle:{
        borderRadius: 15,
        // backgroundColor: '#EFF6FF',
    },
    containerStyle:{
        backgroundColor: 'transparent',
        justifyContent:'center',
        marginTop: 0,
    },
    captchaContainerStyle:{
        backgroundColor:'gray',
    },
    refreshButtonStyle:{
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1.5,
        borderRadius: 5,
        padding: 5,
    },
    loginBack:{
        backgroundColor:'#3B5C75',
        borderRadius:20,
        
    }
  })
