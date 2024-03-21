import { Text, View } from "react-native";
import Banner from "../Component/Banner";
export default function FormScreen(){
    return (   
        <View
        className="flex-1"
        >
        <Banner/> 
            <Text>我是表單</Text>
        </View>
    )  
}