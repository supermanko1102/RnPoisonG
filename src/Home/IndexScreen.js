import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import Banner from "../Component/Banner";

export default function IndexScreen({ navigation }) {
  
  const [data, setData] = useState([]);
  //begin::  get API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
          params: {
            Function: 'LatestNewsOne',
            ServiceKey: 'V9achV7sd8AK',
          }
        });

        // begin::針對後端api傳的datatime做處理  
        const modifiedNewsOnelist = response.data.NewsOnelist.map(item => ({
          ...item,
          StartDate: item.StartDate.replace("T00:00:00", "")
        }));
        // end::針對後端api傳的datatime做處理  
        console.log(modifiedNewsOnelist);
        setData(modifiedNewsOnelist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  //end:: get API
  const renderItem=({item})=>(
    <View
    className='flex-row mt-6  '
    >
      <Text
      className='text-2xl'
      >
        {item.StartDate}
        
      </Text>
      <Text
      className='ml-2 text-xl'
      >
        {item.Subject}
      </Text>
    </View>
  )
  return (
    
    <View className="flex-1">
      <Banner/>
      <Text
        className="text-4xl self-center mt-4">
            最新消息
        </Text>
      <View 
      className='bg-blue-300'
      >
        <FlatList
          data={data} // data
          renderItem={renderItem} // 選染列表的函數
          keyExtractor={item => item.SerNo} // key
          />
      </View>
    </View>

  );
}


