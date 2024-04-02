
import { FlatList, Text, View } from "react-native"

import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "react-native-paper"
import { useSelector } from "react-redux"
import Banner from "../Component/Banner"
import Footer from "../Component/Footer"
import EmergencyLocationMap from "./EmergencyLocationMap"


export  default function AccidentRecord ({navigation}){
    //先拿車輛資訊
    const deviceNumber = useSelector(state=>state.login.deviceNumber)
    console.log('車輛資訊',deviceNumber)

    const handleEmergencyResult = (item)=>{
        navigation.navigate('EmergencyResult',{data:item})
    }

    const [data,setData]=useState('')
    
    //begin::接API
    useEffect(()=>{
        const fetchEmergencyResult = async ()=>{
            //取得事故通報結果
            const res = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
            params: {
            Function: 'GetToxicAPPGPSReturnEmergency',
            ServiceKey: 'V9achV7sd8AK',
            Plate_no: deviceNumber
          }
        });
            // console.log('Data是',GetSimpleList.data.DTddlist[0].listno)
            const resultData= res.data.DTReturnEmergency
             console.log('resultData',resultData)
             setData(resultData)
        }
        fetchEmergencyResult()


    },[])
    //end:接API
    

    //取得渲染函數
    const renderItem= ({item})=>(
        <View
        className='mt-4'
        >
            <Button 
            mode='contained'
            // 這邊把每個表單的資料傳過去
            onPress={()=> handleEmergencyResult(item)}
            >
            <Text className='text-white'>{item.ReturnTime}</Text></Button>
        </View>
    )


    return(
        <View className='flex-1'>
            <Banner/>
            <View className='grow bg-red-200 h-3/5'>
                    <Text className='text-red-400 text-2xl self-center'>事故通報結果查詢</Text>
                <FlatList
                    data={data} // data
                    renderItem={renderItem} // 選染列表的函數
                    keyExtractor={item => item.ReturnTime} // key
                />
                {/* 地圖區 */}
                <View>
                    <EmergencyLocationMap/>
                </View>
            </View>
            <Footer/>
        </View>
        
    )
}