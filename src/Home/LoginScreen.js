import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../store/modules/loginSlice';

export default function LoginScreen({navigation}){
    //如果需要從元件中去改變store裡面的數據需要 dispatch
    // 1. 導入action對象的方法 -> 2.使用dispatch() -> 3. 調用dispatch提交action
    const dispatch =useDispatch()

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    //登入邏輯
    const handleLogin = () => {
        dispatch(setLoginStatus(true))
          navigation.navigate("MainIndex");
      };
      
    return (
        <View className="flex-1">
            <ImageBackground
            source={require('../../Img/bg_function.png')}
            className="h-screen flex-1"   
            >   
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
                    onChangeText={(text) => setAccount(text)}
                    placeholder={'帳號'}
                    
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
                placeholder={'驗證碼'}
                className="flex-initial w-32 px-3 py-2 border border-blue-300 rounded-md bg-blue-50 h-[46] mr-5 "
                />
                <TextInput
                className="flex-initial w-32 px-3 py-2 border border-blue-300 rounded-md bg-blue-50 h-[46] ml-4 "
                >我是驗證碼
                </TextInput>
                </View>
            </View>

            <View className="flex flex-row justify-center">
                
                <Text className="pt-3 pl-5">記憶帳號</Text>
                <Switch 
                // value={loginInfo.IsrememberMe}
                // onValueChange={(IsrememberMe) => SetloginInfo({...loginInfo,IsrememberMe:IsrememberMe})}
                 />
            </View>

            <TouchableOpacity 
            className="flex flex-row justify-center bg-indigo-700 rounded-full my-3 "
            onPress={handleLogin}>
                <Text className="text-white text-xl px-5 py-3">登入</Text>
            </TouchableOpacity>

            <View
            className="bg-gray-600 mt-[163]" 
            >
                <Text
                className="text-white self-center"
                >客服電話:(02)2239-3250 客服信箱:toxicgps@mail.pstcom.tw</Text>
            </View>

            </ImageBackground>

          
            
        </View>
    )
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#bef264',
    },
    logo: {
      width: 57,
      height: 57,
    },
    
  });
