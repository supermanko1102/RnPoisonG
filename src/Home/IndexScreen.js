import { Dialog } from "@rneui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import Banner from "../Component/Banner";
export default function IndexScreen({ navigation}) {
  //dialog
  const [visible, setVisible] = useState(false);
  //把從api拿到的資料存入data
  const [data, setData] = useState([]);
  //設定一個loading狀態
  const[loading,setLoading] = useState(true)
  const [detailData, setDetailData] = useState({});
  const [currentSerNo, setCurrentSerNo] = useState('');
  const toggleDialog = () => {
    setVisible(!visible);
  };

  //begin::  get New data API
  useEffect(() => {
    const fetchNewData = async () => {
      try {
        //Get NewDataTitle
        const GetNewData = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
          params: {
            Function: 'LatestNews',
            ServiceKey: 'V9achV7sd8AK',
          }
        });
        // begin::針對後端api傳的datatime做處理  
        const modifiedNews20list = GetNewData.data.News20List.map(item => ({
          ...item,
          StartDate: item.StartDate.replace("T00:00:00", "")
        }));
        // end::針對後端api傳的datatime做處理  
        setData(modifiedNews20list);
        // console.log('第一支api',modifiedNewsOnelist)
        //After data loading
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchNewData();
  }, []);
  //end:: get New data API

  //begin:: get NewDetailData API
  const fetchDetailData = async (serNo) => {
    try{
    const GetNewDetailData = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
          params: {
            Function: 'LatestNewscontent',
            ServiceKey: 'V9achV7sd8AK',
            SerNo:serNo
          }
        });
        setDetailData(GetNewDetailData.data);
        //  console.log("第二支API",GetNewDetailData.data)
        setVisible(true);

        }
    catch (error) {
          console.error("Error fetching detail data:", error);
      }
  };

  // useEffect(() => {
  //   console.log('setDetailData裡面長怎樣', detailData);
  // }, [detailData]);
  //begin::loading
  if(loading){
    return (<View className='flex-1 justify-center items-center'>
       <ActivityIndicator animating={true} size='large' color={MD2Colors.red800} />
       </View>
    )
  }
  //end::loading

  
  const renderItem=({item})=>(
    <View
    >
      <TouchableOpacity
      onPress={
        ()=>{
          setCurrentSerNo(item.SerNo); // 設置當前a拿到的serno
          fetchDetailData(item.SerNo); // 調用B API
        }
      }
      className=' m-6 rounded-lg p-1'
      style={style.FlatListStyle}
      >
          <Text className='text-xl left-4'>{item.StartDate}</Text>
        {/* <View className='w-1/12 items-center self-center'>
        <MaterialIcons name="campaign" size={36} color="black"/>
        </View> */}

          <Text className='text-xl left-4' >{item.Subject}</Text>

        
      </TouchableOpacity>
    </View>
  )
  return (
    
    <View className='bg-white' >
      <Banner/>
      <View className='flex-row justify-between mt-4'>
      <Text
        className="text-3xl mt-4 left-4" >
            最新消息
      </Text>
      <Image
      source={require('../../Img/calendar.png')}
      resizeMode="contain"
      style={style.logo}
      className='right-4 top-2'

      ></Image>
      </View>
      
      
        <FlatList
          data={data} // data
          renderItem={renderItem} // 選染列表的函數
          keyExtractor={item => item.SerNo} // key
          />
      
      <Dialog
      isVisible={visible}
      onBackdropPress={toggleDialog}
      >
        {/* 需要先加一個判斷才不會造成map not defefind問題 */}
        {detailData.Newscontent && detailData.Newscontent.map((content, index) => (
          <View key={index}>
            <Dialog.Title title={content.Subject}/>
            <Text>{content.NewsContent}</Text>
          </View>
      ))}
      </Dialog>
    </View>
  );
}

const style = StyleSheet.create({
  FlatListStyle:{
    backgroundColor:'#F0F0F0'
  },
  logo:{
    width:40,
    height:40
  }
})