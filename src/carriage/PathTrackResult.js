import axios from "axios"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { ActivityIndicator, MD2Colors } from "react-native-paper"
import Banner from "../Component/Banner"
import FormTrackMap from "../Component/FormTrackMap"
export default function PathTrackResult({route}){
    const NotYetGetAPI={
        listno:'無資料',
        Plate_no:'無資料',
        FromLat:'無資料',
        FromLon:'無資料',
        FromTime:'無資料',
        ToLat:'無資料',
        ToLon:'無資料',
        ToTime:'無資料',
    }
    const {listno}  = route.params
    console.log('表單編號',)
    const[trackResult,setTrackResult]=useState('')
    // const [data, setData] = useState([]);
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
        <View className='flex-auto'>
            <Banner/>
            <View className='flex-1'>
                <Text
                className="self-center text-xl mt-4 font-bold"
                >
                    軌跡申報結果
                </Text>
                <View className=' self-center border-b border-dashed border-gray-400 w-10/12 py-1'>
                    <Text className='font-bold text-xl'>
                        表 單 號 碼: 
                    </Text>
                    <Text className='text-xl'>
                    {trackResult.listno}
                    </Text>
                </View>
                <View className='self-center border-b border-dashed border-gray-400 w-10/12 pb-1'>
                    <Text className='font-bold text-xl'>
                        運 送 車 號:
                    </Text>
                    <Text className='text-xl'>
                        {trackResult.Plate_no}
                    </Text>
                </View>
                <View className='self-center border-b border-dashed border-gray-400 w-10/12 pb-1'>
                    <Text className='font-bold text-xl'>
                        起運申報座標:
                    </Text>
                    <Text className='text-xl' >
                        {trackResult.FromLat},{trackResult.FromLon}
                    </Text>
                </View>
                <View className='self-center border-b border-dashed border-gray-400 w-10/12 pb-1'>
                    <Text className='text-xl font-bold'>
                        起運申報時間：
                    </Text>
                    <Text className='text-xl'>
                        {trackResult.FromTime}
                    </Text>
                </View>
                <View className='self-center border-b border-dashed border-gray-400 w-10/12 pb-1'>
                    <Text className='text-xl font-bold'>
                        迄運申報座標：
                    </Text>
                    <Text className='text-xl'>
                        {trackResult.ToLat},{trackResult.ToLon}
                    </Text>
                </View>
                <View className='self-center  w-10/12 pb-1'>
                    <Text className='text-xl font-bold'>
                        迄運申報時間：
                    </Text>
                    <Text className='text-xl'>
                        {trackResult.ToTime}
                    </Text>
                </View>
                {/* Begin::MapView */}
                <View 
                className='w-11/12 self-center flex-1'>
                    <FormTrackMap listno={trackResult.listno}/>
                </View>
            </View>
        </View>
    )
}