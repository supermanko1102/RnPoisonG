import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";


import Banner from "../Component/Banner";
export default function FormScreen({navigation}){

//先拿到車輛資訊
    const deviceNumber = useSelector(state => state.login.deviceNumber);
    const [data, setData] = useState([]);    
    //begin:: Get DataSimpleApi
    useEffect(()=>{
        const fetchSimpleList = async ()=>{
            //取得今日簡易表API
            const GetSimpleList = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
            params: {
            Function: 'Getddlist',
            ServiceKey: 'V9achV7sd8AK',
            Plate_no: deviceNumber
          }
        });
            // console.log('Data是',GetSimpleList.data.DTddlist[0].listno)
            const SimpleData= GetSimpleList.data.DTddlist
            // console.log('GetSimpleList',SimpleData)
            setData(SimpleData)
        }
        fetchSimpleList()
    },[]);
    
    //end:: Get DataSimpleApi



    const handleTrackResult = (item)=>{
        navigation.navigate('SimpleForm',{selectedItem : item })
    }
    
    //取得渲染函數
    //把每個表單的資料傳過去
    const renderItem= ({item})=>(
        <View
        className='mt-4'
        >
            <TouchableOpacity 
            className="self-center w-10/12 my-2 " 
            onPress={() => handleTrackResult(item)}
            >
                <LinearGradient
                colors={['#d8f5ff','#a6d4ff']}
                start={[0,1]}
                end={[1,0]}
                className='rounded-full h-10'>
                    <Text className='text-black text-xl mx-auto my-auto '>{item.listno}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
    return(
        <View className='flex-1'>
            <Banner/>
            <View className='grow'>
                <Text
                className="text-xl self-center mt-4"
                >
                    查詢今日簡易表單
                </Text>
                <View
                className='mx-10 mt-4 '
                >
                    <FlatList
                    data={data} // data
                    renderItem={renderItem} // 選染列表的函數
                    keyExtractor={item => item.listno} // key
                    />
                </View>
            </View>
            
        </View>
    )
}