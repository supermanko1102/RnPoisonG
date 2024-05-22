import axios from 'axios';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useSelector } from 'react-redux';
import Banner from "../Component/Banner";
import CurrentLocalMap from '../Component/CurrentLocalMap';
import ReportItem from './ReportItem';
const LOCATION_TRACKING = 'location-background-tracking';
export default function StartReport({navigation}) {

  //先拿到車輛資訊
  const carNumber = useSelector(state => state.login.deviceNumber);
  //設定目前拿到的經緯度
  const [currentLocation, setCurrentLocation] = useState({latitude:0,longitude:0});
  const [startLocation ,setStartLocation] = useState({latitude:0,longitude:0})

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
      ReturnTimeFrom: item.ReturnTime // 將ReturnTime改成ReturnTimeFrom
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
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    // console.log('請求前台',status)
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      Alert.alert('拒絕使用經位度');
      return;
    } else{
      let backgroundPermission = await Location.requestBackgroundPermissionsAsync();
      if (backgroundPermission.status !== 'granted') {
        setErrorMsg('Permission to access background location was denied');
        console.log('請求後台',backgroundPermission.status)
        Alert.alert('拒絕使用背景經位度');
        return;
      }
    }       
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    console.log('當前的經緯度', location);
    setStartLocation({
      ...startLocation,
      latitude:location.coords.latitude,
      longitude:location.coords.longitude
    });
    setCurrentLocation({
      ...currentLocation,
      latitude:location.coords.latitude,
      longitude:location.coords.longitude
    });
    setLoading(false);
  } 
  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 5000,
        distanceInterval:0,
        showsBackgroundLocationIndicator: true,
      });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING
    );
    // console.log('有成功獲取經緯度嗎?', hasStarted); 
    // console.log('任務管理器有被定義嗎 ?', TaskManager.isTaskDefined(LOCATION_TRACKING));
    // TaskManager.defineTask(LOCATION_TRACKING, ()=>{
    //   console.log('location-background-tracking是否有執行')
    //   return 
    // })
    TaskManager.defineTask(LOCATION_TRACKING, async({ data, error }) => {
      if (error) {
          console.log('LOCATION_TRACKING task ERROR:', error);
          return;
      }
      if (data) {
          const { locations } = data;
          let lat = locations[0].coords.latitude;
          let long = locations[0].coords.longitude;
          //console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
          setCurrentLocation({
            ...currentLocation,
            latitude:lat,
            longitude:long
          })
          //console.log("location是",currentLocation.latitude,currentLocation.longitude)
      }
    });
  };
  // const stopLocationTracking = ()=>{
  //   TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then
  //   ((tracking)=>{
  //     if(tracking){
  //       Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
  //     }
  //   })
  // }
  startLocationTracking()

  useEffect(() => {
    getLocation();
  }, []);
  
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
  const mergedList = Array.from(allListnos).map(listno => 
  {
  const itemTo = dataTo.find(item => item.listno === listno);
  const itemFrom = dataFrom.find(item => item.listno === listno);
  return {
      listno,
      ReturnTimeFrom: (itemFrom && itemFrom.ReturnTimeFrom) || '',
      ReturnTimeTo: (itemTo && itemTo.ReturnTimeTo) || ''
  };
  });
  //end::merge from && to datalist
  const renderItem = ({ item }) => 
  <ReportItem 
  item={item} 
  location={currentLocation}
  startLocation={startLocation} 
  startGetBackgroundLocation={startLocationTracking} 
  />; // 把每一個datalist 做component

  return (        
      <View className="flex-auto bg-white">
        <Banner/>
        <View className="flex-1 ">
            <Text className="self-center text-xl top-4">
                請選擇要申報的簡易報表
            </Text>  
              <FlatList
              className=' w-10/12 self-center top-4'
                  data={mergedList}
                  renderItem={renderItem}
                  keyExtractor={item => item.listno}
              />
        </View>
        <View 
        className='w-11/12 self-center flex-1' 
        >
          <CurrentLocalMap location={currentLocation}
          />
        </View>
      </View>
      
  );
}
