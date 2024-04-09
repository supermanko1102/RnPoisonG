import axios from 'axios';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useSelector } from 'react-redux';
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import MyMapScreen from "../Component/MyMapScreen";
import ReportItem from './ReportItem';

export default function StartReport({navigation}) {
  
  //先拿到車輛資訊
  const carNumber = useSelector(state => state.login.deviceNumber);
  //設定目前拿到的經緯度
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  //放置api的data
  const [data, setData] = useState([]);
  //設定一個loading狀態
  const[loading,setLoading] = useState(true)  
  //begin:: Get DataSimpleApi
  useEffect(()=>{
    const fetchSimpleList = async ()=>{
        //取得今日簡易表API
        const GetSimpleList = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
        params: {
        Function: 'Getddlist',
        ServiceKey: 'V9achV7sd8AK',
        Plate_no: carNumber,
      }
    });
        // console.log('Data是',GetSimpleList.data.DTddlist[0].listno)
        const SimpleData= GetSimpleList.data.DTddlist
        // console.log('GetSimpleList',SimpleData)
        setData(SimpleData)
    }
    
    fetchSimpleList()
  },[]);

  //being::拿經緯度
  useEffect(()=>{
    (async()=>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }      
      let location = await Location.getCurrentPositionAsync({});
      // console.log('現在的經緯度',location)
      setLocation(location);
      setLoading(false)
    })()
  },[location])
  //end::拿經緯度
//begin::loading
if(loading){
  return (<View className='flex-1 justify-center items-center'>
     <ActivityIndicator animating={true} size='large' color={MD2Colors.red800} />
     <Text>獲取經緯度中</Text>
     </View>
  )
}
//end::loading
  

    const renderItem = ({ item }) => <ReportItem item={item} latitude={location.coords.latitude} longitude={location.coords.longitude} />; // 把每一個datalist 做component

    return (        
        <View className="flex-1">
            <Banner/>
            
            <View className="grow">
                <Text variant="headlineMedium" className="self-center mt-4">
                    請選擇要申報的簡易報表
                    現在經位度{location.coords.latitude},{location.coords.longitude}
                </Text>
                <View>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.listno}
                    />
                </View>
                <View className='w-11/12 self-center mt-2 mb-2' style={{flex:1}}>
                    <MyMapScreen/>
                </View>
            </View>
            <Footer/>
        </View>
    );
}
