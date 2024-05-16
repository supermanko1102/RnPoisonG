import { CheckBox } from '@rneui/themed';
import axios from 'axios';
import * as Location from "expo-location";
import React, { useRef, useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { Captcha } from 'rn-agmcaptchalite';
import { GPSTrackLocation } from '../GetLocation/GetLocation';
import { setAccount, setDeviceNumber, setUserName } from '../store/modules/loginSlice';
export default function LoginScreen({navigation}){
    //如果需要從元件中去改變store裡面的數據需要 dispatch
    // 1. 導入action對象的方法 -> 2.使用dispatch() -> 3. 調用dispatch提交action
    const dispatch =useDispatch()

    const [account, setAccountLocal] = useState('');
    const [password, setPassword] = useState('');
    const [deviceNumber,setDeviceNumberLocal] = useState('')
    const [rememberUser,setRememberUser]= useState(true)
    // const [userName,SetUserNameLocal]= useState('')
    //記憶帳號
    const rememberAccount = useSelector(state => state.login.account);
    const rememberPassword = useSelector(state => state.login.password);

    //
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
                dispatch(setPassword(password))
                if(!rememberUser){
                    setAccountLocal(rememberAccount)
                    setPassword(rememberPassword)
                }
            }else{
                Alert.alert('登入失敗,請確定帳密是否正確',response.data.Message)
                return
            }
        } catch(error){
            // Alert.alert('登入失敗','請入正確的車輛訊息資料,並返回上一頁')
            return
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
        <ScrollView>
            <ImageBackground
            source={require('../../Img/LoginPage.png')}
            className="h-screen bg-cover"   
            >
            {/* begin::主要的content畫面 */}
            <View className="h-full">
                <Image
                source={require('../../Img/Enlogo.png')}
                resizeMode="contain"
                className="self-center">
                </Image>
                <View className="mt-4">
                    <Text
                    style={styles.titleBackground}
                    className="text-3xl  self-center">
                        毒性及關注化學物質
                    </Text>
                    <Text
                    style={styles.titleBackground}
                    className="text-3xl self-center">
                        小量運送軌跡紀錄系統
                    </Text>
                </View>
                <View className='absolute top-1/3 -translate-y-8'>
                    <View className="flex-row justify-start left-1">
                        <Image
                        source={require('../../Img/LoginAccount.png')}
                        resizeMode="cover"
                        style={styles.logo}
                        ></Image>
                        <TextInput
                            value={account}
                            onChangeText={(text) => setAccountLocal(text)}
                            placeholder={'帳 號'}
                            className="border-b border-blue-300 my-auto w-1/3 left-1 bottom-2 pl-1"
                        />
                        <View className='flex-row right-2'>
                            <CheckBox
                            checked={rememberUser}
                            onPress={handleRememberUser}
                            />
                            <Text className="-bottom-4 right-3">記住帳號</Text>
                        </View>

                    </View>
                    <View className="flex-row justify-start left-1 py-1 bottom-2">
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
                            className="border-b border-blue-300 my-auto w-1/3 left-1 bottom-1 pl-1"

                        />
                    </View>
                    <View className="flex flex-row justify-start left-1">
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
                            className="border-b border-blue-300 my-auto w-1/3 left-1 bottom-1 pl-1"

                        />
                    </View>           
                    <View className='flex-row mt-2 ml-4'>
                        <Captcha
                        ref={captchaRef}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.containerStyle}
                        captchaContainerStyle={styles.captchaContainerStyle}
                        refreshButtonStyle={styles.refreshButtonStyle}
                        addSpecialCharacter={false}
                        captchaLength={4}
                        refreshIcon={<Text>重取驗證碼</Text>}
                        />
                    </View>
                <View
                className='flex-row mt-4 ml-4'
                >
                <TouchableOpacity
                style={styles.loginBack} 
                onPress={()=>{
                    handleLogin()
                }}>
                    <Text className="text-white text-2xl px-4 py-1">登入</Text>
                </TouchableOpacity>

                {/* <Image
                source={require('../../Img/LoginImg01.png')}
                resizeMode="contain"
                className=''
                /> */}
                </View>
                </View>
                
            </View>
            {/* end::主要的content畫面 */}   
            <View
            className="bg-gray-600 absolute bottom-0 self-center" 
            >
                <Text
                className="text-white mx-auto"
                >客服電話:(02)2239-3250 客服信箱:toxicgps@mail.pstcom.tw</Text>
            </View>
            </ImageBackground>
        </ScrollView>
    )
    
}
const styles = StyleSheet.create({
    
    logo: {
      width: 40,
      height: 40,
    },
    inputStyle:{
        height:40,
        borderRadius: 15,
        // backgroundColor: '#EFF6FF',
    },
    containerStyle:{
        backgroundColor: 'transparent',
        justifyContent:'center',
        marginTop: 0,
    },
    captchaContainerStyle:{
        height:40,
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
    },
    titleBackground:{
        color:'#2F4151'
    }
  })
