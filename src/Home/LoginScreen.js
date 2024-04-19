import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { setAccount, setDeviceNumber, setUserName } from '../store/modules/loginSlice';

import { Alert, Image, ImageBackground, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from 'react-redux';
export default function LoginScreen({navigation}){
    //如果需要從元件中去改變store裡面的數據需要 dispatch
    // 1. 導入action對象的方法 -> 2.使用dispatch() -> 3. 調用dispatch提交action
    const dispatch =useDispatch()

    const [account, setAccountLocal] = useState('G0000001');
    const [deviceNumber,setDeviceNumberLocal] = useState('ABC-001')
    const [password, setPassword] = useState('cindy701');
    const [rememberUser,setRememberUser]= useState(false)
    const [userName,SetUserNameLocal]= useState('')
    const [captcha,SetCaptcha] = useState('')

    //begin::驗證碼 
    
    const [randomCode, setRandomCode] = useState('');

    useEffect(() => {
        generateRandomCode();
    }, []);

    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // console.log('Randomcode', code)
        setRandomCode(code);
    };
    const regenerateCode = () => {
        generateRandomCode();
    };
    
    //end::驗證碼
    //begin::登入邏輯
    const handleLogin = async() => {
        // dispatch(setLoginStatus(true))
        // console.log('LoginNavigation',navigation)
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
            console.log('username',response.data.IsProcessOK)
            if(captcha !==randomCode){
                Alert.alert('驗證碼錯誤')
                return
              }
              if(response.data.IsProcessOK){
                navigation.navigate("MainIndex");
                SetUserNameLocal(response.data.LoginName)
                // console.log('userName',userName)
                dispatch(setUserName(userName));
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
        <View className="flex-1">
            <ImageBackground
            source={require('../../Img/bg_function.png')}
            className="h-screen flex-1"   
            >
            {/* begin::主要的content畫面 */}
            <View className='grow'>
                <View className=" flex-row mt-[40]">
                    <Image
                    source={require('../../Img/環境部logo.png')}
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
                            <View className="items-center py-2">
                    <Text
                    className='text-xl' >
                    版本:3.1.1
                    </Text>
                </View>

                <View className="flex flex-row justify-center py-2">
                    <Image
                    source={require('../../Img/人員.png')}
                    resizeMode="contain"
                    style={styles.logo}
                    className="flex-none "
                    ></Image>
                    <TextInput
                        value={account}
                        onChangeText={(text) => setAccountLocal(text)}
                        placeholder={'帳號'}

                        className="flex-initial w-64 px-3 py-2 border border-blue-300 rounded-md bg-blue-50 h-[46] ml-4"
                    />
                </View>
                <View className="flex flex-row justify-center py-2">
                    <Image
                    source={require('../../Img/車輛.png')}
                    resizeMode="contain"
                    style={styles.logo}
                    className="flex-none "
                    ></Image>
                    <TextInput
                        value={deviceNumber}
                        onChangeText={(text) => setDeviceNumberLocal(text)}
                        placeholder={'車輛號碼'}

                        className="flex-initial w-64 px-3 py-2 border border-blue-300 rounded-md bg-blue-50 h-[46] ml-4"
                    />
                </View>
                
                
                <View className="flex flex-row justify-center py-2">
                    <Image
                    source={require('../../Img/密碼.png')}
                    resizeMode="contain"
                    style={styles.logo}
                                    ></Image>
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder={'密碼'}
                        secureTextEntry={true}

                        className="flex-initial w-64 px-3 py-2 border border-blue-300 rounded-md bg-blue-50 h-[46] ml-4"
                    />
                </View>
                {/* 尚未開發驗證碼 */}
                <View className="flex flex-row justify-center py-2">
                    <Image
                    source={require('../../Img/驗證碼.png')}
                    resizeMode="contain"
                    style={styles.logo}

                    ></Image>
                    <View 
                    className="flex-row w-64  py-2 h-[46] ml-4 pr-0">
                    <TextInput
                    value={captcha}
                    onChangeText={(text) => SetCaptcha(text)}
                    placeholder={'驗證碼'}
                    className="flex-initial w-32 px-3 py-2 border border-blue-300 rounded-md bg-blue-50 h-[46] mr-5 "
                    />
                    <TouchableOpacity
                    className="flex-initial w-32 px-3 py-2 border border-blue-300 rounded-md bg-blue-50 h-[46] ml-4 "
                    onPress={regenerateCode}
                    ><Text>{randomCode}</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View className="flex flex-row justify-center">
                    <Text className="pt-3 pl-5">記憶帳號</Text>
                    <Switch 
                    value={rememberUser}
                     onValueChange={handleRememberUser}
                     />
                </View>
                <TouchableOpacity 
                className="flex flex-row justify-center bg-indigo-700 rounded-full my-3 "
                onPress={handleLogin}>
                    <Text className="text-white text-xl px-5 py-3">登入</Text>
                </TouchableOpacity>
            </View>
            {/* end::主要的content畫面 */}   
            <View
            className="bg-gray-600 mb-2" 
            >
                <Text
                className="text-white self-center"
                >客服電話:(02)2239-3250 客服信箱:toxicgps@mail.pstcom.tw</Text>
            </View>


            </ImageBackground>
            {/* Props  */}
            {/* {f && < Banner deviceNumber={deviceNumber} userName={userName}/>} */}
        </View>
    )
    
}
const styles = StyleSheet.create({
    
    logo: {
      width: 57,
      height: 57,
    },
    
  })
