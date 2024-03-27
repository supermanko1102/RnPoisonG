import { Button, Dialog } from "@rneui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import Banner from "../Component/Banner";
export default function IndexScreen({ navigation }) {
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
        setData(modifiedNewsOnelist);
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
    style={styles.buttonContainer}
    className='mt-6'
    >
      <Button
        title={`${item.StartDate}     ${item.Subject}`}
        onPress={
          ()=>{
            setCurrentSerNo(item.SerNo); // 設置當前a拿到的serno
            fetchDetailData(item.SerNo); // 調用B API
          }
        }
        buttonStyle={styles.button}
      />
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
          data={data} // data
          renderItem={renderItem} // 選染列表的函數
          keyExtractor={item => item.SerNo} // key
          />
      </View>

      <Dialog
      isVisible={visible}
      onBackdropPress={toggleDialog}
      >
        {/* 需要先加一個判斷才不會造成map not defefind問題 */}
        {detailData.Newscontent && detailData.Newscontent.map((content, index) => (
          <View key={index}>
            <Dialog.Title title={content.Subject + 'SerNo: '+ currentSerNo}/>
            <Text>{content.NewsContent}</Text>
          </View>
      ))}
      </Dialog>
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
