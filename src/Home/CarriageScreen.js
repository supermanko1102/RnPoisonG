import { Text, View } from "react-native";
import { Button } from 'react-native-paper';
import Banner from "../Component/Banner";
export default function CarriageScreen({navigation}){
    const handleStartReport = ()=>{
        navigation.navigate('StartReport')
    }
    const handlePathTracking = ()=>{
        navigation.navigate('PathTracking')
    }
return (   
    <View
    className="flex-1"
    >
        <Banner/> 
        <Button mode="contained"
        className="mt-20" 
        onPress={handleStartReport}
        >
            <Text className="text-white text-xl px-5 py-3">開始申報</Text>
        </Button>    
        <Button mode="contained"
        className="my-20" 
        onPress={handlePathTracking}
        >
            <Text className="text-white text-xl px-5 py-3 ">今日已申報軌跡查詢</Text>
        </Button>    
            
    </View>
)
}

