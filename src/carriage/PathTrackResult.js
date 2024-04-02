import axios from "axios"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper"
import Banner from "../Component/Banner"
import Footer from "../Component/Footer"
import MyMapScreen from "../Component/MyMapScreen"
export default function PathTrackResult({route}){
    const NotYetGetAPI={
        listno:'還沒拿到',
        Plate_no:'還沒拿到',
        FromLat:'還沒拿到',
        FromLon:'還沒拿到',
        FromTime:'還沒拿到',
        ToLat:'還沒拿到',
        ToLon:'還沒拿到',
        ToTime:'還沒拿到',
    }
    const {listno}  = route.params
    console.log('表單編號',)
    const[trackResult,setTrackResult]=useState('')
    const [data, setData] = useState([]);
    //設定一個loading狀態
    const[loading,setLoading] = useState(true)   
    //begin::Get API
    useEffect(()=>{
        
        const fetTrackResullt = async()=>{
            const res = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
                params: {
                  Function: 'GetddlistByReturnAlreadyDetail',
                  ServiceKey: 'V9achV7sd8AK',
                  listno:listno
                }

              });
              //拿到已申報表單詳細清單資訊
            //   const resultPath = res.data.DTddlist[0]
            //   setTrackResult(resultPath)
            //   console.log('trackResult',trackResult)
            //   console.log('trackResult',trackResult.listno)
            if(res.data && res.data.DTddlist && res.data.DTddlist.length > 0){
                const resultPath = res.data.DTddlist[0];
                setTrackResult(resultPath);
            }else{
                //API沒有拿到data
                setTrackResult(NotYetGetAPI);
            }
              setLoading(false)
        } 
        fetTrackResullt()
    },[])

     //begin::loading
    if(loading){
        return (<View className='flex-1 justify-center items-center'>
        <ActivityIndicator animating={true} size='large' color={MD2Colors.red800} />
        </View>
        )
    }
  //end::loading
    //end::GET API

    return(
        <View className='flex-1'>
        <Banner/>
        <View className='grow'>
        <Text
        variant="headlineMedium"
        className="self-center mt-4"
        >軌跡申報結果</Text>

        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                表單號碼: {trackResult.listno}
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                運送車號: {trackResult.Plate_no}
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                起運申報座標: {trackResult.FromLat},{trackResult.FromLon}
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                起運申報時間: {trackResult.FromTime}
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                迄運申報座標: {trackResult.ToLat},{trackResult.ToLon}
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                迄運申報時間: {trackResult.ToTime}
            </Text>
        </View>


        {/* Begin::MapView */}
        <View 
                className='w-11/12 self-center mt-2 mb-2'
                style={{flex:1}}>
                    <MyMapScreen/>
                </View>
                {/* End:MapView */}
        </View>
        <Footer/>
        </View>
    )
}