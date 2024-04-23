import { Text, View } from "react-native";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
// import EmergencyLocationMap from "./EmergencyLocationMap";
import EmergencyLocationMap from "../Component/EmergencyLocationMap";
export default function EmergencyResult({route}){
    //看看有沒有拿到data
     console.log('getData',route.params.data)
    const EmergencyResultData = route.params.data
    return(
        //先撐開
        <View className='flex-1'>
            <Banner/>
            {/* 長開 */}
            <View className='grow bg-red-200'>
                <Text className='text-red-400 text-2xl self-center'>事故通報結果</Text>
                <View className='self-center'>
                    <Text>運送車號:{EmergencyResultData.Plate_no}</Text>
                    <Text>緊急事故:{EmergencyResultData.EmergencyNote}</Text>
                    <Text>通報時間:{EmergencyResultData.ReturnTime}</Text>
                    <Text>通報座標:{EmergencyResultData.WGSLat},{EmergencyResultData.WGSLon}</Text>
                </View>
            <EmergencyLocationMap WGSLon = {EmergencyResultData.WGSLon} WGSLat={EmergencyResultData.WGSLat}/>
            {/* <EmergencyLocationMap latitude={EmergencyResultData.WGSLat} longitude={EmergencyResultData.WGSLon}/> */}
            </View>
            <Footer/>
        </View>
    )
}