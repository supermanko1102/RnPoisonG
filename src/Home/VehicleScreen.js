import { Text, View } from "react-native";
import Banner from "../Component/Banner";
export default function VehicleScreen(){
    return (   
        <View
        className="flex-1"
        >
        <Banner/> 
            <Text>我是車輛</Text>
        </View>
    )
}