import axios from 'axios';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useSelector } from 'react-redux';
import Banner from "../Component/Banner";
import CurrentLocalMap from '../Component/CurrentLocalMap';
import Footer from "../Component/Footer";
import ReportItem from './ReportItem';
export default function StartReport({navigation}) {
  
  //先拿到車輛資訊
  const carNumber = useSelector(state => state.login.deviceNumber);
  //設定目前拿到的經緯度
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  //放置api的data
  const [dataFrom, setDataFrom] = useState([]);
  const [dataTo, setDataTo] = useState([]);
  //設定一個loading狀態
  const[loading,setLoading] = useState(true)  
  //begin::取得今日申報清單起迄運狀態
  useEffect(()=>{
    const fetchGetddlistByReturnFrom = async()=>{
      const res = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
      params: {
      Function: 'GetddlistByReturn',
      ServiceKey: 'V9achV7sd8AK',
      Plate_no: carNumber,
      declareType:'From'
    }
  });
  const modifyList = res.data.DTddlist.map(item =>{
    return {
      ...item,
      ReturnTimeFrom: item.ReturnTime // 將ReturnTime改成ReturnTimeTo
  }
  })
  setDataFrom(modifyList)
    // console.log('fetchGetddlistByReturnFrom',modifyList)
  }
  
  const fetchGetddlistByReturnTo = async()=>{
      const res = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
      params: {
      Function: 'GetddlistByReturn',
      ServiceKey: 'V9achV7sd8AK',
      Plate_no: carNumber,
      declareType:'To'
    }
  });
  const modifyList = res.data.DTddlist.map(item =>{
    return {
      ...item,
      ReturnTimeTo: item.ReturnTime // 將ReturnTime改成ReturnTimeTo
  }
  })
  setDataTo(modifyList)
    // console.log('fetchGetddlistByReturnTo',modifyList)

  }

    fetchGetddlistByReturnFrom()
    fetchGetddlistByReturnTo()
  },[]);
  //end::
  //being::拿經緯度
  useEffect(()=>{
    const getLocation = async()=>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }      
      let location = await Location.getCurrentPositionAsync({});
        
      setLocation(location);
      console.log('現在的經緯度',location.coords)
      setLoading(false)
    }
    getLocation()
    const intervalId = setInterval(getLocation,10000)
    return () => {
      clearInterval(intervalId);
    };
  },[])
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

  //begin::merge from &&to datalist
  const allListnos = new Set([...dataTo.map(item => item.listno), ...dataFrom.map(item => item.listno)]);

  const mergedList = Array.from(allListnos).map(listno => {
  const itemTo = dataTo.find(item => item.listno === listno);
  const itemFrom = dataFrom.find(item => item.listno === listno);
  return {
      listno,
      ReturnTimeFrom: (itemFrom && itemFrom.ReturnTimeFrom) || '',
      ReturnTimeTo: (itemTo && itemTo.ReturnTimeTo) || ''
  };
});
  //  console.log('mergedList',mergedList)
  //end::merge from && to datalist
  const renderItem = ({ item }) => <ReportItem item={item} latitude={location.coords.latitude} longitude={location.coords.longitude} />; // 把每一個datalist 做component

    return (        
        <View className="flex-1">
            <Banner/>
            
            <View className="grow">
                <Text variant="headlineMedium" className="self-center mt-4">
                    請選擇要申報的簡易報表
                    {/* 現在經位度{location.coords.latitude},{location.coords.longitude} */}
                </Text>
                <View>
                    <FlatList
                        data={mergedList}
                        renderItem={renderItem}
                        keyExtractor={item => item.listno}
                    />
                </View>
                <View className='w-11/12 self-center mt-2 mb-2' style={{flex:1}}>
                    {/* <MyMapScreen/> */}
                    <CurrentLocalMap latitude={location.coords.latitude} longitude={location.coords.longitude}/>
                </View>

            </View>
            <Footer/>
        </View>
    );
}
