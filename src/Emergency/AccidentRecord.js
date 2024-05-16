
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import Banner from "../Component/Banner";


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
        <View>
            <TouchableOpacity 
            // 這邊把每個表單的資料傳過去
            className="self-center w-10/12 my-4 " 
            onPress={()=> handleEmergencyResult(item)}
            >
                <LinearGradient
                colors={['#d8f5ff','#a6d4ff']}
                start={[0,1]}
                end={[1,0]}
                className='rounded-full h-10'
                >
                    <Text className="text-black text-xl mx-auto my-auto">{item.ReturnTime}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )


    return(
        <View>
            <Banner/>
            <View className=''>
                    <Text className='text-black text-2xl self-center mt-4'>事故通報紀錄查詢</Text>
                <FlatList
                    data={data} // data
                    renderItem={renderItem} // 選染列表的函數
                    keyExtractor={item => item.ReturnTime} // key
                />
            </View>
        </View>
        
    )
}