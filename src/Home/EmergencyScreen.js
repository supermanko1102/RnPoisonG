import { Text, View } from "react-native";
import Banner from "../Component/Banner";

export default function EmergencyScreen(){
    return (   
        <View
        className="flex-1"
        >
        <Banner/> 
            <Text>我緊急</Text>
        </View>
    )
}