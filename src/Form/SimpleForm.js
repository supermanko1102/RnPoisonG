import { Text, View } from "react-native";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";

export default function SimpleForm(){
    return(
        <View className='flex-1'>
            <Banner/>
                <View className='grow'>
                    <Text>我是一張表</Text>
                </View>
            <Footer/>
        </View>
    )
}