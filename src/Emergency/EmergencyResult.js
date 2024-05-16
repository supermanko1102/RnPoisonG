import { Text, View } from "react-native";
import Banner from "../Component/Banner";
// import EmergencyLocationMap from "./EmergencyLocationMap";
import EmergencyLocationMap from "../Component/EmergencyLocationMap";
export default function EmergencyResult({route}){
    //看看有沒有拿到data
     console.log('getData',route.params.data)
    const EmergencyResultData = route.params.data
    return(
        //先撐開
        <View className='flex-auto bg-white'>
            <Banner/>
            {/* 長開 */}
            <View className='flex-1 w-11/12 self-center'>
                <Text className='text-2xl self-center mt-4'>事故通報結果</Text>
                <View className=''>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>運 送 車 號 :{EmergencyResultData.Plate_no}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>緊 急 事 故 :{EmergencyResultData.EmergencyNote}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>通 報 時 間 :{EmergencyResultData.ReturnTime}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>通 報 座 標 :{EmergencyResultData.WGSLat}{EmergencyResultData.WGSLon}</Text>
                    </View>
                </View>
            <EmergencyLocationMap WGSLon = {EmergencyResultData.WGSLon} WGSLat={EmergencyResultData.WGSLat}/>
            </View>
        </View>
    )
}