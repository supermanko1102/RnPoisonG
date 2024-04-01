
import { Text, View } from "react-native"
import Banner from "../Component/Banner"
import Footer from "../Component/Footer"
export  default function AccidentRecord (){

    return(
        <View className='flex-1'>
            <Banner/>
            <View className='grow'>
                    <Text className='text-red-400 text-2xl self-center'>事故通報結果查詢</Text>
            </View>
            <Footer/>
        </View>
        
    )
}