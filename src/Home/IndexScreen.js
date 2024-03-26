import { Button, Dialog } from "@rneui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import Banner from "../Component/Banner";
export default function IndexScreen({ navigation }) {
  // begin::dialog
  const [visible1, setVisible1] = useState(false);
  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };
  //end::dialog

  //把從api拿到的資料存入data
  const [data, setData] = useState([]);
  const[detaildata,setdetaildata] = useState([])
  //設定一個loading狀態
  const[loading,setLoading] = useState(true)
  //begin::  get New data API
  useEffect(() => {
    const fetchNewData = async () => {
      try {
        //Get NewDataTitle
        const GetNewData = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
          params: {
            Function: 'LatestNewsOne',
            ServiceKey: 'V9achV7sd8AK',
          }
        });
        // begin::針對後端api傳的datatime做處理  
        const modifiedNewsOnelist = GetNewData.data.NewsOnelist.map(item => ({
          ...item,
          StartDate: item.StartDate.replace("T00:00:00", "")
        }));
        // end::針對後端api傳的datatime做處理  
        // console.log(modifiedNewsOnelist);
        setData(modifiedNewsOnelist);

        //Get NewDetailData
        const GetNewDetailData = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
          params: {
            Function: 'LatestNewscontent',
            ServiceKey: 'V9achV7sd8AK',
            SerNo:'7'
          }
        });
        // console.log(GetNewDetailData.data.Newscontent)
        setdetaildata(GetNewDetailData.data.Newscontent)
        console.log(detaildata)
        //After data loading
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchNewData();
  }, []);
  //end:: get New data API

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
    style={styles.buttonContainer}
    className='mt-6'
    >
      <Button
      
        title={`${item.StartDate}     ${item.Subject}`}
        onPress={toggleDialog1}
        buttonStyle={styles.button}

      />
      <Dialog
      isVisible={visible1}
      onBackdropPress={toggleDialog1}
      >
        <Dialog.Title title="Dialog Title"/>
        <Text>我就是一個dialog</Text>
      </Dialog>
      
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
      className=''
      >
        <FlatList
          data={[...data]} // data
          renderItem={renderItem} // 選染列表的函數
          keyExtractor={item => item.SerNo} // key
          />
      </View>
      
    </View>


  );
}

const styles = StyleSheet.create({
button: {
  borderRadius: 6,
  margin: 20,
},
buttonContainer: {
  margin: 20,
  justifyContent: 'center',
  alignItems: 'center',
},
});
